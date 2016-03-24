import axios from 'axios';

export const FETCH_TECHNOLOGIES = 'FETCH_TECHNOLOGIES';
const API_HOSTNAME = process.env.API_HOSTNAME || 'http://localhost:5000';
const API_ROOT = 'api/v2';

export function fetchTechnologies() {
  const request = axios.get(`${API_HOSTNAME}/${API_ROOT}`);
  return {
    type: FETCH_TECHNOLOGIES,
    payload: request
  };
}
