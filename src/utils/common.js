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
        let time = new Date(date)
        if(!time) {
          return ''
        }
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
    }
}

export default $common