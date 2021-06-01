export default {
    chain_pageList: {url: '/app/chain/console/chainInfo/pageList', method: 'post'},//列表
    chain_getChainTypeList: {url: '/app/chain/console/chainInfo/getChainTypeList', method: 'post'},//连锁类型下拉
    chain_importChainByExcel: {url: '/app/chain/console/chainInfo/importChainByExcel', method: 'post'},//导入
    chain_add: {url: '/app/chain/console/chainInfo/add', method: 'post'},//添加
    chain_getUpdateInfo: {url: '/app/chain/console/chainInfo/getUpdateInfo', method: 'post'},//获取编辑数据
    chain_update: {url: '/app/chain/console/chainInfo/update', method: 'post'},//编辑
    chain_getUserListByStaffName: {url: '/app/chain/console/user/getUserListByStaffName', method: 'post',hideLoading: true},//根据姓名搜索用户
    chain_getUserListByCampusId: {url: '/app/chain/console/user/getUserListByCampusId', method: 'post'},//连锁分配根据分校id获取用户列表
    chain_getCampusList: {url: '/app/chain/console/campus/getCampusList', method: 'post'},//级联获取组织架构列表
    chain_chainAllocating: {url: '/app/chain/console/chainInfo/chainAllocating', method: 'post'},//连锁分配
    chain_chainVisitRecord: {url: '/app/chain/console/chainVisitRecord/pageList', method: 'post'},//分页获取拜访记录
    chain_getVisitRecordDetail: {url: '/app/chain/console/chainVisitRecord/getVisitRecordDetail', method: 'post'},//获取拜访详情
    chain_getChainAllocatingInfo: {url: '/app/chain/console/chainInfo/getChainAllocatingInfo', method: 'post'},//获取连锁分配信息
    chain_getGroupStatisticsSynopsis: {url: '/app/chain/console/chainVisitStatistics/getGroupStatisticsSynopsis', method: 'post'},//获取团队统计概要
    chain_getGroupStatisticsData: {url: '/app/chain/console/chainVisitStatistics/getGroupStatisticsData', method: 'post'},//获取团队统计数据
    chain_getGroupStatisticsDefaultOption: {url: '/app/chain/console/chainVisitStatistics/getGroupStatisticsDefaultOption', method: 'post'},//获取团队数据面板选项
    chain_getVisitStatisticsTodaySynopsis: {url: '/app/chain/console/chainVisitStatistics/getVisitStatisticsTodaySynopsis', method: 'post'},//获取团队统计今日任务概要
    chain_getVisitStatisticsWeekSynopsis: {url: '/app/chain/console/chainVisitStatistics/getVisitStatisticsWeekSynopsis', method: 'post'},//获取团队统计本周任务概要
    chain_getGroupStatisticsTodayData: {url: '/app/chain/console/chainVisitStatistics/getGroupStatisticsTodayData', method: 'post'},//获取团队统计本周任务概要
    chain_getGroupStatisticsWeekData: {url: '/app/chain/console/chainVisitStatistics/getGroupStatisticsWeekData', method: 'post'},//获取团队统计本周任务概要
    chain_getGroupStatisticsOverdueData: {url: '/app/chain/console/chainVisitStatistics/getGroupStatisticsOverdueData', method: 'post'},//获取团队统计本周任务概要
    chain_getGroupStatisticsRankingData: {url: '/app/chain/console/chainVisitStatistics/getGroupStatisticsRankingData', method: 'post'},//获取团队统计本周任务概要
    chain_getPeopleStatisticsSynopsis: {url: '/app/chain/console/chainVisitStatistics/getPeopleStatisticsSynopsis', method: 'post'},//获取个人统计概要
    chain_getPeopleStatisticsData: {url: '/app/chain/console/chainVisitStatistics/getPeopleStatisticsData', method: 'post'},//获取个人统计数据
    chain_getPeopleVisitData: {url: '/app/chain/console/chainVisitStatistics/getPeopleVisitData', method: 'post'},//获取个人拜访数据
    chain_getPeopleVisitSynopsis: {url: '/app/chain/console/chainVisitStatistics/getPeopleVisitSynopsis', method: 'post'},//获取个人拜访概要
    
    
}