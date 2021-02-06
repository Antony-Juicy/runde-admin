export default {
  // 直播
    live_add: { url: '/live/console/live/add', method: 'post' },
    live_update: { url: '/live/console/live/update', method: 'post' },
    live_delete: { url: '/live/console/live/delete', method: 'post' },
    live_list: { url: '/live/console/live/page_list', method: 'post' },
    live_getInfo: { url: '/live/console/live/getUpdateInfo', method: 'post' },
    live_updateShare: { url: '/live/console/live/update_share_info', method: 'post' },
    live_getShare: { url: '/live/console/live/get_share_info', method: 'post' },
    live_statistics_detail: {url: '/live/console/live_statistics/get_live_statistics_detail',method: 'post'},
    live_provincial_school_list: {url: '/live/console/live_statistics/page_provincial_school_list',method: 'post'},
    live_branch_school_list: {url: '/live/console/live_statistics/page_branch_school_list',method: 'post'},
    live_personal_list: {url: '/live/console/live_statistics/page_personal_list',method: 'post'},
    live_reward_list: {url: '/live/console/live_statistics/page_reward_list',method: 'post'},
    live_invitation_list: {url: '/live/console/live_statistics/page_invitation_list',method: 'post'},

    // 互动设置
    live_get_live_add_goods_list: {url: '/live/console/goods/get_live_add_goods_list',method: 'post'}, //弹窗商品列表
    live_batch_add_related: {url: '/live/console/live_goods/batch_add_related',method: 'post'}, //添加直播商品
    live_get_live_goods_list: {url: '/live/console/live_goods/page_live_goods_list',method: 'post'}, //直播关联商品列表
    live_goods_delete: {url: '/live/console/live_goods/delete',method: 'post'}, //删除直播商品
    live_get_coupon_list: {url: '/live/console/coupon/live_get_coupon_list',method: 'post'}, //直播获取优惠券列表
    live_get_coupon_detail: {url: '/live/console/coupon/get',method: 'post'}, //根据id获取数据
    live_coupon_add: {url: '/live/console/live_coupon/add',method: 'post'}, //添加直播优惠券
    live_coupon_related_list: {url: '/live/console/live_coupon/get_live_related_coupon_list',method: 'post'}, //获取直播关联优惠券列表
    live_coupon_send: {url: '/live/console/live_coupon/send',method: 'post'}, //优惠券派发
    live_page_coupon_receive_record: {url: '/live/console/live_coupon/page_coupon_receive_record',method: 'post'}, //优惠券派发

    // 答题卡
    live_answer_list: {url: '/live/console/live_answer_sheet/get_live_answer_sheet_list',method: 'post'}, //获取直播答题卡列表
    live_page_user_answer_data: {url: '/live/console/live_answer_sheet/page_user_answer_data',method: 'post'}, //分页获取用户答题数据
    live_get_options_statistics: {url: '/live/console/live_answer_sheet/get_options_statistics',method: 'post'}, //获取直播答题卡选项统计数据
    // 评论管理
    live_im_chat_data: {url: '/live/console/im/page_im_chat_data',method: 'post'}, //分页获取待审核聊天
    live_im_mute: {url: '/live/console/im/mute',method: 'post'}, //全体禁言开关
    live_im_chat_audit_switch: {url: '/live/console/im/chat_audit_switch',method: 'post'}, //全体聊天审核开关
    live_im_audit_chat: {url: '/live/console/im/audit_chat',method: 'post'}, //聊天审核(通过，不通过，删除，禁言)
    // 回放管理
    live_get_live_playback_list:  {url: '/live/console/live/playback/get_live_playback_list',method: 'post'}, //获取直播回放列表
    live_delete_playback:  {url: '/live/console/live/playback/delete',method: 'post'}, //删除直播回放

    // 链接
    live_get_url: {url: '/live/console/live/get_url',method: 'post'}, //获取链接
    // 小程序码
    live_get_qr_code: {url: '/live/console/live/get_qr_code',method: 'post'},
  } 