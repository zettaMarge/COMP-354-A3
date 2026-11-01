import { TimeSlotsManager } from "../classes/TimeSlotsManager.js";

const manager = new TimeSlotsManager();

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// connect to calendar container
const calendarDays = document.getElementById("calendarDays");
// connect to month and year
const monthYear = document.getElementById("monthYear");
// connect to available slots contaienr
const timeSlots = document.getElementById("timeSlots");
// connect to previous and next buttons
const previousMonthBtn = document.getElementById("previousMonthBtn");
const nextMonthBtn = document.getElementById("nextMonthBtn");

// start in nov 2026
let currentMonth = 11;
let currentYear = 2026;

// generate appointment slots for november
manager.generateTimeSlots(currentMonth, currentYear);

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

            // date in year/month/day format
            const selectedDate = `${year}-${String(month).padStart(2,"0")}-${String(day).padStart(2,"0")}`;

            // get available time slots
            const available = manager.getAvailableSlots(selectedDate);

            // clear previous results
            timeSlots.innerHTML = "";

            // create heading for current date
            const currentDateHeading = document.createElement("h3");
            currentDateHeading.textContent = `for ${monthNames[month-1]} ${day}, ${year}`;

            // add to the page
            timeSlots.appendChild(currentDateHeading);


            // display each slot
            available.forEach(slot => {
                
                // create button
                const timeSlotButton = document.createElement("button");
                // w text
                timeSlotButton.textContent = slot.time;

                // add to the page
                timeSlots.appendChild(timeSlotButton);
            })

    
            console.log("selected date: ", selectedDate);
            console.log("avail slots: ", available);



        })

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
});
