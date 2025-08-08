import React from 'react';
import { motion } from 'framer-motion';
import type { IconType } from 'react-icons';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: IconType;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color: 'red' | 'blue' | 'green' | 'yellow';
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon: Icon, trend, color }) => {
  const colorClasses = {
    red: 'bg-red-50 border-red-200 text-red-600',
    blue: 'bg-blue-50 border-blue-200 text-blue-600',
    green: 'bg-green-50 border-green-200 text-green-600',
    yellow: 'bg-yellow-50 border-yellow-200 text-yellow-600'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl shadow-lg border-2 border-gray-100 p-6 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {trend && (
            <div className="flex items-center mt-2">
              <span className={`text-sm font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {trend.isPositive ? '↗' : '↘'} {trend.value}%
              </span>
              <span className="text-gray-500 text-sm ml-2">vs last month</span>
            </div>
          )}
        </div>
        <div className={`p-4 rounded-xl border-2 ${colorClasses[color]}`}>
          <Icon className="w-8 h-8" />
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;
