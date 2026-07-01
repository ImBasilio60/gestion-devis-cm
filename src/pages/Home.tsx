import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <section className="h-screen overflow-hidden bg-gray-50 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-4">
        <div className="text-center mb-14">
          <h2 className="text-2xl md:text-4xl font-bold text-dark tracking-tight">
            Des offres <span className="text-orange">sur-mesure</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            {
              name: "Essentiel",
              price: "79",
              desc: "Parfait pour démener votre présence en ligne",
              features: [
                "Audit marketing du restaurant",
                "Création ou optimisation page Facebook",
                "Calendrier de contenu",
                "8 publications par mois",
                "Réponse aux messages (1 mois)",
                "Rapport mensuel",
              ],
              highlight: false,
            },
            {
              name: "Croissance",
              price: "129",
              desc: "L'équilibre parfait entre contenu et image",
              features: [
                "Tout le Pack Essentiel",
                "Étude de l'identité visuelle",
                "Création de visuels professionnels",
                "QR Code pour les abonnements",
                "Optimisation communication physique",
                "12 publications par mois",
                "Conseils pour les avis clients",
              ],
              highlight: true,
            },
            {
              name: "Visibilité Totale",
              price: "249",
              desc: "La solution complète clé en main",
              features: [
                "Tout le Pack Croissance",
                "Optimisation Google Business Profile",
                "Création d'un site vitrine",
                "Référencement local de base",
                "Système de collecte d'avis",
                "Suivi et statistiques (30 jours)",
                "Formation 1h pour le propriétaire",
              ],
              highlight: false,
            },
          ].map((pack) => (
            <div
              key={pack.name}
              className={`relative rounded-2xl p-4 md:p-5 transition-all hover:-translate-y-1 ${
                pack.highlight
                  ? "bg-white border-2 border-orange shadow-xl shadow-orange/10 scale-105"
                  : "bg-white border border-gray-200 shadow-sm"
              }`}
            >
              {pack.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange text-white text-[11px] font-bold px-4 py-1 rounded-full">
                  RECOMMANDÉ
                </div>
              )}
              <h3 className="text-lg font-bold text-dark">{pack.name}</h3>
              <p className="text-gray-500 text-[12px] mt-1 leading-tight">{pack.desc}</p>
              <div className="mt-3 mb-4">
                <span className="text-2xl md:text-3xl font-black text-dark">{pack.price} €</span>
                <span className="text-gray-400 text-[11px]"> / mois</span>
              </div>
              <ul className="space-y-1.5">
                {pack.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[12px] text-gray-600">
                    <svg className="w-4 h-4 text-orange shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate("/devis", { state: { packName: pack.name, basePrice: Number(pack.price) } })}
                className={`mt-4 w-full py-2.5 rounded-xl font-bold text-sm transition-all active:scale-95 cursor-pointer ${
                  pack.highlight
                    ? "bg-orange hover:bg-orange-dark text-white hover:shadow-lg hover:shadow-orange/25"
                    : "bg-gray-100 hover:bg-gray-200 text-dark"
                }`}
              >
                {pack.highlight ? "Commencer maintenant" : "Choisir cette offre"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
