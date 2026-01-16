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
const stepperItems = document.querySelectorAll(".stepper__item");



function dispatch (event) {
    const nextState = transition(state, event);
    state = nextState;
    render();
}

function render () {
    stepperItems.forEach((item) => {
        const step = item.dataset.step; // "service" | "slot" | "confirm"

        if (step === state.step) {
            item.setAttribute("aria-current", "step");
        } else {
            item.removeAttribute("aria-current");
        }
    });

    //Szolgáltatás
    if (state.step === "service") {
        btnBack.disabled = true;
        if (!state.selectedServiceId) {
            btnNext.disabled = true;
        } else {
            btnNext.disabled = false;
        }
          main.innerHTML = `
    <section class="panel">
      <h2 class="panel__title">Válassz szolgáltatást</h2>
      <p class="panel__desc">
        Válaszd ki, milyen rendelésre szeretnél időpontot foglalni.
      </p>

      <div class="service-grid">
        ${SERVICES.map(
          (service) => `
            <button
              type="button"
              class="service-card ${
                state.selectedServiceId === service.id ? "is-selected" : ""
              }"
              data-service-id="${service.id}"
            >
              <h3 class="service-card__title">${service.title}</h3>
              <p class="service-card__desc">${service.desc}</p>
            </button>
          `
        ).join("")}
      </div>
    </section>
  `;
    }

    //Időpontfoglalás
    if (state.step === "slot") {
        btnBack.disabled = false;
        if (!state.selectedSlotId) {
            btnNext.disabled = true;
        } else {
            btnNext.disabled = false;
        }
          main.innerHTML = `
    <section class="panel">
      <h2 class="panel__title">Válassz időpontot</h2>
      <p class="panel__desc">
        Válassz egy elérhető időpontot a foglaláshoz.
      </p>

      <div class="slot-grid">
        ${SLOTS.map(
          (slot) => `
            <button
              type="button"
              class="slot-card ${
                state.selectedSlotId === slot.id ? "is-selected" : ""
              }"
              data-slot-id="${slot.id}"
            >
              ${slot.label}
            </button>
          `
        ).join("")}
      </div>
    </section>
  `;
    }

    //Megerősítés
    if (state.step === "confirm") {
        btnNext.disabled = true;
        btnBack.disabled = false;
        const service = SERVICES.find(s => s.id === state.selectedServiceId);
        const slot = SLOTS.find(s => s.id === state.selectedSlotId);
          main.innerHTML = `
    <section class="panel">
      <h2 class="panel__title">Foglalás megerősítése</h2>
      <p class="panel__desc">
        Ellenőrizd az adatokat, majd erősítsd meg a foglalást.
      </p>

      <div class="confirm-summary">
        <div class="confirm-row">
          <span class="confirm-label">Szolgáltatás</span>
          <span class="confirm-value">${service ? service.title : "-"}</span>
        </div>

        <div class="confirm-row">
          <span class="confirm-label">Időpont</span>
          <span class="confirm-value">${slot ? slot.label : "-"}</span>
        </div>
      </div>

      <div class="confirm-actions">
        ${
          state.bookingStatus === "idle"
            ? `<button type="button" class="btn btn--primary" data-action="CONFIRM">
                 Foglalás megerősítése
               </button>`
            : ""
        }

        ${
          state.bookingStatus === "submitting"
            ? `<p class="confirm-status">Foglalás folyamatban…</p>`
            : ""
        }

        ${
          state.bookingStatus === "success"
            ? `<p class="confirm-status success">Foglalás sikeres ✅</p>`
            : ""
        }
      </div>
    </section>
  `;
    }


    debugPre.textContent = JSON.stringify(state, null, 2); 
}

function transition(state, event) {
  switch (event.type) {
    case "RESET": {
      return structuredClone(initialState);
    }

    case "SELECT_SERVICE": {
      const { serviceId } = event.payload;

      return {
        ...state,
        selectedServiceId: serviceId,
        selectedSlotId: null,
        bookingStatus: "idle",
        step: "service",
      };
    }

    case "SELECT_SLOT": {
      if (state.step !== "slot") return state;

      const { slotId } = event.payload;

      return {
        ...state,
        selectedSlotId: slotId,
      };
    }

    case "CONFIRM_REQUEST": {
        if (state.step !== "confirm") return state;
        if (state.bookingStatus !== "idle") return state;

        return {
            ...state,
            bookingStatus: "submitting",
        };
    }

    case "CONFIRM_SUCCESS": {
        if (state.step !== "confirm") return state;
        if (state.bookingStatus !== "submitting") return state;

        return {
            ...state,
            bookingStatus: "success",
        };
    }

    case "NEXT": {
      if (state.step === "service") {
        if (!state.selectedServiceId) return state;

        return {
          ...state,
          step: "slot",
        };
      }

      if (state.step === "slot") {
        if (!state.selectedSlotId) return state;

        return {
          ...state,
          step: "confirm",
        };
      }

      return state;
    }

    case "BACK": {
      if (state.step === "slot") {
        return {
          ...state,
          step: "service",
        };
      }

      if (state.step === "confirm") {
        return {
          ...state,
          step: "slot",
        };
      }

      return state;
    }

    default:
      return state;
  }
}

btnBack.addEventListener("click", () => {
    dispatch({type: "BACK" })
});
btnReset.addEventListener("click", () => {
    dispatch({type: "RESET" })
});
btnNext.addEventListener("click", () => {
    dispatch({type: "NEXT" })
});

main.addEventListener("click", (e) => {
    const serviceBtn = e.target.closest("[data-service-id]");
    if (serviceBtn) {
        const serviceId = serviceBtn.dataset.serviceId;
        dispatch({
            type: "SELECT_SERVICE",
            payload: { serviceId },
        });
        return;
    }

    const slotBtn = e.target.closest("[data-slot-id]");
    if(slotBtn) {
        const slotId = slotBtn.dataset.slotId;
        dispatch({
            type: "SELECT_SLOT",
            payload: { slotId },
        })
        return;
    }

    const confirmBtn = e.target.closest('[data-action="CONFIRM"]');
    if (confirmBtn) {
        dispatch({ type: "CONFIRM_REQUEST" });

        // Fake submit: 800ms múlva "siker"
        setTimeout(() => {
            dispatch({ type: "CONFIRM_SUCCESS" });
        }, 800);

        return;
    }
});
render();