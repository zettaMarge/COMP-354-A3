import { Appointment } from "../classes/Appointment.js";

export class AppointmentService {
    book(dateTime, clinicId, patientName, patientEmail) {
        var appointment = new Appointment(DataStore.GetNextId(), new Patient(patientName, patientEmail), clinicId, dateTime);
        DataStore.saveAppointment(appointment);
        return appointment;
    }

    cancel(appointmentId) {
        var appointment = DataStore.getAppointment(appointmentId);

        if (appointment) {
            appointment.cancel();
            DataStore.saveAppointment(appointment);
            return appointment;
        }
        else {
            return null;
        }
    }

    reschedule(appointmentId, dateTime) {

    }

    getUpcomingForPatient(email) {

    }

    filterAppointments(email, dateFrom, dateTo) {

    }
}