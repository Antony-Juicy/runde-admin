<!-- 图书管理 -->
<template>
    <div class='book-container'>
        <!-- 搜索栏 -->
        <search-form :formOptions="formOptions" :showNum="4" @onSearch="onSearch"></search-form>
        <div class="w-container">
            <div class="btn-wrapper">
                <el-button type="primary" size="small" @click="handleAdd">创建图书</el-button>
            </div>

            <!-- 表格主体 -->
            <rd-table :tableData="tableData" :tableKey="tableKey" :pageConfig.sync="pageConfig" fixedTwoRow @pageChange="pageChange">
                <template slot="bookImageUrl" slot-scope="scope">
                    <el-image style="width: 100px; height: 100px" :src="scope.row.bookImageUrl"></el-image>
                </template>
                <template slot="bookTeacherArray" slot-scope="scope">
                    <span class="class-teacher" v-for="(item,index) in scope.row.bookTeacherArray" :key="index">{{item.teacherName}}</span>
                </template>
                <template slot="edit" slot-scope="scope">
                    <el-button @click="handleEdit(scope.row)" type="text" size="small">查阅/编辑</el-button>
                    <el-button @click="handleCourse(scope.row)" type="text" style="color: #67c23a" size="small">查阅科目</el-button>
                    <el-button @click="handleDelete(scope.row)" type="text" style="color: #ec5b56" size="small">删除</el-button>
                </template>
            </rd-table>
        </div>
        <!-- 添加课程 -->
        <fullDialog v-model="addEditVisible" :title="titleAddOrEdit" @change="addEditVisible = false">
            <addEditBook ref="addEditBook" @close="addEditVisible = false" @refresh="refresh" v-if="addEditVisible" />
        </fullDialog>
        <fullDialog class="course" v-model="courseVisiable" title="查阅科目" @change="handleCourseClose">
            <course :courseClass="courseClass" @close="handleCourseClose" @refresh="refresh" v-if="courseVisiable"></course>
        </fullDialog>
    </div>
</template>

<script>


import addEditBook from './addEditBook'
import fullDialog from "@/components/FullDialog";
import { scrollTo } from "@/utils/scroll-to";
import course from '@/views/crm-module/weapp/book/course/course'
export default {

    components: { addEditBook, course, fullDialog },
    data() {

        return {
            formOptions: [
                {
                    prop: "bookName",
                    element: "el-input",
                    placeholder: "请输入图书名称",
                },
                {
                    prop: "bookKeywords",
                    element: "el-input",
                    placeholder: "请输入关键字",
                },
                {
                    prop: "bookType",
                    element: "el-select",
                    placeholder: "收费状态",
                    options: [
                        {
                            label: "收费",
                            value: "Charge"
                        },
                        {
                            label: "免费",
                            value: "Free"
                        },
                    ]
                },
                {
                    prop: "bookStatus",
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
                    value: "bookId",
                    width: 80
                },
                {
                    name: "书籍名称",
                    value: "bookName",
                },
                {
                    name: "项目分类",
                    value: "typeName",
                },
                {
                    name: "关键字",
                    value: "bookKeywords",
                },
                {
                    name: "封面图",
                    value: "bookImageUrl",
                    operate: true,
                    width: 120,
                },
                {
                    name: "状态",
                    value: "bookStatus",
                },
                {
                    name: "报名人数",
                    value: "bookEnrollNum",
                },
                {
                    name: "授课讲师",
                    value: "bookTeacherArray",
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
            addEditVisible: false,
            pageConfig: {
                totalCount: 0,
                pageNum: 1,
                pageSize: 10,
            },
            searchForm: {}, //搜索栏信息
            titleAddOrEdit: "创建图书",
            courseVisiable: false,
            book: {}
        };
    },

    computed: {},

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
                    "book_get_books",
                    {
                        loginUserId: this.$common.getUserId(),
                        ...this.pageConfig,
                        ...this.searchForm,
                        ...params
                    }
                ).then((res) => {
                    this.tableData = res.data.records.map((item) => {
                        item.bookStatus = this.bookStatus2Zh(item.bookStatus)
                        item.bookTeacherArray = JSON.parse(item.bookTeacherArray)
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
        bookStatus2Zh(status) {
            switch (status) {
                case 'Open': return '上架';
                case "Close": return '下架';
                case "Hidden": return '隐藏';
            }
        },
        handleAdd() {
            this.titleAddOrEdit = '创建图书';
            this.addEditVisible = true;
            this.$nextTick(() => {
                this.$refs.addEditBook.initGetConfig = true
            })
        },
        handleEdit(data) {
            this.titleAddOrEdit = '编辑图书';
            this.addEditVisible = true;
            this.$nextTick(() => {
                this.$refs.addEditBook.initGetConfig = true
                this.$refs.addEditBook.initFormData(data.bookId);
            })
        },
        handleDelete(data) {
            let info = "图书"
            this.$confirm(`此操作将删除此${info}, 是否继续?`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(async () => {
                await this.$fetch("book_delete_book", {
                    bookId: data.bookId,
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
        refresh(val) {
            this.getTableData({
                pageNum: val || this.pageConfig.pageNum
            });
        },
        handleCourse(){},
        handleCourseClose() {

        }
    },

    created() {

    },

    mounted() {
        this.getTableData()
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
.book-container {
    /deep/ {
        .el-form-item__content {
            width: 495px;
        }
        .course .full-dialog-container {
            overflow: initial;
        }
        .course .full-dialog-container .content {
            background: #f0f2f5;
        }
        // 摇摆嵌套
        .addEditCourse {
            .full-dialog-container {
                top: 0;
            }
            .full-dialog-container .content {
                background: #fff !important;
            }
        }
        // 摇摆嵌套
        .chapter {
            .full-dialog-container {
                top: 0;
            }
        }
    }
    .full-dialog-container .top-title {
        padding-left: 50px;
    }
}
.class-teacher {
    display: inline-block;
    padding-bottom: 5px;
    padding-right: 5px;
}
</style>