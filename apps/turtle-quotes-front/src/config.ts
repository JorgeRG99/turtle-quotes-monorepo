import { environment } from "./environments/environments";

export const APP_ROUTES = {
  HOME: '',
  STATS: 'stats',
};

// ---------------- BACKEND ENDPOINTS ----------------
export const API_BASE_URL = environment.backendBaseUrl;

// AUTHENTICATION
export const REGISTER_ENDPOINT = `${API_BASE_URL}/register`;
export const LOGIN_ENDPOINT = `${API_BASE_URL}/login`;
export const LOGOUT_ENDPOINT = `${API_BASE_URL}/logout`;
export const SESSION_CHECK_ENDPOINT = `${API_BASE_URL}/session`;