import { TimeSlot } from "../classes/TimeSlot.js";
import { TimeSlotsManager } from "../classes/TimeSlotsManager.js";

let manager;

// test w november 2026
beforeEach(() => {
    manager = new TimeSlotsManager();
    manager.generateTimeSlots(11, 2026);
});


test("test TimeSlot constructor", () => {
    const slot = new TimeSlot("2026-11-02", "09:00");

    expect(slot.date).toBe("2026-11-02");
    expect(slot.time).toBe("09:00");
    expect(slot.isAvailable()).toBe(true);
});


test("test that new time slots are available by default", () => {
    const slots = manager.getTimeSlots("2026-11-04");

    expect(slots.every(slot => slot.isAvailable())).toBe(true);
});


test("check that a day has 8 slots", () => {
    const slots = manager.getTimeSlots("2026-11-06");

    expect(slots).toHaveLength(8);
});


test("check that generated time slots have correct times", () => {
    const slots = manager.getTimeSlots("2026-11-05");

    expect(slots[0].time).toBe("09:00");
    expect(slots[1].time).toBe("10:00");
    expect(slots[7].time).toBe("16:00");
});


test("check that get time slots for specific date is for that specific date", () => {
    const slots = manager.getTimeSlots("2026-11-07");

    expect(slots.length).toBe(8);
    expect(slots.every(slot => slot.date === "2026-11-07")).toBe(true);
});


test("check get time slots returns empty array for a date with no generated slots", () => {
    const slots = manager.getTimeSlots("2026-12-01"); // coz we only generated november

    expect(slots).toEqual([]);
});


test("check getSlot works", () => {
    const slot = manager.getSlot("2026-11-02", "09:00");

    expect(slot).toBeDefined();
    expect(slot.date).toBe("2026-11-02");
    expect(slot.time).toBe("09:00");
});


test("check that getSlot returns undefined when slot does not exist", () => {
    const slot = manager.getSlot("2026-11-02", "18:00"); // max is 16:00

    expect(slot).toBeUndefined();
});


test("check that getAvailableSlots returns only available appointments", () => {
    const slots = manager.getAvailableSlots("2026-11-02");

    expect(slots).toHaveLength(8);
    expect(slots.every(slot => slot.isAvailable())).toBe(true);
});