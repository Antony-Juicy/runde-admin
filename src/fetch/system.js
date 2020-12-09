export default {
    getMenuList: {url: '/admin/menu/list', method: 'post'},
    getMenuTreeList:  {url: '/admin/menu/getallmenutree', method: 'get'},
    system_getCode: {url: '/admin/generate/serial', method: 'post'},
    getDeptTreeList: {url: '/admin/staff/campus/list', method: 'post'}, // 获取通讯录管理组织机构树
    getDeptTableList: {url: '/admin/staff/page', method: 'post'}, // 获取通讯录管理部门成员
    menu_save: {url:'/admin/menu/save', method: 'post'},
    menu_edit: {url:'/admin/menu/edit', method: 'post'},
    menu_delete: {url:'/admin/menu/del', method: 'post'},
    role_list: {url:'/admin/role/list', method: 'post'},
    role_save: {url:'/admin/role/save', method: 'post'},
    role_edit: {url:'/admin/role/edit', method: 'post'},
    menu_impower: {url:'/admin/menu/impower/menus', method: 'post'}
}