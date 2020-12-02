let multipart_params = {
    key: '',
    success_action_status: ''
};
let baseKey = '';
let defaultSetting= {
    chooseFile: '',
};
let uploader={};
let uploadConfig='';

let options = {
    files: [],
    index: 0,
    urlList: ''
};
import axios from "axios"
import qs from "qs"
import plupload from "plupload";

export function uploadOss(uploaderInput, isMult, objConfig = {}) {
    return new Promise((resolve, reject)=>{
    // thePath 代表处理后台上传, 默认到'web/runde_console' 之外，还有一部分是上传到 cmsuserinfo/yxy上的
    let thePath = Object.keys(objConfig).length > 0 ? objConfig.dir : 'web/runde_console';
    axios.post('https://h5.rundejy.com/aliyunoss/getAliyunOssConfig', qs.stringify({path: thePath})).then(({data}) => {
        multipart_params = data.data;
        baseKey = data.data.key;
        uploader = new plupload.Uploader({
                runtimes : 'html5,flash,silverlight,html4',
                browse_button: uploaderInput, //触发文件选择对话框的按钮，为那个元素id
                url: data.data.host, //服务器端的上传页面地址
                filters: {
                    mime_types : [ //只允许上传图片和zip文件
                        { title : "Image", extensions : "jpg,gif,png,jpeg" },
                    ], 
                },
            })
            uploader.init();

            // 三：点击事件 文件上传     // 获得的图片上传的地址：https://rdjiaowu.oss-cn-shenzhen.aliyuncs.com/ + key 
            uploader.bind('FilesAdded', function (uploader, files) { // 限制提交的最多的张数是多少
                // console.log("点击事件 文件上传",files);
                
                options.files = files;
                defaultSetting.chooseFile = files[0];
                if(Object.keys(objConfig).length > 0) {
                    // console.log("objConfig",objConfig);
                    if(objConfig.name) {
                        set_upload_param(uploader,  objConfig.dir +"/"+ objConfig.project+ objConfig.name, false);
                        return;
                    }else {
                        set_upload_param(uploader, objConfig.dir +"/"+  objConfig.project +files[0].name, false);
                        return;
                    }
                }
                // 这次处理 修改了图片上传的名称为随机的32为字符 解决了图片是中文的问题
                set_upload_param(uploader,baseKey + randomString()+"."+files[0].name.split(".")[1], false);
            });
            //五：上传成功
            uploader.bind('FileUploaded', function (up, file, info) {
                if(info.status === 200) {
                    if(!isMult) {
                        // 非多选的情况下 可以不要reload
                        // console.log("isMult",isMult );
                        resolve(uploadConfig);
                    }else{
                        // 这一整块的内容 是为了图片管理模块 内部批量上传网页的图片处理的 基本不改动
                        options.urlList = options.urlList + uploadConfig + ',';
                        options.index++;
                        if(options.index < options.files.length) { // 已经全部上传完毕
                            if(Object.keys(objConfig).length > 0) {
                                set_upload_param(uploader, objConfig.dir +"/"+ objConfig.project +options.files[options.index].name, false);
                                return;
                            }
                            set_upload_param(uploader, baseKey + timestamp()+ options.files[options.index].name, false);
                        }else {
                            resolve(options.urlList); 
                            reloadData(); 
                        }
                    }
                }else {
                    console.log("上传失败",info.response);
                    resolve('error');
                    reloadData();
                }
            });
        })
    })
}
// 三：点击事件 文件上传 
function set_upload_param(up, filename, ret, base64tofile){
    // console.log('filename',filename,"------",multipart_params);
    
    multipart_params.key = filename;
    multipart_params.success_action_status = '200';
    // console.log('multipart_params',multipart_params);

    up.setOption({
        'url': multipart_params.host,
        'multipart_params': multipart_params
    });
    
    // uploadConfig = multipart_params.host +'/'+ filename;
    //上面这个是默认的https://jiaowu-live.oss-cn-shenzhen.aliyuncs.com 这个域名，建议不用用下面这个我们的域名
    uploadConfig = 'https://rdimg.rundejy.com/'+ filename;
    
    // console.log("需要上传图片",multipart_params,"uploadConfig",uploadConfig);
    if(base64tofile) { //  若是上传的是本地
    // 上传的base64位的图片的话 那么需要再这里单独上传
        up.addFile(base64tofile);
    }
    up.start();
}
function reloadData() {
    
    multipart_params = {};
    baseKey = '';
    defaultSetting= {
        chooseFile: '',
    };
    uploader={};
    uploadConfig='';

    options = {
        files: [],
        index: 0,
        urlList: ''
    };
    // console.log("reloadData",options);
}
function timestamp() {
    var time = new Date();
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return "" + y + add0(m) + add0(d) + add0(h) + add0(mm) + add0(s);
}
// 生成32位的随机数
function randomString(e) { // e表示长度 默认32位
  e  = e || 32;
  var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",a = t.length,n = "";
  for(let i=0; i< e; i++) {
    n += t.charAt(Math.floor(Math.random() * a));
  }
  return n;
}
function add0(m) {
    return m < 10 ? '0' + m : m;
}
