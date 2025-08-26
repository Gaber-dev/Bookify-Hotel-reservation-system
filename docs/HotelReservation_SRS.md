
# Software Requirements Specification (SRS)
## Project
Bookify — Hotel Reservation System  
C# .NET Core Web API + ASP.NET Core MVC (Razor) — Capstone Project

## Revision History
- v1.0 — 2025-08-27 — Initial full SRS produced for repo integration.

## 1. Introduction
### 1.1 Purpose
This SRS describes requirements for Bookify, an enterprise-style hotel reservation system enabling customers to browse hotels, reserve rooms, manage bookings, process payments (gateway-agnostic), and provide admin management functions. The system serves as a capstone app demonstrating .NET Core Web API, ASP.NET Core MVC, SQL Server, EF Core ORM, unit testing, and Docker containerization.

### 1.2 Scope
Bookify comprises:
- Public website (Razor pages) for browsing hotels, viewing room types, booking flow.
- RESTful API (ASP.NET Core Web API) for front-end and third-party integrations.
- Admin portal for hotel and reservation management.
- SQL Server database with EF Core as ORM.
- Unit tests (xUnit recommended).
- Docker support for development and basic production packaging.

### 1.3 Definitions, Acronyms, Abbreviations
- API — Application Programming Interface
- EF Core — Entity Framework Core
- MVC — Model-View-Controller
- SRS — Software Requirements Specification
- CI/CD — Continuous Integration / Continuous Delivery

## 2. Stakeholders
- End-users (guests) — browse hotels, book rooms, view reservation history.
- Hotel Administrators — manage hotels, room inventory, prices, availability.
- System Administrators — deploy, monitor, maintain the platform.
- Developers & Testers — extend and maintain the codebase.
- Payment provider — external third-party gateway

## 3. Overall Description
### 3.1 Product Perspective
Modular web application:
- Presentation: ASP.NET Core MVC (Razor) + HTML5/JS/CSS3 (Bootstrap).
- API Layer: .NET Core Web API for data operations.
- Business Layer: Services handling business logic.
- Data Layer: EF Core mapping to SQL Server.

### 3.2 Design Constraints
- ASP.NET Core >= 6 (project README lists .NET 8 as baseline; support .NET 8).
- SQL Server (localdev or Docker SQL container).
- Identity: ASP.NET Identity for auth and RBAC.
- Containerization: Dockerfile and docker-compose for multi-container local dev.

### 3.3 Assumptions & Dependencies
- Payment provider SDK is available and configurable at runtime (test mode).
- SMTP or email provider accessible for reservation emails.
- EF migrations are used for schema management.
- Clients use HTTPS endpoints for production.

## 4. Functional Requirements (FR)
Each requirement has an id, description, and acceptance criteria.

**FR-001 — User registration & authentication**
- Description: Users can register, verify email, login, logout, reset password.
- Acceptance: Password policy enforced, email is sent on registration, JWT or cookie-based auth works.

**FR-002 — Roles & Access Control**
- Roles: Admin, Customer.
- Admins can CRUD hotels, rooms, view all reservations.
- Customers can search hotels, create reservations, cancel their reservations.

**FR-003 — Hotel & Room Management (Admin)**
- CRUD hotels (name, address, description, amenities, rating).
- CRUD room types (type name, occupancy, price, amenities, images).
- Manage room inventory and availability calendar.

**FR-004 — Search & Browse**
- Search hotels by location, name, date range, price range, facility filters.
- Display available room types for requested date range.

**FR-005 — Reservation Flow**
- Select hotel, room type, date range, occupant details.
- Verify availability (atomic check).
- Create a reservation with status PENDING -> CONFIRMED.
- Provide reservation summary and confirmation email.

**FR-006 — Payment**
- Integrate payment provider interface (abstracted) with sandbox mode.
- Payment status updates reservation to PAID upon success.

**FR-007 — Reservation Management**
- Customers can view reservation history, cancel within policy rules.
- Admins can view, update or cancel any reservation.

**FR-008 — Reporting**
- Admin reports (daily occupancy, revenue by hotel, booking counts).

**FR-009 — RESTful API**
- Expose endpoints for hotels, rooms, reservations with proper HTTP verbs and status codes.

**FR-010 — Unit Tests**
- Unit tests for services, controllers, and repository logic using xUnit.

## 5. Non-Functional Requirements (NFR)
- **NFR-001 — Security:** OWASP top-10 consideration, HTTPS required, hashed passwords (ASP.NET Identity).
- **NFR-002 — Performance:** Search requests should return within 500ms for typical dataset (<=10k hotels).
- **NFR-003 — Reliability:** Transactions for booking must be ACID-consistent.
- **NFR-004 — Scalability:** Application must be container-ready for horizontal scaling.
- **NFR-005 — Maintainability:** Follow layered architecture, DI, SOLID principles.
- **NFR-006 — Testability:** 80%+ of business logic covered by unit tests (goal for capstone).

## 6. Use Cases (high level)
- UseCase-1: Register & Login (Customer)
- UseCase-2: Search Hotels and Check Availability
- UseCase-3: Make Reservation & Pay
- UseCase-4: Admin Manage Hotels & Rooms
- UseCase-5: Customer View Reservation History

(Each use case should include: actor, preconditions, main success scenario, alternative flows, postconditions.)  

## 7. Data Requirements
Main entities:
- User, Role, Hotel, Address, RoomType, RoomInventory, Reservation, Payment, Amenity, Image.

(ERD and SQL DDL provided below.)

## 8. External Interfaces
### 8.1 REST API
- `/api/hotels` — GET, POST, PUT, DELETE
- `/api/hotels/{id}/rooms` — GET, POST
- `/api/reservations` — POST, GET
- `/api/payments` — POST
- Auth endpoints: `/api/auth/register`, `/api/auth/login`, `/api/auth/refresh`

### 8.2 Payment Provider
- Implement `IPaymentProvider` with `ChargeAsync`, `RefundAsync`, `ValidateWebhook`.

### 8.3 Email (SMTP)
- Send confirmation, cancellation emails.

## 9. System Architecture & Deployment
- ASP.NET Core Web/API deployed in Docker container.
- SQL Server in separate container for local/dev or managed service in production.
- Additional services: SMTP provider, Payment gateway.

## 10. Test Plan (unit/integration)
- Unit tests using xUnit; mock repositories/services with Moq.
- Integration tests against in-memory or test database (Docker SQL).
- CI pipeline to run tests on PRs.

## 11. Acceptance Criteria
- All functional requirements implemented and tested.
- Database migration scripts present.
- Dockerfile and docker-compose for local run.
- README and documentation in `/docs`.

## 12. Appendix
- Glossary, sequence diagrams, data dictionary (see separate docs).
```