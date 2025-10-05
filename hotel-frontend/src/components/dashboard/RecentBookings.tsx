import { Calendar, Clock } from "lucide-react"
import { cn } from "../../lib/utils"

const statusColors = {
  confirmed: "bg-primary/10 text-primary",
  "checked-in": "bg-success/10 text-success",
  "checked-out": "bg-muted text-muted-foreground",
  cancelled: "bg-destructive/10 text-destructive",
}

export default function RecentBookings() {
  const bookings = [
    {
      id: "1",
      customerName: "Alice Cooper",
      roomName: "Deluxe Suite 301",
      checkIn: "2024-01-15",
      checkOut: "2024-01-18",
      status: "confirmed" as const,
      amount: 450,
    },
    {
      id: "2",
      customerName: "Bob Martinez",
      roomName: "Standard Room 105",
      checkIn: "2024-01-14",
      checkOut: "2024-01-16",
      status: "checked-in" as const,
      amount: 280,
    },
    {
      id: "3",
      customerName: "Carol Davis",
      roomName: "Executive Suite 402",
      checkIn: "2024-01-16",
      checkOut: "2024-01-20",
      status: "confirmed" as const,
      amount: 680,
    },
  ]

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-lg">
            <Calendar className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">Recent Bookings</h2>
        </div>
        <button className="text-sm text-primary hover:text-primary/80 font-medium">View All</button>
      </div>

      <div className="space-y-4">
        {bookings.map((booking) => (
          <div key={booking.id} className="bg-muted/50 rounded-lg p-4 hover:bg-muted transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-medium text-foreground">{booking.customerName}</p>
                <p className="text-sm text-muted-foreground">{booking.roomName}</p>
              </div>
              <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium", statusColors[booking.status])}>
                {booking.status.replace("-", " ")}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>
                    {booking.checkIn} - {booking.checkOut}
                  </span>
                </div>
              </div>
              <p className="font-semibold text-foreground">${booking.amount}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
