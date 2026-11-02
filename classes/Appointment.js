/**
 * States an appointment can be in
 */
const Status = {
    BOOKED: "Booked",
    CANCELLED: "Cancelled"
}

/**
 * Model class for an appointment
 */
export class Appointment {
    /**
     * constructor
     * @param {string} id 
     * @param {Patient} patient 
     * @param {string} clinicId 
     * @param {Date} dateTime 
     */
    constructor(id, patient, clinicId, dateTime) {
        this.id = id;
        this.patient = patient;
        this.clinicId = clinicId;
        this.dateTime = dateTime;
        this.status = Status.BOOKED;
        this.createdAt = new Date();
    }
    
    /**
     * Changes the status of the appointment to CANCELLED
     */
    cancel() {
        this.status = Status.CANCELLED; 
    }

    /**
     * Updates the date & time of the appointment
     * @param {Date} newDateTime 
     */
    reschedule(newDateTime) {
        this.dateTime = newDateTime;
    }

    /**
     * @returns if the appointment is coming up, so long as it isn't cancelled
     */
    isUpcoming() {
        return this.status === Status.BOOKED && new Date() <= this.dateTime;
    }
}
