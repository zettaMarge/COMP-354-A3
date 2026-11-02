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
    
    // -------------------------TO DO---------------------------------------
    // methods
    cancel() {
    }

    reschedule(date, time) {
    }

    isUpcoming(now) {
    }
}
