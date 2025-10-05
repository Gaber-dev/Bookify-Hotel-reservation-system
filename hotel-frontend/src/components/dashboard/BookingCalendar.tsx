import { Calendar } from "lucide-react"

export default function BookingCalendar() {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-accent/10 p-2 rounded-lg">
          <Calendar className="h-5 w-5 text-accent" />
        </div>
        <h2 className="text-lg font-semibold text-foreground">Booking Calendar</h2>
      </div>

      <div className="flex items-center justify-center h-64 bg-muted/30 rounded-lg border-2 border-dashed border-border">
        <div className="text-center">
          <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm font-medium text-foreground">Calendar View</p>
          <p className="text-xs text-muted-foreground mt-1">Interactive calendar component placeholder</p>
        </div>
      </div>
    </div>
  )
}
