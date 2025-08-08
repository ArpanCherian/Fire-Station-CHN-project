import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiSave, FiFile, FiMapPin, FiUsers, FiDollarSign } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import type { CaseReport, FireIncidentData } from '../../types';

interface FireIncidentProps {
  onBack: () => void;
}

const FireIncident: React.FC<FireIncidentProps> = ({ onBack }) => {
  const { user } = useAuth();
  const [cases, setCases] = useLocalStorage<CaseReport[]>('fireforce_cases', []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    priority: 'medium' as 'low' | 'medium' | 'high' | 'critical',
    fireType: '',
    buildingType: '',
    casualties: 0,
    injuries: 0,
    estimatedDamage: '',
    resourcesNeeded: [] as string[],
    accessRoute: '',
    waterSource: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const fireTypes = [
    'Structure Fire', 'Vehicle Fire', 'Wildfire', 'Electrical Fire', 
    'Chemical Fire', 'Explosion', 'Smoke Investigation', 'Other'
  ];

  const buildingTypes = [
    'Residential', 'Commercial', 'Industrial', 'High-rise', 
    'Warehouse', 'School', 'Hospital', 'Other'
  ];

  const resourceOptions = [
    'Fire Engine', 'Ladder Truck', 'Rescue Squad', 'Hazmat Unit',
    'EMS Unit', 'Fire Chief', 'Additional Personnel', 'Specialized Equipment'
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.fireType) newErrors.fireType = 'Fire type is required';
    if (!formData.buildingType) newErrors.buildingType = 'Building type is required';
    if (!formData.accessRoute.trim()) newErrors.accessRoute = 'Access route is required';
    if (!formData.waterSource.trim()) newErrors.waterSource = 'Water source is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleResourceToggle = (resource: string) => {
    setFormData(prev => ({
      ...prev,
      resourcesNeeded: prev.resourcesNeeded.includes(resource)
        ? prev.resourcesNeeded.filter(r => r !== resource)
        : [...prev.resourcesNeeded, resource]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    const newCase: CaseReport = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'fire',
      title: formData.title,
      description: formData.description,
      location: formData.location,
      priority: formData.priority,
      status: 'pending',
      reportedBy: user?.name || 'Unknown',
      reportedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      data: {
        fireType: formData.fireType,
        buildingType: formData.buildingType,
        casualties: formData.casualties,
        injuries: formData.injuries,
        estimatedDamage: formData.estimatedDamage,
        resourcesNeeded: formData.resourcesNeeded,
        accessRoute: formData.accessRoute,
        waterSource: formData.waterSource
      } as FireIncidentData
    };

    setCases(prev => [newCase, ...prev]);
    setIsSubmitting(false);
    setShowSuccess(true);

    // Auto-redirect after 3 seconds
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
          <h2 className="text-xl font-bold text-gray-900 mb-2">Fire Incident Reported Successfully!</h2>
          <p className="text-gray-600 mb-4">Your fire incident report has been submitted and will be processed immediately.</p>
          <div className="text-sm text-gray-500">Redirecting to dashboard...</div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
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
            <h1 className="text-3xl font-bold text-gray-900">Fire Incident Report</h1>
            <p className="text-gray-600">Provide detailed information about the fire emergency</p>
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
                <FiFile className="w-6 h-6 text-red-600" />
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
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200 ${
                      errors.title ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Brief title of the fire incident"
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
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200 ${
                      errors.description ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Provide detailed description of the fire incident..."
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
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200"
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                    <option value="critical">Critical Priority</option>
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Location Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center space-x-3 mb-6">
                <FiMapPin className="w-6 h-6 text-red-600" />
                <h2 className="text-xl font-bold text-gray-900">Location Details</h2>
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
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200 ${
                      errors.location ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Full address or location description"
                  />
                  {errors.location && (
                    <p className="mt-1 text-sm text-red-600">{errors.location}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Access Route *
                  </label>
                  <input
                    type="text"
                    value={formData.accessRoute}
                    onChange={(e) => handleInputChange('accessRoute', e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200 ${
                      errors.accessRoute ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Best route for emergency vehicles"
                  />
                  {errors.accessRoute && (
                    <p className="mt-1 text-sm text-red-600">{errors.accessRoute}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Water Source *
                  </label>
                  <input
                    type="text"
                    value={formData.waterSource}
                    onChange={(e) => handleInputChange('waterSource', e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200 ${
                      errors.waterSource ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Nearest hydrant, pond, or water access"
                  />
                  {errors.waterSource && (
                    <p className="mt-1 text-sm text-red-600">{errors.waterSource}</p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Fire Details */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center space-x-3 mb-6">
                <FiFile className="w-6 h-6 text-red-600" />
                <h2 className="text-xl font-bold text-gray-900">Fire Specifics</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fire Type *
                  </label>
                  <select
                    value={formData.fireType}
                    onChange={(e) => handleInputChange('fireType', e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200 ${
                      errors.fireType ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select fire type</option>
                    {fireTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.fireType && (
                    <p className="mt-1 text-sm text-red-600">{errors.fireType}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Building Type *
                  </label>
                  <select
                    value={formData.buildingType}
                    onChange={(e) => handleInputChange('buildingType', e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200 ${
                      errors.buildingType ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select building type</option>
                    {buildingTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.buildingType && (
                    <p className="mt-1 text-sm text-red-600">{errors.buildingType}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estimated Damage
                  </label>
                  <input
                    type="text"
                    value={formData.estimatedDamage}
                    onChange={(e) => handleInputChange('estimatedDamage', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200"
                    placeholder="Estimated property damage (optional)"
                  />
                </div>
              </div>
            </motion.div>

            {/* Casualties & Resources */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center space-x-3 mb-6">
                <FiUsers className="w-6 h-6 text-red-600" />
                <h2 className="text-xl font-bold text-gray-900">Casualties & Resources</h2>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Casualties
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.casualties}
                      onChange={(e) => handleInputChange('casualties', parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Injuries
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.injuries}
                      onChange={(e) => handleInputChange('injuries', parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Resources Needed
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {resourceOptions.map(resource => (
                      <label
                        key={resource}
                        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={formData.resourcesNeeded.includes(resource)}
                          onChange={() => handleResourceToggle(resource)}
                          className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                        />
                        <span className="text-sm text-gray-700">{resource}</span>
                      </label>
                    ))}
                  </div>
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
                  : 'bg-red-600 hover:bg-red-700 shadow-lg hover:shadow-xl'
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
                  <span>Submit Fire Incident Report</span>
                </>
              )}
            </motion.button>
          </motion.div>
        </form>
      </div>
    </div>
  );
};

export default FireIncident;
