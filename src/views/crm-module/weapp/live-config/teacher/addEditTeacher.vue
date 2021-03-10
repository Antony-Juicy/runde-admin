<!-- 创建|编辑 讲师 -->
<template>
    <div class='addEditTeacher'>
        <RdForm :formOptions="addFormOptions" :rules="addRules" :formLabelWidth="'150px'" ref="dataForm">
            <template slot="teacherPhoto">
                <Upload-oss v-if="uploadOssElem" :initGetConfig="initGetConfig" :objConfig="{ dir: 'web/runde_admin', project: 'icon_' }" :src.sync="teacherPhoto" @srcChangeFun="
                (data) => {
                  teacherPhoto = data;
                  reloadElem('uploadOssElem');
                }
              " />
            </template>
            <template slot="teacherDetail">
                <RdEditor placeholder="编辑讲师详细介绍" :quillContent="teacherDetailByEdit" @change="changeEditor" />
            </template>
        </RdForm>
        <div class="btn-wrapper">
            <el-button v-if="mode == 'add'" type="primary" size="small" :loading="btnLoading" @click="handleAdd" v-prevent-re-click="2000">立即创建</el-button>
            <el-button v-if="mode == 'save'" type="primary" size="small" :loading="btnLoading" @click="handleSave" v-prevent-re-click="2000">保存</el-button>
            <el-button size="small" @click="handleClose('dataForm')">取消</el-button>
        </div>
    </div>
</template>

<script>


import RdForm from "@/components/RdForm";
import UploadOss from "@/components/UploadOss";
import RdEditor from "@/components/RdEditor";
import { scrollTo } from "@/utils/scroll-to";
export default {

    data() {

        return {
            addFormOptions: [
                {
                    prop: "teacherName",
                    element: "el-input",
                    placeholder: "请输入",
                    label: "教师名称",
                },
                {
                    prop: "teacherAliasName",
                    element: "el-input",
                    placeholder: "请输入",
                    label: "教师别名",
                },
                {
                    prop: "teacherPhoto",
                    element: "el-input",
                    label: "头像",
                    operate: true,
                    initValue: 0,
                },
                {
                    prop: "teacherType",
                    element: "el-select",
                    placeholder: "请选择",
                    label: "教师类型",
                    options: [
                        {
                            label: "全职",
                            value: "FullTime"
                        },
                        {
                            label: "兼职",
                            value: "PartTime"
                        }
                    ]
                },
                {
                    prop: "teacherStatus",
                    element: "el-radio",
                    placeholder: "请选择",
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
                        }
                    ],
                    initValue: "Open",
                },
                {
                    prop: "orderValue",
                    element: "el-input-number",
                    placeholder: "请输入",
                    label: "排序值",
                },
                {
                    prop: "teacherDetail",
                    element: "el-input",
                    label: "详细介绍",
                    operate: true,
                    initValue: "0",
                },
            ],
            addRules: {

                teacherName: [
                    { required: true, message: "请输入老师名称", trigger: "blur" },
                ],
                teacherAliasName: [
                    { required: true, message: "请输入老师别名", trigger: "blur" },
                ],
                teacherPhoto: [
                    { required: true, message: "请上头像", trigger: "blur" },
                ],
                teacherType: [
                    { required: true, message: "请选择老师类型", trigger: "blur" },
                ],
                teacherStatus: [
                    { required: true, message: "请选择老师状态", trigger: "blur" },
                ],
                orderValue: [
                    { required: true, message: "请输入排序值", trigger: "blur" },
                ],
                teacherDetail: [
                    { required: true, message: "详细介绍", trigger: "blur" },
                ],
            },
            uploadOssElem: true,
            initGetConfig: true,
            teacherId: "",
            teacherPhoto: "",
            teacherDetail: "", // 用于后续保存富文本时使用
            teacherDetailByEdit: "", // 用于编辑时初始化富文本内容使用
            btnLoading: false,
            mode: "add",// add 新增 edit 修改
        };
    },

    components: { RdForm, UploadOss, RdEditor },
    computed: {},
    watch: {},

    methods: {
        // 上传组件
        reloadElem(dataElem) {
            console.log("reload");
            // 重新加载组件
            this[dataElem] = false;
            this.$nextTick(() => {
                this[dataElem] = true;
            });
        },
        changeEditor(val) {
            this.teacherDetail = val;
        },
        handleAdd() {
            this.$refs.dataForm.validate((val, data) => {
                if (val) {
                    if (this.teacherPhoto == "") {
                        this.$message.error("请上传封面图");
                        return;
                    } else {
                        data.teacherPhoto = this.teacherPhoto;
                    }
                    if (this.teacherDetail == "") {
                        this.$message.error("请上传详细介绍");
                        return;
                    } else {
                        data.teacherDetail = this.teacherDetail;
                    }
                    this.btnLoading = true;
                    this.$fetch("config_add_teacher", {
                        ...data,
                        loginUserId: this.$common.getUserId(),
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
                    if (this.teacherPhoto == "") {
                        this.$message.error("请上传封面图");
                        return;
                    } else {
                        data.teacherPhoto = this.teacherPhoto;
                    }
                    if (this.teacherDetail == "") {
                        this.$message.error("请上传详细介绍");
                        return;
                    } else {
                        data.teacherDetail = this.teacherDetail;
                    }
                    data.teacherId = this.teacherId;
                    this.btnLoading = true;
                    this.$fetch("config_update_teacher", {
                        ...data,
                        loginUserId: this.$common.getUserId(),
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
        initFormData(teacherId) {
            this.mode = 'save';
            this.teacherId = teacherId;
            this.$fetch("config_teacher_getInfo", {
                teacherId: this.teacherId,
                loginUserId: this.$common.getUserId(),
            }).then((res) => {
                this.addFormOptions.forEach((item) => {
                    item.initValue = res.data[item.prop];
                    if (item.prop == "teacherPhoto") {
                        this.teacherPhoto = res.data.teacherPhoto;
                    }
                    if (item.prop == "teacherDetail") {
                        this.teacherDetail = res.data.teacherDetail;
                        this.teacherDetailByEdit = res.data.teacherDetail;
                    }
                })
                this.$refs.dataForm.addInitValue();
            })
        },
    },

    created() {

    },

    mounted() {
        scrollTo(0, 800);
    },
    // beforeCreate() { },
    // beforeMount() { },
    // beforeUpdate() { },
    // updated() { },
    // beforeDestroy() {
    //     // 数据还原
    //     this.addFormOptions = [
    //         {
    //             prop: "teacherName",
    //             element: "el-input",
    //             placeholder: "请输入",
    //             label: "教师名称",
    //         },
    //         {
    //             prop: "teacherAliasName",
    //             element: "el-input",
    //             placeholder: "请输入",
    //             label: "教师别名",
    //         },
    //         {
    //             prop: "teacherPhoto",
    //             element: "el-input",
    //             label: "头像",
    //             operate: true,
    //             initValue: 0,
    //         },
    //         {
    //             prop: "teacherType",
    //             element: "el-select",
    //             placeholder: "请选择",
    //             label: "教师类型",
    //             options: [
    //                 {
    //                     label: "全职",
    //                     value: "FullTime"
    //                 },
    //                 {
    //                     label: "兼职",
    //                     value: "PartTime"
    //                 }
    //             ]
    //         },
    //         {
    //             prop: "teacherStatus",
    //             element: "el-radio",
    //             placeholder: "请选择",
    //             label: "显示状态",
    //             options: [
    //                 {
    //                     label: "上架",
    //                     value: "Open"
    //                 },
    //                 {
    //                     label: "下架",
    //                     value: "Close"
    //                 },
    //                 {
    //                     label: "隐藏",
    //                     value: "Hidden"
    //                 }
    //             ],
    //             initValue: "Open",
    //         },
    //         {
    //             prop: "orderValue",
    //             element: "el-input",
    //             placeholder: "请输入",
    //             label: "排序值",
    //         },
    //         {
    //             prop: "teacherDetail",
    //             element: "el-input",
    //             label: "详细介绍",
    //             operate: true,
    //             initValue: "0",
    //         },
    //     ]
    //     this.mode = 'add'
    // },
    // destroyed() { },
    // activated() { },
}
</script>
<style lang='scss' scoped>
.addEditTeacher {
    /deep/ {
        .img180 {
            width: 100px;
            height: 100px;
        }
        .el-input-number--small {
            width: 100%;
        }
    }
    .btn-wrapper {
        margin-left: 400px;
    }
    .pic-container {
        display: flex;
        .pic-item {
            margin-right: 20px;
        }
    }
}
</style>