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

    // 晒证作品管理
    cmscertificateinfo_list: {url: '/h5/cmscertificateinfo/listJsp', method: 'get'}, //列表
    cmscertificateinfo_add: {url: '/h5/cmscertificateinfo/save', method: 'post'}, //新增
    cmscertificateinfo_getActivityList: {url: '/h5/cmscertificateinfo/getActivityList', method: 'get'}, //列表
    cmscertificateinfo_getProductList: {url: '/h5/cmscertificateinfo/getProductList', method: 'get'}, //列表
    cmscertificateinfo_wchatList: {url: '/h5/cmscertificateinfo/wchatList', method: 'get'}, //列表
}