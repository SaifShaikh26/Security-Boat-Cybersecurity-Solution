const screens = {
    screen1: { rows: 6, cols: 10, seats: [], bookedSeats: [] },
    screen2: { rows: 6, cols: 10, seats: [], bookedSeats: [] },
    screen3: { rows: 6, cols: 10, seats: [], bookedSeats: [] }
  };
  const lockDuration = 10000; // 10 seconds
  let currentScreen = 'screen1';
  
  document.addEventListener("DOMContentLoaded", () => {
    initializeSeats();
    renderSeats();
  });
  
  function initializeSeats() {
    Object.keys(screens).forEach(screen => {
      const { rows, cols } = screens[screen];
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          screens[screen].seats.push({ row: i, col: j, status: 'available', timeout: null });
        }
      }
    });
  }
  
  function changeScreen() {
    currentScreen = document.getElementById('screen-select').value;
    renderSeats();
  }
  
  function renderSeats() {
    const seatingArea = document.getElementById('seating-area');
    seatingArea.innerHTML = '';
    screens[currentScreen].seats.forEach(seat => {
      const seatElement = document.createElement('div');
      seatElement.className = 'seat';
      if (seat.status === 'locked') seatElement.classList.add('locked');
      if (seat.status === 'booked') seatElement.classList.add('booked');
      seatElement.dataset.row = seat.row;
      seatElement.dataset.col = seat.col;
      seatElement.addEventListener('click', selectSeat);
      seatingArea.appendChild(seatElement);
    });
  }
  
  function selectSeat(event) {
    const seatElement = event.target;
    const row = parseInt(seatElement.dataset.row);
    const col = parseInt(seatElement.dataset.col);
    const seat = screens[currentScreen].seats.find(s => s.row === row && s.col === col);
    
    if (seat.status === 'available') {
      seat.status = 'locked';
      seatElement.classList.add('locked');
      seat.timeout = setTimeout(() => releaseSeat(seat, seatElement), lockDuration);
    } else if (seat.status === 'locked') {
      seat.status = 'available';
      seatElement.classList.remove('locked');
      clearTimeout(seat.timeout);
    }
  }
  
  function releaseSeat(seat, seatElement) {
    if (seat.status === 'locked') {
      seat.status = 'available';
      seatElement.classList.remove('locked');
    }
  }
  
  function bookSeats() {
    const screen = screens[currentScreen];
    if (screen.bookedSeats.length >= screen.rows * screen.cols) {
      alert('This screen is fully booked.');
      return;
    }
    
    screen.seats.forEach(seat => {
      if (seat.status === 'locked') {
        seat.status = 'booked';
        screen.bookedSeats.push(seat);
        const seatElement = document.querySelector(`.seat[data-row="${seat.row}"][data-col="${seat.col}"]`);
        seatElement.classList.remove('locked');
        seatElement.classList.add('booked');
        clearTimeout(seat.timeout);
      }
    });
  }
  