import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-500 text-white p-4 text-center">
      <p className="text-sm">&copy; {new Date().getFullYear()} Navata Tech. All rights reserved.</p>
      <p className="text-sm">Designed By Navata Tech</p>
    </footer>
  );
}
export default Footer;
