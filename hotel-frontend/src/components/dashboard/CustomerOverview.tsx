import { Users, TrendingUp } from "lucide-react"

export default function CustomerOverview() {
  const topCustomers = [
    { id: "1", name: "Sarah Johnson", bookings: 12, spent: 15420 },
    { id: "2", name: "Michael Chen", bookings: 8, spent: 12300 },
    { id: "3", name: "Emma Williams", bookings: 6, spent: 9800 },
    { id: "4", name: "James Brown", bookings: 5, spent: 7650 },
  ]

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-accent/10 p-2 rounded-lg">
            <Users className="h-5 w-5 text-accent" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">Top Customers</h2>
        </div>
        <button className="text-sm text-primary hover:text-primary/80 font-medium">View All</button>
      </div>

      <div className="space-y-4">
        {topCustomers.map((customer) => (
          <div
            key={customer.id}
            className="flex items-center justify-between py-3 border-b border-border last:border-0"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-muted rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-foreground">{customer.name.charAt(0)}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{customer.name}</p>
                <p className="text-xs text-muted-foreground">{customer.bookings} bookings</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-foreground">${customer.spent.toLocaleString()}</p>
              <div className="flex items-center gap-1 text-xs text-success">
                <TrendingUp className="h-3 w-3" />
                <span>Active</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
