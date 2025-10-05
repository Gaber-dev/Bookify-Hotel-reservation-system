// Central API service for all HTTP requests
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api"

interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

class ApiService {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return { data }
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : "An error occurred",
      }
    }
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
  }

  async logout() {
    return this.request("/auth/logout", {
      method: "POST",
    })
  }

  // Rooms endpoints
  async getRooms(params?: { status?: string; page?: number; limit?: number }) {
    const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : ""
    return this.request(`/rooms${queryString}`)
  }

  async getRoom(id: string) {
    return this.request(`/rooms/${id}`)
  }

  async createRoom(data: any) {
    return this.request("/rooms", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async updateRoom(id: string, data: any) {
    return this.request(`/rooms/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async deleteRoom(id: string) {
    return this.request(`/rooms/${id}`, {
      method: "DELETE",
    })
  }

  // Bookings endpoints
  async getBookings(params?: { status?: string; page?: number; limit?: number; startDate?: string; endDate?: string }) {
    const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : ""
    return this.request(`/bookings${queryString}`)
  }

  async getBooking(id: string) {
    return this.request(`/bookings/${id}`)
  }

  async createBooking(data: any) {
    return this.request("/bookings", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async updateBooking(id: string, data: any) {
    return this.request(`/bookings/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async cancelBooking(id: string) {
    return this.request(`/bookings/${id}/cancel`, {
      method: "POST",
    })
  }

  // Customers endpoints
  async getCustomers(params?: { page?: number; limit?: number; search?: string }) {
    const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : ""
    return this.request(`/customers${queryString}`)
  }

  async getCustomer(id: string) {
    return this.request(`/customers/${id}`)
  }

  async createCustomer(data: any) {
    return this.request("/customers", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async updateCustomer(id: string, data: any) {
    return this.request(`/customers/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  // Dashboard stats
  async getDashboardStats() {
    return this.request("/dashboard/stats")
  }

  // Billing endpoints
  async getInvoices(params?: { page?: number; limit?: number; status?: string }) {
    const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : ""
    return this.request(`/billing/invoices${queryString}`)
  }

  async getInvoice(id: string) {
    return this.request(`/billing/invoices/${id}`)
  }
}

export const api = new ApiService(API_BASE_URL)
