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

  // 金刚区
  config_get_icons: { url: '/live/console/live/icon/link/page_list', method: 'post' },
  config_add_icon: { url: '/live/console/live/icon/link/add', method: 'post' },
  config_update_icon: { url: '/live/console/live/icon/link/update', method: 'post' },
  config_icon_getInfo: { url: '/live/console/live/icon/link/get', method: 'post' },
  config_delete_icon: { url: '/live/console/live/icon/link/delete', method: 'post' },

  // 轮播图
  config_get_banners: { url: '/live/console/banner/page_list', method: 'post' },
  config_add_banner: { url: '/live/console/banner/add', method: 'post' },
  config_update_banner: { url: '/live/console/banner/update', method: 'post' },
  config_delete_banner: { url: '/live/console/banner/delete', method: 'post' },
  config_banner_getInfo: { url: '/live/console/banner/get', method: 'post' },


  projectType_select: { url: '/live/console/type/get_select_types', method: 'post' },

  // 白名单词
  white_word_getList: { url: '/live/console/im_whitelist_word/get', method: 'post' },
  white_word_delete: { url: '/live/console/im_whitelist_word/delete', method: 'post' },
  white_word_update: { url:'/live/console/im_whitelist_word/update', method: 'post' },
  white_word_list: { url: '/live/console/im_whitelist_word/page_list', method: 'post' },
  white_word_add: { url: '/live/console/im_whitelist_word/add', method: 'post' },
  white_word_add_import: { url: '/live/console/im_whitelist_word/import_whitelist_word', method: 'post' },
  white_word_delete_import: { url: '/live/console/im_whitelist_word/import_delete_whitelist_word', method: 'post' },

  // 敏感单词
  sensitive_word_getList: { url: '/live/console/im_blacklist_word/get', method: 'post'},
  sensitive_word_delete: { url: '/live/console/im_blacklist_word/delete', method: 'post' },
  sensitive_word_update: { url:'/live/console/im_blacklist_word/update', method: 'post' },
  sensitive_word_list: { url: '/live/console/im_blacklist_word/page_list', method: 'post' },
  sensitive_word_add: { url: '/live/console/im_blacklist_word/add', method: 'post' },
  sensitive_word_add_import: { url: '/live/console/im_blacklist_word/import_blacklist_word', method: 'post' },
  sensitive_word_delete_import: { url: '/live/console/im_blacklist_word/import_delete_blacklist_word', method: 'post' }
}