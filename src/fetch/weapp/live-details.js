export default {
  // 直播统计
  live_detail_invitation_list: {url:'/live/console/live_statistics/page_invitation_list', method: 'post' }, // 分页获取直播邀请统计列表
  live_detail_reward_list: {url: '/live/console/live_statistics/page_reward_list', method: 'post' }, // 分页获取直播打赏统计列表
  live_detail_getDetail: {url: '/live/console/live_statistics/get_live_statistics_detail', method: 'post' }, // 数据分析页获取直播统计详情信息
  live_detail_summary: { url: '/live/console/live_statistics/get_summary_data', method: 'post' }, // 获取汇总数据
  live_detail_list: { url: '/live/console/live_statistics/page_list', method: 'post' }, // 分页获取直播统计列表
}