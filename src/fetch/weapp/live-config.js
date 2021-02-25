export default {
  // 礼物
  gift_getList: { url: '/live/console/live_gift/get', method: 'post' },
  gift_delete: { url: '/live/console/live_gift/delete', method: 'post' },
  gift_update: { url:'/live/console/live_gift/update', method: 'post' },
  gift_list: { url: '/live/console/live_gift/page_list', method: 'post' },
  gift_add: { url: '/live/console/live_gift/add', method: 'post' },

  // 项目分类
  projectType_getList: { url: '/live/console/type/get', method: 'post' },
  projectType_delete: { url: '/live/console/type/delete', method: 'post' },
  projectType_update: { url:'/live/console/type/update', method: 'post' },
  projectType_list: { url: '/live/console/type/page_list', method: 'post' },
  projectType_add: { url: '/live/console/type/add', method: 'post' },
  projectType_normalList: { url: '/live/console/type/normal_list', method: 'post' },

  // 讲师管理
  config_get_teachers: { url: '/live/console/onlinecourse/book/teacher/page_list', method: 'post' },
  config_get_teachers_list: { url: '/live/console/onlinecourse/book/teacher/get_teacher_list', method: 'post' },
  config_add_teacher: { url: '/live/console/onlinecourse/book/teacher/add', method: 'post' },
  config_delete_teacher: { url: '/live/console/onlinecourse/book/teacher/delete', method: 'post' },
  config_teacher_getInfo: { url: '/live/console/onlinecourse/book/teacher/get', method: 'post' },
  config_update_teacher: { url: '/live/console/onlinecourse/book/teacher/update', method: 'post' },
}