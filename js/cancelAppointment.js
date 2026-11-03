import { Appointment } from "../classes/Appointment.js";
import { AppointmentService } from "../classes/AppointmentService.js";
import { manager, refreshAvailableSlots, appointments } from "./viewTimeSlots.js";

// create a temporary patient
const patient = {
    name: "Test Patient",
    email: "test@example.com"
};

// create a temporary appointment for testing
const appointment = new Appointment(
    "A1",
    patient,
    "C1",
    "2026-11-05",
    "09:00",
    "BOOKED",
    new Date()
);

// display the appointment date
document.getElementById("appointmentDate").textContent = appointment.date;

// display the appointment time
document.getElementById("appointmentTime").textContent = appointment.time;

// display the appointment status
document.getElementById("appointmentStatus").textContent = appointment.status;

// find the booked time slot from the calendar
const slot = manager.getSlot(appointment.date, appointment.time);

// create a temporary DataStore for testing cancellation
const dataStore = {
    // find the appointment using its ID
    getAppointment(id) {
        if(appointment.id == id) {
            return appointment;
        }
        return null;
    },

    // save the updated appointment
    saveAppointment(updatedAppointment) {
        appointment.status = updatedAppointment.status;
    }
};

// create the appointment service
const appointmentService = new AppointmentService(dataStore, manager);

// find the Cancel Appointment button
const cancelButton = document.getElementById("cancelButton");

cancelButton.addEventListener("click", function() {
    // ask the patient to confirm the cancellation
    const confirmed = confirm("Are you sure you want to cancel this appointment?");

    // check if the patient clicked OK
    if(confirmed) {
        try {
            // cancel the appointment using its ID
            const cancelledAppointment = appointmentService.cancel(appointment.id);

            // update the appointment in the calendar's list
            appointments.forEach(function(item) {
                if(item.date == cancelledAppointment.date && item.time == cancelledAppointment.time) {
                    item.status = cancelledAppointment.status;
                }
            });

            // update the appointment status on the page
            document.getElementById("appointmentStatus").textContent = cancelledAppointment.status;

            // show the cancellation message
            document.getElementById("cancelMessage").textContent = "Appointment cancelled successfully!";

            // hide the button after cancelling
            cancelButton.hidden = true;

            // check if the time slot is available again
            console.log("Slot available:", slot.isAvailable());

            // refresh the available time slots after cancellation
            refreshAvailableSlots(appointment.date);
        } catch(error) {
            // display an error if cancellation fails
            document.getElementById("cancelMessage").textContent = error.message;
        }
    }
});