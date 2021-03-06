export default {
    // 看图识药
    lookpicture_list: {url: '/h5/lookpictureitem/listJsp', method: 'get'},//列表
    lookpicture_add: {url: '/h5/lookpictureitem/save', method: 'post'},//新增
    lookpicture_edit: {url: '/h5/lookpictureitem/editJsp', method: 'post'},//编辑
    lookpicture_delete: {url: '/h5/lookpictureitem/deleteJsp', method: 'post'},//删除
    lookpicture_details: {url: '/h5/lookpictureitem/goDetails', method: 'get'},//详情
    lookpicture_import: {url: '/h5/lookpictureitem/importIssueExcel', method: 'post'},//导入
    lookpicture_getProductTypeList: {url: '/h5/lookpictureitem/getProductTypeList', method: 'get'},//获取一级项目类型
    lookpicture_getProductList: {url: '/h5/lookpictureitem/getProductList', method: 'get'},//获取二级项目类型
    lookpicture_goEditDetails: {url: '/h5/lookpictureitem/goEditDetails', method: 'get'}, //获取题目编辑详情
    lookpicture_selectIssue: {url: '/h5/lookpictureitem/updateSingleAndMultipleChoiceIssuse', method: 'post', paramType: "body"}, //修改单选/多选题

    // 晒证作品管理
    cmscertificateinfo_getActivityList: {url: '/h5/cmscertificateinfo/getActivityList', method: 'get'}, //活动名称列表
    cmscertificateinfo_getProductList: {url: '/h5/cmscertificateinfo/getProductList', method: 'get'}, //项目类型列表
    cmscertificateinfo_wchatList: {url: '/h5/cmscertificateinfo/wchatList', method: 'get'}, //微信用户列表
    cmscertificateinfo_list: {url: '/h5/cmscertificateinfo/listJsp', method: 'get'}, //列表
    cmscertificateinfo_add: {url: '/h5/cmscertificateinfo/save', method: 'post'}, //新增
    cmscertificateinfo_export: {url: '/h5/cmscertificateinfo/excelJsp', method: 'get', responseType: "arraybuffer"}, //导出
    cmscertificateinfo_getAllColumnNamesCertificateInfo: {url: '/h5/exportexcelcolumnname/getAllColumnNamesCertificateInfo', method: 'post'}, //获取导出详情
    cmscertificateinfo_goEdit: {url: '/h5/cmscertificateinfo/goEdit', method: 'get'}, //获取编辑详情
    cmscertificateinfo_batchChange: {url: '/h5/cmscertificateinfo/batchChange', method: 'post'}, //批量暂停、恢复操作
    cmscertificateinfo_editStatus: {url: '/h5/cmscertificateinfo/editStatus', method: 'post'}, //单个暂停、恢复操作
    cmscertificateinfo_toExcelPic: {url: '/h5/cmscertificateinfo/toExcelPic', method: 'post'}, //批量导出作品图片
    
    // 晒证投票记录
    cmscertificatevotes_getActivityInfo: {url: '/h5/cmscertificatevotes/getActivityInfo', method: 'get'}, //列表
    cmscertificatevotes_getCertificate: {url: '/h5/cmscertificatevotes/getCertificate', method: 'get'}, //列表
    cmscertificatevotes_getProductList: {url: '/h5/cmscertificatevotes/getProductList', method: 'get'}, //列表
    cmscertificatevotes_getStatusList: {url: '/h5/cmscertificatevotes/getStatusList', method: 'get'}, //列表
    cmscertificatevotes_getVoteTypeList: {url: '/h5/cmscertificatevotes/getVoteTypeList', method: 'get'}, //列表
    cmscertificatevotes_getWechat: {url: '/h5/cmscertificatevotes/getWechat', method: 'get'}, //列表
    cmscertificatevotes_list: {url: '/h5/cmscertificatevotes/listJsp', method: 'get'}, //列表
    cmscertificatevotes_add: {url: '/h5/cmscertificatevotes/save', method: 'post'}, //新增
    cmscertificatevotes_edit: {url: '/h5/cmscertificatevotes/editJsp', method: 'post'}, //修改
    cmscertificatevotes_goEdit: {url: '/h5/cmscertificatevotes/goEdit', method: 'get'}, //获取编辑详情

    // 密押考点
    secretexamsubject_list:  {url: '/h5/secretexamsubject/listJsp', method: 'get'}, //列表
    secretexamsubject_add:  {url: '/h5/secretexamsubject/save', method: 'post'}, //新增
    secretexamsubject_editJsp:  {url: '/h5/secretexamsubject/editJsp', method: 'post'}, //编辑
    secretexamsubject_goEdit:  {url: '/h5/secretexamsubject/goEdit', method: 'get'}, //去编辑页面
    secretexamsubject_delete:  {url: '/h5/secretexamsubject/deleteJsp', method: 'post'}, //删除
    secretexamsubject_deleteTk:  {url: '/h5/secretexamsubject/deleteTk', method: 'post'}, //删除题库
    secretexamsubject_importIssueExcel:  {url: '/h5/secretexamsubject/importIssueExcel', method: 'post'}, //导入题目
    secretexamsubject_viewExercises:  {url: '/h5/secretexamsubject/viewExercises', method: 'get'}, //预览题目图片
    // 考后对答案
    practicingExamSiteItem_list: {url: '/h5/practicingExamSiteItem/custodyListNewJsp', method: 'get'}, //列表
    practicingExamSiteItem_delete: {url: '/h5/practicingExamSiteItem/deleteCustodyNewJsp', method: 'post'}, //列表

    // 考试大纲-作废
    secretexamsubject_listExamJsp:  {url: '/h5/secretexamsubject/listExamJsp', method: 'get'}, //列表

    // 报考省份
    cmsexamprovince_listJsp:  {url: '/h5/cmsexamprovince/listJsp', method: 'get'}, //列表
    cmsexamprovince_save:  {url: '/h5/cmsexamprovince/save', method: 'post'}, //新增
    cmsexamprovince_editJsp:  {url: '/h5/cmsexamprovince/editJsp', method: 'post'}, //编辑
    cmsexamprovince_deleteJsp:  {url: '/h5/cmsexamprovince/deleteJsp', method: 'post'}, //删除
    // 报考信息
    cmsexamguideinfo_listJsp:  {url: '/h5/cmsexamguideinfo/listJsp', method: 'get'}, //列表
    cmsexamguideinfo_save:  {url: '/h5/cmsexamguideinfo/save', method: 'post'}, //新增
    cmsexamguideinfo_editJsp:  {url: '/h5/cmsexamguideinfo/editJsp', method: 'post'}, //编辑
    cmsexamguideinfo_deleteJsp:  {url: '/h5/cmsexamguideinfo/deleteJsp', method: 'post'}, //删除
    // 报考专业
    cmsexamprofession_listJsp:  {url: '/h5/cmsexamprofession/listJsp', method: 'get'}, //列表
    cmsexamprofession_save:  {url: '/h5/cmsexamprofession/save', method: 'post'}, //新增
    cmsexamprofession_editJsp:  {url: '/h5/cmsexamprofession/editJsp', method: 'post'}, //编辑
    cmsexamprofession_deleteJsp:  {url: '/h5/cmsexamprofession/deleteJsp', method: 'post'}, //删除
    cmsexamprofession_goEdit:  {url: '/h5/cmsexamprofession/goEdit', method: 'get'}, //获取详情 
    cmsexamprofession_getOneLinkage:  {url: '/h5/cmsexamprofession/getOneLinkage', method: 'post', hideLoading: true}, //获取一级分类
    cmsexamprofession_linkage:  {url: '/h5/cmsexamprofession/linkage', method: 'post', hideLoading: true}, //获取二级分类
    // 审核通知
    cmsexamchecknotification_listJsp:  {url: '/h5/cmsexamchecknotification/listJsp', method: 'get'}, //列表
    cmsexamchecknotification_save:  {url: '/h5/cmsexamchecknotification/save', method: 'post',paramType: "body"}, //新增
    cmsexamchecknotification_editJsp:  {url: '/h5/cmsexamchecknotification/editJsp', method: 'post',paramType: "body"}, //编辑
    cmsexamchecknotification_deleteJsp:  {url: '/h5/cmsexamchecknotification/deleteJsp', method: 'post'}, //删除
    cmsexamchecknotification_goEdit:  {url: '/h5/cmsexamchecknotification/goEdit', method: 'get'}, //详情

    // 地推卡领取管理
    groundPush_listJsp:  {url: '/h5/cms/groundPush/listJsp', method: 'get'}, //列表
    groundPush_export:  {url: '/h5/cms/groundPush/export', method: 'get'}, //列表
    // 地推卡领取统计
    groundPush_statisticslistJsp:  {url: '/h5/cms/groundPush/statisticslistJsp', method: 'get'}, //列表
    groundPush_exportExcelJsp:  {url: '/h5/cms/groundPush/exportExcelJsp', method: 'get'}, //列表

    // 报考答疑
    cmssignupanswer_listJsp:  {url: '/h5/cmssignupanswer/listJsp', method: 'get'}, //列表
    cmssignupanswer_toExcel:  {url: '/h5/cmssignupanswer/toExcel', method: 'get'}, //导出

    // 试听链接
    auditionLink_listJsp:  {url: '/h5/cms/auditionLink/listJsp', method: 'get'}, //列表
    auditionLink_export:  {url: '/h5/cms/auditionLink/export', method: 'get'}, //打包
    auditionLink_userEvaluationRecordListJsp:  {url: '/h5/auditionuserrecord/userEvaluationRecordListJsp', method: 'get'}, //测评详情
    auditionLink_userRecordListJsp:  {url: '/h5/auditionuserrecord/userRecordListJsp', method: 'get'}, //做题详情

    // 试听科目
    auditionitemsubject_listJsp:  {url: '/h5/auditionitemsubject/listJsp', method: 'get'}, //列表
    auditionitemsubject_save:  {url: '/h5/auditionitemsubject/save', method: 'post'}, //新增
    auditionitemsubject_editJsp:  {url: '/h5/auditionitemsubject/editJsp', method: 'post'}, //编辑
    auditionitemsubject_deleteJsp:  {url: '/h5/auditionitemsubject/deleteJsp', method: 'post'}, //删除
    auditionitemsubject_goEdit:  {url: '/h5/auditionitemsubject/goEdit', method: 'get'}, //详情
    auditionitemsubject_importIssueExcel:  {url: '/h5/auditionitemsubject/importIssueExcel', method: 'post'}, //导入
    auditionitemsubject_getProductName:  {url: '/h5/auditionproduct/getProductName', method: 'get', hideLoading: true}, //获取项目下拉列表
    auditionitemsubject_getSubjectType:  {url: '/h5/auditionsubjecttype/getSubjectType', method: 'get', hideLoading: true}, //获取科目下拉列表

    // 试听项目
    auditionproduct_listJsp:  {url: '/h5/auditionproduct/listJsp', method: 'get'}, //列表
    auditionproduct_deleteJsp:  {url: '/h5/auditionproduct/deleteJsp', method: 'post'}, //删除
    auditionproduct_importIssueExcel:  {url: '/h5/auditionproduct/importIssueExcel', method: 'post'}, //导入
    auditionproduct_editJsp:  {url: '/h5/auditionproduct/editJsp', method: 'post'}, //编辑

    // 科目类型
    auditionsubjecttype_listJsp:  {url: '/h5/auditionsubjecttype/listJsp', method: 'get'}, //列表

    // 科目题目
    auditionitem_listJsp:  {url: '/h5/auditionitem/listJsp', method: 'get'}, //列表
    auditionitem_save:  {url: '/h5/auditionitem/save', method: 'post'}, //新增
    auditionitem_editJsp:  {url: '/h5/auditionitem/editJsp', method: 'post'}, //编辑
    auditionitem_deleteJsp:  {url: '/h5/auditionitem/deleteJsp', method: 'post'}, //删除

    // 推荐班型
    auditionclass_listJsp:  {url: '/h5/auditionclass/listJsp', method: 'get'}, //列表
    auditionclass_save:  {url: '/h5/auditionclass/save', method: 'post'}, //新增
    auditionclass_editJsp:  {url: '/h5/auditionclass/editJsp', method: 'post'}, //编辑
    auditionclass_deleteJsp:  {url: '/h5/auditionclass/deleteJsp', method: 'post'}, //删除

    // 医师活动-站点管理
    practicingexamsite_listJsp:  {url: '/h5/practicingexamsite/listJsp', method: 'get'}, //列表
    practicingexamsite_save:  {url: '/h5/practicingexamsite/save', method: 'post'}, //新增
    practicingexamsite_editJsp:  {url: '/h5/practicingexamsite/editJsp', method: 'post'}, //编辑
    practicingexamsite_goAdd:  {url: '/h5/practicingexamsite/goAdd', method: 'get'}, //获取新增的详情
    practicingexamsite_goEdit:  {url: '/h5/practicingexamsite/goEdit', method: 'get'}, //获取编辑的详情
    practicingexamsite_deleteJsp:  {url: '/h5/practicingexamsite/deleteJsp', method: 'post'}, //删除
    practicingexamsite_custodyListJsp:  {url: '/h5/practicingExamSiteItem/custodyListJsp', method: 'get'}, //考后对答案列表
    practicingexamsite_custodySave:  {url: '/h5/practicingExamSiteItem/custodySave', method: 'post'}, //考后对答案新增
    practicingexamsite_editCustodyJsp:  {url: '/h5/practicingExamSiteItem/editCustodyJsp', method: 'post'}, //考后对答案编辑
    practicingexamsite_importItem:  {url: '/h5/practicingExamSiteItem/importItem', method: 'post'}, //考后对答案导入题目

    // 活动管理
    cmsactivityinfo_listJsp:  {url: '/h5/cmsactivityinfo/listJsp', method: 'get'}, //列表
    cmsactivityinfo_save:  {url: '/h5/cmsactivityinfo/save', method: 'post',paramType: "body"}, //新增
    cmsactivityinfo_editJsp:  {url: '/h5/cmsactivityinfo/editJsp', method: 'post',paramType: "body"}, //编辑
    cmsactivityinfo_deleteJsp:  {url: '/h5/cmsactivityinfo/deleteJsp', method: 'post'}, //删除
    cmsactivityinfo_goEdit:  {url: '/h5/cmsactivityinfo/goEdit', method: 'get'}, //去修改页面
    cmsactivityinfo_selectInvitation:  {url: '/h5/cmsactivityinfourl/selectInvitation', method: 'get'}, //生成链接

    // 海报管理
    posterinfo_listJson:  {url: '/h5/posterinfo/listJson', method: 'get'}, //列表
    posterinfo_save:  {url: '/h5/posterinfo/save', method: 'post'}, //新增
    posterinfo_editJsp:  {url: '/h5/posterinfo/editJsp', method: 'post'}, //修改
    posterinfo_deleteJsp:  {url: '/h5/posterinfo/deleteJsp', method: 'post'}, //删除
    posterinfo_goEdit:  {url: '/h5/posterinfo/goEdit', method: 'get'}, //删除
    posterinfo_checkActivityId:  {url: '/h5/posterinfo/checkActivityId', method: 'post'}, //验证数据库是否存在活动
    posterinfo_checkGoodsId:  {url: '/h5/posterinfo/checkGoodsId', method: 'post'}, //验证数据库是否存在商品
    posterinfo_getMobileGoodsUrlDataList:  {url: '/h5/posterinfo/getMobileGoodsUrlDataList', method: 'get'}, //九块九包邮下拉列表
    posterinfo_getActivityInfoDataList:  {url: '/h5/posterinfo/getActivityInfoDataList', method: 'get'}, //活动下拉列表

    // 9块9包邮
    mobilegoodsurl_listNewJsp:  {url: '/h5/mobilegoodsurl/listNewJsp', method: 'get'}, //列表
    mobilegoodsurl_goNewEdit:  {url: '/h5/mobilegoodsurl/goNewEdit', method: 'get'}, //去新增页面
    mobilegoodsurl_editNewJsp:  {url: '/h5/mobilegoodsurl/editNewJsp', method: 'post'}, //新增、编辑
    mobilegoodsurl_deleteJsp:  {url: '/h5/mobilegoodsurl/deleteJsp', method: 'post'}, //删除
    mobilegoodsurl_goAddNew:  {url: '/h5/mobilegoodsurl/goAddNew', method: 'get'}, //去新增页面
    mobilegoodsurl_subjectList:  {url: '/admin/coursesubject/subjectList', method: 'post'}, //获取科目列表
    mobilegoodsurl_bookList:  {url: '/crm/bookinfo/purchase/bookList/xlp', method: 'post'}, //获取书籍列表
    mobilegoodsurl_getProductList:  {url: '/h5/mobilegoodsurl/getProductList', method: 'get'}, //获取项目列表
    mobilegoodsurl_getWeChatList:  {url: '/h5/mobilegoodsurl/getWeChatList', method: 'get'}, //获取项目列表
    mobilegoodsurl_getCampusList:  {url: '/h5/mobilegoodsurl/getCampusList', method: 'get'}, //获取项目列表
    // 活动统计
    mobilegoodspaylog_getQgsjxqActivityNumRank:  {url: '/h5/cmsmobilegoodspaylog/getQgsjxqActivityNumRank', method: 'get'},//全国
    mobilegoodspaylog_getQgxxfxActivityNumRank:  {url: '/h5/cmsmobilegoodspaylog/getQgxxfxActivityNumRank', method: 'get'},//线下
    mobilegoodspaylog_getQgxxfxActivityNumRank:  {url: '/h5/cmsmobilegoodspaylog/getQgxxfxActivityNumRank', method: 'get'},//线上
    mobilegoodspaylog_getPersonalActivityNumRank:  {url: '/h5/cmsmobilegoodspaylog/getPersonalActivityNumRank', method: 'get'},//个人
    mobilegoodspaylog_toStatisticsJsp:  {url: '/h5/cmsmobilegoodspaylog/toStatisticsJsp', method: 'get'},//合计
    // 活动名称详情
    cmsmobilegoodspaylog_listJson:  {url: '/h5/cmsmobilegoodspaylog/listJson', method: 'get'},//列表
    cmsmobilegoodspaylog_editJsp:  {url: '/h5/cmsmobilegoodspaylog/editJsp', method: 'post'},//修改地址
    cmsmobilegoodspaylog_importKuaidi:  {url: '/h5/cmsmobilegoodspaylog/importKuaidi', method: 'post'},//导入快递管家
    cmsmobilegoodspaylog_checkData:  {url: '/h5/cmsmobilegoodspaylog/checkData', method: 'post'},//判断是否可以添加订单数据
    cmsmobilegoodspaylog_saveAgain:  {url: '/h5/cmsmobilegoodspaylog/saveAgain', method: 'post'},//添加订单（旧）
    cmsmobilegoodspaylog_saveAgainTwo:  {url: '/h5/cmsmobilegoodspaylog/saveAgainTwo', method: 'post'},//添加订单（新）
    cmsmobilegoodspaylog_batchImportToKd:  {url: '/h5/cmsmobilegoodspaylog/batchImportToKd', method: 'post'},//批量同步到金蝶
    cmsmobilegoodspaylog_getAllColumnNames:  {url: '/h5/exportexcelcolumnname/getAllColumnNames', method: 'post'},//获取导出所有列
    cmsmobilegoodspaylog_excelJsp:  {url: '/h5/cmsmobilegoodspaylog/excelJsp', method: 'get'},//导出
    cmsmobilegoodspaylog_batchImportToKuaidi:  {url: '/h5/mobilegoodsurl/batchImportToKuaidi', method: 'post'},//同步到快递100

    // 订单信息
    cmsmobilegoodspaylog_listJsp:  {url: '/h5/cmsmobilegoodspaylog/listJsp', method: 'get'}, //列表
    cmsmobilegoodspaylog_getPayTypeList:  {url: '/h5/cmsmobilegoodspaylog/getPayTypeList', method: 'get'}, //支付类型列表
    cmsmobilegoodspaylog_getExpressStatus:  {url: '/h5/cmsmobilegoodspaylog/getExpressStatus', method: 'get'}, //快递状态列表

    // 物流信息
    mobilegoodsexpresslog_listJsp:  {url: '/h5/mobilegoodsexpresslog/listJsp', method: 'get'}, //列表
    mobilegoodsexpresslog_saveImport:  {url: '/h5/mobilegoodsexpresslog/saveImport', method: 'post'}, //导出

    // 评论管理
    mobilegoodsurl_listJspComments:  {url: '/h5/mobilegoodsurl/listJspComments', method: 'get'}, //列表
    mobilegoodsurl_saveImport:  {url: '/h5/mobilegoodsurl/saveImport', method: 'post'}, //导入
    mobilegoodsurl_updateStatus:  {url: '/h5/mobilegoodsurl/updateStatus', method: 'post'}, //
    mobilegoodsurl_deleteJspCommentLog:  {url: '/h5/mobilegoodsurl/deleteJspCommentLog', method: 'post'}, //

    // 公众号管理
    wechatmanage_listJsp:  {url: '/h5/wechatmanage/listJsp', method: 'get'}, //列表
    wechatmanage_save:  {url: '/h5/wechatmanage/save', method: 'post'}, //列表
    wechatmanage_editJsp:  {url: '/h5/wechatmanage/editJsp', method: 'post'}, //列表
    // 查看公众号粉丝信息
    wechatstaffqrcode_listJsp:  {url: '/h5/wechatstaffqrcode/listJsp', method: 'get'}, //列表
    wechatstaffqrcode_getActivityDataList:  {url: '/h5/wechatstaffqrcode/getActivityDataList', method: 'get'}, //列表
    wechatstaffqrcode_getBindTypeList:  {url: '/h5/wechatstaffqrcode/getBindTypeList', method: 'get'}, //列表
    wechatstaffqrcode_getOrderSourceList:  {url: '/h5/wechatstaffqrcode/getOrderSourceList', method: 'get'}, //列表
    wechatstaffqrcode_getUrlCodeDataList:  {url: '/h5/wechatstaffqrcode/getUrlCodeDataList', method: 'get'}, //列表
    wechatstaffqrcode_deleteJsp:  {url: '/h5/wechatstaffqrcode/deleteJsp', method: 'post'}, //删除
    wechatstaffqrcode_sendMessageInfo:  {url: '/h5/wechatstaffqrcode/sendMessageInfo', method: 'post'}, //推送专属信息
}