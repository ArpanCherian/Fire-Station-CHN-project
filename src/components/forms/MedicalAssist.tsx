import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiSave, FiHeart, FiMapPin, FiUsers, FiClock } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import type { CaseReport, MedicalAssistData } from '../../types';

interface MedicalAssistProps {
  onBack: () => void;
}

const MedicalAssist: React.FC<MedicalAssistProps> = ({ onBack }) => {
  const { user } = useAuth();
  const [cases, setCases] = useLocalStorage<CaseReport[]>('fireforce_cases', []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    priority: 'medium' as 'low' | 'medium' | 'high' | 'critical',
    patientCount: 1,
    injuryType: '',
    consciousness: '',
    servicesInvolved: [] as string[],
    estimatedDuration: '',
    specialEquipment: '',
    transportNeeded: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const injuryTypes = [
    'Cardiac Emergency', 'Respiratory Distress', 'Trauma/Injury', 'Overdose',
    'Stroke', 'Seizure', 'Burns', 'Fall Injury', 'Vehicle Accident', 'Other'
  ];

  const consciousnessLevels = [
    'Alert and Responsive', 'Drowsy but Responsive', 'Responds to Voice',
    'Responds to Pain Only', 'Unresponsive', 'Unknown'
  ];

  const serviceOptions = [
    'EMS/Ambulance', 'Police Department', 'Hospital', 'Air Ambulance',
    'Hazmat Team', 'Search and Rescue', 'Coroner', 'Social Services'
  ];

  const durationOptions = [
    '15-30 minutes', '30-60 minutes', '1-2 hours', '2-4 hours', 'More than 4 hours'
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.injuryType) newErrors.injuryType = 'Injury type is required';
    if (!formData.consciousness) newErrors.consciousness = 'Consciousness level is required';
    if (!formData.estimatedDuration) newErrors.estimatedDuration = 'Estimated duration is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      servicesInvolved: prev.servicesInvolved.includes(service)
        ? prev.servicesInvolved.filter(s => s !== service)
        : [...prev.servicesInvolved, service]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    const newCase: CaseReport = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'medical',
      title: formData.title,
      description: formData.description,
      location: formData.location,
      priority: formData.priority,
      status: 'pending',
      reportedBy: user?.name || 'Unknown',
      reportedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      data: {
        patientCount: formData.patientCount,
        injuryType: formData.injuryType,
        consciousness: formData.consciousness,
        servicesInvolved: formData.servicesInvolved,
        estimatedDuration: formData.estimatedDuration,
        specialEquipment: formData.specialEquipment,
        transportNeeded: formData.transportNeeded
      } as MedicalAssistData
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
          <h2 className="text-xl font-bold text-gray-900 mb-2">Medical Assist Reported Successfully!</h2>
          <p className="text-gray-600 mb-4">Your medical assistance request has been submitted and medical teams are being coordinated.</p>
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
            <h1 className="text-3xl font-bold text-gray-900">Medical Assist Report</h1>
            <p className="text-gray-600">Report medical emergencies requiring fire department assistance</p>
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
                <FiHeart className="w-6 h-6 text-green-600" />
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
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 ${
                      errors.title ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Brief title of the medical emergency"
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
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 ${
                      errors.description ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Provide detailed description of the medical situation..."
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
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 ${
                      errors.location ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Exact location of medical emergency"
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
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                    <option value="critical">Critical Priority</option>
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Patient Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center space-x-3 mb-6">
                <FiUsers className="w-6 h-6 text-green-600" />
                <h2 className="text-xl font-bold text-gray-900">Patient Information</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Patients
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.patientCount}
                    onChange={(e) => handleInputChange('patientCount', parseInt(e.target.value) || 1)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Injury/Condition Type *
                  </label>
                  <select
                    value={formData.injuryType}
                    onChange={(e) => handleInputChange('injuryType', e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 ${
                      errors.injuryType ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select injury/condition type</option>
                    {injuryTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.injuryType && (
                    <p className="mt-1 text-sm text-red-600">{errors.injuryType}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Consciousness Level *
                  </label>
                  <select
                    value={formData.consciousness}
                    onChange={(e) => handleInputChange('consciousness', e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 ${
                      errors.consciousness ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select consciousness level</option>
                    {consciousnessLevels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                  {errors.consciousness && (
                    <p className="mt-1 text-sm text-red-600">{errors.consciousness}</p>
                  )}
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="transportNeeded"
                    checked={formData.transportNeeded}
                    onChange={(e) => handleInputChange('transportNeeded', e.target.checked)}
                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <label htmlFor="transportNeeded" className="text-sm font-medium text-gray-700">
                    Transport to hospital required
                  </label>
                </div>
              </div>
            </motion.div>

            {/* Services & Duration */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center space-x-3 mb-6">
                <FiClock className="w-6 h-6 text-green-600" />
                <h2 className="text-xl font-bold text-gray-900">Services & Duration</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estimated Duration *
                  </label>
                  <select
                    value={formData.estimatedDuration}
                    onChange={(e) => handleInputChange('estimatedDuration', e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 ${
                      errors.estimatedDuration ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select estimated duration</option>
                    {durationOptions.map(duration => (
                      <option key={duration} value={duration}>{duration}</option>
                    ))}
                  </select>
                  {errors.estimatedDuration && (
                    <p className="mt-1 text-sm text-red-600">{errors.estimatedDuration}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Other Services Involved
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {serviceOptions.map(service => (
                      <label
                        key={service}
                        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={formData.servicesInvolved.includes(service)}
                          onChange={() => handleServiceToggle(service)}
                          className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                        />
                        <span className="text-sm text-gray-700">{service}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Special Equipment */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center space-x-3 mb-6">
                <FiMapPin className="w-6 h-6 text-green-600" />
                <h2 className="text-xl font-bold text-gray-900">Special Requirements</h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Equipment Needed
                </label>
                <textarea
                  value={formData.specialEquipment}
                  onChange={(e) => handleInputChange('specialEquipment', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                  placeholder="Describe any special equipment, tools, or resources needed..."
                />
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
                  : 'bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl'
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
                  <span>Submit Medical Assist Report</span>
                </>
              )}
            </motion.button>
          </motion.div>
        </form>
      </div>
    </div>
  );
};

export default MedicalAssist;
