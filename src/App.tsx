import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Devis from "./pages/Devis";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const { pathname } = useLocation();
  const hideNavbar = pathname === "/devis";

  return (
    <div className="bg-white text-dark font-sans">
      <ScrollToTop />
      {!hideNavbar && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/devis" element={<Devis />} />
        </Routes>
      </main>
    </div>
  );
}
