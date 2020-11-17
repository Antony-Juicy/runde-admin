let config = {
    //打包生成的类型
    //官网  rundejy
    //医职圈  yizhiquan
    version: 'yizhiquan',
}
if(config.version === 'yizhiquan') {
    // config.baseUrl = 'http://192.168.0.195:8081'; //本地测试
    config.baseUrl = 'http://wwwapi.yizhiquanzp.com';// 线上的接口
}else if(config.version === 'rundejy') {
    // config.baseUrl = 'http://192.168.0.195:8083'; //本地测试
    config.baseUrl = 'https://wwwapi.rundejy.com';// 线上的接口
}
module.exports = config;
