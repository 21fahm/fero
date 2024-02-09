"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  FiUser,
  FiChevronLeft,
  FiChevronRight,
  FiTool,
  FiMonitor,
  FiSmartphone,
  FiCheck,
} from "react-icons/fi";

interface FeatureProps {
  position: number;
  index: number;
  title: string;
  description: string;
  Icon: React.ComponentType<any>;
}

const CollapseCardFeatures: React.FC = () => {
  const [position, setPosition] = useState<number>(0);

  const shiftLeft = () => {
    if (position > 0) {
      setPosition((pv) => pv - 1);
    }
  };

  const shiftRight = () => {
    if (position < features.length - 1) {
      setPosition((pv) => pv + 1);
    }
  };

  return (
    <section className="overflow-hidden bg-white px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex justify-between gap-4">
          <h2 className="text-4xl font-bold leading-[1.2] md:text-5xl">
            We're good. <span className="text-green-500">Here's why.</span>
          </h2>
          <div className="flex gap-2">
            <button
              className="h-fit bg-black p-4 text-2xl text-white transition-colors hover:bg-neutral-700"
              onClick={shiftLeft}
            >
              <FiChevronLeft />
            </button>
            <button
              className="h-fit bg-black p-4 text-2xl text-white transition-colors hover:bg-neutral-700"
              onClick={shiftRight}
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
        <div className="flex gap-4">
          {features.map((feat, index) => (
            <Feature {...feat} key={index} position={position} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Feature: React.FC<FeatureProps> = ({
  position,
  index,
  title,
  description,
  Icon,
}) => {
  const translateAmt =
    position >= index ? index * 100 : index * 100 - 100 * (index - position);

  return (
    <motion.div
      animate={{ x: `${-translateAmt}%` }}
      transition={{ ease: "easeInOut", duration: 0.35 }}
      className={`relative flex min-h-[250px] w-10/12 max-w-lg shrink-0 flex-col justify-between overflow-hidden p-8 shadow-lg md:w-3/5 ${
        index % 2 ? "bg-black text-white" : " bg-white"
      }`}
    >
      <Icon className="absolute right-2 top-2 text-7xl opacity-20" />
      <h3 className="mb-8 text-3xl font-bold">{title}</h3>
      <p>{description}</p>
    </motion.div>
  );
};

const features: FeatureProps[] = [
  {
    title: "Diverse Product Offering",
    index: 0,
    position: 0,
    Icon: FiMonitor,
    description:
      "Our company stands out in the industry due to our diverse product range. From selling top-tier smartphones to providing essential services like M-Pesa and offering Safaricom lines and airtime, we cater to a wide range of customer needs under one roof.",
  },
  {
    title: "Trusted Brand",
    Icon: FiCheck,
    index: 1,
    position: 1,
    description:
      " We have built a reputation as a trusted brand within the industry. Our commitment to quality, reliability, and customer satisfaction has earned us the loyalty of millions of customers, making us the preferred choice for their telecommunications needs.",
  },
  {
    title: "Innovation and Adaptability",
    Icon: FiTool,
    index: 2,
    position: 2,
    description:
      "We continuously innovate and adapt to the ever-changing landscape of the telecommunications industry. By staying ahead of technological advancements and market trends, we consistently introduce new services and products that meet the evolving needs of our customers, setting us apart as industry leaders.",
  },
  {
    title: "Community Engagement",
    Icon: FiUser,
    index: 3,
    position: 3,
    description:
      "Beyond our business operations, we are committed to making a positive impact on the communities we serve. Through initiatives such as digital literacy programs, support for small businesses, and investment in infrastructure development, we demonstrate our dedication to empowering individuals and driving socio-economic growth, solidifying our position as a socially responsible leader in the industry.",
  },
  {
    title: "Seamless Customer Experience",
    Icon: FiSmartphone,
    index: 4,
    position: 4,
    description:
      "Our focus on providing a seamless customer experience sets us apart from the competition. Whether it's through our user-friendly interfaces for purchasing products and services, efficient customer support channels, or convenient payment options, we prioritize making every interaction with our company hassle-free and enjoyable for our customers.",
  },
];

export default CollapseCardFeatures;
