import { useAuth as useAuthContext } from '../context/AuthContext';
import type { AuthContextType } from '../types';

export const useAuth = (): AuthContextType => {
  return useAuthContext();
};
