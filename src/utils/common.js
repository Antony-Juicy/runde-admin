const $common = {
    _console(){
        console.log(123)
    },
    _validatorPhone(rule, value, callback) {
        if (value === '') {
            callback(new Error('手机号不能为空'))
        } else if (!/^1\d{10}$/.test(value)) {
            callback(new Error('手机号格式错误'))
        } else {
            callback()
        }
    },
    _validatePassWord(rule, value, callback) {
        if (value === '') {
            callback(new Error('请输入密码'));
        } else {
            callback();
        }
    },
    // 年月日时分时间处理
    _formatDates(date) {
        if(!date) {
            return ''
          }
        let time = new Date(date)
        let year = time.getFullYear();
        let month = time.getMonth() + 1;
        let day = time.getDate();
        let hours = time.getHours();
        let minutes = time.getMinutes();

        if (month < 10) month = `0${month}`;
        if (day < 10) day = `0${day}`
        if (hours < 10) hours = `0${hours}`
        if (minutes < 10) minutes = `0${minutes}`

        return `${year}-${month}-${day} ${hours}:${minutes}`;
    },

    // 30天倒计时功能
    showtime(time){
        let nowtime = new Date();  //获取当前时间
        let endtime = new Date(time).setDate(new Date(time).getDate() + 30)
        let lefttime = endtime - nowtime.getTime(),  //距离结束时间的毫秒数
        leftd = Math.floor(lefttime/(1000*60*60*24)),  //计算天数
        lefth = Math.floor(lefttime/(1000*60*60)%24),  //计算小时数
        leftm = Math.floor(lefttime/(1000*60)%60),  //计算分钟数
        lefts = Math.floor(lefttime/1000%60);  //计算秒数
        if(lefttime<0){
            return ''
        }
        return leftd + "天" + lefth + "小时" + leftm + "分" + lefts + "秒";  //返回倒计时的字符串
    },

    // 传入结束时间的倒计时功能
    showCutDown(endtime){
        let nowtime = new Date(); 
        let lefttime = endtime - nowtime.getTime(),  //距离结束时间的毫秒数
        leftd = Math.floor(lefttime/(1000*60*60*24)),  //计算天数
        lefth = Math.floor(lefttime/(1000*60*60)%24),  //计算小时数
        leftm = Math.floor(lefttime/(1000*60)%60),  //计算分钟数
        lefts = Math.floor(lefttime/1000%60);  //计算秒数
        return leftd + "天" + lefth + "小时" + leftm + "分" + lefts + "秒"; 
    },

    // 隐藏手机号中间四位
    hidePhone(phone){
        if(!phone){
            return ""
        }
        let str = String(phone)
        let len = str.length;
        if (len >= 7) {
            let reg = str.slice(-8, -4)
            return str.replace(reg, "****")
        } else if (len < 7 && len >= 6) {
            //1234567
            let reg = str.slice(-4, -2)
            return str.replace(reg, "**")
        }
    },

    // 重新加载组件
    reloadElem(dataElem) {
        this[dataElem] = false;
        this.$nextTick(() => {
          this[dataElem] = true;
        });
    },

    // 获取用户userId
    getUserId(){
        return localStorage.getItem('loginUserId');
    }
}

export default $common