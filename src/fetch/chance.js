export default {

    // ---回访记录-----
    // 沟通动态
    chance_feedback_commuity: {url: '/crm/crmopportunityfeedback/listJson', method: 'post'},
    // 日志记录
    chance_feedback_log: {url: '/crm/crmopportunityfeedback/logListJson', method: 'post'},
    // 手机外呼
    chance_feedback_sjwh:  {url: '/crm/crmopportunity/hujingSingleCallRecordListJson', method: 'post'},
    // 总部外呼/小号外呼
    chance_feedback_zbwh: {url: '/crm/crmopportunity/qimoSingleCallRecordListJson', method: 'post'},
    // 分校外呼
    chance_feedback_fxwh: {url: '/crm/crmopportunity/zhiboCallRecordListJson', method: 'post'},

    // 我的机会
    chance_my_list:  {url: '/crm/crmopportunity/myListJson', method: 'post'},

    // 分校/战队公海
    chance_campus_list: {url: '/crm/crmopportunity/listBranchCampusJson', method: 'post'},

    // 省校/网校公海
    chance_province_list: {url: '/crm/crmopportunity/listProvinceCampusJson', method: 'post'},
    // 成单列表
    chance_order_list: {url: '/crm/crmopportunity/myYCDListJson', method: 'post'},

    // 机会轨迹
    chance_track_list: {url: '/crm/crmopportunitytrail/phoneListJsp', method: 'post'},
    chance_track_record: {url: '/crm/crmopportunitytrail/listJson', method: 'get'},
    chance_track_byId: {url: '/crm/crmopportunitytrail/getOpportunityInfoById', method: 'post'},
    chance_track_byPhone: {url: '/crm/crmopportunitytrail/getOpportunitysInfoByPhone', method: 'post'},

    // 通话记录
    chance_call_list: {url: '/crm/crmopportunity/callRecordListJsp', method: 'post'},
    chance_call_phone: {url: '/crm/crmopportunity/hujingCallRecordListJson', method: 'post'},  //手机外呼
    chance_call_qimo: {url: '/crm/crmopportunity/qimoCallRecordListJson', method: 'post'}, //在线外呼(总部)
    chance_call_zhibo: {url: '/crm/crmopportunity/zhiboCallRecordListJson', method: 'post'}, //在线外呼(分校)

    // 失效机会
    chance_invalid_list: {url: '/crm/crmopportunity/listJson', method: 'post'},
    chance_invalid_update: {url: '/crm/crmopportunity/updateInvalidOpp', method: 'post'},

    // 机会列表
    chance_list: {url: '/crm/crmopportunity/listJson', method: 'post'},

    // 注册人列表
    chance_registrant_list: {url: '/crm/crmopportunity/listCreateOppJson', method: 'post'},

    // 机会配置管理
    chance_config_list: {url: '/crm/crmopportunityconfig/listJson', method: 'post'},
    chance_config_add: {url: '/crm/crmopportunityconfig/save', method: 'post'},
    chance_config_productList: {url: '/crm/crmopportunityconfig/configProductList', method: 'post'},
    chance_config_delete: {url: '/crm/crmopportunityconfig/deleteCrmOpportunityConfig', method: 'post'},
    // 组织架构
    chance_config_campusList: {url: '/crm/crmopportunityconfig/configCampusList', method: 'post'},

    // 机会来源
    chance_source_list: {url: '/crm/crmopportunity/saleSourceList', method: 'post'},
    // 获取跟进状态接口
    chance_status_list: {url: '/crm/crmopportunity/statusList', method: 'post'},
    //  获取机会状态接口  
    chance_trail_list: {url: '/crm/crmopportunity/opportunityTrailStatusList', method: 'get'},
    // 获取学历接口
    chance_edu_list: {url: '/crm/crmopportunity/eduBackGroundList', method: 'post'},
    // 归属销售
    chance_staff_list: {url: '/crm/crmopportunity/staffList', method: 'post'},
    // 客户分类
    chance_customer_list: {url: '/crm/crmopportunity/customerLevelList', method: 'post'},
    // 项目
    chance_product_list: {url: '/crm/crmopportunity/productList', method: 'post'},
    chance_subject_list: {url: '/crm/crmopportunity/subjectList', method: 'post'},
    chance_course_list: {url: '/crm/crmopportunity/courseList', method: 'post'},
    // 呼叫状态
    chance_call_status:  {url: '/crm/crmopportunity/callStatusList', method: 'post'},

}