import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
        <div>
          <span className="text-2xl font-['Pacifico'] text-white">lofo</span>
          <p className="text-gray-400">Helping students reconnect with lost belongings.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-white">Report Lost</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Report Found</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Contact</h4>
          <p className="text-gray-400">support@university.edu</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
