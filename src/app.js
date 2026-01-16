const SERVICES = [
    {
        id: "cardio",
        title: "Kardiológia",
        desc: "Szív és érrendszeri kivizsgálás (EKG, szívultrahang).",
    },
    {
        id: "lab",
        title: "Labor",
        desc: "Vérvétel és laborvizsgálatok gyors, átlátható folyamattal.",
    },
    {
        id: "gynecology",
        title: "Nőgyógyászat",
        desc: "Konzultáció és alapvizsgálatok, időpontfoglalással.",
    }
]

const SLOTS = [
    {id: "2026-01-20-10:00", label: "Jan 20 - 10:00" },
    {id: "2026-01-20-11:00", label: "Jan 20 - 11:00" },
    {id: "2026-01-20-12:00", label: "Jan 20 - 12:00" },
    {id: "2026-01-21-10:00", label: "Jan 21 - 10:00" },
    {id: "2026-01-21-11:00", label: "Jan 21 - 11:00" },
    {id: "2026-01-21-12:00", label: "Jan 21 - 12:00" },
]

const initialState = {
    step: "service", // | "slot" | "confirm",
    selectedServiceId: null,
    selectedSlotId: null,
    bookingStatus: "idle", // | "submitting" | "success",
}
let state = structuredClone(initialState);

const main = document.getElementById("main");
const btnBack = document.getElementById("btnBack");
const btnReset = document.getElementById("btnReset");
const btnNext = document.getElementById("btnNext");
const debugPre = document.getElementById("debugPre");
const debugToggle = document.getElementById("debugToggle");
const stepperItems = document.querySelectorAll(".stepper__item")