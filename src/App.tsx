import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Devis from "./pages/Devis";

export default function App() {
  return (
    <div className="bg-white text-dark font-sans">
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
