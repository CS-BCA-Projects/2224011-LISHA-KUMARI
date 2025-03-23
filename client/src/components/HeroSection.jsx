import React from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleReportLostItem = () => {
    navigate("/report/lost"); // Navigate to report/lost
  };

  const handleReportFoundItem = () => {
    navigate("/report/found"); // Navigate to report/found
  };

  return (
    <section className="relative bg-[#f4f4fc] overflow-hidden pt-24 pb-20">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Side Text */}
          <div className="space-y-6">
            <h1 className="text-6xl font-black text-gray-900 leading-tight">
              Lost Something?<br />We'll Help You Find It
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
              Our university's lost and found platform helps connect lost items with their rightful owners. 
              Report or search for items quickly and securely.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleReportLostItem}
                className="bg-[#635DFF] text-white px-6 py-3 rounded-lg flex items-center gap-2 shadow-md"
              >
                <i className="ri-search-line"></i> Report Lost Item
              </button>
              <button
                onClick={handleReportFoundItem}
                className="border border-[#635DFF] text-[#635DFF] px-6 py-3 rounded-lg flex items-center gap-2 shadow-sm transition hover:bg-[#635DFF] hover:text-white"
              >
                <i className="ri-flag-line"></i> Report Found Item
              </button>
            </div>
          </div>

          {/* Right Side Image */}
          <div className="relative">
            <img
              src="https://public.readdy.ai/ai/img_res/ff41d02fae6d20c30b556796247629bd.jpg"
              alt="Lost and Found Items"
              className="w-full h-auto rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
