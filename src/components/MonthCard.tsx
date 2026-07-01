import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import { selectMonth } from "../store/devisSlice";

export default function MonthCard({ id }: { id: number }) {
  const dispatch = useDispatch();
  const month = useSelector((s: RootState) => s.devis.months.find((m) => m.id === id));
  const selectedId = useSelector((s: RootState) => s.devis.selectedMonthId);
  const basePrice = useSelector((s: RootState) => s.devis.basePrice);
  const packName = useSelector((s: RootState) => s.devis.packName);
  const rate = useSelector((s: RootState) => s.devis.usdToEurRate);

  if (!month) return null;

  const boostTotalUSD = month.boostDays * month.boostPrice;
  const boostTotalEUR = boostTotalUSD * (rate || 1);
  const adTotalUSD = month.adDays * month.adPrice;
  const adTotalEUR = adTotalUSD * (rate || 1);
  const monthTotal = basePrice + boostTotalEUR + adTotalEUR;
  const isSelected = selectedId === id;

  return (
    <button
      onClick={() => dispatch(selectMonth(id))}
      className={`rounded-xl p-4 text-left transition-all flex flex-col cursor-pointer ${
        isSelected
          ? "border-l-4 border-orange bg-white shadow-sm"
          : "border border-gray-200 bg-white hover:border-orange/40"
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="font-bold text-dark">{month.label}</span>
        {monthTotal > 0 && (
          <span className="font-black text-orange text-lg">{monthTotal} €</span>
        )}
      </div>

      <div className="space-y-1.5 text-sm flex-1">
        <div className="flex justify-between text-gray-500">
          <span>Base <span className="text-gray-400">({packName})</span></span>
          <span className="font-medium text-dark">{basePrice} €</span>
        </div>

        {month.boostDays > 0 || month.boostPrice > 0 ? (
          <div className="flex justify-between text-gray-500">
            <span>Boost <span className="text-gray-400">({month.boostDays}j × {month.boostPrice} USD)</span></span>
            <span className="font-medium text-dark">
              {boostTotalUSD} USD <span className="text-gray-400 text-[10px]">≈ {Math.round(boostTotalEUR)} €</span>
            </span>
          </div>
        ) : (
          <div className="flex justify-between text-gray-300">
            <span>Boost</span>
            <span className="text-gray-300">—</span>
          </div>
        )}

        {month.adDays > 0 || month.adPrice > 0 ? (
          <div className="flex justify-between text-gray-500">
            <span>Facebook Ads <span className="text-gray-400">({month.adDays}j × {month.adPrice} USD)</span></span>
            <span className="font-medium text-dark">
              {adTotalUSD} USD <span className="text-gray-400 text-[10px]">≈ {Math.round(adTotalEUR)} €</span>
            </span>
          </div>
        ) : (
          <div className="flex justify-between text-gray-300">
            <span>Facebook Ads</span>
            <span className="text-gray-300">—</span>
          </div>
        )}
      </div>

      <div className="pt-3 mt-2 border-t border-gray-100 flex items-center justify-between">
        <span className="text-sm font-semibold text-dark">Total {month.label}</span>
        <span className="font-black text-orange">{monthTotal} €</span>
      </div>
    </button>
  );
}
