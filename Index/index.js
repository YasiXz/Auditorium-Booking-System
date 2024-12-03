// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getDatabase, ref, set, push, onValue } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-analytics.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCAAyRxjj_rJ5ivrn8zvubSobIjWVFGPw4",
    authDomain: "auditoriumbookingsystem-24.firebaseapp.com",
    databaseURL: "https://auditoriumbookingsystem-24-default-rtdb.firebaseio.com",
    projectId: "auditoriumbookingsystem-24",
    storageBucket: "auditoriumbookingsystem-24.appspot.com",
    messagingSenderId: "879998771592",
    appId: "1:879998771592:web:ecb4112205181259451a3d",
    measurementId: "G-XDC3NQCXVN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const analytics = getAnalytics(app);

// Load booked events and initialize calendar
document.addEventListener('DOMContentLoaded', () => {
    const calendarEl = document.getElementById('calendar');
    const overlay = document.getElementById('overlay');
    const bookingForm = document.getElementById('bookingForm');
    const eventDateInput = document.getElementById('eventDate');
    const submitBookingBtn = document.getElementById('submitBookingBtn');

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        dateClick: (info) => {
            eventDateInput.value = info.dateStr;
            bookingForm.style.display = 'block';
            overlay.style.display = 'block';
        },
        events: []
    });

    // Load bookings from Firebase
    const loadBookedEvents = () => {
        const bookingsRef = ref(database, 'bookings');
        onValue(bookingsRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const booking = childSnapshot.val();
                calendar.addEvent({
                    title: booking.title,
                    start: booking.date,
                    description: booking.description,
                    color: 'red'
                });
            });
        });
    };

    // Submit booking
    const submitBooking = () => {
        const date = eventDateInput.value;
        const title = document.getElementById('eventTitle').value;
        const description = document.getElementById('eventDescription').value;

        if (!title || !description) {
            alert('Please fill out all fields.');
            return;
        }

        const bookingsRef = ref(database, 'bookings');
        const newBookingRef = push(bookingsRef);
        set(newBookingRef, { date, title, description })
            .then(() => {
                calendar.addEvent({ title, start: date, description, color: 'red' });
                alert(`Booking submitted for:\nDate: ${date}\nTitle: ${title}\nDescription: ${description}`);
                closeBookingForm();
            })
            .catch((error) => {
                alert('Error submitting booking: ' + error.message);
            });
    };

    // Close booking form
    const closeBookingForm = () => {
        bookingForm.style.display = 'none';
        overlay.style.display = 'none';
    };

    submitBookingBtn.addEventListener('click', submitBooking);

    calendar.render();
    loadBookedEvents();
});
