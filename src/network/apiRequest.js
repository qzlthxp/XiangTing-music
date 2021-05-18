import axios from 'axios';
// import store from '../store/index';

export function apiRequest (config) {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_MUSIC_API,
    timeout: 5000
  });

  instance.interceptors.request.use(
    config => {
      // if (config.method === 'get') {
      //   config.params.realIP = '116.25.146.177'
      // }
      // if (config.method === 'post') {
      //   config.data.realIP = '116.25.146.177'
      // }
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