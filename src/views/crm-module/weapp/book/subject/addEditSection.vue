<!-- 创建|编辑 小节 -->
<template>
    <div class='addEditSection' id="addEditSection">
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
import { Loading } from 'element-ui';
export default {

    components: { RdForm },
    props: {
        book: {
            type: Object,
            default: () => { return {} }
        },
        subject: {
            type: Object,
            default: () => { return {} }
        },
        chapter: {
            type: Object,
            default: () => { return {} }
        }
    },
    data() {

        return {
            addFormOptions: [
                {
                    prop: "bookName",
                    element: "el-input",
                    placeholder: "",
                    label: "班级名",
                    disabled: true,
                    // ! 数据来源 科目单元信息
                    initValue: this.book.bookName,
                },
                {
                    prop: "bookSubjectName",
                    element: "el-input",
                    placeholder: "请输入",
                    label: "科目名称",
                    disabled: true,
                    // ! 数据来源 科目单元信息
                    initValue: this.subject.bookSubjectName,
                },
                {
                    prop: "bookChapterNameParent",
                    element: "el-input",
                    placeholder: "请输入",
                    label: "章名称",
                    disabled: true,
                    // ! 数据来源 章节单元信息
                    initValue: this.chapter.bookChapterName,
                },
                {
                    prop: "bookChapterName",
                    element: "el-input",
                    placeholder: "请输入",
                    label: "节名称",
                },
                {
                    prop: "bookVideoId",
                    element: "el-input",
                    placeholder: "请输入",
                    label: "视频ID",
                },
                {
                    prop: "bookChapterStatus",
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
                bookChapterName: [{ required: true, message: "请输入科目名称", trigger: "blur" },],
                bookVideoId: [{ required: true, message: "请输入视频ID", trigger: "blur" },],
                bookChapterStatus: [{ required: true, message: "请选择显示状态", trigger: "blur" },],
                orderValue: [{ required: true, message: "请输入排序值", trigger: "blur" },],
            },
            btnLoading: false,
            mode: 'add',
            bookChapterId: ""
        };
    },

    computed: {},

    watch: {},

    methods: {
        handleAdd() {
            this.$refs.dataForm.validate((val, data) => {
                if (val) {
                    this.$fetch("book_add_section", {
                        ...data,
                        loginUserId: this.$common.getUserId(),
                        parentId: this.chapter.bookChapterId, // 章节id
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
                    this.$fetch("book_update_section", {
                        ...data,
                        loginUserId: this.$common.getUserId(),
                        parentId: this.chapter.bookChapterId, // 章节id
                        bookChapterId: this.bookChapterId,
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
        initFormData(bookChapterId) {
            this.mode = 'save';
            this.bookChapterId = bookChapterId;
            this.getChapterInfo();
        },
        getChapterInfo() {
            if (this.mode == 'save') {
                let loadingInstance = Loading.service({
                    target: document.querySelector('#addEditSection'),
                    lock: true,
                });
                this.$fetch("book_chapter_getInfo", {
                    bookChapterId: this.bookChapterId,
                    loginUserId: this.$common.getUserId(),
                }).then((res) => {
                    this.addFormOptions.forEach((item) => {
                        item.initValue = res.data[item.prop];
                    })
                    loadingInstance.close()
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