// #  全局接口请求的域名
// export const BASEURL = "http://fengzhixinrunde.iicp.net/public"; // 测试
// export const BASEURL = "http://192.168.0.195:8083/public"; // 智新本地测试

// 暂时由于接口没有图片 所以全局添加了部分以域名 www.rundejy.com/assets  http://www.rundejy.com/ 开头的静态图片 到时候上线的话就删除



let obj = {
    baseurl: "", //全局接口请求的域名
    imghost: "",  //全局图片的域名
}

if(process.env.__ENV == "development"){
    // 开发环境
    
    obj.baseurl = "http://guanwang195.vaiwan.com/public";
    obj.imghost = "http://guanwang195.vaiwan.com/";
}else if(process.env.__ENV == "testing"){
    // 测试环境
    obj.baseurl = "http://fengzhixinrunde.iicp.net/public";
    obj.imghost = "http://fengzhixinrunde.iicp.net/";
}else if(process.env.__ENV == "production") {
    // 生产环境
    obj.baseurl = "https://wwwapi.rundejy.com/public";
    obj.imghost = "https://wwwapi.rundejy.com/";
}

module.exports = obj;

