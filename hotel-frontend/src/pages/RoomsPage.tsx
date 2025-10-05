"use client"

import { useEffect, useState } from "react"
import { Plus, Search, Filter } from "lucide-react"
import RoomCard from "../components/rooms/RoomCard"
import { api } from "../services/api"
import type { Room } from "../types"

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  useEffect(() => {
    const fetchRooms = async () => {
      const response = await api.getRooms()
      if (response.data) {
        setRooms(response.data)
      } else {
        // Demo data fallback
        setRooms(demoRooms)
      }
      setIsLoading(false)
    }

    fetchRooms()
  }, [])

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.type.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || room.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleView = (room: Room) => {
    console.log("View room:", room)
  }

  const handleEdit = (room: Room) => {
    console.log("Edit room:", room)
  }

  const handleDelete = (room: Room) => {
    console.log("Delete room:", room)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Rooms Management</h1>
          <p className="text-muted-foreground">Manage your hotel rooms and availability</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
          <Plus className="h-5 w-5" />
          Add Room
        </button>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search rooms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-background border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="occupied">Occupied</option>
              <option value="maintenance">Maintenance</option>
              <option value="reserved">Reserved</option>
            </select>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading rooms...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRooms.map((room) => (
              <RoomCard key={room.id} room={room} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} />
            ))}
          </div>

          {filteredRooms.length === 0 && (
            <div className="text-center py-12 bg-card border border-border rounded-lg">
              <p className="text-muted-foreground">No rooms found matching your criteria</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

// Demo data
const demoRooms: Room[] = [
  {
    id: "1",
    name: "Deluxe Suite 301",
    type: "Deluxe Suite",
    status: "available",
    price: 299,
    image: "/luxury-hotel-suite.png",
    capacity: 2,
    amenities: ["King Bed", "Ocean View", "Mini Bar", "Balcony"],
    floor: 3,
  },
  {
    id: "2",
    name: "Standard Room 105",
    type: "Standard Room",
    status: "occupied",
    price: 149,
    image: "/modern-hotel-room.png",
    capacity: 2,
    amenities: ["Queen Bed", "WiFi", "TV", "Coffee Maker"],
    floor: 1,
  },
  {
    id: "3",
    name: "Executive Suite 402",
    type: "Executive Suite",
    status: "reserved",
    price: 399,
    image: "/executive-hotel-suite.png",
    capacity: 4,
    amenities: ["2 Bedrooms", "Living Room", "Kitchen", "City View"],
    floor: 4,
  },
  {
    id: "4",
    name: "Standard Room 203",
    type: "Standard Room",
    status: "available",
    price: 149,
    image: "/hotel-room-bed.png",
    capacity: 2,
    amenities: ["Queen Bed", "WiFi", "TV", "Desk"],
    floor: 2,
  },
  {
    id: "5",
    name: "Deluxe Suite 305",
    type: "Deluxe Suite",
    status: "maintenance",
    price: 299,
    image: "/hotel-suite-interior.jpg",
    capacity: 2,
    amenities: ["King Bed", "Jacuzzi", "Mini Bar", "Balcony"],
    floor: 3,
  },
  {
    id: "6",
    name: "Family Room 201",
    type: "Family Room",
    status: "available",
    price: 249,
    image: "/family-hotel-room.png",
    capacity: 4,
    amenities: ["2 Queen Beds", "WiFi", "TV", "Microwave"],
    floor: 2,
  },
]
