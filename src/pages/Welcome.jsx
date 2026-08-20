import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Welcome(){
  const nav = useNavigate();
  return (
    <div className="welcome-center">
      <motion.div initial={{y:12,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:0.2,duration:0.8}} className="welcome-sub">WELCOME TO</motion.div>
      <motion.h1 className="welcome-title" initial={{scale:0.98,opacity:0}} animate={{scale:1,opacity:1}} transition={{delay:0.35,duration:1.1}}>
        TRACEWELL
      </motion.h1>

      <motion.p className="welcome-desc" initial={{y:8,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:0.9}}>
        A forensic web investigation engine that collects, connects, and explains evidence from suspicious listings and storefronts.
      </motion.p>

      <motion.button
        className="arrow-btn"
        onClick={() => { nav('/investigate'); }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.98 }}
        aria-label="Enter Tracewell"
      >
        <div className="arrow-icon" />
      </motion.button>
    </div>
  );
}
