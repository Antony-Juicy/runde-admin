export default {
    user_login: {url: '/user/login', method: 'post', hideLoading: true},
    user_logout: {url: '/admin/sec/user/cancellation', method: 'post'},
    user_getMenuList: {url: '/admin/sec/user/menu/list', method: 'post'},
    user_getImgcode: {url: '/user/captcha', method: 'get', hideLoading: true}
}