<!-- 创建|编辑 小节 -->
<template>
    <div class='addEditSection'>
        <RdForm :formOptions="addFormOptions" :rules="addRules" :formLabelWidth="'150px'" ref="dataForm"></RdForm>
        <div class="btn-wrapper">
            <el-button v-if="mode == 'add'" type="primary" size="small" :loading="btnLoading" @click="handleAdd" v-prevent-re-click="2000">立即创建</el-button>
            <el-button v-if="mode == 'save'" type="primary" size="small" :loading="btnLoading" @click="handleSave" v-prevent-re-click="2000">保存</el-button>
            <el-button size="small" @click="handleClose('dataForm')">取消</el-button>
        </div>
    </div>
</template>

<script>


import RdForm from "@/components/RdForm";
import { scrollTo } from "@/utils/scroll-to";
export default {

    components: { RdForm },
    data() {

        return {
            addFormOptions: [
                {
                    prop: "courseClassName",
                    element: "el-input",
                    placeholder: "",
                    label: "班级名",
                    disabled: true,
                    // ! 数据来源 科目单元信息
                    initValue: this.$store.state.onlineCourse.courseClassName,
                },
                {
                    prop: "courseName",
                    element: "el-input",
                    placeholder: "请输入",
                    label: "科目名称",
                    disabled: true,
                    // ! 数据来源 科目单元信息
                    initValue: this.$store.state.onlineCourse.courseName,
                },
                {
                    prop: "courseChapterNameParent",
                    element: "el-input",
                    placeholder: "请输入",
                    label: "章名称",
                    disabled: true,
                    // ! 数据来源 章节单元信息
                    initValue: this.$store.state.onlineCourse.courseChapterName,
                },
                {
                    prop: "courseChapterName",
                    element: "el-input",
                    placeholder: "请输入",
                    label: "节名称",
                },
                {
                    prop: "courseVideoId",
                    element: "el-input",
                    placeholder: "请输入",
                    label: "视频ID",
                },
                {
                    prop: "courseChapterStatus",
                    element: "el-radio",
                    placeholder: "请选择显示状态",
                    label: "显示状态",
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
                    ],
                    initValue: "Open",
                },
                {
                    prop: "orderValue",
                    element: "el-input-number",
                    placeholder: "请输入",
                    label: "排序值",
                },
            ],
            addRules: {
                courseChapterName: [{ required: true, message: "请输入科目名称", trigger: "blur" },],
                courseVideoId: [{ required: true, message: "请输入视频ID", trigger: "blur" },],
                courseChapterStatus: [{ required: true, message: "请选择显示状态", trigger: "blur" },],
                orderValue: [{ required: true, message: "请输入排序值", trigger: "blur" },],
            },
            btnLoading: false,
            mode: 'add',
            courseChapterId: ""
        };
    },

    computed: {},

    watch: {},

    methods: {
        handleAdd() {
            this.$refs.dataForm.validate((val, data) => {
                if (val) {
                    this.$fetch("online_course_add_section", {
                        ...data,
                        loginUserId: this.$common.getUserId(),
                        courseId: this.$store.state.onlineCourse.courseId, // 科目id
                        parentId: this.$store.state.onlineCourse.courseChapterId, // 章节id
                    }).then((res) => {
                        if (res.code == 200) {
                            this.btnLoading = false;
                            this.$message.success("创建成功");
                            this.$emit("close");
                            this.$emit("refresh");
                        }
                    }).catch((err) => {
                        console.log(err);
                        this.btnLoading = false;
                    });
                }
            })
        },
        handleSave() {
            this.$refs.dataForm.validate((val, data) => {
                if (val) {
                    this.$fetch("online_course_update_section", {
                        ...data,
                        loginUserId: this.$common.getUserId(),
                        courseId: this.$store.state.onlineCourse.courseId, // 科目id
                        parentId: this.$store.state.onlineCourse.courseChapterId, // 章节id
                        courseChapterId: this.courseChapterId,
                    }).then((res) => {
                        if (res.code == 200) {
                            this.btnLoading = false;
                            this.$message.success("创建成功");
                            this.$emit("close");
                            this.$emit("refresh");
                        }
                    }).catch((err) => {
                        console.log(err);
                        this.btnLoading = false;
                    });
                }
            })
        },
        handleClose(formName) {
            this.$refs[formName].resetFields();
            this.$emit("close");
        },
        initFormData(courseChapterId) {
            this.mode = 'save';
            this.courseChapterId = courseChapterId;
            this.getChapterInfo();
        },
        getChapterInfo() {
            if (this.mode == 'save') {
                this.$fetch("online_course_chapter_getInfo", {
                    courseChapterId: this.courseChapterId,
                    loginUserId: this.$common.getUserId(),
                }).then((res) => {
                    this.addFormOptions.forEach((item) => {
                        item.initValue = res.data[item.prop];
                    })
                    this.$refs.dataForm.addInitValue();
                })
            }
        }
    },

    created() {

    },

    mounted() {
        scrollTo(0, 800);
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
.addEditSection {
    /deep/ {
        .el-input-number--small {
            width: 100%;
        }
    }
    .btn-wrapper {
        margin-left: 400px;
    }
}
</style>