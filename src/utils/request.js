import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { showLoading, hideLoading } from './loading'
import qs from 'qs'
import md5 from 'md5';
// create an axios instance
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;';

// axios.defaults.withCredentials = true
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, 
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 20000 // request timeout
})

const getParam = () => {
  const timestamp = parseInt(new Date().getTime() / 1000)

  return {
    timestamp
  }
}
// request interceptor
service.interceptors.request.use(
  config => {
    showLoading()
    // 请求头携带token
    // if (store.getters.token) {
    //   config.headers['rundejy_token'] = getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
    // }
    if (config.data && config.data.append) {
      config.data.append('token', getToken())
      let _param = getParam()
      for (const i in _param) {
        config.data.append(i, _param[i])
      }
    } else {
      config.data = qs.stringify({
        ...config.data,
        token: getToken(),
        ...getParam()
      })
      // config.data = {
      //   ...config.data,
      //   token: getToken(),
      //   ...getParam()
      // };
    }

    // config.cookies = {
    //   token: getToken()
    // }
    // config.headers['x-auth-token'] = getToken()
    // do something before request is sent
    // if (store.getters.token) {
    // let each request carry token
    // ['X-Token'] is a custom headers key
    // please modify it according to the actual situation
    // config.headers['x-requested-with'] = getToken()
    // config.headers.authorization = getToken()
    // }
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    hideLoading()
    const res = response.data
    // if the custom code is not 1, it is judged as an error.
    if (res.code !== 1) {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 10 * 1000
      })

      // 4: Illegal token;
      if (res.code === 4 || res.code === -37) {
        let msg = '您已注销，可以取消以留在此页，或重新登录。'
        if (res.code === -37 && msg) {
          msg = res.msg
        }
        // to re-login
        MessageBox.confirm(msg, '确认注销', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    hideLoading()
    Message({
      message: '网络繁忙，请稍后重试', // error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

/**
  * 为url链接附加参数
  * @param {String} url 链接
  * @param {Object} params 参数对象
  */
 function appendUrlParams(url = '', params = {}) {
  let str = String(url).trim();
  if (Object.keys(params).length === 0) return str;
  if (String(str).indexOf('?') === -1) str += '?';
  else str += '&';

  for (let key in params) {
    str += `${key}=${params[key]}&`;
  }

  str = String(str).substr(0, str.length - 1);
  return str;
}

const $fetch = async (apiName, params, config) => {
  if (typeof apiConfig[apiName] !== "object") {
    throw new Error("调用api函数函数错误，请检查函数名称是否错误" + apiName);
  }

  let newConfig = JSON.parse(JSON.stringify(apiConfig[apiName]));
  const { headers = [], bodyParams, method } = newConfig;
  newConfig.headers = {};

  if (headers.length > 0) {
    headers.forEach(({ key, value }) => {
      newConfig.headers[key] = value;
    });
  }

  if (!params) {
    params = {};
  }
  for (let key in params) {
    params[key] = encodeURIComponent(params[key])
  }
  params.timestamp = Date.now();
  params.sign = md5(`appId=${CONFIG.appId}&appKey=${CONFIG.appKey}&timestamp=${params.timestamp}`).toString().toLocaleUpperCase();
  // post请求 往url追加参数
  if (!bodyParams && method == 'post') {
    if (params) {
      newConfig.url = appendUrlParams(newConfig.url, params)

    }
  }
  
  return service(newConfig);
}

export default service
