<!--  -->
<template>
    <div class='class-container'>
        <!-- 搜索栏 -->
        <search-form :formOptions="formOptions" :showNum="4" @onSearch="onSearch"></search-form>
        <div class="w-container">
            <div class="btn-wrapper">
                <el-button type="primary" size="small" @click="handleAdd">创建班级</el-button>
            </div>

            <!-- 表格主体 -->
            <rd-table :tableData="tableData" :tableKey="tableKey" :pageConfig.sync="pageConfig" fixedTwoRow @pageChange="pageChange">
                <template slot="imageUrl" slot-scope="scope">
                    <el-image style="width: 100px; height: 100px" :src="scope.row.imageUrl" fit="contain"></el-image>
                </template>
                <template slot="teacherArray" slot-scope="scope">
                    <span class="class-teacher" v-for="(item,index) in scope.row.teacherArray" :key="index">{{item.teacherName}}</span>
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
            <addEditClass ref="addEditClass" @close="addEditVisible = false" @refresh="refresh" v-if="addEditVisible" />
        </fullDialog>
        <fullDialog class="course" v-model="courseVisiable" title="科目管理" @change="handleCourseClose">
            <course :courseClass="courseClass" @close="handleCourseClose" @refresh="refresh" v-if="courseVisiable"></course>
        </fullDialog>
    </div>
</template>

<script>


import fullDialog from "@/components/FullDialog";
import addEditClass from './addEditClass'
import course from '@/views/crm-module/weapp/online-course/course/course'
import { scrollTo } from "@/utils/scroll-to";
export default {
    name:"onlineClassIndex",
    data() {
        return {
            formOptions: [
                {
                    prop: "courseClassName",
                    element: "el-input",
                    placeholder: "请输入班级名称",
                },
                {
                    prop: "courseClassKeywords",
                    element: "el-input",
                    placeholder: "请输入关键字",
                },
                {
                    prop: "classType",
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
                    prop: "classStatus",
                    element: "el-select",
                    placeholder: "课程状态",
                    options: [
                        {
                            label: "上架",
                            value: "Open"
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
                    value: "courseClassId",
                    width: 80
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
                    value: "courseClassKeywords",
                },
                {
                    name: "封面图",
                    value: "imageUrl",
                    operate: true,
                    width: 120,
                },
                {
                    name: "状态",
                    value: "classStatus",
                },
                {
                    name: "报名人数",
                    value: "enrollNum",
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
            addEditVisible: false,
            pageConfig: {
                totalCount: 0,
                pageNum: 1,
                pageSize: 10,
            },
            searchForm: {}, //搜索栏信息
            titleAddOrEdit: "创建班级",
            courseVisiable: false,
            courseClass: {}
        };
    },
    components: { fullDialog, addEditClass, course },
    computed: {

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
                    "online_course_get_classes",
                    {
                        loginUserId: this.$common.getUserId(),
                        ...this.pageConfig,
                        ...this.searchForm,
                        ...params
                    }
                ).then((res) => {
                    this.tableData = res.data.records.map((item) => {
                        item.classStatus = this.classStatus2Zh(item.classStatus)
                        item.teacherArray = JSON.parse(item.teacherArray)
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
        classStatus2Zh(status) {
            switch (status) {
                case 'Open': return '上架';
                case "Close": return '下架';
                case "Hidden": return '隐藏';
            }
        },
        handleAdd() {
            this.titleAddOrEdit = '创建班级';
            this.addEditVisible = true;
            this.$nextTick(() => {
                this.$refs.addEditClass.initGetConfig = true
            })
        },
        handleEdit(data) {
            this.titleAddOrEdit = '编辑班级';
            this.addEditVisible = true;
            this.$nextTick(() => {
                this.$refs.addEditClass.initGetConfig = true
                this.$refs.addEditClass.initFormData(data.courseClassId);
            })
        },
        handleCourse(data) {
            this.courseVisiable = true
            this.courseClass = data
        },
        handleCourseClose() {
            this.courseVisiable = false
        },
        handleDelete(data) {
            let info = "班级"
            this.$confirm(`此操作将删除此${info}, 是否继续?`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(async () => {
                await this.$fetch("online_course_delete_class", {
                    courseClassId: data.courseClassId,
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
    },

    mounted() {
        this.getTableData()
    },
    
}
</script>
<style lang='scss' scoped>
.class-container {
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
            &.el-loading-parent--relative {
                position: initial !important;
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