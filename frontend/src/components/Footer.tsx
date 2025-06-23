import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-900 text-white py-6 mt-12">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Jane Marnel 2025. All rights reserved.
        </p>
        <div className="flex gap-4 mt-2 md:mt-0">
          <a href="#privacy" className="hover:underline text-sm">Privacy Policy</a>
          <a href="#terms" className="hover:underline text-sm">Terms of Service</a>
          <a href="#contact" className="hover:underline text-sm">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
