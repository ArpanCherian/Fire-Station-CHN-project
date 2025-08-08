import React from 'react';
import { motion } from 'framer-motion';
import { FiPhone, FiMail, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiYoutube } from 'react-icons/fi';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const emergencyNumbers = [
    { service: 'Fire', number: '101' },
    { service: 'Ambulance', number: '102' },
    { service: 'Police', number: '100' },
    { service: 'Disaster', number: '108' }
  ];

  const socialLinks = [
    { icon: FiFacebook, href: '#', label: 'Facebook' },
    { icon: FiTwitter, href: '#', label: 'Twitter' },
    { icon: FiInstagram, href: '#', label: 'Instagram' },
    { icon: FiYoutube, href: '#', label: 'YouTube' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold text-red-400 mb-6">Contact Us</h3>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <FiMapPin className="w-5 h-5 text-red-400 flex-shrink-0" />
                <div>
                  <p className="font-medium">123 Fire Safety Road, Chengannur</p>
                  <p className="text-gray-400">Kerala 689121, India</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <FiPhone className="w-5 h-5 text-red-400 flex-shrink-0" />
                <div>
                  <p className="font-medium">Emergency: 101</p>
                  <p className="text-gray-400">Office: (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <FiMail className="w-5 h-5 text-red-400 flex-shrink-0" />
                <div>
                  <p className="font-medium">info@chengannurfire.gov</p>
                  <p className="text-gray-400">Available 24/7</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Emergency Numbers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold text-red-400 mb-6">Emergency Numbers</h3>
            
            <div className="space-y-3">
              {emergencyNumbers.map((emergency) => (
                <div key={emergency.service} className="flex items-center justify-between">
                  <span className="text-gray-300">{emergency.service}:</span>
                  <a
                    href={`tel:${emergency.number}`}
                    className="font-bold text-red-400 hover:text-red-300 transition-colors duration-200"
                  >
                    {emergency.number}
                  </a>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-gray-700">
              <p className="text-sm text-gray-400">
                For non-emergency inquiries, please call our office number or send us an email.
              </p>
            </div>
          </motion.div>

          {/* Follow Us */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold text-red-400 mb-6">Follow Us</h3>
            
            <p className="text-gray-400 mb-4">
              Stay updated with our latest news, safety tips, and community events.
            </p>
            
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-200 group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-200" />
                </motion.a>
              ))}
            </div>

            <div className="pt-4">
              <h4 className="font-medium text-gray-300 mb-2">Operating Hours</h4>
              <div className="text-sm text-gray-400 space-y-1">
                <div className="flex justify-between">
                  <span>Emergency Services:</span>
                  <span className="text-red-400 font-medium">24/7</span>
                </div>
                <div className="flex justify-between">
                  <span>Office Hours:</span>
                  <span>Mon-Fri 8AM-6PM</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="border-t border-gray-700 mt-12 pt-8 text-center"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">🔥</span>
              </div>
              <div>
                <p className="font-bold text-red-400">Chengannur Fire Rescue Services</p>
                <p className="text-xs text-gray-400">Serving the community since 1985</p>
              </div>
            </div>
            
            <div className="text-sm text-gray-400">
              <p>© {currentYear} Chengannur Fire Rescue Services. All rights reserved.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
