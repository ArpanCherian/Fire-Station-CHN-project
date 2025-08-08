import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiSave, FiAlertTriangle, FiMapPin, FiTool, FiClock } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import type { CaseReport, GeneralIncidentData } from '../../types';

interface GeneralIncidentProps {
  onBack: () => void;
}

const GeneralIncident: React.FC<GeneralIncidentProps> = ({ onBack }) => {
  const { user } = useAuth();
  const [cases, setCases] = useLocalStorage<CaseReport[]>('fireforce_cases', []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    priority: 'medium' as 'low' | 'medium' | 'high' | 'critical',
    incidentType: '',
    hazardLevel: '',
    affectedArea: '',
    trafficImpact: '',
    equipmentNeeded: [] as string[],
    estimatedClearTime: '',
    publicSafety: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const incidentTypes = [
    'Fallen Tree', 'Road Hazard', 'Power Line Down', 'Gas Leak', 'Flooding',
    'Building Collapse', 'Elevator Rescue', 'Animal Rescue', 'Public Assist', 'Other'
  ];

  const hazardLevels = [
    'Low Risk', 'Moderate Risk', 'High Risk', 'Extreme Risk'
  ];

  const trafficImpactOptions = [
    'No Impact', 'Lane Closure', 'Partial Road Closure', 'Full Road Closure', 'Detour Required'
  ];

  const equipmentOptions = [
    'Heavy Rescue', 'Chainsaw', 'Crane/Boom', 'Generators', 'Lighting Equipment',
    'Traffic Control', 'Hazmat Equipment', 'Specialized Tools'
  ];

  const clearTimeOptions = [
    '30 minutes', '1 hour', '2-4 hours', '4-8 hours', 'More than 8 hours', 'Unknown'
  ];

  const publicSafetyOptions = [
    'Area Secure', 'Evacuation Required', 'Shelter in Place', 'Traffic Diversion', 'Public Warning Issued'
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.incidentType) newErrors.incidentType = 'Incident type is required';
    if (!formData.hazardLevel) newErrors.hazardLevel = 'Hazard level is required';
    if (!formData.affectedArea.trim()) newErrors.affectedArea = 'Affected area is required';
    if (!formData.trafficImpact) newErrors.trafficImpact = 'Traffic impact is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleEquipmentToggle = (equipment: string) => {
    setFormData(prev => ({
      ...prev,
      equipmentNeeded: prev.equipmentNeeded.includes(equipment)
        ? prev.equipmentNeeded.filter(e => e !== equipment)
        : [...prev.equipmentNeeded, equipment]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    const newCase: CaseReport = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'general',
      title: formData.title,
      description: formData.description,
      location: formData.location,
      priority: formData.priority,
      status: 'pending',
      reportedBy: user?.name || 'Unknown',
      reportedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      data: {
        incidentType: formData.incidentType,
        hazardLevel: formData.hazardLevel,
        affectedArea: formData.affectedArea,
        trafficImpact: formData.trafficImpact,
        equipmentNeeded: formData.equipmentNeeded,
        estimatedClearTime: formData.estimatedClearTime,
        publicSafety: formData.publicSafety
      } as GeneralIncidentData
    };

    setCases(prev => [newCase, ...prev]);
    setIsSubmitting(false);
    setShowSuccess(true);

    setTimeout(() => {
      onBack();
    }, 3000);
  };

  if (showSuccess) {
    return (
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 text-center"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-green-600 text-2xl"
            >
              ✓
            </motion.div>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">General Incident Reported Successfully!</h2>
          <p className="text-gray-600 mb-4">Your incident report has been submitted and appropriate teams will be dispatched.</p>
          <div className="text-sm text-gray-500">Redirecting to dashboard...</div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-4 mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <FiArrowLeft className="w-5 h-5 text-gray-600" />
          </motion.button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">General Incident Report</h1>
            <p className="text-gray-600">Report general incidents requiring fire department response</p>
          </div>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Basic Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center space-x-3 mb-6">
                <FiAlertTriangle className="w-6 h-6 text-yellow-600" />
                <h2 className="text-xl font-bold text-gray-900">Basic Information</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Incident Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors duration-200 ${
                      errors.title ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Brief title of the incident"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Detailed Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors duration-200 ${
                      errors.description ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Provide detailed description of the incident..."
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors duration-200 ${
                      errors.location ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Exact location of incident"
                  />
                  {errors.location && (
                    <p className="mt-1 text-sm text-red-600">{errors.location}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority Level
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => handleInputChange('priority', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors duration-200"
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                    <option value="critical">Critical Priority</option>
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Incident Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center space-x-3 mb-6">
                <FiMapPin className="w-6 h-6 text-yellow-600" />
                <h2 className="text-xl font-bold text-gray-900">Incident Details</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Incident Type *
                  </label>
                  <select
                    value={formData.incidentType}
                    onChange={(e) => handleInputChange('incidentType', e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors duration-200 ${
                      errors.incidentType ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select incident type</option>
                    {incidentTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.incidentType && (
                    <p className="mt-1 text-sm text-red-600">{errors.incidentType}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hazard Level *
                  </label>
                  <select
                    value={formData.hazardLevel}
                    onChange={(e) => handleInputChange('hazardLevel', e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors duration-200 ${
                      errors.hazardLevel ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select hazard level</option>
                    {hazardLevels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                  {errors.hazardLevel && (
                    <p className="mt-1 text-sm text-red-600">{errors.hazardLevel}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Affected Area *
                  </label>
                  <input
                    type="text"
                    value={formData.affectedArea}
                    onChange={(e) => handleInputChange('affectedArea', e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors duration-200 ${
                      errors.affectedArea ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Description of affected area or radius"
                  />
                  {errors.affectedArea && (
                    <p className="mt-1 text-sm text-red-600">{errors.affectedArea}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Traffic Impact *
                  </label>
                  <select
                    value={formData.trafficImpact}
                    onChange={(e) => handleInputChange('trafficImpact', e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors duration-200 ${
                      errors.trafficImpact ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select traffic impact</option>
                    {trafficImpactOptions.map(impact => (
                      <option key={impact} value={impact}>{impact}</option>
                    ))}
                  </select>
                  {errors.trafficImpact && (
                    <p className="mt-1 text-sm text-red-600">{errors.trafficImpact}</p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Equipment & Resources */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center space-x-3 mb-6">
                <FiTool className="w-6 h-6 text-yellow-600" />
                <h2 className="text-xl font-bold text-gray-900">Equipment & Resources</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Equipment Needed
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {equipmentOptions.map(equipment => (
                      <label
                        key={equipment}
                        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={formData.equipmentNeeded.includes(equipment)}
                          onChange={() => handleEquipmentToggle(equipment)}
                          className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
                        />
                        <span className="text-sm text-gray-700">{equipment}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Timeline & Safety */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center space-x-3 mb-6">
                <FiClock className="w-6 h-6 text-yellow-600" />
                <h2 className="text-xl font-bold text-gray-900">Timeline & Safety</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estimated Clear Time
                  </label>
                  <select
                    value={formData.estimatedClearTime}
                    onChange={(e) => handleInputChange('estimatedClearTime', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors duration-200"
                  >
                    <option value="">Select estimated clear time</option>
                    {clearTimeOptions.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Public Safety Measures
                  </label>
                  <select
                    value={formData.publicSafety}
                    onChange={(e) => handleInputChange('publicSafety', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors duration-200"
                  >
                    <option value="">Select public safety status</option>
                    {publicSafetyOptions.map(safety => (
                      <option key={safety} value={safety}>{safety}</option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center"
          >
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
              className={`flex items-center space-x-3 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-yellow-600 hover:bg-yellow-700 shadow-lg hover:shadow-xl'
              } text-white`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  <span>Submitting Report...</span>
                </>
              ) : (
                <>
                  <FiSave className="w-6 h-6" />
                  <span>Submit General Incident Report</span>
                </>
              )}
            </motion.button>
          </motion.div>
        </form>
      </div>
    </div>
  );
};

export default GeneralIncident;
