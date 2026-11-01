import { TimeSlot } from "../classes/TimeSlot.js";

export class TimeSlotsManager {


    // constructor
    constructor() {
        this.timeSlots = [];
    }


    // generate time slots method 
    generateTimeSlots(month, year) {

        // nb of days in that month
        const daysInMonth = new Date(year, month, 0).getDate();

        // for every day of the month
        for (let day=1; day<=daysInMonth; day++) {

            // from 9 to 5pm
            for (let hour=9; hour<17; hour++) {

                let date = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                let time = `${String(hour).padStart(2, '0')}:00`;

                // create time slot
                let slot = new TimeSlot(date, time);

                // if it doesnt alrdy exist, add it to array
                if (!this.getSlot(date, time)) {
                    this.timeSlots.push(slot);
                }
            }
        }
    }

    // return available time slots for specific date method
    getAvailableSlots(date) {
        return this.timeSlots.filter(slot => slot.date === date && slot.isAvailable());
    }

    // get slot
    getSlot(date, time) {
        return this.timeSlots.find(slot => slot.date === date && slot.time === time);
    }

    // get multiple slots for that date
    getTimeSlots(date) {
    return this.timeSlots.filter(slot => slot.date === date);
}



}