// Smart API URL detection
// In production (Vercel), use Render backend
// In development, use localhost

const isProduction = import.meta.env.PROD || window.location.hostname !== 'localhost';

export const API_URL = import.meta.env.VITE_API_URL ||
  (isProduction
    ? 'https://project-autoagento.onrender.com'
    : 'http://localhost:8000');

export default API_URL;
