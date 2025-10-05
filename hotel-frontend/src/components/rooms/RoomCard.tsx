"use client"

import { Edit, Trash2, Eye } from "lucide-react"
import { cn } from "../../lib/utils"
import type { Room } from "../../types"

interface RoomCardProps {
  room: Room
  onEdit?: (room: Room) => void
  onDelete?: (room: Room) => void
  onView?: (room: Room) => void
}

const statusConfig = {
  available: {
    label: "Available",
    className: "bg-success/10 text-success border-success/20",
  },
  occupied: {
    label: "Occupied",
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
  maintenance: {
    label: "Maintenance",
    className: "bg-warning/10 text-warning border-warning/20",
  },
  reserved: {
    label: "Reserved",
    className: "bg-primary/10 text-primary border-primary/20",
  },
}

export default function RoomCard({ room, onEdit, onDelete, onView }: RoomCardProps) {
  const statusStyle = statusConfig[room.status]

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-colors group">
      <div className="relative h-48 bg-muted overflow-hidden">
        <img
          src={room.image || "/placeholder.svg"}
          alt={room.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <span className={cn("px-3 py-1 rounded-full text-xs font-medium border", statusStyle.className)}>
            {statusStyle.label}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground mb-1">{room.name}</h3>
          <p className="text-sm text-muted-foreground">{room.type}</p>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Price per night</p>
            <p className="text-2xl font-bold text-foreground">${room.price}</p>
          </div>
          <div className="text-right space-y-1">
            <p className="text-xs text-muted-foreground">Capacity</p>
            <p className="text-sm font-medium text-foreground">{room.capacity} guests</p>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4 flex-wrap">
          {room.amenities.slice(0, 3).map((amenity) => (
            <span key={amenity} className="px-2 py-1 bg-muted text-xs text-muted-foreground rounded">
              {amenity}
            </span>
          ))}
          {room.amenities.length > 3 && (
            <span className="px-2 py-1 bg-muted text-xs text-muted-foreground rounded">
              +{room.amenities.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 pt-4 border-t border-border">
          <button
            onClick={() => onView?.(room)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
          >
            <Eye className="h-4 w-4" />
            View
          </button>
          <button
            onClick={() => onEdit?.(room)}
            className="flex items-center justify-center p-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg transition-colors"
            aria-label="Edit room"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete?.(room)}
            className="flex items-center justify-center p-2 bg-destructive/10 hover:bg-destructive/20 text-destructive rounded-lg transition-colors"
            aria-label="Delete room"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
