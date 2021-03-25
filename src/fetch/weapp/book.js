// 图书
export default {
    // 图书管理
    book_get_books: { url: '/live/console/book/info/page_list', method: 'post' },
    book_add_book: { url: '/live/console/book/info/add', method: 'post' },
    book_delete_book: { url: '/live/console/book/info/delete', method: 'post' },
    book_update_book: { url: '/live/console/book/info/update', method: 'post' },
    book_book_getInfo: { url: '/live/console/book/info/get', method: 'post' },

    // 科目管理
    book_get_subjects: { url: '/live/console/book/subject/page_list', method: 'post' },
    book_add_subject: { url: '/live/console/book/subject/add', method: 'post' },
    book_update_subject: { url: '/live/console/book/subject/update', method: 'post' },
    book_delete_subject: { url: '/live/console/book/subject/delete', method: 'post' },
    book_subject_getInfo: { url: '/live/console/book/subject/get', method: 'post' },
    book_subject_get_teachers: { url: '/live/console/book/subject/find_course_teacher_list', method: 'post' },

    book_get_chapters: { url: '/live/console/book/chapter/page_list', method: 'post' },
    book_add_chapter: { url: '/live/console/book/chapter/add_chapter', method: 'post' },
    book_add_section: { url: '/live//console/book/chapter/add_section', method: 'post' },
    book_delete_chapter: { url: '/live/console/book/chapter/delete', method: 'post' },
    book_update_chapter: { url: '/live/console/book/chapter/update_chapter', method: 'post' },
    book_update_section: { url: '/live/console/book/chapter/update_section', method: 'post' },
    book_chapter_getInfo: { url: '/live/console/book/chapter/get', method: 'post' },
   

    // 导入文件
    book_import_chapter_or_section: { url: '/live/console/book/subject/import_chapter_or_section', method: 'post' },
    book_import_section: { url: '/live/console/book/chapter/import_section', method: 'post' },
}
