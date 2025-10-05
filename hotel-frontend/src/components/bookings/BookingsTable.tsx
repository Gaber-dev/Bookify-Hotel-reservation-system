"use client"

import { useState } from "react"
import { Eye, X, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "../../lib/utils"
import type { Booking } from "../../types"

interface BookingsTableProps {
  bookings: Booking[]
  onView?: (booking: Booking) => void
  onCancel?: (booking: Booking) => void
}

const statusConfig = {
  confirmed: {
    label: "Confirmed",
    className: "bg-primary/10 text-primary border-primary/20",
  },
  "checked-in": {
    label: "Checked In",
    className: "bg-success/10 text-success border-success/20",
  },
  "checked-out": {
    label: "Checked Out",
    className: "bg-muted text-muted-foreground border-border",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
}

export default function BookingsTable({ bookings, onView, onCancel }: BookingsTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const totalPages = Math.ceil(bookings.length / itemsPerPage)

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentBookings = bookings.slice(startIndex, endIndex)

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Booking ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Room
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Check In
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Check Out
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Guests
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {currentBookings.map((booking) => {
              const statusStyle = statusConfig[booking.status]
              return (
                <tr key={booking.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-foreground">#{booking.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-foreground">{booking.customerName}</p>
                      <p className="text-xs text-muted-foreground">{booking.customerEmail}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-foreground">{booking.roomName}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-foreground">{booking.checkIn}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-foreground">{booking.checkOut}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-foreground">{booking.guests}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium border", statusStyle.className)}>
                      {statusStyle.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-foreground">${booking.totalAmount}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onView?.(booking)}
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                        aria-label="View booking"
                      >
                        <Eye className="h-4 w-4 text-foreground" />
                      </button>
                      {booking.status !== "cancelled" && booking.status !== "checked-out" && (
                        <button
                          onClick={() => onCancel?.(booking)}
                          className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                          aria-label="Cancel booking"
                        >
                          <X className="h-4 w-4 text-destructive" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-border flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(endIndex, bookings.length)} of {bookings.length} bookings
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 hover:bg-muted rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-5 w-5 text-foreground" />
            </button>
            <span className="text-sm text-foreground px-3">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 hover:bg-muted rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next page"
            >
              <ChevronRight className="h-5 w-5 text-foreground" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
