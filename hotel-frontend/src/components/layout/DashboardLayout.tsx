"use client"

import { Outlet } from "react-router-dom"
import Header from "./Header"
import Sidebar from "./Sidebar"

interface DashboardLayoutProps {
  onLogout: () => void
}

export default function DashboardLayout({ onLogout }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header onLogout={onLogout} />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-64 mt-16 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
