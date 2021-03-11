import axios from "axios";
import store from '../store/index';

//发送请求
/*
config 包含
url: '',           //自动拼接到  baseURL后面
method: '',       //请求方式 get 或 post
params（用于get） 或者 data（用于post）
 */
export function request(config) {
  const instance = axios.create({
    baseURL: store.state.BASEURL,
    timeout: 5000,
  });
  //请求拦截器 拦截请求参数做一些操作，然后返回出去继续进行网络请求
  instance.interceptors.request.use(
    config => {
      return config;
    },
    error => {
      return error;
    },
  );
  //响应拦截器 拦截响应数据 这里我只需要 data 里的数据
  instance.interceptors.response.use(
    value => {
      return value.data;
    },
    error => {
      return error;
    },
  );
  return instance(config);
}
