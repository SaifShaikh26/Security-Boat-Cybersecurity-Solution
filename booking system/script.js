document.addEventListener('DOMContentLoaded', () => {
    const movieSelect = document.getElementById('movieSelect');
    const seats = document.querySelectorAll('.seat');
    const payButton = document.getElementById('payButton');
    const confirmationMessage = document.getElementById('confirmationMessage');
    const confirmationSection = document.querySelector('.confirmation');
    
    let selectedSeats = [];
    let ticketPrice = +movieSelect.value;

    movieSelect.addEventListener('change', (e) => {
        ticketPrice = +e.target.value;
    });

    seats.forEach(seat => {
        seat.addEventListener('click', () => {
            seat.classList.toggle('selected');
            updateSelectedSeats();
        });
    });

    function updateSelectedSeats() {
        selectedSeats = [];
        seats.forEach((seat, index) => {
            if (seat.classList.contains('selected')) {
                selectedSeats.push(index);
            }
        });
    }

    payButton.addEventListener('click', () => {
        if (selectedSeats.length === 0) {
            alert('Please select at least one seat.');
        } else {
            // For demo purposes, we skip actual payment gateway integration
            const totalPrice = selectedSeats.length * ticketPrice;
            confirmationMessage.innerText = `You have successfully booked ${selectedSeats.length} seat(s) for a total of $${totalPrice}.`;
            confirmationSection.style.display = 'block';
        }
    });
});
