<!-- 科目 -->
<template>
    <div class='course-container'>
        <!-- 搜索栏 -->
        <search-form ref="searchForm" :formOptions="formOptions" :showNum="4" @onSearch="onSearch"></search-form>
        <div class="w-container">
            <div class="btn-wrapper" v-if="mode=='fromClass'">
                <el-button type="primary" size="small" @click="handleAdd">创建科目</el-button>
            </div>
            <!-- 表格主体 -->
            <rd-table :tableData="tableData" :tableKey="tableKey" :pageConfig.sync="pageConfig" fixedTwoRow @pageChange="pageChange">
                <template slot="defaultImageUrl" slot-scope="scope">
                    <el-image style="width: 100px; height: 100px" :src="scope.row.defaultImageUrl"></el-image>
                </template>
                <template slot="enrolment" slot-scope="scope">
                    <div>(实)&nbsp;&nbsp;{{scope.row.realEnrolment}}</div>
                    <div>(虚)&nbsp;&nbsp;{{scope.row.totalEnrolment}}</div>
                </template>
                <template slot="teacherArray" slot-scope="scope">
                    <span class="course-teacher" v-for="(item,index) in scope.row.teacherArray" :key="index">{{item.teacherName}}</span>
                </template>
                <template slot="edit" slot-scope="scope">
                    <el-button @click="handleEdit(scope.row)" type="text" size="small">查阅/编辑</el-button>
                    <el-button @click="handleChapter(scope.row)" type="text" style="color: #67c23a" size="small">章节目录</el-button>
                    <el-button @click="handleDelete(scope.row)" type="text" style="color: #ec5b56" size="small">删除</el-button>
                </template>
            </rd-table>
        </div>
        <fullDialog class="addEditCourse" :title="`${titleAddOrEdit}`" :inner="true" v-model="addEditVisible" @change="addEditVisible = false">
            <addEditCourse ref="addEditCourse" v-if="addEditVisible" @close="addEditVisible = false" @refresh="refresh"></addEditCourse>
        </fullDialog>
        <fullDialog class="chapter" title="章节目录" v-model="chapterVisible" @change="handleChapterClose">
            <chapter v-if="chapterVisible" @close="handleChapterClose"></chapter>
        </fullDialog>
    </div>
</template>

<script>

import fullDialog from "@/components/FullDialog";
import chapter from './chapter'
import addEditCourse from './addEditCourse'
import { scrollTo } from "@/utils/scroll-to";
export default {

    props: {
        courseClass: {
            type: Object,
            default: () => { return {} }
        }
    },
    data() {
        return {
            formOptions: [
                {
                    prop: "courseClassName",
                    element: "el-input",
                    placeholder: "请输入班级名称",
                    disabled: false
                },
                {
                    prop: "courseName",
                    element: "el-input",
                    placeholder: "请输入课程名称",
                },
                {
                    prop: "courseStatus",
                    element: "el-select",
                    placeholder: "课程状态",
                    options: [
                        {
                            label: "上架",
                            value: "Show"
                        },
                        {
                            label: "下架",
                            value: "Close"
                        },
                        {
                            label: "隐藏",
                            value: "Hidden"
                        },
                    ]
                },
            ],
            tableData: [],
            tableKey: [
                {
                    name: "ID主键",
                    value: "courseId",
                    width: 80
                },
                {
                    name: "课程名称",
                    value: "courseName",
                },
                {
                    name: "班级名称",
                    value: "courseClassName",
                },
                {
                    name: "项目分类",
                    value: "typeName",
                },
                {
                    name: "关键字",
                    value: "courseKeywords",
                },
                {
                    name: "封面图",
                    value: "defaultImageUrl",
                    operate: true,
                    width: 120,
                },
                {
                    name: "状态",
                    value: "courseStatus",
                },
                {
                    name: "报名人数",
                    value: "enrolment",
                    operate: true,
                },
                {
                    name: "授课讲师",
                    value: "teacherArray",
                    operate: true,
                    width: 200,
                },
                {
                    name: "排序值",
                    value: "orderValue",
                },
                {
                    name: "操作",
                    value: "edit",
                    operate: true,
                    width: 200,
                },
            ],
            pageConfig: {
                totalCount: 0,
                pageNum: 1,
                pageSize: 10,
            },
            titleAddOrEdit: "创建",
            searchForm: {}, //搜索栏信息
            addEditVisible: false,
            chapterVisible: false
        };
    },
    components: { fullDialog, chapter, addEditCourse },
    computed: {
        mode() {
            if (Object.keys(this.courseClass).length > 0) {
                return 'fromClass'; // 意思是班级管理那边打开的
            }
            else {
                return 'root'; // 意思是从左侧菜单打开的
            }
        }
    },

    watch: {},

    methods: {
        onSearch(data) {
            this.searchForm = { ...data };
            this.pageConfig.pageNum = 1;
            this.getTableData();
        },
        pageChange(val) {
            this.pageConfig.pageNum = val.page;
            this.pageConfig.pageSize = val.limit;
            this.getTableData();
        },
        getTableData(params = {}) {
            return new Promise((resolve, reject) => {
                const loading = this.$loading({
                    lock: true,
                    target: ".el-table",
                });
                this.$fetch(
                    "online_course_get_courses",
                    {
                        loginUserId: this.$common.getUserId(),
                        ...this.pageConfig,
                        ...this.searchForm,
                        ...params,
                        courseClassId: this.courseClass.courseClassId
                    }
                ).then((res) => {
                    this.tableData = res.data.records.map((item) => {
                        try {
                            item.teacherArray = JSON.parse(item.teacherArray)
                        } catch (error) {
                            item.teacherArray = []
                        }

                        item.courseStatus = this.courseStatus2Zh(item.courseStatus)
                        return item;
                    });
                    this.pageConfig.totalCount = res.data.totalCount;
                    setTimeout(() => {
                        loading.close();
                    }, 200);
                    resolve();
                }).catch(err => {
                    loading.close();
                    console.log(err)
                    reject();
                });
            })
        },
        courseStatus2Zh(status) {
            switch (status) {
                case 'Open': return '上架';
                case "Close": return '下架';
                case "Hidden": return '隐藏';
            }
        },
        handleAdd() {
            this.titleAddOrEdit = '创建科目';
            this.addEditVisible = true
            // 设置创建科目的一些额外信息
            // ! 由于只有班级进入时才可能出现新增按钮 所以 this.courseClass 是必然有值的
            this.$store.commit('onlineCourse/setCourseClassType', { typeId: this.courseClass.typeId, typeName: this.courseClass.typeName })
            this.$store.commit('onlineCourse/setCourseClassId', this.courseClass.courseClassId)
            this.$nextTick(() => {
                this.$refs.addEditCourse.initGetConfig = true
            })
        },
        handleEdit(data) {
            this.titleAddOrEdit = '编辑科目';
            this.addEditVisible = true
            // ! 编辑科目时 班级数据来源以科目附带信息为准
            this.$store.commit('onlineCourse/setCourseClassType', { typeId: data.typeId, typeName: data.typeName })
            this.$store.commit('onlineCourse/setCourseClassId', data.courseClassId)
            this.$nextTick(() => {
                this.$refs.addEditCourse.initGetConfig = true
                this.$refs.addEditCourse.initFormData(data.courseId);
            })
        },
        handleDelete(data) {
            let info = "科目"
            this.$confirm(`此操作将删除此${info}, 是否继续?`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(async () => {
                await this.$fetch("online_course_delete_course", {
                    courseId: data.courseId,
                    loginUserId: this.$common.getUserId(),
                }).then((res) => {
                    if (res) {
                        this.$message({
                            message: "删除成功",
                            type: "success",
                        });
                        setTimeout(() => {
                            this.getTableData();
                        }, 50);
                    }
                });
            })
        },
        handleChapter(data) {
            this.chapterVisible = true
            this.$store.commit('onlineCourse/setCourseName', data.courseName)
            this.$store.commit('onlineCourse/setCourseClassName', data.courseClassName)
            this.$store.commit('onlineCourse/setCourseId', data.courseId)
        },
        handleChapterClose() {
            this.chapterVisible = false
            this.$store.dispatch('onlineCourse/clearCourse')
        },
        refresh(val) {
            this.getTableData({
                pageNum: val || this.pageConfig.pageNum
            });
        },
    },

    created() {
    },

    mounted() {
        if (this.mode == 'fromClass') {
            scrollTo(0, 800);
            this.formOptions[0].initValue = this.courseClass.courseClassName
            this.formOptions[0].disabled = true
            this.formOptions.push({
                prop: "typeId",
                element: "el-select",
                placeholder: "分类",
                disabled: true,
                options: [
                    {
                        label: this.courseClass.typeName,
                        value: this.courseClass.typeId,
                    }
                ],
                initValue: this.courseClass.typeId
            });
            this.$refs.searchForm.onReset()
        }
        else {
            this.$fetch("projectType_normalList", {
                loginUserId: this.$common.getUserId(),
            }).then((res) => {
                let typeList = res.data.map((item) => ({
                    label: item.typeName,
                    value: item.typeId,
                }));
                this.formOptions.push({
                    prop: "typeId",
                    element: "el-select",
                    placeholder: "分类",
                    options: typeList,
                });
            });
        }
        this.getTableData();
    },
    beforeCreate() { },
    beforeMount() { },
    beforeUpdate() { },
    updated() { },
    beforeDestroy() { },
    destroyed() { },
    activated() { },
}
</script>
<style lang='scss' scoped>
.course-container {
    /deep/ {
        .el-form-item__content {
            width: 495px;
        }

        .chapter {
            .full-dialog-container .content {
                background: #f0f2f5;
            }
        }
    }
}
.course-teacher {
    display: inline-block;
    padding-bottom: 5px;
    padding-right: 5px;
}
</style>