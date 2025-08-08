export const CASE_TYPES = {
  FIRE: 'fire',
  WATER: 'water', 
  MEDICAL: 'medical',
  GENERAL: 'general'
} as const;

export const PRIORITIES = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical'
} as const;

export const STATUS = {
  PENDING: 'pending',
  ACTIVE: 'active',
  RESOLVED: 'resolved',
  CLOSED: 'closed'
} as const;

export const DEMO_CREDENTIALS = {
  ADMIN: {
    email: 'admin@fireforce.com',
    password: 'admin123'
  },
  USER: {
    email: 'user@fireforce.com',
    password: 'user123'
  }
};

export const PRIORITY_COLORS = {
  low: 'bg-green-100 text-green-800 border-green-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  high: 'bg-orange-100 text-orange-800 border-orange-200',
  critical: 'bg-red-100 text-red-800 border-red-200'
};

export const STATUS_COLORS = {
  pending: 'bg-gray-100 text-gray-800 border-gray-200',
  active: 'bg-blue-100 text-blue-800 border-blue-200',
  resolved: 'bg-green-100 text-green-800 border-green-200',
  closed: 'bg-purple-100 text-purple-800 border-purple-200'
};
