// API Configuration
const getApiUrl = () => {
  // In development, use the proxy (relative path)
  if (import.meta.env.DEV) {
    return '';
  }
  
  // In production, use the full URL
  return import.meta.env.VITE_API_URL || 'https://your-backend-url.com';
};

export const API_BASE_URL = getApiUrl();

export const buildApiUrl = (endpoint: string) => {
  return `${API_BASE_URL}${endpoint}`;
}; 