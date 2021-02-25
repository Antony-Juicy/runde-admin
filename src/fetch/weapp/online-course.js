export default {
   // 班级管理
   online_course_get_classes: { url: '/live/console/onlinecourse/class/page_list', method: 'post' },
   online_course_add_class: { url: '/live/console/onlinecourse/class/add', method: 'post' },
   online_course_update_class: { url: '/live/console/onlinecourse/class/update', method: 'post' },
   online_course_delete_class: { url: '/live/console/onlinecourse/class/delete', method: 'post' },
   online_course_class_getInfo: { url: '/live/console/onlinecourse/class/get', method: 'post' },
   // 科目管理
   online_course_get_courses: { url: '/live/console/onlinecourse/info/page_list', method: 'post' },
   online_course_add_course: { url: '/live/console/onlinecourse/info/add', method: 'post' },
   online_course_delete_course: { url: '/live/console/onlinecourse/info/delete', method: 'post' },
   online_course_update_course: { url: '/live/console/onlinecourse/info/update', method: 'post' },
   online_course_course_getInfo: { url: '/live/console/onlinecourse/info/get', method: 'post' },
   online_course_get_course_teacher: { url: '/live/console/onlinecourse/info/find_course_teacher_list', method: 'post' },
   
   online_course_get_chapters:{url: '/live/console/onlinecourse/chapter/page_list', method: 'post' },
   online_course_add_chapter:{url: '/live/console/onlinecourse/chapter/add_chapter', method: 'post' },
   online_course_delete_chapter:{url: '/live/console/onlinecourse/chapter/delete', method: 'post' },
   online_course_update_chapter:{url: '/live/console/onlinecourse/chapter/update_chapter', method: 'post' },
   online_course_chapter_getInfo:{url: '/live/console/onlinecourse/chapter/get', method: 'post' },

   online_course_add_section:{url: '/live/console/onlinecourse/chapter/add_section', method: 'post' },
   online_course_update_section:{url: '/live/console/onlinecourse/chapter/update_section', method: 'post' },

   


}