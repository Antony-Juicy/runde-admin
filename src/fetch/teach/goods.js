export default {
    //商品列表
    courseclass_classOrderlistJsonSearch: {url: '/teach/courseclass/classOrderlistJsonSearch', method: 'post'},//搜索下拉
    courseclasstype_classtypeList: {url: '/teach/courseclasstype/classtypeList', method: 'get'},//根据subjectId获取所有的班型
    courseclass_classOrderlistJson: {url: '/teach/courseclass/classOrderlistJson', method: 'post'},//列表

    // 购买页面
    orderinfo_goProductAdd: {url: '/admin/orderinfo/goProductAdd', method: 'get'},//购买页面信息
    orderinfo_getAddressAreaList: {url: '/admin/orderinfo/getAddressAreaList', method: 'get'},//商品列表获取地区列表
    orderinfo_saveProduct: {url: '/admin/orderinfo/saveProduct', method: 'post'},//保存订单及学生信息

    studentcampus_basisIdCardAndPhoneGetInfo: {url: '/teach/studentcampus/basisIdCardAndPhoneGetInfo', method: 'get'},//根据身份证号码或者手机号码获取基本信息
    coupontemplateversiontwo_availableCoupon: {url: '/teach/coupontemplateversiontwo/availableCoupon', method: 'post'},//获取优惠券

}