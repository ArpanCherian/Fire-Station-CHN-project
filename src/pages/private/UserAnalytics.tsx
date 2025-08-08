import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiBarChart2, FiDroplet, FiHeart, FiAlertTriangle, FiCalendar } from 'react-icons/fi';
import { FaFire } from 'react-icons/fa'; // Fire icon from Font Awesome
import { useAuth } from '../../hooks/useAuth';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import StatsCard from '../../components/dashboard/StatsCard';
import CaseCard from '../../components/dashboard/CaseCard';
import AnalyticsChart from '../../components/dashboard/AnalyticsChart';
import type { CaseReport } from '../../types';

const UserAnalytics: React.FC = () => {
  const { user } = useAuth();
  const [cases] = useLocalStorage<CaseReport[]>('fireforce_cases', []);
  const [timeFilter, setTimeFilter] = useState<'all' | '30d' | '7d'>('all');

  // Filter cases by user and time
  const userCases = cases.filter(caseItem => caseItem.reportedBy === user?.name);
  
  const filteredCases = userCases.filter(caseItem => {
    if (timeFilter === 'all') return true;
    const caseDate = new Date(caseItem.reportedAt);
    const now = new Date();
    const daysAgo = timeFilter === '30d' ? 30 : 7;
    const filterDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
    return caseDate >= filterDate;
  });

  // Calculate stats
  const totalCases = filteredCases.length;
  const pendingCases = filteredCases.filter(caseItem => caseItem.status === 'pending').length;
  const activeCases = filteredCases.filter(caseItem => caseItem.status === 'active').length;
  const resolvedCases = filteredCases.filter(caseItem => caseItem.status === 'resolved').length;

  // Case type distribution
  const fireCount = filteredCases.filter(caseItem => caseItem.type === 'fire').length;
  const waterCount = filteredCases.filter(caseItem => caseItem.type === 'water').length;
  const medicalCount = filteredCases.filter(caseItem => caseItem.type === 'medical').length;
  const generalCount = filteredCases.filter(caseItem => caseItem.type === 'general').length;

  // Priority distribution
  const criticalCount = filteredCases.filter(caseItem => caseItem.priority === 'critical').length;
  const highCount = filteredCases.filter(caseItem => caseItem.priority === 'high').length;
  const mediumCount = filteredCases.filter(caseItem => caseItem.priority === 'medium').length;
  const lowCount = filteredCases.filter(caseItem => caseItem.priority === 'low').length;

  // Chart data
  const caseTypeData = [
    { label: 'Fire', value: fireCount, color: '#dc2626' },
    { label: 'Water', value: waterCount, color: '#2563eb' },
    { label: 'Medical', value: medicalCount, color: '#16a34a' },
    { label: 'General', value: generalCount, color: '#ca8a04' }
  ].filter(item => item.value > 0);

  const priorityData = [
    { label: 'Critical', value: criticalCount, color: '#dc2626' },
    { label: 'High', value: highCount, color: '#ea580c' },
    { label: 'Medium', value: mediumCount, color: '#ca8a04' },
    { label: 'Low', value: lowCount, color: '#16a34a' }
  ].filter(item => item.value > 0);

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
            Your Analytics
          </h1>
          <p className="text-lg text-gray-600">
            Track your emergency reporting history and statistics
          </p>
        </motion.div>

        {/* Time Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FiCalendar className="w-6 h-6 text-gray-600" />
              <h2 className="text-xl font-bold text-gray-900">Time Period</h2>
            </div>
            <div className="flex space-x-2">
              {[
                { key: 'all', label: 'All Time' },
                { key: '30d', label: 'Last 30 Days' },
                { key: '7d', label: 'Last 7 Days' }
              ].map(filter => (
                <button
                  key={filter.key}
                  onClick={() => setTimeFilter(filter.key as any)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    timeFilter === filter.key
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
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
            title="Pending"
            value={pendingCases}
            icon={FiAlertTriangle}
            color="yellow"
          />
          <StatsCard
            title="Active"
            value={activeCases}
            icon={FaFire}
            color="red"
          />
          <StatsCard
            title="Resolved"
            value={resolvedCases}
            icon={FiBarChart2}
            color="green"
          />
        </div>

        {/* Charts */}
        {totalCases > 0 ? (
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {caseTypeData.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <AnalyticsChart
                  title="Your Cases by Type"
                  data={caseTypeData}
                  type="pie"
                />
              </motion.div>
            )}

            {priorityData.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <AnalyticsChart
                  title="Your Cases by Priority"
                  data={priorityData}
                  type="bar"
                />
              </motion.div>
            )}
          </div>
        ) : null}

        {/* All Cases List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Your Cases {timeFilter !== 'all' && `(${timeFilter.replace('d', ' days')})`}
          </h2>

          {filteredCases.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCases.map((caseItem, index) => (
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
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No Cases Found
              </h3>
              <p className="text-gray-600">
                {timeFilter === 'all' 
                  ? "You haven't reported any cases yet."
                  : `No cases found in the selected time period.`
                }
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default UserAnalytics;
