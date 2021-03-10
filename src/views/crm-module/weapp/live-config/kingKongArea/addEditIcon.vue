<template>
	<div class='addEditIcon' id="addEditIcon">
		<RdForm :formOptions="addFormOptions" :rules="addRules" :formLabelWidth="'150px'" ref="dataForm">
			<template slot="iconImageUrl">
				<Upload-oss v-if="uploadOssElem" :objConfig="{ dir: 'web/runde_admin', project: 'icon_' }" :src.sync="iconImageUrl" :initGetConfig="initGetConfig" @srcChangeFun="
                    (data) => {
                    iconImageUrl = data;
                    reloadElem('uploadOssElem');
                    }
                " />
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
import { scrollTo } from "@/utils/scroll-to";
export default {
	data() {
		return {
			addFormOptions: [
				{
					prop: "iconTitle",
					element: "el-input",
					placeholder: "请输入",
					label: "图标标题",
				},
				{
					prop: "iconLink",
					element: "el-input",
					placeholder: "请输入",
					label: "图标连接",
				},
				{
					prop: "iconImageUrl",
					element: "el-input",
					label: "图标图片",
					operate: true,
					initValue: 0,
				},
				{
					prop: "iconStatus",
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
			],
			addRules: {
                typeId: [{ required: true, message: "请选择项目名类型", trigger: "blur" },],
                iconImageUrl: [{ required: true, message: "请上传图标图片", trigger: "blur" },],
                iconTitle: [{ required: true, message: "请输入图标标题", trigger: "blur" },],
                iconLink: [{ required: true, message: "请输入图标链接", trigger: "blur" },],
                iconStatus: [{ required: true, message: "请选择图标状态", trigger: "blur" },],
                orderValue: [{ required: true, message: "请输入排序值", trigger: "blur" },],
            },
			uploadOssElem: true,
			initGetConfig: true,
			linkId: "",
			iconImageUrl: "",
			btnLoading: false,
			mode: "add",// add 新增 edit 修改
		}
	},
	components: { RdForm, UploadOss },
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
					if (this.iconImageUrl == "") {
						this.$message.error("请上传封面图");
						return;
					} else {
						data.iconImageUrl = this.iconImageUrl;
					}
					this.btnLoading = true;
					this.$fetch("config_add_icon", {
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
					if (this.iconImageUrl == "") {
						this.$message.error("请上传封面图");
						return;
					} else {
						data.iconImageUrl = this.iconImageUrl;
					}
					data.linkId = this.linkId;
					this.btnLoading = true;
					this.$fetch("config_update_icon", {
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
		initFormData(linkId) {
			this.mode = 'save';
			this.linkId = linkId;
			this.$fetch("config_icon_getInfo", {
				linkId: this.linkId,
				loginUserId: this.$common.getUserId(),
			}).then((res) => {
				this.addFormOptions.forEach((item) => {
					item.initValue = res.data[item.prop];
					if (item.prop == "iconImageUrl") {
						this.iconImageUrl = res.data.iconImageUrl;
					}
				})
				this.$refs.dataForm.addInitValue();
			})
		},
	},

	async mounted() {
		scrollTo(0, 800);
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
	},
}
</script>

<style lang='scss' scoped>
.addEditIcon {
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