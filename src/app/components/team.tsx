"use client";
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";

const Example = () => {
  return (
    <div className="bg-white-800">
      <div className="flex h-48 items-center justify-left ml-8">
        <h2 className="text-4xl font-bold leading-[1.2] md:text-5xl">
          Meet the <span className="text-green-500">team.</span>
        </h2>
      </div>
      <HorizontalScrollCarousel />
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-neutral-900">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4">
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card }: { card: CardType }) => {
  return (
    <div
      key={card.id}
      className="group relative h-[450px] w-[450px] overflow-hidden bg-neutral-200"
    >
      <div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
      ></div>
      <div className="absolute inset-x-0 bottom-0 z-10 grid place-content-end">
        <p className="bg-gradient-to-br from-white/20 to-white/0 p-8 text-2xl font-black uppercase text-white backdrop-blur-lg">
          {card.title}
        </p>
      </div>
    </div>
  );
};

export default Example;

type CardType = {
  url: string;
  title: string;
  id: number;
};

const cards: CardType[] = [
  {
    url: "/imgs/CEO.jpg",
    title: "CEO",
    id: 1,
  },
  {
    url: "/imgs/stan.jpg",
    title: "Op. Manager",
    id: 2,
  },
  {
    url: "/imgs/betty.jpg",
    title: "Stock controller",
    id: 3,
  },
  {
    url: "/imgs/mr.smith.jpg",
    title: "Accountant",
    id: 4,
  },
  {
    url: "/imgs/mukiri.jpg",
    title: "Mpesa-Admin",
    id: 5,
  },
];
