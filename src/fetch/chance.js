export default {
    // 成单列表
    chance_order_list: {url: '/crm/opportunity/myYCDListJson', method: 'post'},

    // 机会轨迹
    chance_track_list: {url: '/crm/crmopportunitytrail/phoneListJsp', method: 'post'},
    chance_track_record: {url: '/crm/crmopportunitytrail/listJson', method: 'post'},

    // 通话记录
    chance_call_list: {url: '/crm/crmopportunity/callRecordListJsp', method: 'post'},
    chance_call_phone: {url: '/crm/crmopportunity/hujingCallRecordListJson', method: 'post'},  //手机外呼
    chance_call_qimo: {url: '/crm/crmopportunity/qimoCallRecordListJson', method: 'post'}, //在线外呼(总部)
    chance_call_zhibo: {url: '/crm/crmopportunity/zhiboCallRecordListJson', method: 'post'}, //在线外呼(分校)

    // 失效机会
    chance_invalid_list: {url: '/crm/crmopportunity/listJson', method: 'post'},

    // 机会列表
    chance_list: {url: '/crm/crmopportunity/listJson', method: 'post'},

    // 注册人列表
    chance_registrant_list: {url: '/crm/crmopportunity/listCreateOppJson', method: 'post'},

    // 机会配置管理
    chance_config_list: {url: '/crm/crmopportunityconfig/listJson', method: 'post'},
    chance_config_add: {url: '/crm/crmopportunityconfig/save', method: 'post'},
    chance_config_campusList: {url: '/crm/crmopportunityconfig/configCampusList', method: 'post'},
    chance_config_productList: {url: '/crm/crmopportunityconfig/configProductList', method: 'post'},
    chance_config_delete: {url: '/crm/crmopportunityconfig/deleteCrmOpportunityConfig', method: 'post'},

}