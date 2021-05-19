export default {
    // 连锁列表
    chaininfo_listJsp: { url: '/teach/chaininfo/listJsp', method: 'post' }, //列表
    chaininfo_goAdd: { url: '/teach/chaininfo/goAdd', method: 'post' }, //下拉框
    chaininfo_checkChainExist: { url: '/teach/chaininfo/checkChainExist', method: 'post' },//校验
    chaininfo_save: { url: '/teach/chaininfo/save', method: 'post' },//新增

    // 分校连锁：
    chaincampus_listJsp: { url: '/teach/chaincampus/listJsp', method: 'post' }, //列表
    chaincampus_goAdd: { url: '/teach/chaincampus/goAdd', method: 'post' }, //下拉框
    chaincampus_save: { url: '/teach/chaincampus/save', method: 'post' },//新增
    chaincampus_checkSame: { url: '/teach/chaincampus/checkSame', method: 'post' },//校验
    chaincampus_goEdit: { url: '/teach/chaincampus/goEdit', method: 'get' },//回显
    chaincampus_editJsp: { url: '/teach/chaincampus/editJsp', method: 'post' },
    
    //连锁负责人
    chaincampus_listChainLeaderJsp: { url: '/teach/chaincampus/listChainLeaderJsp', method: 'post' }, //列表
    chaincampus_goAddLeader: { url: '/teach/chaincampus/goAddLeader', method: 'post' }, //枚举
    chaincampus_checkPhoneExist: { url: '/teach/chaincampus/checkPhoneExist', method: 'post' }, //校验
    chaincampus_saveLeader: { url: '/teach/chaincampus/saveLeader', method: 'post' }, //保存
    // 1.列表：
    // /chaincampus/listChainLeaderJsp.do
    // 2.新增
    // 枚举：/chaincampus/goAddLeader
    // 校验：/chaincampus/checkPhoneExist
    // 保存：/chaincampus/saveLeader
}