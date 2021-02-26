// 网课-图书 专用store
const state = {
    bookType: false, // 编辑科目时的项目类型信息 {typeId,typeName}
    bookId: false, // 编辑科目时使用的班级id
    bookSubjectId: false, // 编辑章节是使用
    bookSubjectName: false, // 编辑章节时使用
    bookName: false, // 编辑章节时使用
    bookChapterId: false, // 编辑小节时使用
    bookChapterName: false, // 编辑小节时使用
}

const mutations = {
    setBookType: (state, data) => {
        state.bookType = data
    },
    setBookId: (state, data) => {
        state.bookId = data

    },
    setBookSubjectId: (state, data) => {
        state.bookSubjectId = data
    },
    setBookSubjectName: (state, data) => {
        state.bookSubjectName = data
    },
    setBookName: (state, data) => {
        state.bookName = data
    },
    setBookChapterId: (state, data) => {
        state.bookChapterId = data
    },
    setBookChapterName: (state, data) => {
        state.bookChapterName = data
    }

}

const getters = {

}

const actions = {
    // 清除编辑科目使用的数据
    clearBook({ commit }) {
        commit('setBookType', false)
        commit('setBookId', false)
    },
    // 清除编辑章节使用的数据
    clearBookSubject({ commit }) {
        commit('setBookSubjectId', false)
        commit('setBookSubjectName', false)
        commit('setBookName', false)
    },
    // 清除编辑小节使用的数据
    clearChapter({ commit }) {
        commit('setBookChapterId', false)
        commit('setBookChapterName', false)
    }
}

export default {
    namespaced: true,
    getters,
    state,
    mutations,
    actions
}