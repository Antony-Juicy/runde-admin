export default {
    // 项目
    courseProduct_listJspn: { url: '/teach/courseproduct/listJson', method: 'post' }, //listJson
    courseProduct_listJsp: { url: '/teach/courseproduct/listJsp', method: 'get' }, //获取所有项目
    courseProduct_goAdd: { url: '/teach/courseproduct/goAdd', method: 'get' }, //新增页面
    courseProduct_editJsp: { url: '/teach/courseproduct/editJsp', method: 'post' }, //修改页面
    courseProduct_save: { url: '/teach/courseproduct/save', method: 'post' }, //新增
    courseProduct_goEdit: { url: '/teach/courseproduct/goEdit', method: 'get' }, //修改页面
    //科目
    coursesubject_courseList: { url: '/teach/coursesubject/courseList', method: 'get' }, //根据科目id获取subject
    coursesubject_getProductList: { url: '/teach/coursesubject/getProductList', method: 'get' }, //获取项目列表
    coursesubject_listJspn: { url: '/teach/coursesubject/listJson', method: 'post' }, //listJson
    coursesubject_editJsp: { url: '/teach/coursesubject/editJsp', method: 'post' }, //修改
    coursesubject_save: { url: '/teach/coursesubject/save', method: 'post' }, //新增
    coursesubject_goEdit: { url: '/teach/coursesubject/goEdit', method: 'get' }, //修改页面
    // 班型管理
    courseclasstype_listJson: { url: '/teach/courseclasstype/listJson', method: 'post' }, //分页查询列表
    courseclasstype_subjectList: { url: '/teach/courseclasstype/subjectList', method: 'get' }, //根据项目Id获取科目
    courseclasstype_goSearch: { url: '/teach/courseclasstype/goSearch', method: 'get' }, //搜索框条件查询
    courseclasstype_contentDetails: { url: '/teach/courseclasstype/contentDetails', method: 'get' }, //根据班型ID查询班型信息
    courseclasstype_goAddWindows: { url: '/teach/courseclasstype/goAddWindows', method: 'get' }, //新增班型弹窗
    courseclasstype_courseClasstypeGroupList: { url: '/teach/courseclasstype/courseClasstypeGroupList', method: 'get' }, //获取班型分組
    courseclasstype_courseClasstypeStageGroup: { url: '/teach/courseclasstype/courseClasstypeStageGroup', method: 'get' }, //获取班型阶段
    courseclasstype_courseList: { url: '/teach/courseclasstype/courseList', method: 'get' }, // 根据条件查找对应课程
    courseProductContent_listJsp: { url: '/teach/courseProductContent/listJsp', method: 'get' }, // 获取项目内容列表
    courseclasstype_save: { url: '/teach/courseclasstype/save', method: 'post' }, // 新增
    courseclasstype_getclassType: { url: '/teach/courseclasstype/getclassType', method: 'get' }, // 根据班型ID查询班型信息
    courseclasstype_getById: { url: '/teach/courseclasstype/getById', method: 'get' }, // 根据班型ID查询班型信息
    courseProductContent_courseContentByProductId: { url: '/teach/courseProductContent/courseContentByProductId', method: 'get' }, // 根据项目id获取班型内容
    courseclasstype_edit: { url: '/teach/courseclasstype/edit', method: 'post' }, // 保存修改
    
}