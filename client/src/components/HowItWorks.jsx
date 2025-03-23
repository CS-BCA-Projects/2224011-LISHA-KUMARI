import React from "react";
import { FaFileAlt, FaSearch, FaExchangeAlt } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaFileAlt className="text-primary text-3xl" />,
      title: "Report Item",
      description: "Submit a detailed report about your lost or found item",
    },
    {
      icon: <FaSearch className="text-primary text-3xl" />,
      title: "Match Found",
      description: "We'll notify you when a matching item is reported",
    },
    {
      icon: <FaExchangeAlt className="text-primary text-3xl" />,
      title: "Connect & Recover",
      description:
        "Securely connect with the finder/owner to recover the item",
    },
  ];

  return (
    <section className="py-20 bg-white text-center">
      <h2 className="text-3xl font-bold mb-10">How It Works</h2>
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-16 h-16 bg-primary/10 flex items-center justify-center rounded-full mb-4">
              {step.icon}
            </div>
            <h3 className="text-lg font-semibold">{step.title}</h3>
            <p className="text-gray-600 max-w-xs">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
