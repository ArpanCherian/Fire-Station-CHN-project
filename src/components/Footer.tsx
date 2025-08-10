import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const emergencyNumbers = [
    { service: 'Fire', number: '101' },
    { service: 'Ambulance', number: '102' },
    { service: 'Police', number: '100' },
    { service: 'Disaster', number: '108' }
  ];

  return (
    <footer className="bg-gray-900 text-white w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mt-0 mb-0">
      <div className="py-12 px-4 w-full">
        <div className="max-w-6xl mx-auto">
          {/* Emergency Numbers Section - Centered */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-2xl font-bold text-red-400 mb-8">Emergency Numbers</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              {emergencyNumbers.map((emergency) => (
                <div key={emergency.service} className="text-center">
                  <div className="text-gray-300 text-sm mb-2">{emergency.service}</div>
                  <a
                    href={`tel:${emergency.number}`}
                    className="text-2xl font-bold text-red-400 hover:text-red-300 transition-colors duration-200 block"
                  >
                    {emergency.number}
                  </a>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-700 max-w-md mx-auto">
              <p className="text-gray-400 text-sm">
                For non-emergency inquiries, please call our office number or send us an email.
              </p>
            </div>
          </motion.div>

          {/* Footer Bottom */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="border-t border-gray-700 pt-8"
          >
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              {/* Logo & Company */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">🔥</span>
                </div>
                <div>
                  <p className="font-bold text-red-400 text-lg">Chengannur Fire Rescue Services</p>
                  <p className="text-xs text-gray-400">Serving the community since 1985</p>
                </div>
              </div>
              
              {/* Copyright & College Attribution */}
              <div className="text-center md:text-right">
                <p className="text-sm text-gray-400 mb-1">
                  © {currentYear} Chengannur Fire Rescue Services. All rights reserved.
                </p>
                <p className="text-sm text-gray-500 italic">
                  Created by students of College of Engineering Chengannur
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
