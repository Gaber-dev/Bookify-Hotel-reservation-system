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
