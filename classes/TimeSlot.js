export class TimeSlot {

    // constructor
    constructor(date, time) {
        this.date = date;
        this.time = time;
        this.available = true;
    }

    // reserve time slot method
    book() {
        if (this.available) {
            this.available = false;
            return true;
        }
        return false;
    }

    // check if slot is avail
    isAvailable() {
        if (this.available) {
            return true;
        } 
        return false;
    }
}