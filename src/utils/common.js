const $common = {
    _console() {
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
        if (!date) {
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

    _formatDates2(date) {
        if (!date) {
            return ''
        }
        let time = new Date(date)
        let year = time.getFullYear();
        let month = time.getMonth() + 1;
        let day = time.getDate();
        let hours = time.getHours();
        let minutes = time.getMinutes();
        let seconds = time.getSeconds();

        if (month < 10) month = `0${month}`;
        if (day < 10) day = `0${day}`
        if (hours < 10) hours = `0${hours}`
        if (minutes < 10) minutes = `0${minutes}`
        if (seconds < 10) seconds = `0${seconds}`

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },

    // 30天倒计时功能
    showtime(time) {
        let nowtime = new Date();  //获取当前时间
        let endtime = new Date(time).setDate(new Date(time).getDate() + 30)
        let lefttime = endtime - nowtime.getTime(),  //距离结束时间的毫秒数
            leftd = Math.floor(lefttime / (1000 * 60 * 60 * 24)),  //计算天数
            lefth = Math.floor(lefttime / (1000 * 60 * 60) % 24),  //计算小时数
            leftm = Math.floor(lefttime / (1000 * 60) % 60),  //计算分钟数
            lefts = Math.floor(lefttime / 1000 % 60);  //计算秒数
        if (lefttime < 0) {
            return ''
        }
        return leftd + "天" + lefth + "小时" + leftm + "分" + lefts + "秒";  //返回倒计时的字符串
    },

    // 传入结束时间的倒计时功能
    showCutDown(endtime) {
        let nowtime = new Date();
        let lefttime = new Date(endtime).getTime() - nowtime.getTime(); //距离结束时间的毫秒数
        if (lefttime <= 0) {
            return '';
        }
        let leftd = Math.floor(lefttime / (1000 * 60 * 60 * 24)),  //计算天数
            lefth = Math.floor(lefttime / (1000 * 60 * 60) % 24),  //计算小时数
            leftm = Math.floor(lefttime / (1000 * 60) % 60),  //计算分钟数
            lefts = Math.floor(lefttime / 1000 % 60);  //计算秒数
        return leftd + "天" + lefth + "小时" + leftm + "分" + lefts + "秒";
    },

    // 隐藏手机号中间四位
    hidePhone(phone) {
        if (!phone) {
            return ""
        }
        let str = String(phone)
        return str.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
    },

    // 重新加载组件
    reloadElem(dataElem) {
        this[dataElem] = false;
        this.$nextTick(() => {
            this[dataElem] = true;
        });
    },

    // 获取用户userId
    getUserId() {
        return localStorage.getItem('loginUserId');
    },

    // 校验只要是数字（包含正负整数，0以及正负浮点数）就返回true
    isNumber(val) {
        if (parseFloat(val).toString() == "NaN") {
            return false;
        } else {
            return true;
        }
    },

    async sleep(time) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve()
            }, time)
        })
    },

    // 获取当天日期
    getCurrentDate() {
        let time = new Date()
        let year = time.getFullYear();
        let month = time.getMonth() + 1;
        let day = time.getDate();
        if (month < 10) month = `0${month}`;
        if (day < 10) day = `0${day}`
        return `${year}${month}${day}`;

    },

    // 配置图片缩略图
    setThumbnail(pic) {
        if (!pic) {
            return;
        }
        return pic + '?x-oss-process=image/auto-orient,1/resize,m_lfit,w_550/quality,q_100'
    },

    // 多级分类下拉
    getTypeTree(val) {
        val.forEach(item => {
            item.label = item.typeName.replace(/\\n/g, '');
            item.value = item.typeId;
            item.nodes = item.children
            if (item.children && item.children.length == 0) {
                // item.nodes = []
                delete item.nodes;
                delete item.children;
            } else {
                this.getTypeTree(item.nodes)
            }
        })
        return val
    },

    // 下载文件流
    downLoadFile(res) {
        let blob = new Blob([res], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8" }),
            Temp = document.createElement("a");
        Temp.href = window.URL.createObjectURL(blob);
        Temp.download = new Date().getTime();
        document.querySelector("body").appendChild(Temp);
        Temp.click();
        document.body.removeChild(Temp); //下载完成移除元素
        window.URL.revokeObjectURL(Temp.href);
    },
    /**
     * isEmpty 方法 true 为空 false 不为空
     *
     * @param {*} value
     * @returns
     */
    isEmpty(value) {
        // undefined null 判断为空
        if (value === undefined || value === null) {
            return true;
        }
        switch (this.isType(value)) {
            case 'array': {
                return value.length === 0; // 空数组
            }
            case 'object': {
                return Object.keys(value).length === 0; // 空对象
            }
            case 'string': {
                return value.length === 0; // 空字符串
            }
            default: {
                // 其余的 Number Math Boolean Date RegExp Error JSON Arguments 类型暂不判断
                return false;
            }
        }
    },

    /**
     * hasEmpty 方法 true 内容有空 false 全都不为空
     *
     * @param {Array<any>} arr
     * @returns
     */
    hasEmpty(arr) {
        let flag = false;
        arr.some(node => {
            flag = this.isEmpty(node);
            if (flag === true) {
                return true;
            }
        }, {});
        return flag;
    },

    /**
     * 获取对象实际类型 强化版typeof
     *
     * @param {*} obj
     * @returns
     */
    isType(obj) {
        var toString = Object.prototype.toString;
        var map = {
            '[object Boolean]': 'boolean',
            '[object Number]': 'number',
            '[object String]': 'string',
            '[object Function]': 'function',
            '[object Array]': 'array',
            '[object Date]': 'date',
            '[object RegExp]': 'regExp',
            '[object Undefined]': 'undefined',
            '[object Null]': 'null',
            '[object Object]': 'object'
        };
        return map[toString.call(obj)];
    },

    /**
     * 获取 js 常用的标准时间戳
     *
     * @param {(string|number)} time
     */
    getNormalTime(time) {
        return Number(String(time).padEnd(13, '0'));
    },
    /**
    * 按类型格式化日期
    * @param {number | Date} date 具体日期变量
    * @param {string} dateType 需要返回类型
    * @return {string} dateText 返回为指定格式的日期字符串
    */
    getFormatDate(date, dateType) {
        let dateObj = new Date(date);
        let month = dateObj.getMonth() + 1;
        let strDate = dateObj.getDate();
        let hours = dateObj.getHours();
        let minutes = dateObj.getMinutes();
        let seconds = dateObj.getSeconds();
        if (month >= 1 && month <= 9) {
            month = '0' + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = '0' + strDate;
        }
        if (hours >= 0 && hours <= 9) {
            hours = '0' + hours;
        }
        if (minutes >= 0 && minutes <= 9) {
            minutes = '0' + minutes;
        }
        if (seconds >= 0 && seconds <= 9) {
            seconds = '0' + seconds;
        }

        let dateText = dateObj.getFullYear() + '年' + (dateObj.getMonth() + 1) + '月' + dateObj.getDate() + '日';
        if (dateType == 'yyyy-mm-dd') {
            dateText = dateObj.getFullYear() + '-' + (dateObj.getMonth() + 1) + '-' + dateObj.getDate();
        }
        if (dateType == 'yyyy.mm.dd') {
            dateText = dateObj.getFullYear() + '.' + (dateObj.getMonth() + 1) + '.' + dateObj.getDate();
        }
        if (dateType == 'yyyy-mm-dd HH:mm:ss') {
            dateText = dateObj.getFullYear() + '-' + month + '-' + strDate + ' ' + hours + ':' + minutes + ':' + seconds;
        }
        if (dateType == 'mm-dd HH:mm:ss') {
            dateText = month + '-' + strDate + ' ' + hours + ':' + minutes + ':' + seconds;
        }
        if (dateType == 'yyyy年mm月dd日 HH:mm:ss') {
            dateText = dateObj.getFullYear() + '年' + month + '月' + strDate + '日' + ' ' + hours + ':' + minutes + ':' + seconds;
        }
        if (dateType == 'yyyy年mm月dd日 HH:mm') {
            dateText = dateObj.getFullYear() + '年' + month + '月' + strDate + '日' + ' ' + hours + ':' + minutes;
        }
        if (dateType == 'yyyy/mm/dd HH:mm') {
            dateText = dateObj.getFullYear() + '/' + month + '/' + strDate + ' ' + hours + ':' + minutes;
        }
        if (dateType == 'mm月dd日') {
            dateText = month + '月' + strDate + '日'
        }
        if (dateType == 'HH:mm:ss') {
            dateText = hours + ':' + minutes + ':' + seconds;
        }
        if (dateType == 'mm:ss') {
            dateText = minutes + ':' + seconds;
        }
        if (dateType == 'HH:mm') {
            dateText = hours + ':' + minutes;
        }
        return dateText;
    },
    /**
 * 获取时间公共方法
 * startYear 开始年份 null为当前年份前5年
 * endYear 结束年份 null为当前年份
 */
    addYearArr(startYear, endYear) {
        var yearArr = [];
        var myDate = new Date();
        let nowYear = myDate.getFullYear();//当前年
        if (endYear) {
        } else {//为空为当前年
            endYear = nowYear;
        }
        if (startYear) {
        } else {//为空为当前年前5年
            startYear = nowYear - 4;
        }
        for (var int = startYear; int <= endYear; int++) {
            yearArr.push(int);
        }
        return yearArr;
    },

    _getNowYearDate(str) {//返回当前年月日数据格式
        var strArr = str.split('-');
        if (strArr.length > 2) {//str 2001-08-20 00:00
            var arr = strArr[2].split(' ');
            var day = arr[0];
            var month = strArr[1];
        } else {//str 08-20 
            var month = strArr[0];
            var day = strArr[1];
            console.log("arr22", 'day', day, month)
        }
        var year = new Date().getFullYear();

        str = (year + '-' + month + '-' + day).toString();
        return str;
    },
    _formatDates3(date) {//只返回年月的日期格式
        if (!date) {
            return ''
        }
        let time = new Date(date)
        let year = time.getFullYear();
        let month = time.getMonth() + 1;
        let day = time.getDate();
        let hours = time.getHours();
        let minutes = time.getMinutes();
        let seconds = time.getSeconds();

        if (month < 10) month = `0${month}`;
        if (day < 10) day = `0${day}`
        if (hours < 10) hours = `0${hours}`
        if (minutes < 10) minutes = `0${minutes}`
        if (seconds < 10) seconds = `0${seconds}`

        return `${month}-${day}`;
    },

}

export default $common