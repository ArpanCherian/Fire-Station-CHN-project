import React from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiShield, FiAward, FiHeart, FiClock, FiTarget } from 'react-icons/fi';
import { FaFire } from 'react-icons/fa';

const About: React.FC = () => {
  const values = [
    {
      icon: FiShield,
      title: 'Courage',
      description: 'We face danger head-on to protect our community, demonstrating bravery in every emergency response.',
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      icon: FiUsers,
      title: 'Teamwork',
      description: 'We work together as one unified force, supporting each other to achieve our mission effectively.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: FiHeart,
      title: 'Compassion',
      description: 'We serve with empathy and care, treating every life as precious and every call as critical.',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: FiAward,
      title: 'Excellence',
      description: 'We strive for the highest standards in training, equipment, and service delivery.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const timeline = [
    { year: '1985', event: 'Chengannur Fire Station Established', description: 'Founded to serve the growing community needs' },
    { year: '1995', event: 'First Modern Fire Engine Acquired', description: 'Upgraded equipment for better emergency response' },
    { year: '2005', event: 'Rescue Division Expanded', description: 'Added water rescue and medical assistance capabilities' },
    { year: '2015', event: 'Digital Emergency System Launched', description: 'Implemented modern dispatch and communication systems' },
    { year: '2023', event: 'Web Portal Development', description: 'Created comprehensive online emergency reporting system' }
  ];

  const team = [
    {
      name: 'Captain Rajesh Kumar',
      role: 'Fire Chief',
      experience: '25 years',
      specialization: 'Fire Suppression & Leadership'
    },
    {
      name: 'Lt. Priya Nair',
      role: 'Rescue Operations Head',
      experience: '18 years',
      specialization: 'Water Rescue & Medical Assistance'
    },
    {
      name: 'Sgt. Arun Menon',
      role: 'Training Coordinator',
      experience: '20 years',
      specialization: 'Fire Prevention & Community Education'
    },
    {
      name: 'Officer Lakshmi Pillai',
      role: 'Emergency Dispatcher',
      experience: '12 years',
      specialization: 'Emergency Communications & Coordination'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About Chengannur Fire Rescue Services
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Dedicated to protecting life, property, and the environment through professional 
            emergency response services since 1985. We are your trusted guardians in times of need.
          </p>
        </motion.div>

        {/* Mission & Vision Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <div className="flex items-center space-x-3 mb-6">
              <FiTarget className="w-8 h-8 text-red-600" />
              <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              To protect and serve our community through rapid emergency response, fire prevention, 
              rescue operations, and public safety education. We are committed to preserving life, 
              property, and the environment while maintaining the highest standards of professionalism 
              and integrity.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <div className="flex items-center space-x-3 mb-6">
              <FaFire className="w-8 h-8 text-red-600" />
              <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              To be the leading fire rescue service in Kerala, recognized for our excellence in 
              emergency response, innovation in fire safety, and unwavering commitment to community 
              protection. We envision a safer tomorrow through proactive prevention and rapid response.
            </p>
          </motion.div>
        </div>

        {/* Core Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These principles guide every action we take and every decision we make in service to our community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-16 h-16 ${value.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <value.icon className={`w-8 h-8 ${value.color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* History Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our History</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Nearly four decades of dedicated service to the Chengannur community and surrounding areas.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-start space-x-4"
                >
                  <div className="flex-shrink-0 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 font-bold">{item.year}</span>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{item.event}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Leadership Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet the experienced professionals leading our fire rescue operations and community safety initiatives.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiUsers className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-red-600 font-medium mb-2">{member.role}</p>
                <p className="text-sm text-gray-600 mb-2">{member.experience} experience</p>
                <p className="text-xs text-gray-500">{member.specialization}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Statistics Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-lg text-gray-600">
              Proud statistics that reflect our commitment to community safety and emergency response excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: '10,000+', label: 'Lives Protected', icon: FiUsers },
              { number: '98.5%', label: 'Response Success Rate', icon: FiShield },
              { number: '<5min', label: 'Average Response Time', icon: FiClock },
              { number: '50+', label: 'Community Programs', icon: FiAward }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-red-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
