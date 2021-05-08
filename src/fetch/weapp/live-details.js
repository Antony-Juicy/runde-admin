export default {
  // 直播统计
  live_detail_invitation_list: {url:'/live/console/live_statistics/page_invitation_list', method: 'post' }, // 分页获取直播邀请统计列表
  live_detail_reward_list: {url: '/live/console/live_statistics/page_reward_list', method: 'post' }, // 分页获取直播打赏统计列表
  live_detail_getDetail: {url: '/live/console/live_statistics/get_live_statistics_detail', method: 'post' }, // 数据分析页获取直播统计详情信息
  live_detail_summary: { url: '/live/console/live_statistics/get_summary_data', method: 'post' }, // 获取汇总数据
  live_detail_list: { url: '/live/console/live_statistics/page_list', method: 'post' }, // 分页获取直播统计列表
  
  // 邀请统计
  invite_count_list: { url:'/live/console/live_invite/page_live_invite_data', method: 'post' },

  // 商品订单统计
  orders_list: { url:'/live/console/order/page_list', method: 'post' },
  orders_detail: { url:'/live/console/order/get_order_detail', method: 'post' },
  orders_export: { url: '/live/console/order/export', method: 'post'}

}