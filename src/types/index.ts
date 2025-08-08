export interface User {
  id: string;
  email: string;
  role: 'user' | 'admin';
  name: string;
  loginTime: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'user' | 'admin') => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

export interface CaseReport {
  id: string;
  type: 'fire' | 'water' | 'medical' | 'general';
  title: string;
  description: string;
  location: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'active' | 'resolved' | 'closed';
  reportedBy: string;
  reportedAt: string;
  updatedAt: string;
  assignedTo?: string;
  data: FireIncidentData | WaterRescueData | MedicalAssistData | GeneralIncidentData;
}

export interface FireIncidentData {
  fireType: string;
  buildingType: string;
  casualties: number;
  injuries: number;
  estimatedDamage: string;
  resourcesNeeded: string[];
  accessRoute: string;
  waterSource: string;
}

export interface WaterRescueData {
  victimCount: number;
  waterType: string;
  currentConditions: string;
  visibility: string;
  equipmentNeeded: string[];
  accessPoint: string;
  additionalHazards: string;
}

export interface MedicalAssistData {
  patientCount: number;
  injuryType: string;
  consciousness: string;
  servicesInvolved: string[];
  estimatedDuration: string;
  specialEquipment: string;
  transportNeeded: boolean;
}

export interface GeneralIncidentData {
  incidentType: string;
  hazardLevel: string;
  affectedArea: string;
  trafficImpact: string;
  equipmentNeeded: string[];
  estimatedClearTime: string;
  publicSafety: string;
}
