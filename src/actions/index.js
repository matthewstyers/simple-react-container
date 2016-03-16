import axios from 'axios';

export const FETCH_TECHNOLOGIES = 'FETCH_TECHNOLOGIES';
const HOSTNAME = 'http://reduxblog.herokuapp.com/api';
const API_ROOT = 'api/v2';

export function fetchTechnologies() {
  const request = axios.get(`${HOSTNAME}/${API_ROOT}`);
  return {
    type: FETCH_TECHNOLOGIES,
    payload: request
  };
}
