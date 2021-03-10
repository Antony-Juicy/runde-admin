<!--  -->
<template>
    <div class='teacher-container'>
        <!-- 搜索栏 -->
        <search-form :formOptions="formOptions" :showNum="3" @onSearch="onSearch"></search-form>
        <div class="w-container">
            <div class="btn-wrapper">
                <el-button type="primary" size="small" @click="handleAdd">创建讲师</el-button>
            </div>
            <!-- 表格主体 -->
            <rd-table :tableData="tableData" :tableKey="tableKey" :pageConfig.sync="pageConfig" fixedTwoRow @pageChange="pageChange">

                <template slot="teacherPhoto" slot-scope="scope">
                    <el-image style="width: 100px; height: 100px" :src="scope.row.teacherPhoto" fit="contain"></el-image>
                </template>
                <template slot="edit" slot-scope="scope">
                    <el-button @click="handleEdit(scope.row)" type="text" size="small">查阅/编辑</el-button>
                    <el-button @click="handleDelete(scope.row)" type="text" style="color: #ec5b56" size="small">删除</el-button>
                </template>
            </rd-table>
            <fullDialog :title="`${titleAddOrEdit}`" v-model="addEditVisible" @change="addEditVisible = false">
                <addEditTeacher ref="addEditTeacher" v-if="addEditVisible" @close="addEditVisible = false" @refresh="refresh"></addEditTeacher>
            </fullDialog>
        </div>

    </div>
</template>

<script>


import fullDialog from "@/components/FullDialog";
import addEditTeacher from './addEditTeacher'
export default {


    data() {

        return {
            formOptions: [
                {
                    prop: "teacherName",
                    element: "el-input",
                    placeholder: "请输入教师名称",
                },
                {
                    prop: "teacherStatus",
                    element: "el-select",
                    placeholder: "教师状态",
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
                        }
                    ]
                },
            ],
            tableData: [],
            tableKey: [
                {
                    name: "ID主键",
                    value: "teacherId",
                    width: 80
                },
                {
                    name: "教师名称",
                    value: "teacherName",
                },
                {
                    name: "教师别名",
                    value: "teacherAliasName",
                },
                {
                    name: "教师头像",
                    value: "teacherPhoto",
                    operate: true,
                    width: 120
                },
                {
                    name: "状态",
                    value: "teacherStatus",
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
            titleAddOrEdit: "创建讲师",
            searchForm: {}, //搜索栏信息
            addEditVisible: false,
        };
    },
    components: { fullDialog, addEditTeacher },
    computed: {},

    watch: {},

    methods: {
        handleAdd() {
            this.titleAddOrEdit = "创建讲师"
            this.addEditVisible = true;
            this.$nextTick(() => {
                this.$refs.addEditTeacher.initGetConfig = true;
            });
        },
        getTableData(params = {}) {
            return new Promise((resolve, reject) => {
                const loading = this.$loading({
                    lock: true,
                    target: ".el-table",
                });
                this.$fetch(
                    "config_get_teachers",
                    {
                        loginUserId: this.$common.getUserId(),
                        ...this.pageConfig,
                        ...this.searchForm,
                        ...params
                    }
                ).then((res) => {
                    this.tableData = res.data.records.map((item) => {
                        item.teacherStatus = this.teacherStatus2Zh(item.teacherStatus)
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

        teacherStatus2Zh(status) {
            switch (status) {
                case 'Open': return '上架';
                case "Close": return '下架';
                case "Hidden": return '隐藏';
            }
        },
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

        refresh(val) {
            this.getTableData({
                pageNum: val || this.pageConfig.pageNum
            });
        },
        handleEdit(data) {
            this.titleAddOrEdit = "编辑讲师"
            this.addEditVisible = true;
            this.$nextTick(() => {
                this.$refs.addEditTeacher.initGetConfig = true;
                this.$refs.addEditTeacher.initFormData(data.teacherId);
            });
        },
        handleDelete(data) {
            let info = "讲师"
            this.$confirm(`此操作将删除此${info}, 是否继续?`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(async () => {
                await this.$fetch("config_delete_teacher", {
                    teacherId: data.teacherId,
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
        }
    },

    async created() {
        await this.getTableData()
    },

    // mounted() {

    // },
    // beforeCreate() { },
    // beforeMount() { },
    // beforeUpdate() { },
    // updated() { },
    // beforeDestroy() { },
    // destroyed() { },
    // activated() { },
}
</script>
<style lang='scss' scoped>
.teacher-container {
    /deep/ {
        .el-form-item__content {
            width: 495px;
        }
    }
    .full-dialog-container .top-title {
        padding-left: 50px;
    }
}
</style>