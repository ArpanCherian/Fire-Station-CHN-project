import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPhone, FiMail, FiMapPin, FiClock, FiSend, FiUser, FiMessageCircle } from 'react-icons/fi';
import { FaFire } from 'react-icons/fa';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const contactInfo = [
    {
      icon: FiPhone,
      title: 'Emergency Line',
      primary: '101',
      secondary: 'Available 24/7',
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      icon: FiPhone,
      title: 'Office Phone',
      primary: '(555) 123-4567',
      secondary: 'Mon-Fri: 8AM-6PM',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: FiMail,
      title: 'Email Address',
      primary: 'info@chengannurfire.gov',
      secondary: 'Response within 24 hours',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: FiMapPin,
      title: 'Station Address',
      primary: '123 Fire Safety Road',
      secondary: 'Chengannur, Kerala 689121',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const operatingHours = [
    { day: 'Emergency Services', hours: '24/7', highlight: true },
    { day: 'Monday - Friday', hours: '8:00 AM - 6:00 PM' },
    { day: 'Saturday', hours: '9:00 AM - 4:00 PM' },
    { day: 'Sunday', hours: '10:00 AM - 2:00 PM' },
    { day: 'Public Holidays', hours: 'Emergency Only' }
  ];

  const departments = [
    {
      name: 'Fire Emergency',
      phone: '101',
      email: 'emergency@chengannurfire.gov',
      description: 'Immediate fire response and suppression'
    },
    {
      name: 'Rescue Operations',
      phone: '(555) 123-4568',
      email: 'rescue@chengannurfire.gov',
      description: 'Water rescue, medical assist, and general emergencies'
    },
    {
      name: 'Fire Prevention',
      phone: '(555) 123-4569',
      email: 'prevention@chengannurfire.gov',
      description: 'Safety inspections and community education'
    },
    {
      name: 'Administrative',
      phone: '(555) 123-4567',
      email: 'admin@chengannurfire.gov',
      description: 'General inquiries and administrative services'
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setShowSuccess(true);
    setFormData({ name: '', email: '', subject: '', message: '' });

    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get in touch with Chengannur Fire Rescue Services. We're here to serve our community 
            with professional emergency response and support services.
          </p>
        </motion.div>

        {/* Emergency Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-red-600 text-white rounded-xl p-6 mb-12 text-center"
        >
          <div className="flex items-center justify-center space-x-3 mb-3">
            <FaFire className="w-8 h-8" />
            <h2 className="text-2xl font-bold">Emergency Services</h2>
          </div>
          <p className="text-lg mb-4">For immediate emergency assistance, call our emergency line:</p>
          <a href="tel:101" className="inline-flex items-center space-x-2 bg-white text-red-600 px-6 py-3 rounded-full font-bold text-xl hover:bg-gray-100 transition-colors duration-200">
            <FiPhone className="w-6 h-6" />
            <span>101</span>
          </a>
        </motion.div>

        {/* Contact Information Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((info, index) => (
            <motion.div
              key={info.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className={`w-14 h-14 ${info.bgColor} rounded-xl flex items-center justify-center mb-4`}>
                <info.icon className={`w-7 h-7 ${info.color}`} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{info.title}</h3>
              <p className="text-gray-900 font-medium mb-1">{info.primary}</p>
              <p className="text-gray-500 text-sm">{info.secondary}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
            
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-green-800">Message Sent Successfully!</h4>
                    <p className="text-green-600 text-sm">We'll get back to you within 24 hours.</p>
                  </div>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200"
                      placeholder="Your full name"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200"
                  placeholder="What is this regarding?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <div className="relative">
                  <FiMessageCircle className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                  <textarea
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200 resize-none"
                    placeholder="Please provide details about your inquiry..."
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className={`w-full flex items-center justify-center space-x-3 py-4 rounded-lg font-bold text-lg transition-all duration-200 ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-red-600 hover:bg-red-700 shadow-lg hover:shadow-xl'
                } text-white`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <FiSend className="w-6 h-6" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Map and Additional Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            {/* Interactive Map */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Find Our Station</h3>
                <p className="text-gray-600 mb-4">
                  Located in the heart of Chengannur, our fire station is strategically positioned 
                  for rapid response throughout the district.
                </p>
              </div>
              <div className="h-80 bg-gray-200 relative overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3934.8951234567!2d76.6174!3d9.3139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0884c1aa394b67%3A0x21c7c1aa394b6701!2sChengannur%2C%20Kerala%2C%20India!5e0!3m2!1sen!2sus!4v1234567890123"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Chengannur Fire Station Location"
                ></iframe>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-3 mb-6">
                <FiClock className="w-6 h-6 text-red-600" />
                <h3 className="text-xl font-bold text-gray-900">Operating Hours</h3>
              </div>
              <div className="space-y-3">
                {operatingHours.map((schedule, index) => (
                  <div
                    key={index}
                    className={`flex justify-between items-center py-2 px-3 rounded-lg ${
                      schedule.highlight 
                        ? 'bg-red-50 border border-red-200' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className={`font-medium ${
                      schedule.highlight ? 'text-red-800' : 'text-gray-700'
                    }`}>
                      {schedule.day}
                    </span>
                    <span className={`font-semibold ${
                      schedule.highlight ? 'text-red-600' : 'text-gray-900'
                    }`}>
                      {schedule.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Department Contacts */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Department Contacts</h3>
              <div className="space-y-4">
                {departments.map((dept, index) => (
                  <motion.div
                    key={dept.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="border border-gray-200 rounded-lg p-4 hover:border-red-300 transition-colors duration-200"
                  >
                    <h4 className="font-bold text-gray-900 mb-2">{dept.name}</h4>
                    <p className="text-sm text-gray-600 mb-3">{dept.description}</p>
                    <div className="flex flex-col space-y-1">
                      <a href={`tel:${dept.phone}`} className="text-red-600 hover:text-red-700 text-sm font-medium">
                        📞 {dept.phone}
                      </a>
                      <a href={`mailto:${dept.email}`} className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        ✉️ {dept.email}
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
