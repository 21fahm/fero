"use client";

import { useAnimate } from "framer-motion";
import React, { useRef } from "react";
import { motion } from "framer-motion";

interface ImageTrailHeroProps {}

const ImageTrailHero: React.FC<ImageTrailHeroProps> = () => {
  return (
    <MouseImageTrail
      renderImageBuffer={50}
      rotationRange={25}
      images={[
        "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=026",
        "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=026",
        "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=026",
        "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=026",
        "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=026",
        "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=026",
        "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=026",
        "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=026",
        "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=026",
        "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=026",
        "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=026",
        "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=026",
        "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=026",
        "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=026",
        "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=026",
        "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=026",
      ]}
    >
      <section className="h-screen bg-slate-200">
        <Copy />
        <WatermarkWrapper />
      </section>
    </MouseImageTrail>
  );
};

const Copy: React.FC = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-[999999]">
      <div className="mx-auto flex max-w-7xl items-end justify-between p-4 md:p-8">
        <div>
          <h1 className="mb-6 max-w-4xl text-6xl font-black leading-[1.1] text-slate-900 md:text-8xl">
            Better <span className="text-green-500">every day</span>
          </h1>
          <p className="max-w-xl text-slate-700 md:text-lg font-bold">
            On a mission to achieve excellence everyday in all we do leveraging
            on technology and partnerships.
          </p>
        </div>
      </div>
    </div>
  );
};

const WatermarkWrapper: React.FC = () => {
  return (
    <>
      <Watermark text="Fero Genesis" />
      <Watermark text="Communicators " reverse />
      <Watermark text="Better Everyday" />
      <Watermark text="Safaricom " reverse />
      <Watermark text="Better Everyday" />
      <Watermark text="Fero Genesis" reverse />
      <Watermark text=" Communicators" />
      <Watermark text="Safaricom " reverse />
    </>
  );
};

interface WatermarkProps {
  reverse?: boolean;
  text: string;
}

const Watermark: React.FC<WatermarkProps> = ({ reverse, text }) => (
  <div className="flex -translate-y-12 select-none overflow-hidden">
    <TranslateWrapper reverse={reverse}>
      <span className="w-fit whitespace-nowrap text-[20vmax] font-black uppercase leading-[0.75] text-slate-300">
        {text}
      </span>
    </TranslateWrapper>
    <TranslateWrapper reverse={reverse}>
      <span className="ml-48 w-fit whitespace-nowrap text-[20vmax] font-black uppercase leading-[0.75] text-slate-300">
        {text}
      </span>
    </TranslateWrapper>
  </div>
);

interface TranslateWrapperProps {
  reverse?: boolean;
}

const TranslateWrapper: React.FC<
  TranslateWrapperProps & { children: React.ReactNode }
> = ({ children, reverse }) => {
  return (
    <motion.div
      initial={{ translateX: reverse ? "-100%" : "0%" }}
      animate={{ translateX: reverse ? "0%" : "-100%" }}
      transition={{ duration: 75, repeat: Infinity, ease: "linear" }}
      className="flex"
    >
      {children}
    </motion.div>
  );
};

interface MouseImageTrailProps {
  children: React.ReactNode;
  images: string[];
  renderImageBuffer: number;
  rotationRange: number;
}

const MouseImageTrail: React.FC<MouseImageTrailProps> = ({
  children,
  images,
  renderImageBuffer,
  rotationRange,
}) => {
  const [scope, animate] = useAnimate();

  const lastRenderPosition = useRef({ x: 0, y: 0 });
  const imageRenderCount = useRef(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { clientX, clientY } = e;
    const distance = calculateDistance(
      clientX,
      clientY,
      lastRenderPosition.current.x,
      lastRenderPosition.current.y
    );
    if (distance >= renderImageBuffer) {
      lastRenderPosition.current.x = clientX;
      lastRenderPosition.current.y = clientY;
      renderNextImage();
    }
  };

  const calculateDistance = (
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ) => {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;
    // Using the Pythagorean theorem to calculate the distance
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    return distance;
  };

  const renderNextImage = () => {
    const imageIndex = imageRenderCount.current % images.length;
    const selector = `[data-mouse-move-index="${imageIndex}"]`;
    const el = document.querySelector(selector) as HTMLElement;
    el.style.top = `${lastRenderPosition.current.y}px`;
    el.style.left = `${lastRenderPosition.current.x}px`;
    el.style.zIndex = imageRenderCount.current.toString();
    const rotation = Math.random() * rotationRange;
    animate(
      selector,
      {
        opacity: [0, 1],
        transform: [
          `translate(-50%, -25%) scale(0.5) ${
            imageIndex % 2
              ? `rotate(${rotation}deg)`
              : `rotate(-${rotation}deg)`
          }`,
          `translate(-50%, -50%) scale(1) ${
            imageIndex % 2
              ? `rotate(-${rotation}deg)`
              : `rotate(${rotation}deg)`
          }`,
        ],
      },
      { type: "spring", damping: 15, stiffness: 200 }
    );
    animate(
      selector,
      {
        opacity: [1, 0],
      },
      { ease: "linear", duration: 0.5, delay: 1 }
    );
    imageRenderCount.current = imageRenderCount.current + 1;
  };

  return (
    <div
      ref={scope}
      className="relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {children}
      {images.map((img, index) => (
        <img
          className="pointer-events-none absolute left-0 top-0 h-36 w-auto rounded-xl border-2
      border-slate-900 bg-slate-800 object-cover opacity-0"
          src={img}
          alt={`Mouse move image ${index}`}
          key={index}
          data-mouse-move-index={index}
        />
      ))}
    </div>
  );
};

export default ImageTrailHero;
