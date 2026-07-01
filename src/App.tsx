import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const Home = lazy(() => import("./pages/Home"));
const Contact = lazy(() => import("./pages/Contact"));
const Devis = lazy(() => import("./pages/Devis"));

function Fallback() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="w-8 h-8 border-4 border-orange/30 border-t-orange rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <div className="bg-white text-dark font-sans">
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <Suspense fallback={<Fallback />}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/devis" element={<Devis />} />
            </Routes>
          </Suspense>
        </motion.main>
      </AnimatePresence>
    </div>
  );
}
