import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiDroplet, FiHeart, FiAlertTriangle, FiPlus, FiBarChart2, FiClock, FiCheckCircle } from 'react-icons/fi';
import { FaFire } from 'react-icons/fa'; // Fire icon from Font Awesome
import { useAuth } from '../../hooks/useAuth';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import StatsCard from '../../components/dashboard/StatsCard';
import CaseCard from '../../components/dashboard/CaseCard';
import type { CaseReport } from '../../types';

const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const [cases] = useLocalStorage<CaseReport[]>('fireforce_cases', []);

  // Filter cases reported by this user
  const userCases = cases.filter(caseItem => caseItem.reportedBy === user?.name);

  // Calculate stats
  const totalCases = userCases.length;
  const pendingCases = userCases.filter(caseItem => caseItem.status === 'pending').length;
  const activeCases = userCases.filter(caseItem => caseItem.status === 'active').length;
  const resolvedCases = userCases.filter(caseItem => caseItem.status === 'resolved').length;

  // Recent cases (last 5)
  const recentCases = userCases.slice(0, 5);

  const getCaseIcon = (type: string) => {
    switch (type) {
      case 'fire': return FaFire; // Using Font Awesome fire icon
      case 'water': return FiDroplet;
      case 'medical': return FiHeart;
      case 'general': return FiAlertTriangle;
      default: return FiAlertTriangle;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}
          </h1>
          <p className="text-lg text-gray-600">
            Your emergency reporting dashboard - Track your submitted cases and report new incidents
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Reports"
            value={totalCases}
            icon={FiBarChart2}
            color="blue"
          />
          <StatsCard
            title="Pending Cases"
            value={pendingCases}
            icon={FiClock}
            color="yellow"
          />
          <StatsCard
            title="Active Cases"
            value={activeCases}
            icon={FiAlertTriangle}
            color="red"
          />
          <StatsCard
            title="Resolved Cases"
            value={resolvedCases}
            icon={FiCheckCircle}
            color="green"
          />
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              to="/user/report"
              className="flex items-center space-x-3 p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-200 group"
            >
              <div className="p-2 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors duration-200">
                <FiPlus className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Report New Case</h3>
                <p className="text-sm text-gray-600">Submit a new emergency report</p>
              </div>
            </Link>

            <Link
              to="/user/analytics"
              className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200 group"
            >
              <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors duration-200">
                <FiBarChart2 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">View Analytics</h3>
                <p className="text-sm text-gray-600">See your reporting statistics</p>
              </div>
            </Link>

            <a
              href="tel:911"
              className="flex items-center space-x-3 p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors duration-200 group"
            >
              <div className="p-2 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors duration-200">
                <FiAlertTriangle className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Emergency Call</h3>
                <p className="text-sm text-gray-600">Call 911 for immediate help</p>
              </div>
            </a>
          </div>
        </motion.div>

        {/* Recent Cases */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Recent Cases</h2>
            {totalCases > 5 && (
              <Link
                to="/user/analytics"
                className="text-red-600 hover:text-red-700 font-medium"
              >
                View All Cases →
              </Link>
            )}
          </div>

          {recentCases.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentCases.map((caseItem, index) => (
                <motion.div
                  key={caseItem.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <CaseCard
                    case={caseItem}
                    icon={getCaseIcon(caseItem.type)}
                    canEdit={false}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiBarChart2 className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Cases Yet</h3>
              <p className="text-gray-600 mb-6">You haven't reported any cases yet. Start by reporting your first emergency case.</p>
              <Link
                to="/user/report"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                <FiPlus className="w-5 h-5" />
                <span>Report Your First Case</span>
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default UserDashboard;
