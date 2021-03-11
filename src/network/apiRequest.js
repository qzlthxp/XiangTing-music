import axios from 'axios';
import store from '../store/index';

export function apiRequest(config) {
  const instance = axios.create({
    baseURL: store.state.APIBASEURL,
    timeout: 5000
  });

  instance.interceptors.request.use(
    config => {
      return config;
    },
    error => {
      return error;
    }
  );

  instance.interceptors.response.use(
    value => {
      return value.data;
    },
    error => {
      return error;
    },
  )

  return instance(config);
}