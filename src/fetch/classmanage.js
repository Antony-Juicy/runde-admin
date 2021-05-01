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

    // 网课编码
    courseclasstypemiddle_listJsp: {url: '/admin/courseclasstypemiddle/listJsp', method: 'get'},
    courseclasstypemiddle_goAddWindows: {url: '/admin/courseclasstypemiddle/goAddWindows', method: 'get'},
    courseclasstypemiddle_save: {url: '/admin/courseclasstypemiddle/save', method: 'post'},
    courseclasstypemiddle_editJsp: {url: '/admin/courseclasstypemiddle/editJsp', method: 'post'},
    courseclasstypemiddle_deleteJsp: {url: '/admin/courseclasstypemiddle/deleteJsp', method: 'post'},
    courseclasstypemiddle_synCourseLiveCode: {url: '/admin/courseclasstypemiddle/synCourseLiveCode', method: 'get'},
    courseclasstypemiddle_goEdit: {url: '/admin/courseclasstypemiddle/goEdit', method: 'get'},

    // 直播编码
    courseclasstypelivecode_listJsp: {url: '/admin/courseclasstypelivecode/listJsp', method: 'get'},
    courseclasstypelivecode_save: {url: '/admin/courseclasstypelivecode/save', method: 'post'},
    courseclasstypelivecode_editJsp: {url: '/admin/courseclasstypelivecode/editJsp', method: 'put'},
    courseclasstypelivecode_deleteJsp: {url: '/admin/courseclasstypelivecode/deleteJsp', method: 'post'},
    courseclasstypelivecode_goAddWindows: {url: '/admin/courseclasstypelivecode/goAddWindows', method: 'get'},
    courseclasstypelivecode_goEdit: {url: '/admin/courseclasstypelivecode/goEdit', method: 'get'},
}