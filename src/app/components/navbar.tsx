"use client";
import React, { useRef, useState, useEffect } from "react";
import { useAnimate, motion, AnimatePresence } from "framer-motion";
import { FiCheckSquare, FiX, FiMenu, FiArrowUpRight } from "react-icons/fi";
import Link from "next/link";

const GlassNavigation: React.FC = () => {
  const [hovered, setHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scope, animate] = useAnimate();
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const navRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = ({ offsetX, offsetY, target }: MouseEvent) => {
    const isNavElement = (target as HTMLElement).classList.contains(
      "glass-nav"
    );
    if (isNavElement) {
      setHovered(true);
      const top = offsetY + "px";
      const left = offsetX + "px";
      animate(scope.current, { top, left }, { duration: 0 });
    } else {
      setHovered(false);
    }
  };

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    setIsVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    navRef.current?.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    return () => {
      navRef.current?.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: hovered ? "none" : "auto",
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
      className="glass-nav fixed left-0 right-0 top-0 z-[99999999] mx-auto max-w-6xl overflow-hidden border-[1px] border-white/10 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur md:left-6 md:right-6 md:top-6 md:rounded-2xl"
    >
      <div className="glass-nav flex items-center justify-between px-5 py-5">
        <Cursor hovered={hovered} scope={scope} />
        <Links />
        <Logo />
        <Buttons setMenuOpen={setMenuOpen} />
      </div>
      <MobileMenu menuOpen={menuOpen} />
    </nav>
  );
};

const MobileMenu: React.FC<{ menuOpen: boolean }> = ({ menuOpen }) => {
  return (
    <motion.div
      initial={false}
      animate={{
        height: menuOpen ? "fit-content" : "0px",
      }}
      className="block overflow-hidden md:hidden"
    >
      <div className="flex items-center justify-between px-4 pb-4">
        <div className="flex items-center gap-4">
          <TextLink text="Store" destination="" />
          <TextLink text="Developers" destination="" />
          <TextLink text="Pricing" destination="" />
          <TextLink text="FAQ" destination="../FAQ" />
          <TextLink text="Contact" destination="../contact" />
        </div>
      </div>
    </motion.div>
  );
};

const Links: React.FC = () => (
  <div className="hidden items-center gap-2 md:flex">
    <GlassLink text="Store" destination="" />
    <GlassLink text="Developers" destination="" />
    <GlassLink text="Pricing" destination="" />
  </div>
);

const TextLink: React.FC<{ text: string; destination: string }> = ({
  text,
  destination,
}) => {
  return (
    <a
      href={destination}
      onClick={() => {}}
      className="text-white/90 transition-colors hover:text-white"
    >
      {text}
    </a>
  );
};

const Logo: React.FC = () => (
  <span className="pointer-events-none relative left-0 top-[50%] z-10 text-4xl font-black text-white mix-blend-overlay md:absolute md:left-[50%] md:-translate-x-[50%] md:-translate-y-[50%]">
    Fero Genesis
  </span>
);

const Buttons: React.FC<{
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setMenuOpen }) => {
  return (
    <div className="flex items-center gap-4">
      <div className="hidden items-center gap-2 md:flex">
        <GlassLink text="FAQ" destination="../FAQ" />
        <GlassLink text="Contact" destination="../contact" />
      </div>

      <button className="relative scale-100 overflow-hidden rounded-lg bg-gradient-to-br from-green-600 from-40% to-green-400 px-4 py-2 font-medium text-white transition-transform hover:scale-105 active:scale-95">
        Explore
      </button>

      <button
        onClick={() => setMenuOpen((pv) => !pv)}
        className="ml-2 block scale-100 text-3xl text-white/90 transition-all hover:scale-105 hover:text-white active:scale-95 md:hidden"
      >
        <FiMenu />
      </button>
    </div>
  );
};

interface GlassLinkProps {
  text: string;
  destination: string;
}

const GlassLink: React.FC<GlassLinkProps> = ({ text, destination }) => {
  return (
    <Link
      href={destination}
      rel="nofollow"
      className="group relative scale-100 overflow-hidden rounded-lg px-4 py-2 transition-transform hover:scale-105 active:scale-95"
    >
      <span className="relative z-10 text-white/90 transition-colors group-hover:text-white">
        {text}
      </span>
      <span className="absolute inset-0 z-0 bg-gradient-to-br from-white/20 to-white/5 opacity-0 transition-opacity group-hover:opacity-100" />
    </Link>
  );
};

const Cursor: React.FC<{ hovered: boolean; scope: any }> = ({
  hovered,
  scope,
}) => {
  return (
    <motion.span
      initial={false}
      animate={{
        opacity: hovered ? 1 : 0,
        transform: `scale(${
          hovered ? 1 : 0
        }) translateX(-50%) translateY(-50%)`,
      }}
      transition={{ duration: 0.15 }}
      ref={scope}
      className="pointer-events-none absolute z-0 grid h-[50px] w-[50px] origin-[0px_0px] place-content-center rounded-full bg-gradient-to-br from-green-600 from-40% to-green-400 text-2xl"
    >
      <FiArrowUpRight className="text-white" />
    </motion.span>
  );
};

export default GlassNavigation;
