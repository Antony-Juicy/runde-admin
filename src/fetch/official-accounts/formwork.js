// 模板通知
export default {
    // 获取公众号模板列表
    get_official_accounts_formwrok_list: { url: '/wechat/console/wechat_template/get_list', method: 'post' },

    // 公众号模板消息发送
    send_official_accounts_formwrok: { url: '/wechat/console/wechat_template/send_msg', method: 'post' },

    // 分页查询微信公众号用户
    get_wechat_users_page: { url: '/wechat/console/wechat_user/page_list', method: 'post' },
}