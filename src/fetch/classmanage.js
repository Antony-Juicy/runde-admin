export default {
    // 班型内容管理
    courseProductContent_listJsp: {url: '/teach/courseProductContent/listJsp', method: 'get'},
    courseProductContent_save: {url: '/teach/courseProductContent/save', method: 'post'},
    courseProductContent_edit: {url: '/teach/courseProductContent/edit', method: 'put'},
    courseProductContent_delete: {url: '/teach/courseProductContent/delete', method: 'delete'},
    courseProductContent_stageGroupList: {url: '/teach/courseProductContent/courseClasstypeStageGroup', method: 'get'},//根据项目id获取班型阶段
    courseProductContent_getProductList: {url: '/teach/courseProductContent/getProductList', method: 'get'}, //获取项目列表
    courseProductContent_udpateStatus: {url: '/teach/courseProductContent/udpateStatus', method: 'put'}, //修改状态
    courseProductContent_goAccountingRulesSelects: {url: '/teach/courseProductContent/goAccountingRulesSelects', method: 'get'}, //核算规则下拉

    // 网课编码
    courseclasstypemiddle_listJsp: {url: '/teach/courseclasstypemiddle/listJsp', method: 'get'},
    courseclasstypemiddle_goAddWindows: {url: '/teach/courseclasstypemiddle/goAddWindows', method: 'get'},
    courseclasstypemiddle_save: {url: '/teach/courseclasstypemiddle/save', method: 'post'},
    courseclasstypemiddle_editJsp: {url: '/teach/courseclasstypemiddle/editJsp', method: 'post'},
    courseclasstypemiddle_deleteJsp: {url: '/teach/courseclasstypemiddle/deleteJsp', method: 'post'},
    courseclasstypemiddle_synCourseLiveCode: {url: '/teach/courseclasstypemiddle/synCourseLiveCode', method: 'get'},
    courseclasstypemiddle_goEdit: {url: '/teach/courseclasstypemiddle/goEdit', method: 'get'},

    // 直播编码
    courseclasstypelivecode_listJsp: {url: '/teach/courseclasstypelivecode/listJsp', method: 'get'},
    courseclasstypelivecode_save: {url: '/teach/courseclasstypelivecode/save', method: 'post'},
    courseclasstypelivecode_editJsp: {url: '/teach/courseclasstypelivecode/editJsp', method: 'put'},
    courseclasstypelivecode_deleteJsp: {url: '/teach/courseclasstypelivecode/deleteJsp', method: 'post'},
    courseclasstypelivecode_goAddWindows: {url: '/teach/courseclasstypelivecode/goAddWindows', method: 'get'},
    courseclasstypelivecode_goEdit: {url: '/teach/courseclasstypelivecode/goEdit', method: 'get'},

    // 音频编码
    courseclasstypefrequencycode_listJsp: {url: '/teach/courseclasstypefrequencycode/listJsp', method: 'get'},
    courseclasstypefrequencycode_save: {url: '/teach/courseclasstypefrequencycode/save', method: 'post'},
    courseclasstypefrequencycode_editJsp: {url: '/teach/courseclasstypefrequencycode/editJsp', method: 'post'},
    courseclasstypefrequencycode_deleteJsp: {url: '/teach/courseclasstypefrequencycode/deleteJsp', method: 'post'},
    courseclasstypefrequencycode_goAddWindows: {url: '/teach/courseclasstypefrequencycode/goAddWindows', method: 'get'},
    courseclasstypefrequencycode_goEdit: {url: '/teach/courseclasstypefrequencycode/goEdit', method: 'get'},

    // 配送图书
    bookclasstypecoursemiddle_listJsp: {url: '/teach/bookclasstypecoursemiddle/lookListJsp', method: 'get'},
    bookclasstypecoursemiddle_save: {url: '/teach/bookclasstypecoursemiddle/save', method: 'post'},
    bookclasstypecoursemiddle_editJsp: {url: '/teach/bookclasstypecoursemiddle/editJsp', method: 'post'},
    bookclasstypecoursemiddle_deleteJsp: {url: '/teach/bookclasstypecoursemiddle/deleteJsp', method: 'post'},
    bookclasstypecoursemiddle_goAddWindows: {url: '/teach/bookclasstypecoursemiddle/goAddWindows', method: 'get'},
    bookclasstypecoursemiddle_goEdit: {url: '/teach/bookclasstypecoursemiddle/goEdit', method: 'get'},
    bookclasstypecoursemiddle_checkByClassTypeCourseBookId: {url: '/teach/bookclasstypecoursemiddle/checkByClassTypeCourseBookId', method: 'post'},

    // 班次管理
    courseclass_listJsp: {url: '/teach/courseclass/listJsp', method: 'get'},
    courseclass_goAdd: {url: '/teach/courseclass/goAdd', method: 'get'},
    courseclass_goEdit: {url: '/teach/courseclass/goEdit', method: 'get'},
    courseclass_save: {url: '/teach/courseclass/save', method: 'post'},
    courseclass_editJsp: {url: '/teach/courseclass/editJsp', method: 'post'},
}