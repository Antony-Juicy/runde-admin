export default {
  // 礼物
  gift_getList: { url: '/live/console/live_gift/get', method: 'post' },
  gift_delete: { url: '/live/console/live_gift/delete', method: 'delete' },
  gift_update: { url:'/live/console/live_gift/update', method: 'put' },
  gift_list: { url: '/live/console/live_gift/page_list', method: 'post' },
  gift_add: { url: '/live/console/live_gift/add', method: 'post' },

  // 项目分类
  projectType_getList: { url: '/live/console/type/get', method: 'post' },
  projectType_delete: { url: '/live/console/type/delete', method: 'delete' },
  projectType_update: { url:'/live/console/type/update', method: 'put' },
  projectType_list: { url: '/live/console/type/page_list', method: 'post' },
  projectType_add: { url: '/live/console/type/add', method: 'post' },
}