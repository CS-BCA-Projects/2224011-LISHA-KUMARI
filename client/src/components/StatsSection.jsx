import React from "react";

const StatsSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: "ri-archive-line", number: "1,234+", text: "Items Recovered" },
          { icon: "ri-file-list-3-line", number: "89%", text: "Success Rate" },
          { icon: "ri-time-line", number: "156", text: "Active Reports" },
        ].map((stat, index) => (
          <div key={index} className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <i className={`${stat.icon} text-primary text-2xl`}></i>
            </div>
            <h3 className="text-2xl font-bold mb-2">{stat.number}</h3>
            <p className="text-gray-600">{stat.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
