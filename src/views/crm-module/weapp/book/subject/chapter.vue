<!-- 章节 -->
<template>
    <div class='chapter-container'>
        <!-- 搜索栏 -->
        <search-form :formOptions="formOptions" :showNum="2" @onSearch="onSearch"></search-form>
        <div class="w-container">
            <div class="btn-wrapper">
                <el-button type="primary" size="small" @click="handleAdd">创建章</el-button>
            </div>
            <!-- 表格主体 -->
            <rd-table :tableData="tableData" :tableKey="tableKey" :pageConfig.sync="pageConfig" fixedTwoRow @pageChange="pageChange">

                <template slot="edit" slot-scope="scope">
                    <el-button @click="handleEdit(scope.row)" type="text" size="small">查阅/编辑</el-button>
                    <el-button @click="handleSection(scope.row)" type="text" style="color: #67c23a" size="small">查看小节</el-button>
                    <el-button @click="handleDelete(scope.row)" type="text" style="color: #ec5b56" size="small">删除</el-button>
                </template>
            </rd-table>
        </div>
        <fullDialog class="addEditChapter" :title="`${titleAddOrEdit}`" v-model="addEditVisiable" @change="addEditVisiable = false">
            <addEditChapter ref="addEditChapter" v-if="addEditVisiable" @close="addEditVisiable = false" @refresh="refresh"></addEditChapter>
        </fullDialog>
        <fullDialog class="chapterSection" title="查看小节" v-model="chapterSectionVisible" @change="handleSectionClose">
            <chapterSection v-if="chapterSectionVisible" @close="handleSectionClose"></chapterSection>
        </fullDialog>
    </div>
</template>

<script>


import fullDialog from "@/components/FullDialog";
import chapterSection from './chapterSection'
import addEditChapter from './addEditChapter'
import { scrollTo } from "@/utils/scroll-to";
export default {

    components: { fullDialog, chapterSection, addEditChapter },
    data() {

        return {
            formOptions: [
                {
                    prop: "bookChapterName",
                    element: "el-input",
                    placeholder: "请输入章名称"
                },
                {
                    prop: "bookChapterStatus",
                    element: "el-select",
                    placeholder: "章状态",
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
                    value: "bookChapterId",
                    width: 80
                },
                {
                    name: "章名称",
                    value: "bookChapterName",
                },
                {
                    name: "图书名称",
                    value: "bookName",
                },
                {
                    name: "科目",
                    value: "bookSubjectName",
                },
                {
                    name: "状态",
                    value: "bookChapterStatus",
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
            addEditVisiable: false,
            chapterSectionVisible: false
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
                    "book_get_chapters",
                    {
                        loginUserId: this.$common.getUserId(),
                        ...this.pageConfig,
                        ...this.searchForm,
                        ...params,
                        bookSubjectId: this.$store.state.book.bookSubjectId, // 查询目录 bookSubjectId 查询所属科目
                    }
                ).then((res) => {
                    this.tableData = res.data.records.map((item) => {
                        item.bookChapterStatus = this.bookChapterStatus2Zh(item.bookChapterStatus)
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
        handleAdd() {
            this.titleAddOrEdit = "创建章节"
            this.addEditVisiable = true
        },
        handleEdit(data) {
            this.titleAddOrEdit = "编辑章节"
            this.addEditVisiable = true
            this.$nextTick(() => {
                this.$refs.addEditChapter.initFormData(data.bookChapterId)
            })

        },
        handleSection(data) {
            this.chapterSectionVisible = true
            this.$store.commit('book/setBookChapterId', data.bookChapterId)
            this.$store.commit('book/setBookChapterName', data.bookChapterName)

        },
        handleSectionClose() {
            this.chapterSectionVisible = false;
            this.$store.dispatch('book/clearChapter')
        },
        handleDelete(data) {
            let info = "章节"
            this.$confirm(`此操作将删除此${info}, 是否继续?`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(async () => {
                await this.$fetch("book_delete_chapter", {
                    bookChapterId: data.bookChapterId,
                    loginUserId: this.$common.getUserId(),
                }).then((res) => {
                    if (res) {
                        this.$message({
                            message: "删除成功",
                            type: "success",
                        });
                        setTimeout(() => {
                            this.getTableData({
                                pageNum: (this.tableData.length == 1 && this.pageConfig.pageNum > 1) ? (this.pageConfig.pageNum - 1) : this.pageConfig.pageNum
                            });
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
        bookChapterStatus2Zh(status) {
            switch (status) {
                case 'Open': return '上架';
                case "Close": return '下架';
                case "Hidden": return '隐藏';
            }
        },
    },

    created() {

    },

    mounted() {
        scrollTo(0, 800);
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
.chapter-container {
    /deep/ {
        .addEditChapter {
            .full-dialog-container .content {
                background: #fff !important;
            }
            .full-dialog-container {
                top: 0;
                bottom: 0;
            }
        }
        .chapterSection {
            .full-dialog-container {
                top: 0;
                bottom: 0;
            }
        }
    }
}
</style>