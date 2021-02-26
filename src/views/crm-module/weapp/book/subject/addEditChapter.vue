<!-- 创建|编辑 章节 -->
<template>
    <div class='addEditChapter'>
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
                    prop: "bookName",
                    element: "el-input",
                    placeholder: "",
                    label: "图书名称",
                    disabled: true,
                    // ! 数据来源 科目单元信息
                    initValue: this.$store.state.book.bookName,
                },
                {
                    prop: "bookSubjectName",
                    element: "el-input",
                    placeholder: "",
                    label: "科目名称",
                    disabled: true,
                    // ! 数据来源 科目单元信息
                    initValue: this.$store.state.book.bookSubjectName,
                },
                {
                    prop: "bookChapterName",
                    element: "el-input",
                    placeholder: "请输入",
                    label: "章名称",
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
                bookChapterStatus: [{ required: true, message: "请选择显示状态", trigger: "blur" },],
                orderValue: [{ required: true, message: "请输入排序值", trigger: "blur" },],
            },
            btnLoading: false,
            mode: 'add',
            bookChapterId: "",
        };
    },

    computed: {},

    watch: {},

    methods: {
        handleAdd() {
            this.$refs.dataForm.validate((val, data) => {
                if (val) {
                    this.$fetch("book_add_chapter", {
                        ...data,
                        loginUserId: this.$common.getUserId(),
                        bookSubjectId: this.$store.state.book.bookSubjectId,
                        parentId: 0,
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
                    this.$fetch("book_update_chapter", {
                        ...data,
                        loginUserId: this.$common.getUserId(),
                        bookSubjectId: this.$store.state.book.bookSubjectId,
                        bookChapterId: this.bookChapterId,
                        parentId: 0
                    }).then((res) => {
                        if (res.code == 200) {
                            this.btnLoading = false;
                            this.$message.success("保存成功");
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
                this.$fetch("book_chapter_getInfo", {
                    bookChapterId: this.bookChapterId,
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
.addEditChapter {
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