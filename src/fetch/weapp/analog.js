export default {

  // 题目导入接口
  import_issue_excel: {
    url: '/mini-programs/console/analog_site/import_issue_excel',
    method: 'post'
  },

  /*********** 试卷开始 ***********/

  // 试卷分页查询
  analog_paper_list: {
    url: '/mini-programs/console/analog_paper/page_list',
    method: 'post'
  },
  // 删除试卷
  analog_paper_delete: {
    url: '/mini-programs/console/analog_paper/delete',
    method: 'post'
  },
  // 添加试卷
  analog_paper_add: {
    url: '/mini-programs/console/analog_paper/add',
    method: 'post'
  },
  // 修改试卷
  analog_paper_update: {
    url: '/mini-programs/console/analog_paper/update',
    method: 'post'
  },

  /*********** 试卷结束 ***********/



  /*********** 项目开始 ***********/
  // 项目分页查询
  subject_paper_list: {
    url: '/mini-programs/console/analog_subject/page_list',
    method: 'post'
  },
  // 项目不分页查询
  subject_paper_list_: {
    url: '/mini-programs/console/analog_subject/list',
    method: 'post'
  },
  // 删除项目
  subject_paper_delete: {
    url: '/mini-programs/console/analog_subject/delete',
    method: 'post'
  },
  // 添加项目
  subject_paper_add: {
    url: '/mini-programs/console/analog_subject/add',
    method: 'post'
  },
  // 修改项目
  subject_paper_update: {
    url: '/mini-programs/console/analog_subject/update',
    method: 'post'
  },
  /*********** 项目结束 ***********/


  /*********** 站点开始 ***********/

  // 站点分页查询
  site_paper_list: {
    url: '/mini-programs/console/analog_site/page_list',
    method: 'post'
  },
  // 删除站点
  site_paper_delete: {
    url: '/mini-programs/console/analog_site/delete',
    method: 'post'
  },
  // 添加站点
  site_paper_add: {
    url: '/mini-programs/console/analog_site/add',
    method: 'post'
  },
  // 编辑站点
  site_paper_update: {
    url: '/mini-programs/console/analog_site/update',
    method: 'post'
  },

  /*********** 站点结束 ***********/



  /*********** 题目开始 ***********/
  // 查看所有题目
  lssue_paper_list: {
    url: '/mini-programs/console/analog_site/get_Issue',
    method: 'post'
  },
  // 删除题目
  lssue_paper_delete: {
    url: '/mini-programs/console/analog_site/del_Issue',
    method: 'post'
  },
  // 添加题目
  lssue_paper_add: {
    url: '/mini-programs/console/analog_site/add_Issue',
    method: 'post'
  },
  // 修改题目
  lssue_paper_update: {
    url: '/mini-programs/console/analog_site/update_Issue',
    method: 'post'
  },

  /*********** 题目结束 ***********/


}
