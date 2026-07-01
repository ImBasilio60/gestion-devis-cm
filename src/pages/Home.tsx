import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [location.hash]);

  const scrollToPricing = () => {
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <section className="pt-32 pb-24 md:pt-40 md:pb-32 bg-gradient-to-br from-orange-light via-white to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-orange/10 text-orange text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 bg-orange rounded-full animate-pulse" />
              Offre limitée – Plus que 3 places ce mois-ci
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-dark leading-tight tracking-tight">
              Votre restaurant mérite d'être
              <span className="text-orange block mt-1">vu en ligne</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Community Management & Développement Web pour les restaurants qui veulent attirer plus de clients, fidéliser leur communauté et dominer leur zone de chalandise.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={scrollToPricing}
                className="bg-orange hover:bg-orange-dark text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:shadow-xl hover:shadow-orange/25 active:scale-95 cursor-pointer w-full sm:w-auto"
              >
                Commencer maintenant
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="border-2 border-gray-300 hover:border-orange text-dark hover:text-orange px-8 py-4 rounded-xl font-semibold text-lg transition-all active:scale-95 cursor-pointer w-full sm:w-auto"
              >
                Réserver un appel
              </button>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              ["+230%", "Visibilité\nmoyenne"],
              ["×3", "Nouveaux\nclients"],
              ["4.9★", "Avis\nmoyen"],
              ["-15%", "Taux\nd'attrition"],
            ].map(([value, label]) => (
              <div key={value} className="text-center p-4">
                <div className="text-3xl md:text-4xl font-black text-orange">{value}</div>
                <div className="text-sm text-gray-500 mt-1 whitespace-pre-line leading-tight">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="benefits" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-dark tracking-tight">
              Pourquoi <span className="text-orange">passer par nous</span> ?
            </h2>
            <p className="mt-4 text-gray-500 text-lg max-w-2xl mx-auto">
              Les restaurants avec une forte présence en ligne génèrent en moyenne 40 % de chiffre d'affaires supplémentaire.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Visibilité maximale",
                desc: "Soyez présent sur les réseaux sociaux et dans les premiers résultats Google Local. Vos clients vous trouvent instantanément.",
                icon: <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />,
              },
              {
                title: "Nouveaux clients",
                desc: "Attirez une clientèle locale en recherche active. Chaque publication et chaque avis est une porte d'entrée vers votre établissement.",
                icon: <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />,
              },
              {
                title: "Image de marque",
                desc: "Une identité visuelle cohérente et professionnelle qui inspire confiance et donne envie de pousser la porte de votre restaurant.",
                icon: <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />,
              },
              {
                title: "Fidélisation & Avis",
                desc: "Transformez vos clients en ambassadeurs. Une stratégie d'avis positive booste votre référencement et votre chiffre d'affaires.",
                icon: <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />,
              },
            ].map((benefit) => (
              <div
                key={benefit.title}
                className="group p-8 rounded-2xl border border-gray-100 hover:border-orange/30 hover:bg-orange-light/50 transition-all"
              >
                <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-orange/20 transition-colors">
                  <svg className="w-6 h-6 text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    {benefit.icon}
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-dark mb-3">{benefit.title}</h3>
                <p className="text-gray-500 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-orange to-orange-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center text-white">
            <div>
              <div className="text-4xl md:text-5xl font-black">15+</div>
              <div className="text-orange-light/80 mt-2 font-medium">Restaurants accompagnés</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black">98%</div>
              <div className="text-orange-light/80 mt-2 font-medium">Clients satisfaits</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black">4.9★</div>
              <div className="text-orange-light/80 mt-2 font-medium">Note moyenne obtenue</div>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-24 md:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <span className="inline-block bg-orange/10 text-orange text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              ⚡ 3 places restantes à ce tarif
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-dark tracking-tight">
              Des offres <span className="text-orange">sur-mesure</span>
            </h2>
            <p className="mt-4 text-gray-500 text-lg max-w-xl mx-auto">
              Pas d'engagement mensuel. Vous résiliez quand vous voulez.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-12 max-w-5xl mx-auto">
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
                className={`relative rounded-2xl p-8 transition-all hover:-translate-y-1 ${
                  pack.highlight
                    ? "bg-white border-2 border-orange shadow-xl shadow-orange/10 scale-105"
                    : "bg-white border border-gray-200 shadow-sm"
                }`}
              >
                {pack.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange text-white text-xs font-bold px-4 py-1 rounded-full">
                    RECOMMANDÉ
                  </div>
                )}
                <h3 className="text-xl font-bold text-dark">{pack.name}</h3>
                <p className="text-gray-500 text-sm mt-1">{pack.desc}</p>
                <div className="mt-6 mb-8">
                  <span className="text-4xl font-black text-dark">{pack.price} €</span>
                  <span className="text-gray-400 text-sm"> / mois</span>
                </div>
                <ul className="space-y-3.5">
                  {pack.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-gray-600">
                      <svg className="w-5 h-5 text-orange shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => navigate("/devis", { state: { packName: pack.name, basePrice: Number(pack.price) } })}
                  className={`mt-8 w-full py-3.5 rounded-xl font-bold text-base transition-all active:scale-95 cursor-pointer ${
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

      <section id="testimonials" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-dark tracking-tight">
              Ils nous <span className="text-orange">font confiance</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Chez Momo",
                role: "Cuisine marocaine, Lyon 3e",
                text: "Depuis qu'ils gèrent notre communication, on a vu passer notre nombre de clients de 40 % le week-end. Le site vitrine est magnifique.",
                rating: 5,
              },
              {
                name: "Le Bistrot du Coin",
                role: "Cuisine française, Bordeaux",
                text: "On avait peu d'avis Google. Maintenant on en a plus de 80 avec une note de 4.9★. Ça a changé notre image.",
                rating: 5,
              },
              {
                name: "Pizzeria Napoli",
                role: "Pizza napolitaine, Marseille 6e",
                text: "Le pack Visibilité Totale nous a tout simplifié. En un mois on était dans le top 3 Google pour 'pizza Marseille'. Incroyable.",
                rating: 5,
              },
            ].map((t) => (
              <div key={t.name} className="p-8 rounded-2xl border border-gray-100 bg-gray-50/50">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-orange" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 italic leading-relaxed mb-6">"{t.text}"</p>
                <div>
                  <div className="font-bold text-dark">{t.name}</div>
                  <div className="text-sm text-gray-400">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-orange to-orange-dark text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 w-40 h-40 border-8 border-white rounded-full" />
            <div className="absolute bottom-10 right-10 w-60 h-60 border-8 border-white rounded-full" />
          </div>
          <div className="relative">
            <span className="inline-block bg-white/15 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              ⏰ Offre valable jusqu'à la fin du mois
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Prêt à faire décoller votre visibilité ?
            </h2>
            <p className="mt-4 text-orange-light/80 text-lg max-w-xl mx-auto">
              3 places disponibles ce mois-ci. La plupart de nos clients constatent des résultats dès les 2 premières semaines.
            </p>
            <button
              onClick={() => navigate("/contact")}
              className="mt-8 bg-white text-orange hover:bg-orange-light px-10 py-4 rounded-xl font-bold text-lg transition-all hover:shadow-xl active:scale-95 cursor-pointer"
            >
              🔥 Réserver ma place
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
