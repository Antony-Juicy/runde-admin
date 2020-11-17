const iceConfig = require('./config/config.js')
module.exports = {
  title: '润德教育后台管理系统',
  // title: iceConfig.version === 'yizhiquan' ? '医职圈后台管理系统' : '润德教育后台管理系统',

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: false,

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: true,

  /**
   * @type {boolean} true | false
   * @description Whether show the tags
   */
  tagsView: true
}
