import Axios from 'axios'
import {
  get
} from 'js-cookie';
import {
  getToken
} from '../utils/auth'

export function request(config) {
  //创建axios的实例
  return new Promise((resolve, reject) => {
    const instance = Axios.create({
      baseURL: 'https://fengzai.top:3033/admin/api',
      timeout: 5000,
    })
    // return instance(config)

    //请求拦截器
    instance.interceptors.request.use(config => {
      // console.log(config)
      if (getToken()) {
        config.headers.Authorization = 'Bearer ' + getToken()
      }
      return config;
    }, err => {
      // console.log(err);
    });
    //2.2响应拦截
    instance.interceptors.response.use(res => {
      console.log(res)
      resolve(res)
    }, err => {
      reject(err)
    });
    return instance(config)
  })
}