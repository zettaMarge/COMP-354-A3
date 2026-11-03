import { Appointment } from "../classes/Appointment";
import { AppointmentService } from "../classes/AppointmentService";
import { TimeSlot } from "../classes/TimeSlot";
import { TimeSlotsManager } from "../classes/TimeSlotsManager.js";

// test cancelling an existing appointment
test("cancels an existing appointment", () => {
    // create a sample appointment
    const appointment = new Appointment(
        "A1",
        "John",
        "C1",
        "2026-11-10",
        "10:00",
        "BOOKED",
        "2026-11-03"
    );

    // create a time slot manager
    const timeSlotsManager = new TimeSlotsManager();

    // create a time slot matching the appointment
    const slot = new TimeSlot("2026-11-10", "10:00");

    // mark the time slot as booked
    slot.book();

    // add the time slot to the manager
    timeSlotsManager.timeSlots.push(slot);

    // create a temporary DataStore for testing
    const dataStore = {
        // find the appointment using its ID
        getAppointment(id) {
            if(id == appointment.id) {
                return appointment;
            }
            return undefined;
        },

        // save the updated appointment
        saveAppointment(appointment) {

        }
    };

    // create the appointment service using the test data
    const appointmentService = new AppointmentService(dataStore, timeSlotsManager);

    // cancel the appointment
    const cancelledAppointment = appointmentService.cancel("A1");

    // check if the appointment status changed to CANCELLED
    expect(cancelledAppointment.status).toBe("CANCELLED");
    // check if the time slot is available again
    expect(slot.isAvailable()).toBe(true);
});

// test cancelling an appointment that does not exist
test("cannot cancel a nonexistent appointment", () => {
    // create a temporary DataStore with no appointments
    const dataStore = {
        getAppointment(id) {
            return undefined;
        }
    };

    // create a time slot manager
    const timeSlotsManager = new TimeSlotsManager();

    // create the appointment service
    const appointmentService = new AppointmentService(dataStore, timeSlotsManager);

    // check if cancelling a nonexistent appointment throws an error
    expect(() => appointmentService.cancel("A99")).toThrow("Appointment not found");
});

// test cancelling an already cancelled appointment
test("cannot cancel an alraedy cancelled appointment", () => {
    // create an apointment that is already cancelled
    const appointment = new Appointment(
        "A1",
        "John",
        "C1",
        "2026-11-10",
        "10:00",
        "CANCELLED",
        "2026-11-03"
    );

    // create a temporary DataStore
    const dataStore = {
        // return the existing appointment
        getAppointment(id) {
            return appointment;
        }
    };

    // create a time slot manager
    const timeSlotsManager = new TimeSlotsManager();

    // create the appointment service
    const appointmentService = new AppointmentService(dataStore, timeSlotsManager);

    // check if cancelling again throws an error
    expect(() => appointmentService.cancel("A1")).toThrow("Appointment is already cancelled");
});



