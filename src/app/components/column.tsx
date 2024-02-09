"use client";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FiLock } from "react-icons/fi";
import { FaEthereum, FaEye } from "react-icons/fa6";
import { MdVerified } from "react-icons/md";
import { IoAccessibility } from "react-icons/io5";
import { Poppins } from "next/font/google";

const poppins400 = Poppins({ weight: "400", subsets: ["latin"] });
const poppins600 = Poppins({ weight: "600", subsets: ["latin"] });

const SwapColumnFeatures = () => {
  const [featureInView, setFeatureInView] = useState(features[0]);

  return (
    <section className="relative mx-auto w-full bg-[#f6f8fa] rounded-[75px] border-dotted border-black border-4 p-[64px] z-30">
      <SlidingFeatureDisplay featureInView={featureInView} />

      {/* Offsets the height of SlidingFeatureDisplay so that it renders on top of Content to start */}
      <div className="-mt-[100vh] hidden md:block" />
      {features.map((s) => (
        <Content
          key={s.id}
          featureInView={s}
          setFeatureInView={setFeatureInView}
          {...s}
        />
      ))}
    </section>
  );
};

const SlidingFeatureDisplay = ({ featureInView }: any) => {
  return (
    <div
      style={{
        justifyContent:
          featureInView.contentPosition === "l" ? "flex-end" : "flex-start",
      }}
      className="pointer-events-none sticky top-0 z-10 hidden h-screen w-full items-center justify-center md:flex"
    >
      <motion.div
        layout
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
        className="h-fit w-3/5 rounded-xl p-8"
      >
        <ExampleFeature featureInView={featureInView} />
      </motion.div>
    </div>
  );
};

const Content = ({ setFeatureInView, featureInView }: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "-150px",
  });

  useEffect(() => {
    if (isInView) {
      setFeatureInView(featureInView);
    }
  }, [isInView]);

  return (
    <section
      ref={ref}
      className="relative z-0 flex h-fit md:h-screen"
      style={{
        justifyContent:
          featureInView.contentPosition === "l" ? "flex-start" : "flex-end",
      }}
    >
      <div className="grid h-full w-full place-content-center px-4 py-12 md:w-2/5 md:px-8 md:py-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <span className="rounded-full bg-indigo-600 px-2 py-1.5 text-xs font-medium text-white">
            {featureInView.callout}
          </span>
          <p className={`${poppins600.className} my-3 text-5xl font-bold`}>
            {featureInView.title}
          </p>
          <p className={`${poppins400.className} text-slate-600`}>
            {featureInView.description}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="mt-8 block md:hidden"
        >
          <ExampleFeature featureInView={featureInView} />
        </motion.div>
      </div>
    </section>
  );
};

const ExampleFeature = ({ featureInView }: any) => {
  return (
    <div className="relative h-96 w-full rounded-xl bg-slate-800 shadow-xl">
      <div className="flex w-full gap-1.5 rounded-t-xl bg-slate-900 p-3">
        <div className="h-3 w-3 rounded-full bg-red-500" />
        <div className="h-3 w-3 rounded-full bg-yellow-500" />
        <div className="h-3 w-3 rounded-full bg-green-500" />
      </div>

      {featureInView.id == 1 && (
        <div
          style={{
            backgroundImage: 'url("ceo2.0.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
        ></div>
      )}

      <span className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] text-9xl text-slate-700 z-0">
        {featureInView.id == 2 && <featureInView.Icon />}
      </span>
      <span className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] text-9xl text-slate-700 z-0">
        {featureInView.id == 3 && <featureInView.Icon />}
      </span>
      <span className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] text-9xl text-slate-700 z-0">
        {featureInView.id == 4 && <featureInView.Icon />}
      </span>
    </div>
  );
};

export default SwapColumnFeatures;

const features = [
  {
    id: 1,
    callout: "Journey",
    title: "Our journey for 17-years",
    description:
      "Our company has embarked on a remarkable 17-year journey that began as a humble small shop in Meru, dedicated to selling airtime. Over the years, we've grown and evolved, driven by a vision to innovate and provide exceptional services to our customers. Our story is one of perseverance, adaptability, and an unwavering commitment to meeting the evolving needs of our clientele. From those early days, we've expanded our horizons, diversified our offerings, and built lasting relationships within our community and beyond. Today, we stand as a testament to the transformative power of dedication and the pursuit of excellence.",
    contentPosition: "r",
    Icon: FiLock,
  },
  {
    id: 2,
    callout: "Vision",
    title: "Our vision",
    description:
      "Our vision is to be the leading provider of telecommunications solutions, empowering individuals and communities through seamless connectivity and innovative services. We aspire to set industry standards for accessibility, customer satisfaction, and social responsibility, while continuously pushing the boundaries of technological advancement. Through our unwavering commitment to excellence and inclusivity, we aim to enrich lives and foster positive change in the digital era.",
    contentPosition: "l",
    Icon: FaEye,
  },
  {
    id: 3,
    callout: "Values",
    title: "Core values",
    description:
      "Our core values center around accessibility, innovation, customer satisfaction, and social responsibility. We prioritize accessibility by ensuring our products and services are readily available and easy to use for all customers. Innovation drives us to continuously improve and adapt to meet evolving needs. Customer satisfaction is at the forefront of everything we do, guiding us to provide exceptional experiences. Lastly, social responsibility motivates us to positively impact our communities through various initiatives and support programs.",
    contentPosition: "r",
    Icon: MdVerified,
  },
  {
    id: 4,
    callout: "Accessibility",
    title: "Available to all",
    description:
      "Our company prioritizes accessibility, ensuring our products and services are easily available through our extensive network of outlets, online platforms, and user-friendly interfaces. With a commitment to affordability and inclusivity, we empower individuals of all backgrounds to access and benefit from our offerings, including smartphones, M-Pesa services, Safaricom lines, and airtime.",
    contentPosition: "l",
    Icon: IoAccessibility,
  },
];
