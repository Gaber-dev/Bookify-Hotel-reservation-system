# 2. Overall Description
## 2.1 Product Perspective
The Hotel Reservation System will function as a centralized booking platform, accessible via web and mobile browsers. It will interact with a SQL Server database for data persistence.

## 2.2 Product Functions
- User registration and authentication  
- Room browsing and filtering  
- Online booking and cancellation  
- Payment processing  
- Admin panel for hotel staff  

## 2.3 User Classes and Characteristics
- **Guest Users**: Browse rooms without registration.  
- **Registered Customers**: Make reservations and manage bookings.  
- **Hotel Admins**: Manage rooms, pricing, and reservations.  

## 2.4 Operating Environment
- **Frontend**: ASP.NET Core Razor Pages / Blazor  
- **Backend**: C# .NET Core Web API  
- **Database**: Microsoft SQL Server  
- **OS**: Windows/Linux hosting  

## 2.5 Design and Implementation Constraints
- Must comply with GDPR and data protection laws.  
- Payment integration via secure gateway (e.g., Stripe, PayPal).  

## 2.6 User Documentation
- Online help section.  
- User manual (PDF).  

## 2.7 Assumptions and Dependencies
- Internet connectivity required.  
- Payment gateway service availability.  
