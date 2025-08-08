import React from 'react';
import { motion } from 'framer-motion';
import type { IconType } from 'react-icons';
import type { CaseReport } from '../../types';
import { PRIORITY_COLORS, STATUS_COLORS } from '../../utils/constants';

interface CaseCardProps {
  case: CaseReport;
  icon: IconType;
  onEdit?: (caseId: string) => void;
  canEdit?: boolean;
}

const CaseCard: React.FC<CaseCardProps> = ({ case: caseData, icon: Icon, onEdit, canEdit = false }) => {
  const priorityClass = PRIORITY_COLORS[caseData.priority];
  const statusClass = STATUS_COLORS[caseData.status];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl shadow-lg border-2 border-gray-100 p-6 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-red-50 rounded-lg border-2 border-red-200">
            <Icon className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{caseData.title}</h3>
            <p className="text-sm text-gray-500">#{caseData.id}</p>
          </div>
        </div>
        {canEdit && onEdit && (
          <button
            onClick={() => onEdit(caseData.id)}
            className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200"
          >
            Edit
          </button>
        )}
      </div>

      <div className="space-y-3">
        <p className="text-gray-700 text-sm line-clamp-2">{caseData.description}</p>
        
        <div className="flex items-center justify-between">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${priorityClass}`}>
            {caseData.priority.toUpperCase()}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusClass}`}>
            {caseData.status.toUpperCase()}
          </span>
        </div>

        <div className="pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>📍 {caseData.location}</span>
            <span>{new Date(caseData.reportedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CaseCard;
