export interface Room {
  id: string
  name: string
  type: string
  status: "available" | "occupied" | "maintenance" | "reserved"
  price: number
  image: string
  capacity: number
  amenities: string[]
  floor: number
}

export interface Booking {
  id: string
  roomId: string
  roomName: string
  customerId: string
  customerName: string
  customerEmail: string
  checkIn: string
  checkOut: string
  status: "confirmed" | "checked-in" | "checked-out" | "cancelled"
  totalAmount: number
  guests: number
  specialRequests?: string
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  address?: string
  totalBookings: number
  totalSpent: number
  joinedDate: string
}

export interface DashboardStats {
  totalRooms: number
  occupiedRooms: number
  availableRooms: number
  totalBookings: number
  todayCheckIns: number
  todayCheckOuts: number
  revenue: {
    today: number
    month: number
    year: number
  }
  recentBookings: Booking[]
}

export interface Invoice {
  id: string
  bookingId: string
  customerName: string
  amount: number
  status: "paid" | "pending" | "overdue"
  issueDate: string
  dueDate: string
}

export interface User {
  id: string
  email: string
  name: string
  role: string
}
