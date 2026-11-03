export class AppointmentService {

    // constructor
    constructor(dataStore, timeSlotsManager) {
        // store the DataStore object
        this.dataStore = dataStore;

        // store the TimeSlotsManager object
        this.timeSlotsManager = timeSlotsManager;
    }

    // book appointment 
    book(date, time, name, email) {
        // TO DO
    }

    // cancel appointment 
    cancel(appointmentId) {
        // find the appointment using its ID
        const appointment = this.dataStore.getAppointment(appointmentId);

        // check if the appointment exists
        if(!appointment) {
            throw new Error("Appointment not found");
        }

        // check if the appointment is already cancelled
        if(appointment.status == "CANCELLED") {
            throw new Error("Appointment is already cancelled");
        }

        // find the time slot of the appointment
        const slot = this.timeSlotsManager.getSlot(appointment.date, appointment.time);

        // check if the time slot exists
        if(!slot) {
            throw new Error("Time slot not found");
        }

        // make the time slot available again
        slot.release();

        // cancel the appointment
        appointment.cancel();

        // save the updated appointment
        this.dataStore.saveAppointment(appointment);

        // return the cancelled appointment
        return appointment;
    }

    // reschedule appointment 
    reschedule(appointmentId, date, time) {
        // TO DO
    }

    // get upcoming appointments for a patient
    getUpcomingForPatient(email, now) {
        // TO DO
    }

    // filter appointments by date and patient name 
    filterAppointments(date, patientName) {
        // TO DO
    }
}