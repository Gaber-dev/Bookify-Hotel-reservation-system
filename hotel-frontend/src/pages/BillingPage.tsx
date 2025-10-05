"use client"

import { useEffect, useState } from "react"
import { Download, Eye, DollarSign, Clock, CheckCircle } from "lucide-react"
import { cn } from "../lib/utils"
import { api } from "../services/api"
import type { Invoice } from "../types"

const statusConfig = {
  paid: {
    label: "Paid",
    className: "bg-success/10 text-success border-success/20",
    icon: CheckCircle,
  },
  pending: {
    label: "Pending",
    className: "bg-warning/10 text-warning border-warning/20",
    icon: Clock,
  },
  overdue: {
    label: "Overdue",
    className: "bg-destructive/10 text-destructive border-destructive/20",
    icon: Clock,
  },
}

export default function BillingPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchInvoices = async () => {
      const response = await api.getInvoices()
      if (response.data) {
        setInvoices(response.data)
      } else {
        // Demo data fallback
        setInvoices(demoInvoices)
      }
      setIsLoading(false)
    }

    fetchInvoices()
  }, [])

  const totalRevenue = invoices.filter((i) => i.status === "paid").reduce((sum, i) => sum + i.amount, 0)
  const pendingAmount = invoices.filter((i) => i.status === "pending").reduce((sum, i) => sum + i.amount, 0)
  const overdueAmount = invoices.filter((i) => i.status === "overdue").reduce((sum, i) => sum + i.amount, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Billing & Invoices</h1>
        <p className="text-muted-foreground">Manage payments and invoices</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
              <p className="text-3xl font-bold text-foreground">${totalRevenue.toLocaleString()}</p>
            </div>
            <div className="bg-success/10 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-success" />
            </div>
          </div>
          <p className="text-sm text-success">+12% from last month</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Pending</p>
              <p className="text-3xl font-bold text-foreground">${pendingAmount.toLocaleString()}</p>
            </div>
            <div className="bg-warning/10 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-warning" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            {invoices.filter((i) => i.status === "pending").length} invoices
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Overdue</p>
              <p className="text-3xl font-bold text-foreground">${overdueAmount.toLocaleString()}</p>
            </div>
            <div className="bg-destructive/10 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-destructive" />
            </div>
          </div>
          <p className="text-sm text-destructive">{invoices.filter((i) => i.status === "overdue").length} invoices</p>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading invoices...</p>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Invoice ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Booking ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Issue Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {invoices.map((invoice) => {
                  const statusStyle = statusConfig[invoice.status]
                  const StatusIcon = statusStyle.icon
                  return (
                    <tr key={invoice.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-foreground">#{invoice.id}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-foreground">{invoice.customerName}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-muted-foreground">#{invoice.bookingId}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-semibold text-foreground">
                          ${invoice.amount.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-foreground">{invoice.issueDate}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-foreground">{invoice.dueDate}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
                            statusStyle.className,
                          )}
                        >
                          <StatusIcon className="h-3 w-3" />
                          {statusStyle.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 hover:bg-muted rounded-lg transition-colors" aria-label="View invoice">
                            <Eye className="h-4 w-4 text-foreground" />
                          </button>
                          <button
                            className="p-2 hover:bg-muted rounded-lg transition-colors"
                            aria-label="Download invoice"
                          >
                            <Download className="h-4 w-4 text-foreground" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

// Demo data
const demoInvoices: Invoice[] = [
  {
    id: "INV001",
    bookingId: "BK001",
    customerName: "Alice Cooper",
    amount: 897,
    status: "paid",
    issueDate: "2024-01-15",
    dueDate: "2024-01-22",
  },
  {
    id: "INV002",
    bookingId: "BK002",
    customerName: "Bob Martinez",
    amount: 298,
    status: "pending",
    issueDate: "2024-01-14",
    dueDate: "2024-01-21",
  },
  {
    id: "INV003",
    bookingId: "BK003",
    customerName: "Carol Davis",
    amount: 1596,
    status: "paid",
    issueDate: "2024-01-16",
    dueDate: "2024-01-23",
  },
  {
    id: "INV004",
    bookingId: "BK004",
    customerName: "David Wilson",
    amount: 447,
    status: "overdue",
    issueDate: "2024-01-10",
    dueDate: "2024-01-17",
  },
  {
    id: "INV005",
    bookingId: "BK006",
    customerName: "Frank Miller",
    amount: 897,
    status: "pending",
    issueDate: "2024-01-20",
    dueDate: "2024-01-27",
  },
]
