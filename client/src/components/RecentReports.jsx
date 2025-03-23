import React from "react";

const RecentReports = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Recent Reports</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { status: "Lost", time: "2 hours ago", title: "Black Leather Wallet", desc: "Lost near University Library", img: "https://public.readdy.ai/ai/img_res/dc42c4dcc8ba005f811d7b1e53dedddd.jpg" },
            { status: "Found", time: "5 hours ago", title: "MacBook Pro", desc: "Found in Science Building", img: "https://public.readdy.ai/ai/img_res/6328c4420c381c9410dcfc2e7b593360.jpg" },
          ].map((report, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src={report.img} alt={report.title} className="w-full h-48 object-cover"/>
              <div className="p-6">
                <span className={`px-3 py-1 rounded-full text-sm ${report.status === "Lost" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>{report.status}</span>
                <h3 className="text-lg font-semibold mt-2">{report.title}</h3>
                <p className="text-gray-600">{report.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentReports;
