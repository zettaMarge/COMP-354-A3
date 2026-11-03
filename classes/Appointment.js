export class Appointment {

    // constructor
    constructor(id, patient, clinicId, date, time, status, createdAt) {
        this.id = id;
        this.patient = patient;
        this.clinicId = clinicId;
        this.date = date;
        this.time = time;
        this.status = status;
        this.createdAt = createdAt;
    }
    
    // cancel appointment
    cancel() {
        // check if appointment is not already cancelled
        if(this.status != "CANCELLED") {
            // change appointment status to cancelled
            this.status = "CANCELLED";
        }
    }

    // -------------------------TO DO---------------------------------------
    reschedule(date, time) {
    }

    isUpcoming(now) {
    }
}
