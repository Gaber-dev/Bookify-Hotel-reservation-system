
# 5 — Unit Testing Plan & Example (xUnit)

Create tests under `tests/Bookify.Tests`. Example skeleton for `ReservationServiceTests.cs`:

```csharp
using Xunit;
using Moq;
public class ReservationServiceTests {
  [Fact]
  public async Task CreateReservation_WhenRoomAvailable_ChargesPaymentAndReturnsConfirmed() {
    // Arrange: mock Inventory, Payment, Repositories
    // Act: call CreateReservation
    // Assert: reservation status is Confirmed and payment captured
  }
}
```

Guidelines:

* Mock external providers (IPaymentProvider, IEmailService).
* Use in-memory DB (EF Core InMemory) for repository integration tests or a SQL Server test container.
* Cover edge cases: overlapping reservations, partial failures (payment fails after inventory reserved), date validation.

---