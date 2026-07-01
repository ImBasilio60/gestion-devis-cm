import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import { saveMonth, resetMonth } from "../store/devisSlice";

export default function Sidebar() {
  const dispatch = useDispatch();
  const selectedId = useSelector((s: RootState) => s.devis.selectedMonthId);
  const savedMonth = useSelector((s: RootState) => s.devis.months.find((m) => m.id === selectedId));
  const basePrice = useSelector((s: RootState) => s.devis.basePrice);
  const packName = useSelector((s: RootState) => s.devis.packName);
  const rate = useSelector((s: RootState) => s.devis.usdToEurRate);

  const [form, setForm] = useState({
    boostDays: savedMonth?.boostDays ?? 0,
    boostPrice: savedMonth?.boostPrice ?? 0,
    adDays: savedMonth?.adDays ?? 0,
    adPrice: savedMonth?.adPrice ?? 0,
  });
  const [saved, setSaved] = useState(false);

  if (!savedMonth) return null;

  const boostTotalUSD = form.boostDays * form.boostPrice;
  const boostTotalEUR = boostTotalUSD * (rate || 1);
  const adTotalUSD = form.adDays * form.adPrice;
  const adTotalEUR = adTotalUSD * (rate || 1);
  const monthTotal = basePrice + boostTotalEUR + adTotalEUR;

  const fields: { label: string; key: "boostDays" | "boostPrice" | "adDays" | "adPrice"; suffix: string }[] = [
    { label: "Jours de boost", key: "boostDays", suffix: "jour(s)" },
    { label: "Prix boost / jour", key: "boostPrice", suffix: "USD" },
    { label: "Jours de publicité", key: "adDays", suffix: "jour(s)" },
    { label: "Prix Facebook Ads / jour", key: "adPrice", suffix: "USD" },
  ];

  const handleSave = () => {
    dispatch(saveMonth({ monthId: selectedId, ...form }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleCancel = () => {
    dispatch(resetMonth(selectedId));
    setForm({ boostDays: 0, boostPrice: 0, adDays: 0, adPrice: 0 });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 h-full flex flex-col">
      <div className="mb-3">
        <h3 className="font-bold text-dark text-sm">Personnaliser</h3>
        <p className="text-[11px] text-gray-400">{packName} — {savedMonth.label}</p>
      </div>

      <div className="space-y-2.5 flex-1">
        {fields.map((f) => (
          <div key={f.key}>
            <label className="block text-[11px] font-medium text-gray-600 mb-0.5">
              {f.label}
            </label>
            <div className="flex items-center gap-1.5">
              <input
                type="number"
                min={0}
                value={form[f.key]}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, [f.key]: Math.max(0, Number(e.target.value)) }))
                }
                className="w-full px-2.5 py-1.5 rounded-lg border border-gray-300 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none transition-all text-xs"
              />
              <span className="text-gray-400 text-xs w-10 shrink-0">{f.suffix}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-3">
        <button
          onClick={handleSave}
          className="flex-1 bg-orange hover:bg-orange-dark text-white py-2 rounded-lg font-bold text-xs transition-all active:scale-95 cursor-pointer"
        >
          {saved ? "✓ Sauvegardé" : "Enregistrer"}
        </button>
        <button
          onClick={handleCancel}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-dark py-2 rounded-lg font-bold text-xs transition-all active:scale-95 cursor-pointer"
        >
          Annuler
        </button>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100 space-y-1 text-xs">
        <div className="flex justify-between text-gray-400">
          <span>Base</span>
          <span className="text-dark font-medium">{basePrice} €</span>
        </div>
        <div className="flex justify-between text-gray-400">
          <span>Boost</span>
          <span className="text-dark font-medium">
            {boostTotalUSD > 0 ? (
              <>{boostTotalUSD} USD <span className="text-gray-400 text-[10px]">≈ {Math.round(boostTotalEUR)} €</span></>
            ) : "—"}
          </span>
        </div>
        <div className="flex justify-between text-gray-400">
          <span>Publicité</span>
          <span className="text-dark font-medium">
            {adTotalUSD > 0 ? (
              <>{adTotalUSD} USD <span className="text-gray-400 text-[10px]">≈ {Math.round(adTotalEUR)} €</span></>
            ) : "—"}
          </span>
        </div>
        <div className="flex justify-between text-sm font-bold pt-1 border-t border-gray-100">
          <span className="text-dark">Total {savedMonth.label}</span>
          <span className="text-orange">{monthTotal} €</span>
        </div>
      </div>
    </div>
  );
}
