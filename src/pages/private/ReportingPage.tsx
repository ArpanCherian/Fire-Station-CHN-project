import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFile, FiDroplet, FiHeart, FiAlertTriangle } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import FireIncident from '../../components/forms/FireIncident';
import WaterRescue from '../../components/forms/WaterRescue';
import MedicalAssist from '../../components/forms/MedicalAssist';
import GeneralIncident from '../../components/forms/GeneralIncident';

type CaseType = 'fire' | 'water' | 'medical' | 'general' | null;

const ReportingPage: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<CaseType>(null);
  const { user } = useAuth();

  const caseTypes = [
    {
      id: 'fire' as const,
      title: 'Fire Incident',
      description: 'Report fires, explosions, and related emergencies',
      icon: FiFile,
      color: 'red',
      gradient: 'from-red-500 to-red-600'
    },
    {
      id: 'water' as const,
      title: 'Water Rescue',
      description: 'Report water rescues, drowning incidents, and aquatic emergencies',
      icon: FiDroplet,
      color: 'blue',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      id: 'medical' as const,
      title: 'Medical Assist',
      description: 'Report medical emergencies requiring fire department assistance',
      icon: FiHeart,
      color: 'green',
      gradient: 'from-green-500 to-green-600'
    },
    {
      id: 'general' as const,
      title: 'General Incident',
      description: 'Report other incidents like road hazards, fallen trees, etc.',
      icon: FiAlertTriangle,
      color: 'yellow',
      gradient: 'from-yellow-500 to-yellow-600'
    }
  ];

  const handleCaseSelect = (caseType: CaseType) => {
    setSelectedCase(caseType);
  };

  const handleBackToSelection = () => {
    setSelectedCase(null);
  };

  const renderCaseForm = () => {
    switch (selectedCase) {
      case 'fire':
        return <FireIncident onBack={handleBackToSelection} />;
      case 'water':
        return <WaterRescue onBack={handleBackToSelection} />;
      case 'medical':
        return <MedicalAssist onBack={handleBackToSelection} />;
      case 'general':
        return <GeneralIncident onBack={handleBackToSelection} />;
      default:
        return null;
    }
  };

  if (selectedCase) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        {renderCaseForm()}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Report Emergency Case
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select the type of emergency you need to report. Fill out the appropriate form with 
            accurate details to ensure proper response coordination.
          </p>
          <div className="mt-6 inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-lg">
            <span className="text-sm font-medium text-blue-700">
              Logged in as: {user?.name} ({user?.role?.toUpperCase()})
            </span>
          </div>
        </motion.div>

        {/* Case Type Selection Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {caseTypes.map((caseType, index) => (
            <motion.div
              key={caseType.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCaseSelect(caseType.id)}
              className="bg-white rounded-xl shadow-lg border-2 border-gray-100 p-6 cursor-pointer hover:shadow-xl transition-all duration-300 group"
            >
              <div className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${caseType.gradient} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                  <caseType.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300">
                  {caseType.title}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {caseType.description}
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-2 px-4 bg-gradient-to-r ${caseType.gradient} text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200`}
                >
                  Select & Report
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-white rounded-xl shadow-lg p-8"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Help?</h2>
            <p className="text-gray-600 mb-6">
              If you're unsure which category your emergency falls under, or if you need immediate assistance:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:911"
                className="inline-flex items-center justify-center px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors duration-200"
              >
                🚨 Call 911 for Immediate Emergency
              </a>
              <a
                href="tel:(555) 123-4567"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
              >
                📞 Fire Station Non-Emergency Line
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ReportingPage;
