export default {//项目内容管理
    courseProductContent_listJsp: {url: '/admin/courseProductContent/listJsp', method: 'get'}, //获取班型内容列表
    getProductList: {url: '/admin/courseProductContent/getProductList', method: 'get'}, //获取班型内容列表

    // 班型内容管理
    courseProductContent_listJsp: {url: '/admin/courseProductContent/listJsp', method: 'get'},
    courseProductContent_save: {url: '/admin/courseProductContent/save', method: 'post'},
    courseProductContent_edit: {url: '/admin/courseProductContent/edit', method: 'put'},
    courseProductContent_delete: {url: '/admin/courseProductContent/delete', method: 'delete'},
    courseProductContent_stageGroupList: {url: '/admin/courseProductContent/courseClasstypeStageGroup', method: 'get'},//根据项目id获取班型阶段
    courseProductContent_getProductList: {url: '/admin/courseProductContent/getProductList', method: 'get'}, //获取项目列表
    courseProductContent_udpateStatus: {url: '/admin/courseProductContent/udpateStatus', method: 'put'}, //修改状态
    courseProductContent_goAccountingRulesSelects: {url: '/admin/courseProductContent/goAccountingRulesSelects', method: 'get'}, //核算规则下拉
}