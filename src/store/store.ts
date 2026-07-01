import { configureStore } from "@reduxjs/toolkit";
import devisReducer from "./devisSlice";

const store = configureStore({
  reducer: {
    devis: devisReducer,
  },
});

let saving = false;
store.subscribe(() => {
  if (saving) return;
  saving = true;
  try {
    const state = store.getState().devis;
    localStorage.setItem("devis", JSON.stringify(state));
  } catch {}
  saving = false;
});

export function persistDevis() {
  try {
    const state = store.getState().devis;
    localStorage.setItem("devis", JSON.stringify(state));
  } catch {}
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
