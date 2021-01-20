export default {
  // 商品
  goods_getList: { url: '/live/console/goods/getUpdateInfo',method: 'post' },
  goods_delete: { url: '/live/console/goods/delete',method: 'post' },
  goods_update: { url:'/live/console/goods/update',method: 'post' },
  goods_list: { url: '/live/console/goods/page_list',method: 'post' },
  goods_add: { url: '/live/console/goods/add',method: 'post' },

  // 优惠券
  coupon_getList: { url: '/live/console/coupon/get', method: 'post' },
  coupon_delete: { url: '/live/console/coupon/delete', method: 'post' },
  coupon_update: { url:'/live/console/coupon/update', method: 'post' },
  coupon_list: { url: '/live/console/coupon/page_list', method: 'post' },
  coupon_add: { url: '/live/console/coupon/add', method: 'post' },
  coupon_getGoods: {url: '/live/console/coupon/goods_get_coupon_list', method: 'post'},

  // 规格组
  goods_item_getList: { url: '/live/console/goods_item_group/get_update_info', method: 'post' },
  goods_item_delete: { url: '/live/console/goods_item_group/delete', method: 'post' },
  goods_item_update: { url:'/live/console/goods_item_group/update',method: 'post' },
  goods_item_list: { url: '/live/console/goods_item_group/page_list', method: 'post' },
  goods_item_add: { url: '/live/console/goods_item_group/add', method: 'post' },
  goods_item_page_list: { url: '/live/console/goods_item_group/goods_related_page_list', method: 'post' },

  // 规格
  goods_rule_getList: { url: '/live/console/goods_item/get_update_info', method: 'post'},
  goods_rule_delete: { url: '/live/console/goods_item/delete', method: 'post'},
  goods_rule_update: { url:'/live/console/goods_item/update', method: 'post'},
  goods_rule_list: { url: '/live/console/goods_item/page_list', method: 'post'},
  goods_rule_add: { url: '/live/console/goods_item/add', method: 'post'},

  // 商品规格组关联
  goods_rule_group_list: { url: '/live/console/goods_group_related/list', method: 'post' },
  goods_rule_group_add: { url: '/live/console/goods_group_related/add_related', method: 'post' },
  goods_rule_group_delete: { url: '/live/console/goods_group_related/delete', method: 'post' },

  // 评论
  comment_getList: { url: '/live/console/goods_comment/get', method: 'post' },
  comment_delete: { url: '/live/console/goods_comment/delete', method: 'post' },
  comment_update: { url:'/live/console/goods_comment/update', method: 'post' },
  comment_list: { url: '/live/console/goods_comment/page_list', method: 'post' },
  comment_add: { url: '/live/console/goods_comment/add', method: 'post' },
  comment_importExcel: { url: '/live/console/goods_comment/importComment', method: 'post' },
}