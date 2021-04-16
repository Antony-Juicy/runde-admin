// 公众号管理
export default {

    // 分页获取标签
    get_official_accounts_label_page: { url: '/wechat/console/wechat_label/page_list', method: 'post' },

    // 不分页获取标签
    get_official_accounts_label_list: { url: '/wechat/console/wechat_label/list', method: 'post' },


    // 微信公众号添加标签
    add_official_accounts_label: { url: '/wechat/console/wechat_label/add', method: 'post' },


    // 微信公众号删除标签
    delete_official_accounts_label: { url: '/wechat/console/wechat_label/delete', method: 'post' },
}