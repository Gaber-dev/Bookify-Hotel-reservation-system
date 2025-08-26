# 🏨 Hotel Reservation System

A **C# .NET Core** based **Hotel Reservation System** that enables users to browse hotels, book rooms, manage reservations, and handle payments efficiently.  
This system is designed with **modularity**, **scalability**, and **maintainability** in mind, making it suitable for production deployment.

---

## 📌 Features

- User authentication & role-based access control (Admin / Customer).
- Hotel & room management (CRUD).
- Online reservation and booking system.
- Payment integration support.
- Reservation history and reporting.
- RESTful API layer for external integration.
- Modern responsive UI (ASP.NET Core MVC / Razor Pages).
- SQL Server database with Entity Framework Core.

---

## 📂 Project Structure

```

HotelReservationSystem/
│── src/                  # Application source code
│   ├── Controllers/       # API & MVC controllers
│   ├── Models/            # Data models (EF Core entities)
│   ├── Services/          # Business logic layer
│   ├── Views/             # Razor pages / MVC views
│   └── HotelReservationSystem.csproj
│
│── tests/                # Unit & integration tests
│── docs/                 # Documentation (SRS, Diagrams, etc.)
│── scripts/              # Deployment & migration scripts
│── README.md             # Project documentation

````

---

## ⚙️ Tech Stack

- **Backend:** .NET Core 8 / ASP.NET Core MVC  
- **Frontend:** Razor Pages / Bootstrap  
- **Database:** SQL Server (EF Core ORM)  
- **Authentication:** ASP.NET Identity  
- **Testing:** xUnit / NUnit  
- **Version Control:** Git & GitHub  

---

## 🚀 Getting Started

### Prerequisites
- [.NET Core SDK](https://dotnet.microsoft.com/download) (>= 8.0)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
- [Visual Studio](https://visualstudio.microsoft.com/) or [VS Code](https://code.visualstudio.com/)

### Setup Instructions
```bash
# Clone repository
git clone https://github.com/<your-repo>/HotelReservationSystem.git
cd HotelReservationSystem

# Restore dependencies
dotnet restore

# Apply migrations & update database
dotnet ef database update

# Run the project
dotnet run
````

The application should now be running on:
👉 `https://localhost:5001` or `http://localhost:5000`

---

## 🧪 Running Tests

```bash
# Navigate to test directory
cd tests

# Run all tests
dotnet test
```

---

## 📖 Documentation

All project documentation is available in the [`/docs`](./docs) directory, including:

* 📘 [Software Requirements Specification (SRS)](./docs/SRS.md)
* 🗂️ [Team Work Plan & Gantt Chart](./docs/Team-Plan.md)
* 🖼️ [System Architecture & UML Diagrams](./docs/Diagrams.md)

---

## 👥 Maintainers

This project is maintained by the following team members:

* [Gaber-dev](https://github.com/Gaber-dev)
* [ahmedhasanain97](https://github.com/ahmedhasanain97)
* [mohamedraslan25](https://github.com/mohamedraslan25)
* [THEKINGSTAR](https://github.com/THEKINGSTAR)

---

## 🤝 Contributing

We welcome contributions!

1. Fork the repo
2. Create a new branch (`feature/your-feature`)
3. Commit changes (`git commit -m "Added feature X"`)
4. Push to branch (`git push origin feature/your-feature`)
5. Open a Pull Request

Please ensure code follows project conventions and includes relevant tests.

---

## 📜 License

This project is licensed under the **MIT License**.
See the [LICENSE](./LICENSE) file for details.

---

## 🌟 Acknowledgments

* Microsoft .NET team for ASP.NET Core framework.
* Open-source contributors for libraries and tools.
* Team members for collaborative development.
