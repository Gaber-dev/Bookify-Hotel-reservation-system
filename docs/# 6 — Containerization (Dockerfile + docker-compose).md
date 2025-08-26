

# 6 — Containerization (Dockerfile + docker-compose)

`Dockerfile` (for API):

```dockerfile
# Use .NET 8 SDK build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY . .
RUN dotnet restore "src/HotelReservationSystem/HotelReservationSystem.csproj"
RUN dotnet publish "src/HotelReservationSystem/HotelReservationSystem.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
ENV ASPNETCORE_URLS=http://+:80
EXPOSE 80
ENTRYPOINT ["dotnet", "HotelReservationSystem.dll"]
```

`docker-compose.yml`:

```yaml
version: '3.8'
services:
  api:
    build: .
    ports:
      - "5000:80"
    depends_on:
      - db
    environment:
      - ConnectionStrings__DefaultConnection=Server=db;Database=BookifyDb;User=sa;Password=Your_password123;
  db:
    image: mcr.microsoft.com/mssql/server:2022-latest
    environment:
      SA_PASSWORD: "Your_password123"
      ACCEPT_EULA: "Y"
    ports:
      - "1433:1433"
    volumes:
      - mssql-data:/var/opt/mssql

volumes:
  mssql-data:
```

Notes (production): do not store SA password in compose; use secrets or environment variables in CI/CD.

---