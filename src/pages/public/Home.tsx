import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShield, FiUsers, FiClock, FiAward, FiPhone, FiMapPin, FiTrendingUp, FiCheckCircle, FiActivity, FiCalendar } from 'react-icons/fi';
import { FaFire } from 'react-icons/fa';

const Home: React.FC = () => {
  const services = [
    {
      icon: FaFire,
      title: 'Fire Emergency',
      description: 'Rapid response to fire incidents with professional firefighting teams.',
      color: 'text-red-600'
    },
    {
      icon: FiShield,
      title: 'Rescue Operations',
      description: 'Comprehensive rescue services for water, medical, and general emergencies.',
      color: 'text-blue-600'
    },
    {
      icon: FiUsers,
      title: 'Community Safety',
      description: 'Public education and safety programs to prevent emergencies.',
      color: 'text-green-600'
    }
  ];

  const stats = [
    { 
      number: '10,000+', 
      label: 'Lives Saved', 
      icon: FiUsers, 
      color: 'from-blue-400 to-blue-600',
      effect: 'hover:rotate-12' 
    },
    { 
      number: '98.5%', 
      label: 'Response Rate', 
      icon: FiTrendingUp, 
      color: 'from-green-400 to-green-600',
      effect: 'hover:scale-110' 
    },
    { 
      number: '24/7', 
      label: 'Available', 
      icon: FiActivity, 
      color: 'from-yellow-400 to-yellow-600',
      effect: 'hover:pulse' 
    },
    { 
      number: '50+', 
      label: 'Years Service', 
      icon: FiCalendar, 
      color: 'from-purple-400 to-purple-600',
      effect: 'hover:-rotate-6' 
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/images/hero-bg.webp')` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 text-center text-white px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Chengannur Fire
              <span className="text-red-500"> Rescue</span> Services
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Professional firefighting and emergency response services serving our community since 1985
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  href="tel:101"
                  className="inline-flex items-center space-x-3 px-8 py-4 bg-red-600 text-white rounded-full font-bold text-lg hover:bg-red-700 transition-colors duration-200 shadow-lg"
                >
                  <FiPhone className="w-6 h-6" />
                  <span>Emergency: 101</span>
                </a>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/login"
                  className="inline-flex items-center space-x-3 px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-red-600 transition-all duration-200"
                >
                  <FiUsers className="w-6 h-6" />
                  <span>Access Portal</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive emergency response services available 24/7 for the safety of our community
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <service.icon className={`w-8 h-8 ${service.color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Statistics Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-red-800 text-white relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white opacity-5 rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-white opacity-5 rounded-full"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white opacity-5 rounded-full"></div>
        </div>
        
        <div className="container mx-auto px-6 relative">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="text-center group cursor-pointer"
              >
                <motion.div
                  className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg transform transition-all duration-300 ${stat.effect} group-hover:shadow-2xl`}
                  whileHover={{ scale: 1.1 }}
                >
                  <stat.icon className="w-10 h-10 text-white" />
                </motion.div>
                <motion.div 
                  className="text-4xl font-bold mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 + 0.3 }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-red-100 font-medium">{stat.label}</div>
                
                {/* Animated underline effect */}
                <motion.div
                  className="w-0 h-1 bg-white mx-auto mt-2 group-hover:w-full transition-all duration-300"
                  whileHover={{ width: '100%' }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section Only */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                To protect life, property, and the environment through professional emergency response, 
                fire prevention, and community education services. We are committed to serving our 
                community with excellence, integrity, and dedication.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: FiShield,
                  title: 'Professional Emergency Response',
                  description: 'Rapid deployment of trained personnel and equipment for all emergency situations.'
                },
                {
                  icon: FiUsers,
                  title: 'Community Safety Programs',
                  description: 'Educational initiatives to promote fire safety awareness and prevention.'
                },
                {
                  icon: FaFire,
                  title: 'Fire Prevention Education',
                  description: 'Comprehensive training and inspection services to reduce fire risks.'
                },
                {
                  icon: FiClock,
                  title: '24/7 Emergency Coverage',
                  description: 'Round-the-clock availability for immediate response to emergency calls.'
                }
              ].map((mission, index) => (
                <motion.div
                  key={mission.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center"
                  >
                    <mission.icon className="w-6 h-6 text-red-600" />
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{mission.title}</h3>
                    <p className="text-gray-600">{mission.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Access Our Portal?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Report emergencies, access analytics, and manage cases through our comprehensive emergency response portal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login"
                className="inline-flex items-center space-x-3 px-8 py-4 bg-red-600 text-white rounded-full font-bold text-lg hover:bg-red-700 transition-colors duration-200 shadow-lg"
              >
                <FiUsers className="w-6 h-6" />
                <span>Login to Portal</span>
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center space-x-3 px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-gray-900 transition-all duration-200"
              >
                <FiShield className="w-6 h-6" />
                <span>Learn More</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
