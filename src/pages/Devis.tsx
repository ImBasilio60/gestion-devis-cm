import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { initDevis, setRate } from "../store/devisSlice";
import { fetchUsdToEurRate } from "../api/rates";
import MonthCard from "../components/MonthCard";
import Sidebar from "../components/Sidebar";
import PdfModal from "../components/PdfModal";

export default function Devis() {
  const [pdfOpen, setPdfOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { packName?: string; basePrice?: number } | null;

  const selectedId = useSelector((s: RootState) => s.devis.selectedMonthId);
  const packName = useSelector((s: RootState) => s.devis.packName);
  const basePrice = useSelector((s: RootState) => s.devis.basePrice);
  const months = useSelector((s: RootState) => s.devis.months);
  const rate = useSelector((s: RootState) => s.devis.usdToEurRate);

  useEffect(() => {
    if (state?.packName && state?.basePrice !== undefined) {
      const samePack = packName === state.packName && basePrice === state.basePrice;
      if (!samePack) {
        dispatch(initDevis({ packName: state.packName, basePrice: state.basePrice }));
      }
    } else if (!packName) {
      navigate("/", { replace: true });
    }
    fetchUsdToEurRate().then((r) => dispatch(setRate(r)));
  }, []);

  const grandTotalEUR = months.reduce((sum, m) => {
    const boostEUR = m.boostDays * m.boostPrice * (rate || 1);
    const adEUR = m.adDays * m.adPrice * (rate || 1);
    return sum + basePrice + boostEUR + adEUR;
  }, 0);

  return (
    <section className="h-screen bg-gray-50 overflow-hidden">
      <div className="h-full w-full flex flex-col px-4 py-2">
        <div className="flex items-center justify-between shrink-0 mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1 text-gray-400 hover:text-orange text-sm transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Retour
            </button>
            <button
              onClick={() => {
                if (confirm("Réinitialiser toutes les données du devis ?")) {
                  localStorage.removeItem("devis");
                  dispatch(initDevis({ packName, basePrice }));
                }
              }}
              className="text-[11px] text-gray-300 hover:text-red-400 transition-colors cursor-pointer"
              title="Réinitialiser le devis"
            >
              ↺
            </button>
            <div className="flex items-baseline gap-2">
              <h1 className="text-xl font-bold text-dark tracking-tight">
                Devis <span className="text-orange">{packName}</span>
              </h1>
              <span className="text-xs text-gray-400">{basePrice} €/mois</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setPdfOpen(true)}
              className="text-xs text-gray-400 hover:text-orange border border-gray-200 hover:border-orange/30 px-3 py-1.5 rounded-lg transition-all cursor-pointer"
            >
              Générer le PDF
            </button>
            <div className="text-right">
              <span className="text-[11px] text-gray-400 mr-2">Total 4 mois</span>
              <span className="text-xl font-black text-orange">{Math.round(grandTotalEUR)} €</span>
            </div>
          </div>
        </div>

        <PdfModal open={pdfOpen} onClose={() => setPdfOpen(false)} />

        <div className="flex-1 flex gap-3 min-h-0">
          <div className="flex-[2] grid grid-cols-2 grid-rows-2 gap-3">
            {[1, 2, 3, 4].map((id) => (
              <MonthCard key={id} id={id} />
            ))}
          </div>

          <div className="flex-1 min-w-0">
            <Sidebar key={selectedId} />
          </div>
        </div>
      </div>
    </section>
  );
}
