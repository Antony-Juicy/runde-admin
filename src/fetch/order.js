export default {
    orderinfo_orderManage: {url: '/admin/orderinfo/orderManage', method: 'post'}, //订单列表
    orderinfo_setRemark: {url: '/admin/orderinfo/setRemark', method: 'post'}, //设置备注
    // 新版优惠券
    coupontemplateversiontwo_listJsp: {url: '/admin/coupontemplateversiontwo/listJsp', method: 'post'}, 
    coupontemplateversiontwo_goAdd: {url: '/admin/coupontemplateversiontwo/goAdd', method: 'post'}, 
    coupontemplateversiontwo_save: {url: '/admin/coupontemplateversiontwo/save', method: 'post'}, 
    coupontemplateversiontwo_goEdit: {url: '/admin/coupontemplateversiontwo/goEdit', method: 'post'}, 
    coupontemplateversiontwo_editJsp: {url: '/admin/coupontemplateversiontwo/editJsp', method: 'post',}, 
    coupontemplateversiontwo_deleteJsp: {url: '/admin/coupontemplateversiontwo/deleteJsp', method: 'post'}, 
    coupontemplateversiontwo_subjectList:  {url: '/admin/coursesubject/subjectList', method: 'get', hideLoading: true}, //获取科目列表
    coupontemplateversiontwo_getClassListSelects:  {url: '/admin/courseclasstype/getClassListSelects', method: 'get', hideLoading: true}, //获取班型列表
    coupontemplateversiontwo_getCourseListSelects:  {url: '/admin/courseclasstype/getCourseListSelects', method: 'get', hideLoading: true}, //获取课程列表

}