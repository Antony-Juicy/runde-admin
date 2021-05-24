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
    
}