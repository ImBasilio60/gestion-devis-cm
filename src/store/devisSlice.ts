import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface MonthData {
  id: number;
  label: string;
  boostDays: number;
  boostPrice: number;
  adDays: number;
  adPrice: number;
}

interface DevisState {
  packName: string;
  basePrice: number;
  months: MonthData[];
  selectedMonthId: number;
  usdToEurRate: number;
}

function buildDefaultMonths(): MonthData[] {
  return [1, 2, 3, 4].map((i) => ({
    id: i,
    label: `Mois ${i}`,
    boostDays: 0,
    boostPrice: 0,
    adDays: 0,
    adPrice: 0,
  }));
}

function loadState(): DevisState {
  try {
    const raw = localStorage.getItem("devis");
    if (raw) {
      const parsed = JSON.parse(raw) as DevisState;
      if (parsed.months && parsed.months.length === 4) {
        parsed.usdToEurRate ??= 0;
        return parsed;
      }
    }
  } catch {}
  return {
    packName: "",
    basePrice: 0,
    months: buildDefaultMonths(),
    selectedMonthId: 1,
    usdToEurRate: 0,
  };
}

const initialState: DevisState = loadState();

const devisSlice = createSlice({
  name: "devis",
  initialState,
  reducers: {
    initDevis(state, action: PayloadAction<{ packName: string; basePrice: number }>) {
      state.packName = action.payload.packName;
      state.basePrice = action.payload.basePrice;
      state.months = buildDefaultMonths();
      state.selectedMonthId = 1;
    },
    selectMonth(state, action: PayloadAction<number>) {
      state.selectedMonthId = action.payload;
    },
    saveMonth(state, action: PayloadAction<{ monthId: number; boostDays: number; boostPrice: number; adDays: number; adPrice: number }>) {
      const month = state.months.find((m) => m.id === action.payload.monthId);
      if (month) {
        month.boostDays = action.payload.boostDays;
        month.boostPrice = action.payload.boostPrice;
        month.adDays = action.payload.adDays;
        month.adPrice = action.payload.adPrice;
      }
    },
    resetMonth(state, action: PayloadAction<number>) {
      const month = state.months.find((m) => m.id === action.payload);
      if (month) {
        month.boostDays = 0;
        month.boostPrice = 0;
        month.adDays = 0;
        month.adPrice = 0;
      }
    },
    setRate(state, action: PayloadAction<number>) {
      state.usdToEurRate = action.payload;
    },
  },
});

export const { initDevis, selectMonth, saveMonth, resetMonth, setRate } = devisSlice.actions;
export default devisSlice.reducer;
