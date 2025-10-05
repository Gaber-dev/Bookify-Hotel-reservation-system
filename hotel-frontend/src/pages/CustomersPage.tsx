"use client"

import { useEffect, useState } from "react"
import { Plus, Search, Mail, Phone, TrendingUp } from "lucide-react"
import { api } from "../services/api"
import type { Customer } from "../types"

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await api.getCustomers()
      if (response.data) {
        setCustomers(response.data)
      } else {
        // Demo data fallback
        setCustomers(demoCustomers)
      }
      setIsLoading(false)
    }

    fetchCustomers()
  }, [])

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Customers</h1>
          <p className="text-muted-foreground">Manage your customer database</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
          <Plus className="h-5 w-5" />
          Add Customer
        </button>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search customers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-1">Total Customers</p>
          <p className="text-2xl font-bold text-foreground">{customers.length}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-1">Total Bookings</p>
          <p className="text-2xl font-bold text-primary">{customers.reduce((sum, c) => sum + c.totalBookings, 0)}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
          <p className="text-2xl font-bold text-success">
            ${customers.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading customers...</p>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Bookings
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Total Spent
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-primary">{customer.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{customer.name}</p>
                          <p className="text-xs text-muted-foreground">ID: {customer.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-foreground">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          {customer.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-foreground">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          {customer.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-foreground">{customer.totalBookings}</span>
                        <TrendingUp className="h-4 w-4 text-success" />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-foreground">
                        ${customer.totalSpent.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-foreground">{customer.joinedDate}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

// Demo data
const demoCustomers: Customer[] = [
  {
    id: "C001",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    totalBookings: 12,
    totalSpent: 15420,
    joinedDate: "2023-03-15",
  },
  {
    id: "C002",
    name: "Michael Chen",
    email: "michael.chen@email.com",
    phone: "+1 (555) 234-5678",
    totalBookings: 8,
    totalSpent: 12300,
    joinedDate: "2023-05-22",
  },
  {
    id: "C003",
    name: "Emma Williams",
    email: "emma.williams@email.com",
    phone: "+1 (555) 345-6789",
    totalBookings: 6,
    totalSpent: 9800,
    joinedDate: "2023-07-10",
  },
  {
    id: "C004",
    name: "James Brown",
    email: "james.brown@email.com",
    phone: "+1 (555) 456-7890",
    totalBookings: 5,
    totalSpent: 7650,
    joinedDate: "2023-08-05",
  },
  {
    id: "C005",
    name: "Olivia Davis",
    email: "olivia.davis@email.com",
    phone: "+1 (555) 567-8901",
    totalBookings: 4,
    totalSpent: 6200,
    joinedDate: "2023-09-18",
  },
]
