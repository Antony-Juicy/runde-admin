<!--  -->
<template>
    <div class='addEditClass'>
        <RdForm :formOptions="addFormOptions" :rules="addRules" :formLabelWidth="'150px'" ref="dataForm">
            <template slot="classType">
                <el-radio v-model="classType" label="Charge">
                    收费
                </el-radio>
                <el-radio v-model="classType" label="Free">
                    免费
                </el-radio>
            </template>
            <template slot="imageUrl">
                <Upload-oss v-if="uploadOssElem" :objConfig="{ dir: 'web/runde_admin', project: 'icon_' }" :src.sync="imageUrl" :initGetConfig="initGetConfig" @srcChangeFun="
                    (data) => {
                    imageUrl = data;
                    reloadElem('uploadOssElem');
                    }
                " />
            </template>
            <template slot="teacherArray">
                <el-select multiple filterable v-model="teacherArray" placeholder="请选择授课讲师">
                    <el-option v-for="(item,index) in teacherArrayOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </template>
            <template slot="courseClassDetail">
                <RdEditor placeholder="编辑班级详细介绍" :quillContent="courseClassDetailByEdit" @change="changeEditor" />
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
                    prop: "courseClassName",
                    element: "el-input",
                    placeholder: "请输入",
                    label: "班级名称",
                },
                {
                    prop: "courseClassKeywords",
                    element: "el-input",
                    placeholder: "请输入",
                    label: "关键字",
                },
                {
                    prop: "courseClassCode",
                    element: "el-input",
                    placeholder: "请输入",
                    label: "班次代号",
                },
                {
                    prop: "imageUrl",
                    element: "el-input",
                    label: "封面图(21:9)",
                    operate: true,
                    initValue: 0,
                },
                {
                    prop: "teacherArray",
                    element: "el-input",
                    placeholder: "请选择",
                    label: "授课讲师",
                    operate: true,
                    initValue: "0",
                },
                {
                    prop: "classType",
                    element: "el-input",
                    placeholder: "请选择",
                    label: "收费模式",
                    operate: true,
                    initValue: "Charge",
                },
                {
                    prop: "enrollFee",
                    element: "el-input-number",
                    placeholder: "请输入",
                    label: "报名费用",
                },
                {
                    prop: "classStatus",
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
                {
                    prop: "courseClassDescribe",
                    element: "el-input",
                    placeholder: "请输入",
                    label: "班级描述",
                    initValue: ""
                },
                {
                    prop: "courseClassDetail",
                    element: "el-input",
                    placeholder: "请输入",
                    label: "详细介绍",
                    operate: true,
                    initValue: "0"
                },
            ],
            addRules: {
                typeId: [{ required: true, message: "请选择项目名类型", trigger: "blur" },],
                courseClassName: [{ required: true, message: "请输入班级名称", trigger: "blur" },],
                courseClassKeywords: [{ required: true, message: "请输入班级关键字", trigger: "blur" },],
                courseClassCode: [{ required: true, message: "请输入班级代号", trigger: "blur" },],
                imageUrl: [{ required: true, message: "请上传封面图", trigger: "blur" },],
                classType: [{ required: true, message: "请选择班级类型", trigger: "blur" },],
                enrollFee: [{ required: true, message: "请输入班级价格", trigger: "blur" },],
                teacherArray: [{ required: true, message: "请选择授课讲师", trigger: "blur" }],
                classShowStatus: [{ required: true, message: "请选择班级状态", trigger: "blur" },],
                orderValue: [{ required: true, message: "请输入排序值", trigger: "blur" },],
                courseClassDescribe: [{ required: true, message: "请输入班级描述", trigger: "blur" },],
                courseClassDetail: [{ required: true, message: "请上传详细介绍", trigger: "blur" },],
            },
            uploadOssElem: true,
            initGetConfig: false,
            classType: "Charge",
            imageUrl: "",
            courseClassDetail: "",// 用于后续保存富文本时使用
            courseClassDetailByEdit: "",// 用于编辑时初始化富文本内容使用
            oldTeacherArray: [], // 编辑时要用的老师源数据
            teacherArray: [],
            teacherArrayOptions: [],
            btnLoading: false,
            mode: "add",// add 新增 edit 修改

        };
    },
    components: { RdForm, UploadOss, RdEditor },

    computed: {},

    watch: {
        classType: function (n, o) {
            if (n == "Charge") {
                this.addFormOptions.splice(7, 0, {
                    prop: "enrollFee",
                    element: "el-input-number",
                    placeholder: "请输入",
                    label: "报名费用",
                })
            } else {
                this.addFormOptions.splice(7, 1)
            }
            scrollTo(0, 800);
        }
    },

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
        handleClose(formName) {
            this.$refs[formName].resetFields();
            this.$emit("close");
        },
        handleAdd() {
            this.$refs.dataForm.validate((val, data) => {
                if (val) {
                    if (this.imageUrl == "") {
                        this.$message.error("请上传封面图");
                        return;
                    } else {
                        data.imageUrl = this.imageUrl;
                    }
                    if (this.courseClassDetail == "") {
                        this.$message.error("请上传详细介绍");
                        return;
                    } else {
                        data.courseClassDetail = this.courseClassDetail;
                    }
                    if (this.teacherArray.length == 0) {
                        this.$message.error("请选择授课讲师");
                        return;
                    } else {
                        // 由于某种问题，需要多做一次格式化成对象
                        // 后台保存的数据是用字符串，所以要格式化数组成字符串
                        data.teacherArray = JSON.stringify(this.teacherArray.map(v => JSON.parse(v)));
                    }
                    data.classType = this.classType;
                    this.$fetch("online_course_add_class", {
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
        changeEditor(val) {
            this.courseClassDetail = val;
        },
        initFormData(courseClassId) {
            this.mode = 'save';
            this.courseClassId = courseClassId;

        },
        getClassInfo() {
            if (this.mode == 'save') {
                this.$fetch("online_course_class_getInfo", {
                    courseClassId: this.courseClassId,
                    loginUserId: this.$common.getUserId(),
                }).then((res) => {
                    this.addFormOptions.forEach((item) => {
                        item.initValue = res.data[item.prop];
                        if (item.prop == "classType") {
                            this.classType = res.data.classType;
                        }
                        if (item.prop == "imageUrl") {
                            this.imageUrl = res.data.imageUrl;
                        }
                        if (item.prop == "courseClassDetail") {
                            this.courseClassDetail = res.data.courseClassDetail;
                            this.courseClassDetailByEdit = res.data.courseClassDetail;
                        }
                        if (item.prop == 'teacherArray') {
                            // try {
                            //     item.initValue = JSON.parse(res.data.teacherArray).map(v => JSON.stringify(v))
                            // } catch (error) {
                            //     item.initValue = []
                            // }
                            try {
                                this.oldTeacherArray = JSON.parse(res.data.teacherArray).map(v => JSON.stringify(v))
                                this.teacherArray = JSON.parse(res.data.teacherArray).map(v => JSON.stringify(v))
                            } catch (error) {

                            }

                        }
                    })
                    this.$refs.dataForm.addInitValue();
                })
            }

        },
        handleSave() {
            this.$refs.dataForm.validate((val, data) => {
                if (val) {
                    if (this.imageUrl == "") {
                        this.$message.error("请上传封面图");
                        return;
                    } else {
                        data.imageUrl = this.imageUrl;
                    }
                    if (this.courseClassDetail == "") {
                        this.$message.error("请上传详细介绍");
                        return;
                    } else {
                        data.courseClassDetail = this.courseClassDetail;
                    }
                    if (this.teacherArray.length == 0) {
                        this.$message.error("请选择授课讲师");
                        return;
                    } else {
                        // 由于某种问题，需要多做一次格式化成对象
                        // 后台保存的数据是用字符串，所以要格式化数组成字符串
                        data.teacherArray = JSON.stringify(this.teacherArray.map(v => JSON.parse(v)));
                    }
                    data.courseClassId = this.courseClassId
                    data.classType = this.classType;

                    if (!this.oldTeacherArray.every(v => this.teacherArray.includes(v))) {
                        this.$confirm(`检测到删除授课老师，会同时修改科目数据, 是否继续?`, "提示", {
                            confirmButtonText: "确定",
                            cancelButtonText: "取消",
                            type: "warning",
                        }).then(async () => {
                            doUpdate.call(this, data)
                        })
                    } else {
                        doUpdate.call(this, data)
                    }

                    function doUpdate() {
                        this.$fetch("online_course_update_class", {
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

                }
            })
        }
    },

    created() {

    },

    async mounted() {
        scrollTo(0, 800);
        // 项目类型 选项来源后台数据，使用请求返回的数值组装表单内容
        await this.$fetch("projectType_normalList", {
            loginUserId: this.$common.getUserId(),
        }).then((res) => {
            let typeList = res.data.map((item) => ({
                label: item.typeName,
                value: item.typeId,
            }));
            this.addFormOptions.unshift({
                prop: "typeId",
                element: "el-select",
                placeholder: "请选择项目类型",
                label: "项目类型",
                options: typeList,
            });
        });
        await this.$fetch("config_get_teachers_list", {
            loginUserId: this.$common.getUserId(),
        }).then((res) => {
            // this.addFormOptions.splice(5, 0, {
            //     prop: "teacherArray",
            //     element: "el-select",
            //     placeholder: "请选择",
            //     label: "授课讲师",
            //     filterable: true,
            //     multiple: true,
            //     options:
            // });
            this.teacherArrayOptions = res.data.map((item) => ({
                label: item.teacherName,
                value: JSON.stringify(item)
            }))
            this.getClassInfo()
        })

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
.addEditClass {
    /deep/ {
        .img180 {
            width: 100px;
            height: 100px;
        }
        .el-input-number--small {
            width: 100%;
        }
        .el-input--small .el-input__inner {
            min-height: 32px;
        }
        .el-tag.el-tag--info {
            background-color: #ecf5ff;
            border-color: #d9ecff;
            color: #409eff;
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