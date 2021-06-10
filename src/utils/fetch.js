import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import common from '@/utils/common'
import { showLoading, hideLoading } from './loading'
import apiConfig from "@/fetch/api.js"
import qs from 'qs'
import router from '@/router'
// create an axios instance
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// axios.defaults.withCredentials = true
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 20000 // request timeout
})

let totalNewConfig;

const getParam = () => {
  const timestamp = parseInt(new Date().getTime() / 1000)

  return {
    timestamp
  }
}
// request interceptor
service.interceptors.request.use(
  config => {
    if (!config.hideLoading) {
      showLoading()
    }

    if (config.data && config.data.append) {
      config.data.append('token', getToken())
      config.data.append('loginUserId', common.getUserId())
      let _param = getParam()
      for (const i in _param) {
        config.data.append(i, _param[i])
      }
    } 
    else if(totalNewConfig.headers["Content-Type"]&& totalNewConfig.headers["Content-Type"] == "application/json"){
      config.data.token = getToken()
      config.data.loginUserId = common.getUserId()
    }
    else {
      config.data = qs.stringify({
        token: getToken(),
        loginUserId: common.getUserId(),
        ...config.data,
        ...getParam()
      })
    }

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
  async response => {
    hideLoading()
    const res = response.data
    // 文件流直接返回
    if (res.code == undefined) {
      if(response.headers.msg == "SUCCESS") {
        return res
      } else {
        let errorMsg = decodeURI(response.headers.msg)
        Message({
          message: errorMsg || 'Error',
          type: 'error',
          duration: 3 * 1000
        })
        return Promise.reject(new Error(errorMsg || 'Error'))
      }
    }
    // if the custom code is not 1, it is judged as an error.
    if (res.code !== 200 && res.code !== 1 && res.code !== "Success") {
      // 4: Illegal token;
      if (res.code == 401 || res.code === 4) {
        Message.closeAll()
        Message({
          message: '您没有权限访问', // error.message,
          type: 'error',
          duration: 3 * 1000
        })
        store.dispatch("user/setTableText", "您没有权限访问")
      } else if (res.code == 402 || status === 403) {
        // 不做这个登录过期，直接跳到登陆页，不做提示
        // await store.dispatch('user/logout')
        // router.push(`/login`)
        let msg = '您的登录已过期，请重新登录。'
        // to re-login
        MessageBox.confirm(msg, '确认注销', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let loginType = localStorage.getItem('loginType')
          
          store.dispatch('user/resetToken').then(() => {
            if(loginType == 0){
              window.location.href = 'http://jiaowu.rundejy.com/'
            }else {
              location.reload()
            }
          })
        })
      } else {
        // 如果是账号注销失败 不用提示
        if (res.msg == "账号注销失败") {
          return
        }
        Message.closeAll()
        Message({
          message: res.msg || 'Error',
          type: 'error',
          duration: 3 * 1000
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  async error => {
    hideLoading();
    if (!error.response) {
      console.log(error, 'error')
      return;
    }
    let status = error.response.status;

    if (status === 401) {
      Message.closeAll()
      Message({
        message: '您没有权限访问', // error.message,
        type: 'error',
        duration: 3 * 1000
      })
      store.dispatch("user/setTableText", "您没有权限访问")
    } else if (status === 402 || status === 403) {
      // 不做这个登录过期，直接跳到登陆页，不做提示
      // await store.dispatch('user/logout')
      // router.push(`/login`)
      let msg = '您的登录已过期，请重新登录。'
      // to re-login
      MessageBox.confirm(msg, '确认注销', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let loginType = localStorage.getItem('loginType')
          store.dispatch('user/resetToken').then(() => {
            if(loginType == 0){
              window.location.href = 'http://jiaowu.rundejy.com/'
            }else {
              location.reload()
            }
          })
      })
    } else {
      Message.closeAll()
      Message({
        message: '网络繁忙，请稍后重试', // error.message,
        type: 'error',
        duration: 3 * 1000
      })
    }
    console.log('err:' + error) // for debug
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
  const { headers = [], paramType, method } = newConfig;
  newConfig.headers = {};
  if (headers.length > 0) {
    headers.forEach(({ key, value }) => {
      newConfig.headers[key] = value;
    });
  }

  if (getToken()) {
    newConfig.headers["Authorization"] =  process.env.NODE_ENV == 'development' ? 'rd_superadmin' : getToken();
    // newConfig.headers["Authorization"] = getToken();
  }

  if (paramType == "body") {
    newConfig.headers["Content-Type"] = 'application/json';
  } else {
    newConfig.headers["Content-Type"] = 'application/x-www-form-urlencoded'
  }

  if (params) {
    newConfig.url = newConfig.url.replace(/\{([\d\w_]+)\}/g, (word, $1) => {
      let res = params[$1] || "";
      delete params[$1]; // 将param在url中的参数删除，剩余的放进request body
      return res;
    });
    if (
      ["get", "delete", undefined].indexOf(apiConfig[apiName].method) > -1 ||
      apiConfig[apiName].formData
    ) {
      newConfig.params = params;
    } else {
      newConfig.data = params;
    }
  } else if (config && Object.keys(config).length > 0) {
    for (let [key] of Object.entries(config)) {
      newConfig[key] = Object.assign(config[key], newConfig[key]);
    }
  }

  // 往post请求的url上追加参数
  if (newConfig.queryKeys) {
    const urlParams = {};
    newConfig.queryKeys.forEach(i => {
      if (newConfig.data[i]) {
        urlParams[i] = newConfig.data[i];
        delete newConfig.data[i];
      }
    });
    newConfig.url = appendUrlParams(newConfig.url, urlParams);
  }

  totalNewConfig = newConfig;
  return service(newConfig);
}

export default $fetch
