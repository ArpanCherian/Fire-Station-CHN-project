import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiDroplet, FiHeart, FiAlertTriangle, FiUsers, FiBarChart2, FiSettings, FiTrendingUp } from 'react-icons/fi';
import { FaFire } from 'react-icons/fa'; // Fire icon from Font Awesome
import { useAuth } from '../../hooks/useAuth';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import StatsCard from '../../components/dashboard/StatsCard';
import CaseCard from '../../components/dashboard/CaseCard';
import AnalyticsChart from '../../components/dashboard/AnalyticsChart';
import type { CaseReport } from '../../types';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [cases] = useLocalStorage<CaseReport[]>('fireforce_cases', []);

  // Calculate comprehensive stats
  const totalCases = cases.length;
  const pendingCases = cases.filter(caseItem => caseItem.status === 'pending').length;
  const activeCases = cases.filter(caseItem => caseItem.status === 'active').length;
  const resolvedCases = cases.filter(caseItem => caseItem.status === 'resolved').length;

  // Case type distribution
  const fireCases = cases.filter(caseItem => caseItem.type === 'fire').length;
  const waterCases = cases.filter(caseItem => caseItem.type === 'water').length;
  const medicalCases = cases.filter(caseItem => caseItem.type === 'medical').length;
  const generalCases = cases.filter(caseItem => caseItem.type === 'general').length;

  // Priority distribution
  const criticalCases = cases.filter(caseItem => caseItem.priority === 'critical').length;
  const highCases = cases.filter(caseItem => caseItem.priority === 'high').length;
  const mediumCases = cases.filter(caseItem => caseItem.priority === 'medium').length;
  const lowCases = cases.filter(caseItem => caseItem.priority === 'low').length;

  // Recent cases (last 6)
  const recentCases = cases.slice(0, 6);

  // Chart data
  const caseTypeData = [
    { label: 'Fire', value: fireCases, color: '#dc2626' },
    { label: 'Water', value: waterCases, color: '#2563eb' },
    { label: 'Medical', value: medicalCases, color: '#16a34a' },
    { label: 'General', value: generalCases, color: '#ca8a04' }
  ];

  const priorityData = [
    { label: 'Critical', value: criticalCases, color: '#dc2626' },
    { label: 'High', value: highCases, color: '#ea580c' },
    { label: 'Medium', value: mediumCases, color: '#ca8a04' },
    { label: 'Low', value: lowCases, color: '#16a34a' }
  ];

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
            Admin Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Complete overview of emergency cases, team performance, and system analytics
          </p>
        </motion.div>

        {/* Main Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Cases"
            value={totalCases}
            icon={FiBarChart2}
            color="blue"
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Pending Cases"
            value={pendingCases}
            icon={FiAlertTriangle}
            color="yellow"
          />
          <StatsCard
            title="Active Cases"
            value={activeCases}
            icon={FiTrendingUp}
            color="red"
          />
          <StatsCard
            title="Resolved Cases"
            value={resolvedCases}
            icon={FiUsers}
            color="green"
            trend={{ value: 8, isPositive: true }}
          />
        </div>

        {/* Quick Admin Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Admin Actions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/admin/cases"
              className="flex items-center space-x-3 p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-200 group"
            >
              <div className="p-2 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors duration-200">
                <FiSettings className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Manage Cases</h3>
                <p className="text-sm text-gray-600">Edit and update cases</p>
              </div>
            </Link>

            <Link
              to="/admin/report"
              className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200 group"
            >
              <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors duration-200">
                <FiAlertTriangle className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Report Case</h3>
                <p className="text-sm text-gray-600">Submit new incident</p>
              </div>
            </Link>

            <Link
              to="/admin/analytics"
              className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200 group"
            >
              <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors duration-200">
                <FiBarChart2 className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Analytics</h3>
                <p className="text-sm text-gray-600">Detailed reports</p>
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
                <h3 className="font-semibold text-gray-900">Emergency</h3>
                <p className="text-sm text-gray-600">Call 911</p>
              </div>
            </a>
          </div>
        </motion.div>

        {/* Analytics Charts */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <AnalyticsChart
              title="Cases by Type"
              data={caseTypeData}
              type="pie"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <AnalyticsChart
              title="Cases by Priority"
              data={priorityData}
              type="bar"
            />
          </motion.div>
        </div>

        {/* Recent Cases */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Cases</h2>
            <Link
              to="/admin/cases"
              className="text-red-600 hover:text-red-700 font-medium"
            >
              Manage All Cases →
            </Link>
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
                    canEdit={true}
                    onEdit={(id) => console.log('Edit case:', id)}
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
              <p className="text-gray-600 mb-6">No emergency cases have been reported yet.</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
