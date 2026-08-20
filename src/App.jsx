import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Welcome from "./pages/Welcome";
import Investigate from "./pages/Investigate";
import Investigating from "./pages/Investigating";
import AnimatedBackground from "./components/AnimatedBackground";
import "./App.css";

export default function App(){
  const location = useLocation();
  return (
    <div className="app-root">
      <AnimatedBackground />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageShell><Welcome/></PageShell>} />
          <Route path="/investigate" element={<PageShell><Investigate/></PageShell>} />
          <Route path="/investigating/:id" element={<PageShell><Investigating/></PageShell>} />
          <Route path="*" element={<PageShell><Welcome/></PageShell>} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

function PageShell({children}){
  return (
    <motion.main
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }}
      exit={{ opacity: 0, y: -8, transition: { duration: 0.45 } }}
      className="page-shell"
    >
      {children}
    </motion.main>
  );
}
