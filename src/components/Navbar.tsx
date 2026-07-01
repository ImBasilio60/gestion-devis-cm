import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (sectionId: string) => {
    if (location.pathname === "/") {
      const el = document.getElementById(sectionId);
      el?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <span className="text-orange text-2xl font-bold tracking-tight">VISIBILITÉ</span>
          <span className="text-dark font-light tracking-tight">ONLINE</span>
        </button>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <button onClick={() => handleNavClick("benefits")} className="hover:text-orange transition-colors cursor-pointer">Bénéfices</button>
          <button onClick={() => handleNavClick("pricing")} className="hover:text-orange transition-colors cursor-pointer">Tarifs</button>
          <button onClick={() => handleNavClick("testimonials")} className="hover:text-orange transition-colors cursor-pointer">Témoignages</button>
        </div>
        <button
          onClick={() => navigate("/contact")}
          className="bg-orange hover:bg-orange-dark text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-all hover:shadow-lg hover:shadow-orange/25 active:scale-95 cursor-pointer"
        >
          Demander un devis
        </button>
      </div>
    </nav>
  );
}
