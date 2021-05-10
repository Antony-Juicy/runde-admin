export default {
    // 项目
    courseProduct_listJspn: { url: '/admin/courseproduct/listJson', method: 'post' }, //listJson
    courseProduct_listJsp: { url: '/admin/courseproduct/listJsp', method: 'get' }, //获取所有项目
    courseProduct_goAdd: { url: '/admin/courseproduct/goAdd', method: 'get' }, //新增页面
    courseProduct_editJsp: { url: '/admin/courseproduct/editJsp', method: 'post' }, //修改页面
    courseProduct_save: { url: '/admin/courseproduct/save', method: 'post' }, //新增
    courseProduct_goEdit: { url: '/admin/courseproduct/goEdit', method: 'get' }, //修改页面
    //科目
    coursesubject_courseList: { url: '/admin/coursesubject/courseList', method: 'get' }, //根据科目id获取subject
    coursesubject_getProductList: { url: '/admin/coursesubject/getProductList', method: 'get' }, //获取项目列表
    coursesubject_listJspn: { url: '/admin/coursesubject/listJson', method: 'post' }, //listJson
    coursesubject_editJsp: { url: '/admin/coursesubject/editJsp', method: 'post' }, //修改
    coursesubject_save: { url: '/admin/coursesubject/save', method: 'post' }, //新增
    coursesubject_goEdit: { url: '/admin/coursesubject/goEdit', method: 'get' }, //修改页面
    // 班型管理
    courseclasstype_listJson: { url: '/admin/courseclasstype/listJson', method: 'post' }, //分页查询列表
    courseclasstype_subjectList: { url: '/admin/courseclasstype/subjectList', method: 'get' }, //根据项目Id获取科目
    courseclasstype_goSearch: { url: '/admin/courseclasstype/goSearch', method: 'get' }, //搜索框条件查询
    courseclasstype_contentDetails: { url: '/admin/courseclasstype/contentDetails', method: 'get' }, //根据班型ID查询班型信息
    courseclasstype_goAddWindows: { url: '/admin/courseclasstype/goAddWindows', method: 'get' }, //新增班型弹窗
    courseclasstype_courseClasstypeGroupList: { url: '/admin/courseclasstype/courseClasstypeGroupList', method: 'get' }, //获取班型分組
    courseclasstype_courseClasstypeStageGroup: { url: '/admin/courseclasstype/courseClasstypeStageGroup', method: 'get' }, //获取班型阶段
    courseclasstype_courseList: { url: '/admin/courseclasstype/courseList', method: 'get' }, // 根据条件查找对应课程
    courseProductContent_listJsp: { url: '/admin/courseProductContent/listJsp', method: 'get' }, // 获取项目内容列表
    courseclasstype_save: { url: '/admin/courseclasstype/save', method: 'post' }, // 新增
    courseclasstype_getclassType: { url: '/admin/courseclasstype/getclassType', method: 'get' }, // 根据班型ID查询班型信息
    courseclasstype_getById: { url: '/admin/courseclasstype/getById', method: 'get' }, // 根据班型ID查询班型信息
    courseProductContent_courseContentByProductId: { url: '/admin/courseProductContent/courseContentByProductId', method: 'get' }, // 根据项目id获取班型内容
    courseclasstype_edit: { url: '/admin/courseclasstype/edit', method: 'post' }, // 保存修改
    
}