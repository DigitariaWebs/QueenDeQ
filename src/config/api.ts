// API Configuration
const getApiUrl = () => {
  // In development and Vercel production, use relative paths
  if (import.meta.env.DEV || import.meta.env.VITE_BUILD_TARGET === 'vercel') {
    return '';
  }
  
  // For other production deployments, use the full URL
  return import.meta.env.VITE_API_URL || '';
};

export const API_BASE_URL = getApiUrl();

export const buildApiUrl = (endpoint: string) => {
  return `${API_BASE_URL}${endpoint}`;
}; 