export default function Footer() {
  return (
    <footer className="bg-dark text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-orange text-xl font-bold tracking-tight">VISIBILITÉ</span>
          <span className="text-gray-400 font-light tracking-tight">ONLINE</span>
        </div>
        <p className="text-gray-500 text-sm">
          Community Management & Développement Web pour les restaurants
        </p>
        <p className="text-gray-600 text-xs mt-4">
          &copy; {new Date().getFullYear()} Visibilité Online. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
