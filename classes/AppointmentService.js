import { Appointment } from "./Appointment.js";
import { Patient } from "./Patient.js";

/**
 * Coordinates booking, cancelling, rescheduling and viewing appointments.
 */
export class AppointmentService {
    /**
     * Books a new appointment for a given patient
     * @param {Date} dateTime 
     * @param {string} clinicId 
     * @param {string} patientName 
     * @param {string} patientEmail 
     * @returns the new appointment
     */
    book(dateTime, clinicId, patientName, patientEmail) {
        var appointment = new Appointment(DataStore.GetNextId(), new Patient(patientName, patientEmail), clinicId, dateTime);
        DataStore.saveAppointment(appointment);
        return appointment;
    }
}