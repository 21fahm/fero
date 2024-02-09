"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";

interface QuestionProps {
  question: string;
  answer: string;
}

interface TabsProps {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

interface QuestionsProps {
  selected: string;
}

const TABS: string[] = ["Fero", "Safaricom", "M-pesa", "Products"];

const QUESTIONS: { [key: string]: QuestionProps[] } = {
  Fero: [
    {
      question: "What is shakespay?",
      answer:
        "Shakespay is a financial service provider, currently offering Ethereum and Polygon, enabling the free movement of assets around the world.",
    },
    {
      question: "Which assets are being offered by shakespay?",
      answer: "Currently, Ethereum and Polygon.",
    },
    {
      question: "Are you looking to offer Bitcoin?",
      answer:
        "Definitely. Bitcoin and lightning payments will be available on next release.",
    },
    {
      question: "Why are you deprecating Tether USDt?",
      answer:
        "We believe Bitcoin and Ethereum are the public infrastructures that hold the three main properties of a monetary currency that we value: censorship-resistant, permissionless and decentralized. Tether USDt is none of the above. Your account will still hold the USDT, we will just not offer it on Shakespay.",
    },
  ],
  Safaricom: [
    {
      question: "What is ERC-4337?",
      answer:
        "ERC-4337 is a standard that has gained traction around the Ethereum community that allows us to have accounts with smart capabilities. Eg: automation, private transaction and even more complex systems.",
    },
    {
      question: "ERC-4337 vs EOAs?",
      answer:
        "There are two accounts on Ethereum, EOA(Externally Owned Account) and contract accounts. EOAs are the only accounts able to initiate a transaction but they are ugly and vulnerable. ERC-4337 on the other hand introduces smart capabilities and new security features that EOAs don't have. Your account can perform autopayments and at the same time be secured by MPC(Multi-party computation).",
    },
    {
      question: "ERC-4337 vs EIP-3074?",
      answer:
        "EIP-3074 is an improvement proposal to add smart capabilities to EOAs. This will change EOAs to smart wallets. This is good because we eventually want every wallet in Ethereum to be a smart wallet. This has not yet gained traction as much as ERC-4337 but we are yet to see if Ethereum developers will adopt it.",
    },
    {
      question: "ERC-4337 vs MPC?",
      answer:
        "There has been some debate on whether Ethereum should adopt smart wallets or MPC wallets. What is MPC? Multi-party computation is a branch in cryptography that allows keys to exist in different place removing the single point of failure we have with EOAs(Crude explanation. Just to make you understand what MPC does in crypto). But these are not contradicting technologies. As we see with shakespay they are actually complementary. MPC is used in shakespay for key management and smart wallet is used for account management, making Shakespay secure and easy to use!",
    },
  ],
  "M-pesa": [
    {
      question: "What is Bitcoin?",
      answer:
        "Bitcoin is a peer to peer electronic cash system that allows anyone in the world to receive value without having to go through a central authority.",
    },
    {
      question: "What is the lightning network?",
      answer:
        "Lightning network is a technology built on top of Bitcoin, referred to as Layer 2, enabling transaction to be moved off-chain, that is from Bitcoin, where they would be slow and expensive. These transactions are executed off-chain faster and cheaper and settled later on-chain.",
    },
    {
      question: "When will you be offering Bitcoin?",
      answer: "During our next release.",
    },
    {
      question: "Which is better Bitcoin or Ethereum?",
      answer:
        "Both have a chance to be adopted as monetary currencies of the world.",
    },
  ],
  Products: [
    {
      question: "What is Ethereum?",
      answer:
        "Just like Bitcoin, Ethereum is a public blockchain allowing the transaction of value without a central authority. Ethereum added onto its layer a way for us to create property registries, due to its turing complete language, enabling the creation of more complex systems in a decentralized way.",
    },
    {
      question: "What is a wallet?",
      answer:
        "A wallet is your gateway to Ethereum. It hold the public and private keys needed to provide proof of ownership when transacting on Ethereum. Shakespay allows you to open an account easily on Ethereum and start your journey to finanacial freedom.",
    },
    {
      question: "Do you offer autopayment on Ethereum?",
      answer: "No. This will be also be added on the next release.",
    },
    {
      question: "Do you offer private transactions on Ethereum?",
      answer:
        "Yes! You can try it out on Ethereum testnet, Sepolia, today if you have an android!",
    },
  ],
};

const TabsFAQ: React.FC = () => {
  const [selected, setSelected] = useState(TABS[0]);

  return (
    <section className="overflow-hidden bg-slate-900 px-4 py-12 text-slate-50">
      <Heading />
      <Tabs selected={selected} setSelected={setSelected} />
      <Questions selected={selected} />
    </section>
  );
};

const Heading: React.FC = () => {
  return (
    <>
      <div className="relative z-10 flex flex-col items-center justify-center">
        <span className="mb-8 bg-gradient-to-r from-green-500 to-yellow-500 bg-clip-text font-medium text-transparent">
          Let's answer some questions
        </span>
        <span className="mb-8 text-5xl font-bold">FAQs</span>
      </div>
      <span className="absolute -top-[350px] left-[50%] z-0 h-[500px] w-[600px] -translate-x-[50%] rounded-full bg-gradient-to-r from-green-600/20 to-yellow-600/20 blur-3xl" />
    </>
  );
};

const Tabs: React.FC<TabsProps> = ({ selected, setSelected }) => {
  return (
    <div className="relative z-10 flex flex-wrap items-center justify-center gap-4">
      {TABS.map((tab) => (
        <button
          onClick={() => setSelected(tab)}
          className={`relative overflow-hidden whitespace-nowrap rounded-md border-[1px] px-3 py-1.5 text-sm font-medium transition-colors duration-500 ${
            selected === tab
              ? "border-green-500 text-slate-50"
              : "border-slate-600 bg-transparent text-slate-400"
          }`}
          key={tab}
        >
          <span className="relative z-10">{tab}</span>
          <AnimatePresence>
            {selected === tab && (
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "100%" }}
                transition={{
                  duration: 0.5,
                  ease: "backIn",
                }}
                className="absolute inset-0 z-0 bg-gradient-to-r from-green-600 to-white-600"
              />
            )}
          </AnimatePresence>
        </button>
      ))}
    </div>
  );
};

const Questions: React.FC<QuestionsProps> = ({ selected }) => {
  return (
    <div className="mx-auto mt-12 max-w-3xl">
      <AnimatePresence mode="wait">
        {Object.entries(QUESTIONS).map(([tab, questions]) => {
          return selected === tab ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{
                duration: 0.5,
                ease: "backIn",
              }}
              className="space-y-4"
              key={tab}
            >
              {questions.map((q, idx) => (
                <Question key={idx} {...q} />
              ))}
            </motion.div>
          ) : undefined;
        })}
      </AnimatePresence>
    </div>
  );
};

const Question: React.FC<QuestionProps> = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      animate={open ? "open" : "closed"}
      className={`rounded-xl border-[1px] border-slate-700 px-4 transition-colors ${
        open ? "bg-slate-800" : "bg-slate-900"
      }`}
    >
      <button
        onClick={() => setOpen((pv) => !pv)}
        className="flex w-full items-center justify-between gap-4 py-4"
      >
        <span
          className={`text-left text-lg font-medium transition-colors ${
            open ? "text-slate-50" : "text-slate-400"
          }`}
        >
          {question}
        </span>
        <motion.span
          variants={{
            open: {
              rotate: "45deg",
            },
            closed: {
              rotate: "0deg",
            },
          }}
        >
          <FiPlus
            className={`text-2xl transition-colors ${
              open ? "text-slate-50" : "text-slate-400"
            }`}
          />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: open ? "fit-content" : "0px",
          marginBottom: open ? "24px" : "0px",
        }}
        className="overflow-hidden text-slate-400"
      >
        <p>{answer}</p>
      </motion.div>
    </motion.div>
  );
};

export default TabsFAQ;
