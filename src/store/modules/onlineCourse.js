// 网课-班级 专用store
const state = {
    courseClassType: false, // 编辑科目时的项目类型信息 {typeId,typeName}
    courseClassId: false, // 编辑科目时使用的班级id
    courseId: false, // 编辑章节是使用
    courseName: false, // 编辑章节时使用
    courseClassName: false, // 编辑章节时使用
    courseChapterId: false, // 编辑小节时使用
    courseChapterName: false, // 编辑小节时使用
}

const mutations = {
    setCourseClassType: (state, data) => {
        state.courseClassType = data
    },
    setCourseClassId: (state, data) => {
        state.courseClassId = data

    },
    setCourseId: (state, data) => {
        state.courseId = data
    },
    setCourseName: (state, data) => {
        state.courseName = data
    },
    setCourseClassName: (state, data) => {
        state.courseClassName = data
    },
    setCourseChapterId: (state, data) => {
        state.courseChapterId = data
    },
    setCourseChapterName: (state, data) => {
        state.courseChapterName = data
    }

}

const getters = {

}

const actions = {
    // 清除编辑科目使用的数据
    clearCourseClass({ commit }) {
        commit('setCourseClassType', false)
        commit('setCourseClassId', false)
    },
    // 清除编辑章节使用的数据
    clearCourse({ commit }) {
        commit('setCourseId', false)
        commit('setCourseName', false)
        commit('setCourseClassName', false)
    },
    // 清除编辑小节使用的数据
    clearChapter({ commit }) {
        commit('setCourseChapterId', false)
        commit('setCourseChapterName', false)
    }
}

export default {
    namespaced: true,
    getters,
    state,
    mutations,
    actions
}