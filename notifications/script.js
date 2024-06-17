document.addEventListener('DOMContentLoaded', () => {
    // Screen Management
    const addScreenForm = document.getElementById('add-screen-form');
    const screenLayoutDesigner = document.getElementById('screen-layout-designer');

    addScreenForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const screenName = document.getElementById('screen-name').value;
        const seatCount = document.getElementById('seat-count').value;
        createScreen(screenName, seatCount);
        addScreenForm.reset();
    });

    function createScreen(name, seats) {
        const screenElement = document.createElement('div');
        screenElement.className = 'screen';
        screenElement.innerHTML = `<h3>${name}</h3>`;
        
        const seatsContainer = document.createElement('div');
        seatsContainer.className = 'seats-container';
        for (let i = 0; i < seats; i++) {
            const seat = document.createElement('div');
            seat.className = 'seat';
            seatsContainer.appendChild(seat);
        }
        
        screenElement.appendChild(seatsContainer);
        screenLayoutDesigner.appendChild(screenElement);
    }

    // Booking Management
    const bookingCalendar = document.getElementById('booking-calendar');

    function initializeCalendar() {
        bookingCalendar.innerHTML = '<p>Calendar Placeholder</p>';
    }

    initializeCalendar();

    // Food Menu Management
    const addMenuItemForm = document.getElementById('add-menu-item-form');
    const menuItemsList = document.getElementById('menu-items-list');

    addMenuItemForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const itemName = document.getElementById('item-name').value;
        const itemCategory = document.getElementById('item-category').value;
        const itemPrice = document.getElementById('item-price').value;
        const itemImage = document.getElementById('item-image').files[0];

        addItemToMenu(itemName, itemCategory, itemPrice, itemImage);
        addMenuItemForm.reset();
    });

    function addItemToMenu(name, category, price, image) {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        menuItem.innerHTML = `
            <h4>${name}</h4>
            <p>Category: ${category}</p>
            <p>Price: $${price}</p>
        `;

        if (image) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.alt = name;
                menuItem.appendChild(img);
            }
            reader.readAsDataURL(image);
        }

        menuItemsList.appendChild(menuItem);
    }

    // Notification System
    const notificationContainer = document.getElementById('notification-container');

    function sendNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `<p>${message}</p>`;
        notificationContainer.appendChild(notification);

        // Automatically remove notification after 5 seconds
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
}
