import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiClock, FiPhone, FiUsers, FiShield, FiHeart, FiTool, FiMapPin, FiCheckCircle } from 'react-icons/fi';
import { FaFire } from 'react-icons/fa';

const Services: React.FC = () => {
  const emergencyServices = [
    {
      icon: FaFire,
      title: 'Fire Suppression',
      description: 'Rapid response to structure fires, vehicle fires, and wildland fires with professional firefighting equipment and trained personnel.',
      features: ['24/7 Emergency Response', 'Professional Firefighters', 'Modern Equipment', 'Hazmat Certified'],
      responseTime: '< 5 minutes',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      icon: FiShield,
      title: 'Rescue Operations',
      description: 'Comprehensive rescue services including water rescue, high-angle rescue, confined space rescue, and vehicle extrication.',
      features: ['Water Rescue Team', 'Technical Rescue', 'Vehicle Extrication', 'Search & Rescue'],
      responseTime: '< 7 minutes',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      icon: FiHeart,
      title: 'Medical Assistance',
      description: 'Emergency medical services and first aid support working in coordination with local hospitals and ambulance services.',
      features: ['EMT Certified Staff', 'First Aid & CPR', 'Medical Equipment', 'Hospital Coordination'],
      responseTime: '< 4 minutes',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      icon: FiTool,
      title: 'General Emergency',
      description: 'Response to various emergencies including fallen trees, gas leaks, elevator rescues, and other public safety incidents.',
      features: ['Public Assistance', 'Hazard Mitigation', 'Emergency Response', 'Community Support'],
      responseTime: '< 10 minutes',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    }
  ];

  const preventionServices = [
    {
      icon: FiShield,
      title: 'Fire Safety Inspections',
      description: 'Regular inspections of commercial and residential buildings to ensure compliance with fire safety codes.',
      availability: 'Mon-Fri: 8AM-6PM'
    },
    {
      icon: FiUsers,
      title: 'Community Education',
      description: 'Fire safety programs for schools, businesses, and community groups to promote fire prevention awareness.',
      availability: 'By Appointment'
    },
    {
      icon: FiTool,
      title: 'Safety Equipment Testing',
      description: 'Testing and certification of fire extinguishers, smoke detectors, and other fire safety equipment.',
      availability: 'Mon-Sat: 9AM-5PM'
    },
    {
      icon: FiHeart,
      title: 'CPR & First Aid Training',
      description: 'Certified training courses for individuals and organizations in CPR, first aid, and basic life support.',
      availability: 'Scheduled Classes'
    }
  ];

  const serviceAreas = [
    { area: 'Chengannur Municipality', population: '32,000+', stations: '1 Main Station' },
    { area: 'Pandanad Panchayat', population: '28,000+', stations: 'Sub Station' },
    { area: 'Mulakkuzha Village', population: '15,000+', stations: 'Response Unit' },
    { area: 'Ennakkad Panchayat', population: '22,000+', stations: 'Mobile Unit' }
  ];

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
            Our Services
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive emergency response and fire prevention services available 24/7 
            to protect and serve our community with professional excellence.
          </p>
        </motion.div>

        {/* Emergency Response Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Emergency Response Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our trained professionals are ready to respond to emergencies 24 hours a day, 7 days a week.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {emergencyServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.02 }}
                className={`bg-white rounded-xl shadow-lg border-2 ${service.borderColor} p-8 hover:shadow-xl transition-all duration-300`}
              >
                <div className="flex items-start space-x-4 mb-6">
                  <div className={`w-16 h-16 ${service.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <service.icon className={`w-8 h-8 ${service.color}`} />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                    <div className="flex items-center space-x-2 mb-3">
                      <FiClock className={`w-4 h-4 ${service.color}`} />
                      <span className={`text-sm font-medium ${service.color}`}>
                        Response Time: {service.responseTime}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 mb-6">{service.description}</p>

                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 mb-3">Key Capabilities:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <FiCheckCircle className={`w-4 h-4 ${service.color}`} />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Fire Prevention Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Fire Prevention & Education</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Prevention is the best protection. We offer various services to help prevent emergencies before they occur.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {preventionServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <service.icon className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                    <div className="flex items-center space-x-2">
                      <FiClock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{service.availability}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Service Areas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Service Coverage Areas</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive emergency services across multiple jurisdictions in the Chengannur region.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2 lg:grid-cols-4">
              {serviceAreas.map((area, index) => (
                <motion.div
                  key={area.area}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="p-6 text-center border-r border-gray-200 last:border-r-0"
                >
                  <FiMapPin className="w-8 h-8 text-red-600 mx-auto mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">{area.area}</h3>
                  <p className="text-sm text-gray-600 mb-1">Population: {area.population}</p>
                  <p className="text-sm text-red-600 font-medium">{area.stations}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Emergency Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-red-600 text-white rounded-xl p-8 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Need Emergency Services?</h2>
          <p className="text-xl mb-8 text-red-100">
            Don't wait - call immediately for any emergency situation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href="tel:101"
              className="inline-flex items-center space-x-3 bg-white text-red-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <FiPhone className="w-6 h-6" />
              <span>Emergency: 101</span>
            </a>
            <a
              href="tel:(555) 123-4567"
              className="inline-flex items-center space-x-3 bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-red-600 transition-all duration-200"
            >
              <FiPhone className="w-6 h-6" />
              <span>Office: (555) 123-4567</span>
            </a>
          </div>
          <div className="text-center">
            <p className="text-red-100 mb-4">
              For non-emergency services and appointments, you can also access our online portal:
            </p>
            <Link
              to="/login"
              className="inline-flex items-center space-x-2 text-white hover:text-red-200 transition-colors duration-200"
            >
              <FiUsers className="w-5 h-5" />
              <span>Access Online Portal →</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Services;
