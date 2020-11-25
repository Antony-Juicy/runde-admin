const getters = {
  sidebar: state => state.app.sidebar, // 导航栏
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews, // 访问过的页面 标签的展示
  cachedViews: state => state.tagsView.cachedViews, // 缓存的页面 标签切换时keep alive it
  token: state => state.user.token, // token
  avatar: state => state.user.avatar, // 头像
  name: state => state.user.name, // 用户名
  introduction: state => state.user.introduction,
  roles: state => state.user.roles, // 用户组 这个项目没用上
  permission_routes: state => state.permission.routes, // 默认路由
  permission_addRoutes: state => state.permission.addRoutes, // 新增的用户的路由
  permission_btn: state => state.permission.btnRoutes,
  errorLogs: state => state.errorLog.logs, // 错误日志
  osscdn: state => '/', // 图片服务器地址
}
export default getters
