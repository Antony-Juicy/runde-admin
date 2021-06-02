export default {
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



  /*********** 科目开始 ***********/
  // 科目分页查询
  subject_paper_list: {
    url: '/mini-programs/console/analog_subject/page_list',
    method: 'post'
  },
  /*********** 科目结束 ***********/


}
