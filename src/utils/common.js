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
        let lefttime = endtime - nowtime.getTime(),  //距离结束时间的毫秒数
            leftd = Math.floor(lefttime / (1000 * 60 * 60 * 24)),  //计算天数
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
    }

}

export default $common