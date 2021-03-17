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
    cmsexamprofession_getOneLinkage:  {url: '/h5/cmsexamprofession/getOneLinkage', method: 'post'}, //获取一级分类
    cmsexamprofession_linkage:  {url: '/h5/cmsexamprofession/linkage', method: 'post'}, //获取二级分类
    // 审核通知
    cmsexamchecknotification_listJsp:  {url: '/h5/cmsexamchecknotification/listJsp', method: 'get'}, //列表
}