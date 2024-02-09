"use client";
import { motion } from "framer-motion";
import ShuffleHero from "./herotwo";

interface FuzzyOverlayProps {}

const FuzzyOverlay: React.FC<FuzzyOverlayProps> = () => {
  return (
    <motion.div
      initial={{ transform: "translateX(-10%) translateY(-10%)" }}
      animate={{
        transform: "translateX(10%) translateY(10%)",
      }}
      transition={{
        repeat: Infinity,
        duration: 0.2,
        ease: "linear",
        repeatType: "mirror",
      }}
      style={{
        backgroundImage: 'url("/black-noise.png")',
      }}
      className="pointer-events-none absolute -inset-[100%] opacity-[15%]"
    />
  );
};

const FuzzyOverlayExample: React.FC = () => {
  return (
    <div className="relative overflow-hidden h-screen bg-neutral-950">
      <ShuffleHero />
      <FuzzyOverlay />
    </div>
  );
};

export default FuzzyOverlayExample;
