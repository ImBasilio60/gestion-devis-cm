import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function PdfModal({ open, onClose }: Props) {
  const [restaurant, setRestaurant] = useState("");
  const [director, setDirector] = useState("");
  const [errors, setErrors] = useState({ restaurant: false, director: false });

  const packName = useSelector((s: RootState) => s.devis.packName);
  const basePrice = useSelector((s: RootState) => s.devis.basePrice);
  const months = useSelector((s: RootState) => s.devis.months);
  const rate = useSelector((s: RootState) => s.devis.usdToEurRate);

  if (!open) return null;

  const handleGenerate = () => {
    const err = {
      restaurant: !restaurant.trim(),
      director: !director.trim(),
    };
    setErrors(err);
    if (err.restaurant || err.director) return;

    const doc = new jsPDF();
    const pageW = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentW = pageW - margin * 2;
    const grandTotalEUR = months.reduce((sum, m) => {
      const boostEUR = m.boostDays * m.boostPrice * (rate || 1);
      const adEUR = m.adDays * m.adPrice * (rate || 1);
      return sum + basePrice + boostEUR + adEUR;
    }, 0);

    const formatDate = () => {
      const d = new Date();
      return `${d.getDate().toString().padStart(2, "0")}/${
        (d.getMonth() + 1).toString().padStart(2, "0")
      }/${d.getFullYear()}`;
    };

    const devisId = `DEV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9999)).padStart(4, "0")}`;

    // Header bar
    doc.setFillColor(26, 26, 46);
    doc.rect(0, 0, pageW, 50, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("VISIBILITÉ ONLINE", margin, 24);

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text("Community Management & Développement Web", margin, 32);

    doc.setFontSize(10);
    doc.text("DEVIS", pageW - margin, 24, { align: "right" });
    doc.setFontSize(8);
    doc.text(`N° ${devisId}`, pageW - margin, 31, { align: "right" });
    doc.text(`Date : ${formatDate()}`, pageW - margin, 38, { align: "right" });

    // Client section
    let y = 68;
    doc.setTextColor(26, 26, 46);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Client", margin, y);
    y += 10;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100);
    doc.text(`Restaurant : ${restaurant.trim()}`, margin, y);
    y += 6;
    doc.text(`Directeur / Propriétaire : ${director.trim()}`, margin, y);
    y += 6;
    doc.text(`Pack sélectionné : ${packName} — ${basePrice} € / mois`, margin, y);
    y += 14;

    // Table header
    doc.setFillColor(255, 107, 0);
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");

    const colW = [50, 40, 35, 35, 40];
    const headers = ["Mois", "Base", "Boost", "Publicité", "Total"];
    let cx = margin;
    headers.forEach((h, i) => {
      doc.text(h, cx + colW[i] / 2, y + 4, { align: "center" });
      cx += colW[i];
    });
    doc.setFillColor(255, 107, 0);
    doc.rect(margin, y - 2, contentW, 10, "F");

    // Table rows
    doc.setTextColor(26, 26, 46);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    y += 14;

    const rows = months.map((m) => {
      const boostUSD = m.boostDays * m.boostPrice;
      const boostEUR = boostUSD * (rate || 1);
      const adUSD = m.adDays * m.adPrice;
      const adEUR = adUSD * (rate || 1);
      const total = basePrice + boostEUR + adEUR;
      return [
        m.label,
        `${basePrice} €`,
        boostUSD > 0
          ? `${m.boostDays}j × ${m.boostPrice} USD ≈ ${boostUSD} USD (${Math.round(boostEUR)} €)`
          : "—",
        adUSD > 0
          ? `${m.adDays}j × ${m.adPrice} USD ≈ ${adUSD} USD (${Math.round(adEUR)} €)`
          : "—",
        `${Math.round(total)} €`,
      ];
    });

    autoTable(doc, {
      startY: y,
      head: [["Mois", "Base", "Boost", "Publicité", "Total"]],
      body: rows,
      theme: "plain",
      styles: {
        fontSize: 9,
        textColor: [26, 26, 46],
        cellPadding: { top: 3, right: 4, bottom: 3, left: 4 },
        lineColor: [230, 230, 230],
        lineWidth: 0.5,
      },
      headStyles: {
        fillColor: [255, 107, 0],
        textColor: [255, 255, 255],
        fontStyle: "bold",
        fontSize: 9,
        halign: "center",
      },
      columnStyles: {
        0: { cellWidth: 50, halign: "center" },
        1: { cellWidth: 40, halign: "center" },
        2: { cellWidth: 35, halign: "center" },
        3: { cellWidth: 35, halign: "center" },
        4: { cellWidth: 40, halign: "center" },
      },
      foot: [[
        "TOTAL 4 MOIS",
        `${basePrice * 4} €`,
        `${Math.round(months.reduce((s, m) => s + m.boostDays * m.boostPrice * (rate || 1), 0))} €`,
        `${Math.round(months.reduce((s, m) => s + m.adDays * m.adPrice * (rate || 1), 0))} €`,
        `${Math.round(grandTotalEUR)} €`,
      ]],
      footStyles: {
        fillColor: [255, 243, 230],
        textColor: [255, 107, 0],
        fontStyle: "bold",
        fontSize: 10,
        halign: "center",
      },
      margin: { left: margin, right: margin },
    });

    const finalY = (doc as any).lastAutoTable.finalY + 10;

    // Total box
    doc.setFillColor(26, 26, 46);
    doc.rect(margin, finalY, contentW, 16, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("MONTANT TOTAL DU DEVIS", margin + 8, finalY + 6);
    doc.setFontSize(14);
    doc.setTextColor(255, 107, 0);
    doc.text(`${Math.round(grandTotalEUR)} € TTC`, pageW - margin - 8, finalY + 6, { align: "right" });

    // Conditions
    const condY = finalY + 28;
    doc.setTextColor(140);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text("Conditions :", margin, condY);
    doc.text("- Paiement mensuel sans engagement", margin, condY + 5);
    doc.text("- Devis valable 30 jours", margin, condY + 10);
    doc.text("- Résiliable à tout moment", margin, condY + 15);

    // Services detail
    const servicesY = condY + 28;
    doc.setTextColor(26, 26, 46);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Prestations incluses", margin, servicesY);

    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100);

    const packServices: Record<string, string[]> = {
      Essentiel: [
        "Audit marketing du restaurant",
        "Création ou optimisation page Facebook",
        "Calendrier de contenu",
        "8 publications par mois",
        "Réponse aux messages (1 mois)",
        "Rapport mensuel",
      ],
      Croissance: [
        "Tout le Pack Essentiel",
        "Étude de l'identité visuelle",
        "Création de visuels professionnels",
        "QR Code pour les abonnements",
        "Optimisation communication physique",
        "12 publications par mois",
        "Conseils pour les avis clients",
      ],
      "Visibilité Totale": [
        "Tout le Pack Croissance",
        "Optimisation Google Business Profile",
        "Création d'un site vitrine",
        "Référencement local de base",
        "Système de collecte d'avis",
        "Suivi et statistiques (30 jours)",
        "Formation 1h pour le propriétaire",
      ],
    };

    const services = packServices[packName] ?? [];
    let sy = servicesY + 6;
    services.forEach((s, i) => {
      if (sy > 270) {
        doc.addPage();
        sy = 20;
      }
      doc.text(`${i + 1}. ${s}`, margin + 4, sy);
      sy += 5;
    });

    // Footer
    const footerY = Math.max(sy + 20, 275);
    if (footerY > 280) {
      doc.addPage();
    }
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFillColor(245, 245, 245);
      doc.rect(0, doc.internal.pageSize.getHeight() - 20, pageW, 20, "F");
      doc.setTextColor(150);
      doc.setFontSize(7);
      doc.setFont("helvetica", "normal");
      doc.text("VISIBILITÉ ONLINE — contact@visibilite-online.fr — 06 12 34 56 78", margin, doc.internal.pageSize.getHeight() - 12);
      doc.text(`Page ${i} / ${pageCount}`, pageW - margin, doc.internal.pageSize.getHeight() - 12, { align: "right" });
    }

    doc.save(`Devis_${restaurant.trim().replace(/\s+/g, "_")}_${devisId}.pdf`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6">
        <h2 className="text-lg font-bold text-dark mb-1">Générer le devis PDF</h2>
        <p className="text-sm text-gray-400 mb-5">
          Renseignez les informations du client avant de générer le document.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom du restaurant <span className="text-orange">*</span>
            </label>
            <input
              type="text"
              value={restaurant}
              onChange={(e) => { setRestaurant(e.target.value); setErrors((p) => ({ ...p, restaurant: false })); }}
              placeholder="Le Bistrot du Coin"
              className={`w-full px-3 py-2.5 rounded-xl border text-sm outline-none transition-all ${
                errors.restaurant ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200" : "border-gray-300 focus:border-orange focus:ring-2 focus:ring-orange/20"
              }`}
            />
            {errors.restaurant && <p className="text-red-400 text-xs mt-1">Ce champ est obligatoire</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Directeur / Propriétaire <span className="text-orange">*</span>
            </label>
            <input
              type="text"
              value={director}
              onChange={(e) => { setDirector(e.target.value); setErrors((p) => ({ ...p, director: false })); }}
              placeholder="Jean Dupont"
              className={`w-full px-3 py-2.5 rounded-xl border text-sm outline-none transition-all ${
                errors.director ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200" : "border-gray-300 focus:border-orange focus:ring-2 focus:ring-orange/20"
              }`}
            />
            {errors.director && <p className="text-red-400 text-xs mt-1">Ce champ est obligatoire</p>}
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-dark py-3 rounded-xl font-bold text-sm transition-all active:scale-95 cursor-pointer"
          >
            Annuler
          </button>
          <button
            onClick={handleGenerate}
            className="flex-1 bg-orange hover:bg-orange-dark text-white py-3 rounded-xl font-bold text-sm transition-all hover:shadow-lg hover:shadow-orange/25 active:scale-95 cursor-pointer"
          >
            Générer le PDF
          </button>
        </div>
      </div>
    </div>
  );
}
