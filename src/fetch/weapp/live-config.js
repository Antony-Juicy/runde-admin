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

  white_word_getList: { url: '/live/console/im_whitelist_word/get', method: 'post' },
  white_word_delete: { url: '/live/console/im_whitelist_word/delete', method: 'post' },
  white_word_update: { url:'/live/console/im_whitelist_word/update', method: 'post' },
  white_word_list: { url: '/live/console/im_whitelist_word/page_list', method: 'post' },
  white_word_add: { url: '/live/console/im_whitelist_word/add', method: 'post' },
  white_word_add_import: { url: '/live/console/im_whitelist_word/import_whitelist_word', method: 'post' },
  white_word_delete_import: { url: '/live/console/im_whitelist_word/import_delete_whitelist_word', method: 'post' }
}