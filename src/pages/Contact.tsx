import { useNavigate } from "react-router-dom";

export default function Contact() {
  const navigate = useNavigate();

  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-1 text-gray-400 hover:text-orange text-sm mb-8 transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Retour à l'accueil
        </button>

        <h2 className="text-3xl md:text-5xl font-bold text-dark tracking-tight mb-4">
          Contactez-nous
        </h2>
        <p className="text-gray-500 text-lg mb-2">
          Réponse sous 24h maximum. Ou réservez un appel de 15 minutes.
        </p>
        <p className="text-gray-400 mb-10">
          📧 <a href="mailto:contact@visibilite-online.fr" className="text-orange hover:underline">contact@visibilite-online.fr</a>
          <span className="mx-3">|</span>
          📞 06 12 34 56 78
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Merci ! Nous vous recontacterons sous 24h.");
          }}
          className="max-w-md mx-auto space-y-5 text-left"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nom du restaurant</label>
            <input id="name" type="text" required placeholder="Le Bistrot du Coin" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none transition-all" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input id="email" type="email" required placeholder="contact@bistrot.fr" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none transition-all" />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message (optionnel)</label>
            <textarea id="message" rows={4} placeholder="Parlez-nous de votre projet..." className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none transition-all resize-none" />
          </div>
          <button
            type="submit"
            className="w-full bg-orange hover:bg-orange-dark text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:shadow-lg hover:shadow-orange/25 active:scale-95 cursor-pointer"
          >
            Demander un devis gratuit
          </button>
        </form>
      </div>
    </section>
  );
}
