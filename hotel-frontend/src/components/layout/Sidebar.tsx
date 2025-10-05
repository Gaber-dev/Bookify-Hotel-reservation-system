"use client"

import { NavLink } from "react-router-dom"
import { Home, Bed, Calendar, Users, CreditCard, Settings } from "lucide-react"
import { cn } from "../../lib/utils"

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Rooms", href: "/rooms", icon: Bed },
  { name: "Bookings", href: "/bookings", icon: Calendar },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Billing", href: "/billing", icon: CreditCard },
  { name: "Settings", href: "/settings", icon: Settings },
]

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-card border-r border-border">
      <nav className="p-4 space-y-1">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            end={item.href === "/"}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )
            }
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
