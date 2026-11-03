import { TimeSlotsManager } from "../classes/TimeSlotsManager.js";

export const manager = new TimeSlotsManager();

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// connect to calendar container
const calendarDays = document.getElementById("calendarDays");
// connect to month and year
const monthYear = document.getElementById("monthYear");
// connect to available slots contaienr
const timeSlots = document.getElementById("timeSlots");

const availableSlots = document.getElementById("availableSlots");

// connect to previous and next buttons
const previousMonthBtn = document.getElementById("previousMonthBtn");
const nextMonthBtn = document.getElementById("nextMonthBtn");

// get the current date
const today = new Date();

// start at the current month and year
let currentMonth = today.getMonth() + 1;
let currentYear = today.getFullYear();

// generate appointment slots for the current month
manager.generateTimeSlots(currentMonth, currentYear);

// ------------------- TO CHANGE -------------------------------
export const appointments = [
    {
        date: "2026-11-05",
        time: "09:00",
        status: "BOOKED"
    },
    {
        date: "2026-10-07",
        time: "09:00",
        status: "BOOKED"
    }
];
// --------------------------------------------------
// sync w appointments
manager.syncWithAppointments(appointments);

// refresh the available time slots for a selected data
export function refreshAvailableSlots(date) {

    // get the available time slots for this date
    const available = manager.getAvailableSlots(date);

    // clear the preivous time slots 
    timeSlots.innerHTML = "";

    // get the year, month, and day from the date
    const parts = date.split("-");
    const year = Number(parts[0]);
    const month = Number(parts[1]);
    const day = Number(parts[2]);

    // create heading for the selected date
    const currentDateHeading = document.createElement("h3");
    currentDateHeading.textContent = `for ${monthNames[month - 1]} ${day}, ${year}`;

    // display the heading
    timeSlots.appendChild(currentDateHeading);

    // display each available time slot
    available.forEach(function (slot) {

        // create a button for the time slot
        const timeSlotButton = document.createElement("button");
        timeSlotButton.textContent = slot.time;

        // add the button to the page
        timeSlots.appendChild(timeSlotButton);
    });

    // show the available time slots section
    availableSlots.hidden = false;
}

// generate calendar function
function generateCalendar(month, year) {

    // find nb of days in month
    const daysInMonth = new Date(year, month, 0).getDate();

    // find first day of month
    const firstDay = new Date(year, month - 1, 1).getDay();

    // set month and year
    monthYear.textContent = `${monthNames[month-1]}  ${year}`;

    // add empty spaces before the first day
    for (let i = 0; i < firstDay; i++) {
        const empty = document.createElement("div");
        calendarDays.appendChild(empty);
    }

    // generate each day
    for (let day=1; day<=daysInMonth; day++) {

        // create button
        const dayButton = document.createElement("button");
        // w text
        dayButton.textContent = day;

        // event listener to button
        dayButton.addEventListener("click", function() {

            // get the date selected by the patient
            const selectedDate = `${year}-${String(month).padStart(2,"0")}-${String(day).padStart(2,"0")}`;

            // display the available time slots for this date
            refreshAvailableSlots(selectedDate);

            console.log("selected date: ", selectedDate);
            console.log("available slots: ", manager.getAvailableSlots(selectedDate));
        });

        // add day to calendar
        calendarDays.appendChild(dayButton);
    }
}

// generate calendar
generateCalendar(currentMonth, currentYear);

// change months
previousMonthBtn.addEventListener("click", function() {

    // if we were january
    if (currentMonth == 1) {
        currentMonth = 12;
        currentYear--;
    }
    else {
        currentMonth--;
    }
   calendarDays.innerHTML = "";
    generateCalendar(currentMonth, currentYear);
    manager.generateTimeSlots(currentMonth, currentYear);
    // sync w appointments
    manager.syncWithAppointments(appointments);         
});

nextMonthBtn.addEventListener("click", function() {

    // if we were december
    if (currentMonth == 12) {
        currentMonth = 1;
        currentYear++;
    }
    else {
        currentMonth++;
    }
   calendarDays.innerHTML = "";
    generateCalendar(currentMonth, currentYear);
    manager.generateTimeSlots(currentMonth, currentYear);
    // sync w appointments
    manager.syncWithAppointments(appointments);
});
