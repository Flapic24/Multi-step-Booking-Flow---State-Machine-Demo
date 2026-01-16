# Booking Flow – 3-step State Machine Demo

Mini gyakorló projekt egy **3 lépéses booking folyamat** megvalósítására,
**state machine alapú gondolkodással**, backend nélkül.

## 🎯 Cél
- Többlépéses folyamat kezelése (nem oldalak, hanem flow)
- Állapotvezérelt UI (single source of truth)
- Guard logika (nem lehet tovább lépni hiányzó adatokkal)
- Felkészülés egy későbbi, valódi időpontfoglaló rendszerre

## 🧠 Fő koncepciók
- Egyetlen globális `state` objektum
- `dispatch(event)` → `transition(state, event)` → `render()`
- Explicit eventek: `SELECT_SERVICE`, `SELECT_SLOT`, `NEXT`, `BACK`, `RESET`
- Fake submit a megerősítésnél (`CONFIRM_REQUEST` → `CONFIRM_SUCCESS`)

## 🪜 Lépések
1. **Szolgáltatás kiválasztása**
2. **Időpont kiválasztása**
3. **Foglalás megerősítése + szimulált siker**

## 🛠 Tech stack
- Vanilla JavaScript
- HTML
- CSS
- Nincs framework / backend / build step

## 🐞 Debug panel
A jobb alsó sarokban megjelenő debug panel a belső state változásait mutatja.
Ez fejlesztési célokat szolgál, nem production funkció.

## ▶️ Futtatás
Egyszerűen nyisd meg az `index.html` fájlt böngészőben.

---

Ez egy tanulóprojekt, amely egy későbbi, valódi booking rendszer alapjául szolgál.