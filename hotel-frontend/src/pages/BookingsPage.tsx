"use client"

import { useEffect, useState } from "react"
import { Plus, Search, Filter, Calendar } from "lucide-react"
import BookingsTable from "../components/bookings/BookingsTable"
import { api } from "../services/api"
import type { Booking } from "../types"

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [dateFilter, setDateFilter] = useState<string>("all")

  useEffect(() => {
    const fetchBookings = async () => {
      const response = await api.getBookings()
      if (response.data) {
        setBookings(response.data)
      } else {
        // Demo data fallback
        setBookings(demoBookings)
      }
      setIsLoading(false)
    }

    fetchBookings()
  }, [])

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.roomName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || booking.status === statusFilter

    let matchesDate = true
    if (dateFilter === "today") {
      const today = new Date().toISOString().split("T")[0]
      matchesDate = booking.checkIn === today || booking.checkOut === today
    } else if (dateFilter === "upcoming") {
      const today = new Date().toISOString().split("T")[0]
      matchesDate = booking.checkIn > today
    }

    return matchesSearch && matchesStatus && matchesDate
  })

  const handleView = (booking: Booking) => {
    console.log("View booking:", booking)
  }

  const handleCancel = (booking: Booking) => {
    console.log("Cancel booking:", booking)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Bookings Management</h1>
          <p className="text-muted-foreground">View and manage all hotel bookings</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
          <Plus className="h-5 w-5" />
          New Booking
        </button>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by customer, room, or booking ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 bg-background border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="all">All Status</option>
                <option value="confirmed">Confirmed</option>
                <option value="checked-in">Checked In</option>
                <option value="checked-out">Checked Out</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="px-4 py-2 bg-background border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="all">All Dates</option>
                <option value="today">Today</option>
                <option value="upcoming">Upcoming</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-1">Total Bookings</p>
          <p className="text-2xl font-bold text-foreground">{bookings.length}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-1">Confirmed</p>
          <p className="text-2xl font-bold text-primary">{bookings.filter((b) => b.status === "confirmed").length}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-1">Checked In</p>
          <p className="text-2xl font-bold text-success">{bookings.filter((b) => b.status === "checked-in").length}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-1">Cancelled</p>
          <p className="text-2xl font-bold text-destructive">
            {bookings.filter((b) => b.status === "cancelled").length}
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading bookings...</p>
        </div>
      ) : filteredBookings.length > 0 ? (
        <BookingsTable bookings={filteredBookings} onView={handleView} onCancel={handleCancel} />
      ) : (
        <div className="text-center py-12 bg-card border border-border rounded-lg">
          <p className="text-muted-foreground">No bookings found matching your criteria</p>
        </div>
      )}
    </div>
  )
}

// Demo data
const demoBookings: Booking[] = [
  {
    id: "BK001",
    roomId: "1",
    roomName: "Deluxe Suite 301",
    customerId: "C001",
    customerName: "Alice Cooper",
    customerEmail: "alice.cooper@email.com",
    checkIn: "2024-01-15",
    checkOut: "2024-01-18",
    status: "confirmed",
    totalAmount: 897,
    guests: 2,
  },
  {
    id: "BK002",
    roomId: "2",
    roomName: "Standard Room 105",
    customerId: "C002",
    customerName: "Bob Martinez",
    customerEmail: "bob.martinez@email.com",
    checkIn: "2024-01-14",
    checkOut: "2024-01-16",
    status: "checked-in",
    totalAmount: 298,
    guests: 1,
  },
  {
    id: "BK003",
    roomId: "3",
    roomName: "Executive Suite 402",
    customerId: "C003",
    customerName: "Carol Davis",
    customerEmail: "carol.davis@email.com",
    checkIn: "2024-01-16",
    checkOut: "2024-01-20",
    status: "confirmed",
    totalAmount: 1596,
    guests: 3,
  },
  {
    id: "BK004",
    roomId: "4",
    roomName: "Standard Room 203",
    customerId: "C004",
    customerName: "David Wilson",
    customerEmail: "david.wilson@email.com",
    checkIn: "2024-01-10",
    checkOut: "2024-01-13",
    status: "checked-out",
    totalAmount: 447,
    guests: 2,
  },
  {
    id: "BK005",
    roomId: "6",
    roomName: "Family Room 201",
    customerId: "C005",
    customerName: "Emma Thompson",
    customerEmail: "emma.thompson@email.com",
    checkIn: "2024-01-12",
    checkOut: "2024-01-14",
    status: "cancelled",
    totalAmount: 498,
    guests: 4,
  },
  {
    id: "BK006",
    roomId: "1",
    roomName: "Deluxe Suite 301",
    customerId: "C006",
    customerName: "Frank Miller",
    customerEmail: "frank.miller@email.com",
    checkIn: "2024-01-20",
    checkOut: "2024-01-23",
    status: "confirmed",
    totalAmount: 897,
    guests: 2,
  },
  {
    id: "BK007",
    roomId: "2",
    roomName: "Standard Room 105",
    customerId: "C007",
    customerName: "Grace Lee",
    customerEmail: "grace.lee@email.com",
    checkIn: "2024-01-17",
    checkOut: "2024-01-19",
    status: "confirmed",
    totalAmount: 298,
    guests: 1,
  },
  {
    id: "BK008",
    roomId: "3",
    roomName: "Executive Suite 402",
    customerId: "C008",
    customerName: "Henry Garcia",
    customerEmail: "henry.garcia@email.com",
    checkIn: "2024-01-13",
    checkOut: "2024-01-15",
    status: "checked-out",
    totalAmount: 798,
    guests: 2,
  },
]
