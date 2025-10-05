"use client"

import { useEffect, useState } from "react"
import { Bed, Calendar, DollarSign, Users } from "lucide-react"
import StatCard from "../components/dashboard/StatCard"
import CustomerOverview from "../components/dashboard/CustomerOverview"
import RecentBookings from "../components/dashboard/RecentBookings"
import BookingCalendar from "../components/dashboard/BookingCalendar"
import { api } from "../services/api"
import type { DashboardStats } from "../types"

export default function HomePage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      const response = await api.getDashboardStats()
      if (response.data) {
        setStats(response.data)
      }
      setIsLoading(false)
    }

    fetchStats()
  }, [])

  // Demo data fallback
  const displayStats = stats || {
    totalRooms: 48,
    occupiedRooms: 32,
    availableRooms: 16,
    totalBookings: 156,
    todayCheckIns: 8,
    todayCheckOuts: 5,
    revenue: {
      today: 4250,
      month: 125400,
      year: 1450000,
    },
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Rooms"
          value={displayStats.totalRooms}
          icon={Bed}
          trend={{ value: "12%", isPositive: true }}
        />
        <StatCard
          title="Occupied Rooms"
          value={displayStats.occupiedRooms}
          icon={Users}
          trend={{ value: "8%", isPositive: true }}
        />
        <StatCard title="Today's Check-ins" value={displayStats.todayCheckIns} icon={Calendar} />
        <StatCard
          title="Monthly Revenue"
          value={`$${(displayStats.revenue.month / 1000).toFixed(1)}k`}
          icon={DollarSign}
          trend={{ value: "15%", isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentBookings />
        </div>
        <div>
          <CustomerOverview />
        </div>
      </div>

      <div>
        <BookingCalendar />
      </div>
    </div>
  )
}
