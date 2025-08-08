import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiBarChart2, FiDroplet, FiHeart, FiAlertTriangle, FiCalendar, FiUsers, FiTrendingUp } from 'react-icons/fi';
import { FaFire } from 'react-icons/fa'; // Fire icon from Font Awesome
import { useLocalStorage } from '../../hooks/useLocalStorage';
import StatsCard from '../../components/dashboard/StatsCard';
import AnalyticsChart from '../../components/dashboard/AnalyticsChart';
import type { CaseReport } from '../../types';

const AdminAnalytics: React.FC = () => {
  const [cases] = useLocalStorage<CaseReport[]>('fireforce_cases', []);
  const [timeFilter, setTimeFilter] = useState<'all' | '30d' | '7d' | '1d'>('all');

  // Filter cases by time
  const filteredCases = cases.filter(caseItem => {
    if (timeFilter === 'all') return true;
    const caseDate = new Date(caseItem.reportedAt);
    const now = new Date();
    const daysAgo = timeFilter === '30d' ? 30 : timeFilter === '7d' ? 7 : 1;
    const filterDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
    return caseDate >= filterDate;
  });

  // Calculate comprehensive stats
  const totalCases = filteredCases.length;
  const pendingCases = filteredCases.filter(caseItem => caseItem.status === 'pending').length;
  const activeCases = filteredCases.filter(caseItem => caseItem.status === 'active').length;
  const resolvedCases = filteredCases.filter(caseItem => caseItem.status === 'resolved').length;
  const closedCases = filteredCases.filter(caseItem => caseItem.status === 'closed').length;

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

  // Status distribution
  const statusData = [
    { label: 'Pending', value: pendingCases, color: '#6b7280' },
    { label: 'Active', value: activeCases, color: '#2563eb' },
    { label: 'Resolved', value: resolvedCases, color: '#16a34a' },
    { label: 'Closed', value: closedCases, color: '#7c3aed' }
  ].filter(item => item.value > 0);

  // Response time analysis (simulated data)
  const responseTimeData = [
    { label: '< 5 min', value: Math.floor(totalCases * 0.3), color: '#16a34a' },
    { label: '5-10 min', value: Math.floor(totalCases * 0.4), color: '#ca8a04' },
    { label: '10-15 min', value: Math.floor(totalCases * 0.2), color: '#ea580c' },
    { label: '> 15 min', value: Math.floor(totalCases * 0.1), color: '#dc2626' }
  ].filter(item => item.value > 0);

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

  // Unique reporters
  const uniqueReporters = new Set(filteredCases.map(caseItem => caseItem.reportedBy)).size;

  // Calculate resolution rate
  const resolutionRate = totalCases > 0 ? Math.round(((resolvedCases + closedCases) / totalCases) * 100) : 0;

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
            System Analytics
          </h1>
          <p className="text-lg text-gray-600">
            Comprehensive emergency response analytics and performance metrics
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
              <h2 className="text-xl font-bold text-gray-900">Analysis Period</h2>
            </div>
            <div className="flex space-x-2">
              {[
                { key: 'all', label: 'All Time' },
                { key: '30d', label: 'Last 30 Days' },
                { key: '7d', label: 'Last 7 Days' },
                { key: '1d', label: 'Today' }
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

        {/* Primary Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Cases"
            value={totalCases}
            icon={FiBarChart2}
            color="blue"
            trend={{ value: 15, isPositive: true }}
          />
          <StatsCard
            title="Active Cases"
            value={activeCases}
            icon={FiAlertTriangle}
            color="red"
          />
          <StatsCard
            title="Resolution Rate"
            value={`${resolutionRate}%`}
            icon={FiTrendingUp}
            color="green"
            trend={{ value: 5, isPositive: true }}
          />
          <StatsCard
            title="Active Reporters"
            value={uniqueReporters}
            icon={FiUsers}
            color="yellow"
          />
        </div>

        {/* Secondary Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Fire Cases"
            value={fireCount}
            icon={FaFire}
            color="red"
          />
          <StatsCard
            title="Water Rescues"
            value={waterCount}
            icon={FiDroplet}
            color="blue"
          />
          <StatsCard
            title="Medical Assists"
            value={medicalCount}
            icon={FiHeart}
            color="green"
          />
          <StatsCard
            title="General Incidents"
            value={generalCount}
            icon={FiAlertTriangle}
            color="yellow"
          />
        </div>

        {/* Analytics Charts */}
        {totalCases > 0 && (
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Case Types */}
            {caseTypeData.length > 0 && (
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
            )}

            {/* Priority Distribution */}
            {priorityData.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <AnalyticsChart
                  title="Priority Distribution"
                  data={priorityData}
                  type="bar"
                />
              </motion.div>
            )}

            {/* Status Distribution */}
            {statusData.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <AnalyticsChart
                  title="Case Status"
                  data={statusData}
                  type="bar"
                />
              </motion.div>
            )}

            {/* Response Times */}
            {responseTimeData.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <AnalyticsChart
                  title="Response Times"
                  data={responseTimeData}
                  type="pie"
                />
              </motion.div>
            )}
          </div>
        )}

        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Performance Summary
          </h2>

          {totalCases > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">{resolutionRate}%</div>
                <div className="text-sm text-green-700">Resolution Rate</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">{Math.round(totalCases / Math.max(uniqueReporters, 1))}</div>
                <div className="text-sm text-blue-700">Avg Cases per Reporter</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-3xl font-bold text-yellow-600 mb-2">{criticalCount + highCount}</div>
                <div className="text-sm text-yellow-700">High Priority Cases</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-3xl font-bold text-red-600 mb-2">{pendingCases}</div>
                <div className="text-sm text-red-700">Pending Review</div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiBarChart2 className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Data Available</h3>
              <p className="text-gray-600">
                {timeFilter === 'all' 
                  ? "No cases have been reported yet."
                  : `No cases found in the selected time period.`
                }
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
