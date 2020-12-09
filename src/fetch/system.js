export default {
    getMenuList: {url: '/admin/sec/menu/list', method: 'post'},
    getMenuTreeList:  {url: '/admin/sec/menu/getallmenutree', method: 'get'},
    system_getCode: {url: '/admin/generate/serial', method: 'post'},
    menu_save: {url:'/admin/sec/menu/save', method: 'post'},
    menu_edit: {url:'/admin/sec/menu/edit', method: 'post'},
    menu_delete: {url:'/admin/sec/menu/del', method: 'post'},
    role_list: {url:'/admin/sec/role/list', method: 'post'},
    role_save: {url:'/admin/sec/role/save', method: 'post'},
    role_edit: {url:'/admin/sec/role/edit', method: 'post'},
    menu_impower: {url:'/admin/sec/menu/bindmenurole', method: 'post'},
    getDeptTableList: {url: '/admin/staff/page', method: 'post'}, // 获取通讯录管理部门成员
    getDeptTreeList: {url: '/admin/staff/campus/list', method: 'post'}, // 获取通讯录管理组织机构树
    getDeptUserDetail: {url: '/admin/staff/detail', method: 'get'}, // 获取通讯录管理部门成员详情
    deptUser_save: {url: '/admin/staff/save', method: 'get'}, // 通讯录成员详情保存
    role_getMeunList:{url:'/admin/staff/detail', method: 'get'}
}