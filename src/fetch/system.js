export default {
    getMenuList: {url: '/admin/sec/menu/list', method: 'post'},
    getMenuTreeList:  {url: '/admin/sec/menu/getallmenutree', method: 'get'},
    system_getCode: {url: '/admin/generate/serial', method: 'post', hideLoading: true},
    menu_save: {url:'/admin/sec/menu/save', method: 'post'},
    menu_edit: {url:'/admin/sec/menu/edit', method: 'post'},
    menu_delete: {url:'/admin/sec/menu/del', method: 'post'},
    role_list: {url:'/admin/sec/role/list', method: 'post'},
    role_save: {url:'/admin/sec/role/save', method: 'post'},
    role_edit: {url:'/admin/sec/role/edit', method: 'post'},
    menu_impower: {url:'/admin/sec/menu/bindmenurole', method: 'post'},
    staff_list: {url: '/admin/staff/page', method: 'post'},
    staff_tree: {url: '/admin/staff/campus/list', method: 'post'},
    staff_detail: {url: '/admin/staff/detail', method: 'get'},
    staff_detail_save: {url: '/admin/staff/save', method: 'get'},
    staff_role_list: {url: '/admin/sec/menu/bindrole', method: 'post'},
    role_getMeunList:{url:'/admin/sec/role/roleByidMenu', method: 'get'}
}