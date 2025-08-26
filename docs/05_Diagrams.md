# 4. Diagrams
## 4.1 Use Case Diagram
```mermaid
usecaseDiagram
actor Customer
actor Admin

Customer --> (Search Rooms)
Customer --> (Make Reservation)
Customer --> (Cancel Reservation)
Customer --> (Payment)
Admin --> (Manage Rooms)
Admin --> (Generate Reports)
```

## 4.2 Class Diagram
```mermaid
classDiagram
class User {
  +int UserId
  +string Name
  +string Email
  +Login()
}
class Customer
class Admin
class Reservation {
  +int ReservationId
  +DateTime CheckIn
  +DateTime CheckOut
  +decimal TotalAmount
}
class Room {
  +int RoomId
  +string RoomType
  +decimal Price
  +bool Availability
}

User <|-- Customer
User <|-- Admin
Customer --> Reservation
Reservation --> Room
```

## 4.3 Sequence Diagram
```mermaid
sequenceDiagram
Customer->>System: Search Rooms
System-->>Database: Query Available Rooms
Database-->>System: Return Room List
System-->>Customer: Show Rooms
Customer->>System: Book Room
System-->>Database: Save Reservation
Database-->>System: Confirm Booking
System-->>Customer: Show Confirmation
```
