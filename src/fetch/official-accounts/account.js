// 公众号管理
export default {

    // 分页查询微信公众号
    get_official_accounts_page: { url: '/wechat/console/wechat_name/page_list', method: 'post' },

    // 不分页查询微信公众号
    get_official_accounts_list: { url: '/wechat/console/wechat_name/list', method: 'post' },

    // 微信公众号添加
    add_official_account: { url: '/wechat/console/wechat_name/add', method: 'post' },

    // 微信公众号删除
    delete_official_account: { url: '/wechat/console/wechat_name/delete', method: 'post' },

    // 微信公众号修改
    update_official_account: { url: '/wechat/console/wechat_name/update', method: 'post' },






}