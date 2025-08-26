using System;
using System.Threading.Tasks;
using Xunit;

namespace Bookify.Tests
{
    public class ReservationServiceTests
    {
        [Fact]
        public async Task CreateReservation_WhenRoomAvailable_ReturnsConfirmed()
        {
            // Arrange: mock inventory, payment, repositories (use Moq)
            // Act: call CreateReservation
            // Assert: reservation status is Confirmed and payment captured
            await Task.CompletedTask;
        }
    }
}
