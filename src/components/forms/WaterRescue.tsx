import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiSave, FiDroplet, FiMapPin, FiUsers, FiEye } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import type { CaseReport, WaterRescueData } from '../../types';

interface WaterRescueProps {
  onBack: () => void;
}

const WaterRescue: React.FC<WaterRescueProps> = ({ onBack }) => {
  const { user } = useAuth();
  const [cases, setCases] = useLocalStorage<CaseReport[]>('fireforce_cases', []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    priority: 'medium' as 'low' | 'medium' | 'high' | 'critical',
    victimCount: 0,
    waterType: '',
    currentConditions: '',
    visibility: '',
    equipmentNeeded: [] as string[],
    accessPoint: '',
    additionalHazards: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const waterTypes = [
    'River', 'Lake', 'Ocean', 'Pool', 'Pond', 'Stream', 'Flood Water', 'Other'
  ];

  const currentConditions = [
    'Calm', 'Choppy', 'Rough', 'Swift Current', 'Still Water', 'Ice Coverage', 'Dangerous Current'
  ];

  const visibilityOptions = [
    'Excellent (>50ft)', 'Good (20-50ft)', 'Fair (10-20ft)', 'Poor (5-10ft)', 'Very Poor (<5ft)'
  ];

  const equipmentOptions = [
    'Dive Team', 'Rescue Boat', 'Swift Water Rescue', 'Ice Rescue Equipment',
    'Underwater Camera', 'Sonar Equipment', 'Helicopter Support', 'Additional Divers'
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.waterType) newErrors.waterType = 'Water type is required';
    if (!formData.currentConditions) newErrors.currentConditions = 'Current conditions are required';
    if (!formData.visibility) newErrors.visibility = 'Visibility information is required';
    if (!formData.accessPoint.trim()) newErrors.accessPoint = 'Access point is required';

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
      type: 'water',
      title: formData.title,
      description: formData.description,
      location: formData.location,
      priority: formData.priority,
      status: 'pending',
      reportedBy: user?.name || 'Unknown',
      reportedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      data: {
        victimCount: formData.victimCount,
        waterType: formData.waterType,
        currentConditions: formData.currentConditions,
        visibility: formData.visibility,
        equipmentNeeded: formData.equipmentNeeded,
        accessPoint: formData.accessPoint,
        additionalHazards: formData.additionalHazards
      } as WaterRescueData
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
          <h2 className="text-xl font-bold text-gray-900 mb-2">Water Rescue Reported Successfully!</h2>
          <p className="text-gray-600 mb-4">Your water rescue report has been submitted and emergency teams are being notified.</p>
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
            <h1 className="text-3xl font-bold text-gray-900">Water Rescue Report</h1>
            <p className="text-gray-600">Report water emergency and rescue operations</p>
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
                <FiDroplet className="w-6 h-6 text-blue-600" />
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
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                      errors.title ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Brief title of the water rescue incident"
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
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                      errors.description ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Provide detailed description of the water rescue situation..."
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority Level
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => handleInputChange('priority', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                    <option value="critical">Critical Priority</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Victims
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.victimCount}
                    onChange={(e) => handleInputChange('victimCount', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  />
                </div>
              </div>
            </motion.div>

            {/* Location & Access */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center space-x-3 mb-6">
                <FiMapPin className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">Location & Access</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Incident Location *
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                      errors.location ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Exact location of water emergency"
                  />
                  {errors.location && (
                    <p className="mt-1 text-sm text-red-600">{errors.location}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Water Type *
                  </label>
                  <select
                    value={formData.waterType}
                    onChange={(e) => handleInputChange('waterType', e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                      errors.waterType ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select water type</option>
                    {waterTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.waterType && (
                    <p className="mt-1 text-sm text-red-600">{errors.waterType}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Access Point *
                  </label>
                  <input
                    type="text"
                    value={formData.accessPoint}
                    onChange={(e) => handleInputChange('accessPoint', e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                      errors.accessPoint ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Best access point for rescue teams"
                  />
                  {errors.accessPoint && (
                    <p className="mt-1 text-sm text-red-600">{errors.accessPoint}</p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Water Conditions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center space-x-3 mb-6">
                <FiEye className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">Water Conditions</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Conditions *
                  </label>
                  <select
                    value={formData.currentConditions}
                    onChange={(e) => handleInputChange('currentConditions', e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                      errors.currentConditions ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select current conditions</option>
                    {currentConditions.map(condition => (
                      <option key={condition} value={condition}>{condition}</option>
                    ))}
                  </select>
                  {errors.currentConditions && (
                    <p className="mt-1 text-sm text-red-600">{errors.currentConditions}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Visibility *
                  </label>
                  <select
                    value={formData.visibility}
                    onChange={(e) => handleInputChange('visibility', e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                      errors.visibility ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select visibility</option>
                    {visibilityOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  {errors.visibility && (
                    <p className="mt-1 text-sm text-red-600">{errors.visibility}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Hazards
                  </label>
                  <textarea
                    value={formData.additionalHazards}
                    onChange={(e) => handleInputChange('additionalHazards', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="Any additional hazards or concerns (debris, chemicals, etc.)"
                  />
                </div>
              </div>
            </motion.div>

            {/* Equipment Needed */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center space-x-3 mb-6">
                <FiUsers className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">Equipment & Resources</h2>
              </div>

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
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{equipment}</span>
                    </label>
                  ))}
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
                  : 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl'
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
                  <span>Submit Water Rescue Report</span>
                </>
              )}
            </motion.button>
          </motion.div>
        </form>
      </div>
    </div>
  );
};

export default WaterRescue;
