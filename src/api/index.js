import request from '@/utils/request'
const modulesFiles = require.context('./modules', true, /\.js$/)

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value
  return modules
}, {})

export function uploadFile(data) {
  // return instance.post('/uploadFile',data)
  return request({
    url: 'image/uploadFile',
    method: 'post',
    data,
    // headers: { 'Content-type': 'multipart/form-data' },
  })
}
export function getSpaceImage(data) {
  return request({
    url: 'index/getSpaceImage',
    method: 'post',
    data
  })
}
export function getArea(data) {
  return request({
    url: 'index/getArea',
    method: 'post',
    data
  })
}

export default modules
