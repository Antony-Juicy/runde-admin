<template>
	<div class='addEditIcon' id="addEditIcon">
		<RdForm :formOptions="addFormOptions" :rules="addRules" :formLabelWidth="'150px'" ref="dataForm">
			<template slot="bannerImageUrl">
				<Upload-oss v-if="uploadOssElem" :objConfig="{ dir: 'web/runde_admin', project: 'icon_' }" :src.sync="bannerImageUrl" :initGetConfig="initGetConfig" @srcChangeFun="
                    (data) => {
                    bannerImageUrl = data;
                    reloadElem('uploadOssElem');
                    }
                " />
			</template>
			<template slot="bannerType">
				<el-select v-model="bannerType">
					<el-option v-for="(item,index) in bannerTypeOptions" :key="index" :label="item.label" :value="item.value"></el-option>
				</el-select>
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
					prop: "bannerImageUrl",
					element: "el-input",
					label: "轮播图",
					operate: true,
					initValue: 0,
				},
				{
					prop: "bannerType",
					element: "el-input",
					placeholder: "请选择",
					label: "跳转类型",
					operate: true,
					initValue: 0,
				},
				// {
				// 	prop: "link",
				// 	element: "el-input",
				// 	placeholder: "请输入",
				// 	label: "跳转链接",
				// },
				{
					prop: "bannerStatus",
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
				bannerImageUrl: [{ required: true, message: "请上传图标图片", trigger: "blur" },],
				bannerType: [{ required: true, message: "请选择跳转类型", trigger: "blur" },],
				link: [{ required: true, message: "请选择跳转链接", trigger: "blur" },],
				param: [{ required: true, message: "请输入跳转参数", trigger: "blur" },],
				bannerStatus: [{ required: true, message: "请选择图标状态", trigger: "blur" },],
				orderValue: [{ required: true, message: "请输入排序值", trigger: "blur" },],
			},
			uploadOssElem: true,
			initGetConfig: true,
			bannerId: "",
			bannerImageUrl: "",
			btnLoading: false,
			bannerType: "",
			bannerTypeOptions: [
				{
					label: "不跳转",
					value: "None"
				},
				{
					label: "网页",
					value: "H5"
				},
				{
					label: "直播",
					value: "InnerXcxLive"
				},
				{
					label: "科目",
					value: "InnerXcxCourse"
				},
				{
					label: "图书",
					value: "InnerXcxBook",
				},
				// {
				// 	label: "小程序外",
				// 	value: "OutSideXcx"
				// }
			],
			xcxPage: {
				"InnerXcxLive": "/pagesLive/pages/index/index?liveId=",
				"InnerXcxCourse": "/pages/Course/Play/Play?id=",
				"InnerXcxBook": "/pages/Book/Book?id=",
			},
			mode: "add",// add 新增 edit 修改
		}
	},
	components: { RdForm, UploadOss },
	watch: {
		bannerType: function (n, o) {
			// 如果选择不跳转，就不要用户输入跳转目标
			if (['跳转链接', '跳转参数'].includes(this.addFormOptions[3].label)) {
				this.addFormOptions.splice(3, 1)
			}

			if (n == 'H5' && this.addFormOptions[3].label != '跳转链接') {
				this.addFormOptions.splice(3, 0, {
					prop: "link",
					element: "el-input",
					placeholder: "请输入",
					label: "跳转链接",
				})
			}
			if (n.indexOf('InnerXcx') > -1 && this.addFormOptions[3].label != '跳转参数') {
				this.addFormOptions.splice(3, 0, {
					prop: "param",
					element: "el-input",
					placeholder: "请输入",
					label: "跳转参数",
				})
			}

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
		changeEditor(val) {
			this.teacherDetail = val;
		},
		handleAdd() {
			this.$refs.dataForm.validate((val, data) => {
				if (val) {
					if (this.bannerImageUrl == "") {
						this.$message.error("请上传封面图");
						return;
					} else {
						data.bannerImageUrl = this.bannerImageUrl;
					}

					if (this.bannerType == "") {
						this.$message.error("请选择跳转类型");
						return;
					} else {
						data.bannerType = this.bannerType;
						if (this.bannerType.indexOf('InnerXcx') > -1) {
							data.bannerTarget = this.xcxPage[this.bannerType] + data.param
							data.bannerType = "InnerXcx"
							delete data.param
						}
						if (this.bannerType == 'H5') {
							data.bannerTarget = data.link
							delete data.link
						}
					}

					// 提取最后一层的类型id
					if (data.typeId.length >= 0) {
						data.typeId = data.typeId.pop()
					}



					this.btnLoading = true;
					this.$fetch("config_add_banner", {
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
				console.log(data)
				if (val) {
					if (this.bannerImageUrl == "") {
						this.$message.error("请上传封面图");
						return;
					} else {
						data.bannerImageUrl = this.bannerImageUrl;
					}

					if (this.bannerType == "") {
						this.$message.error("请选择跳转类型");
						return;
					} else {
						data.bannerType = this.bannerType;
						if (this.bannerType.indexOf('InnerXcx') > -1) {
							data.bannerTarget = this.xcxPage[this.bannerType] + data.param
							data.bannerType = "InnerXcx"
							delete data.param
						}
						if (this.bannerType == 'H5') {
							data.bannerTarget = data.link
							delete data.link
						}
					}

					// 提取最后一层的类型id
					if (data.typeId.length >= 0) {
						data.typeId = data.typeId.pop()
					}

					data.bannerId = this.bannerId;
					this.btnLoading = true;
					this.$fetch("config_update_banner", {
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
		initFormData(bannerId) {
			this.mode = 'save';
			this.bannerId = bannerId;

		},
		getBannerInfo() {
			if (this.mode == 'save') {
				this.$fetch("config_banner_getInfo", {
					bannerId: this.bannerId,
					loginUserId: this.$common.getUserId(),
				}).then((res) => {
					this.addFormOptions.forEach((item) => {
						item.initValue = res.data[item.prop];
						if (item.prop == "bannerImageUrl") {
							this.bannerImageUrl = res.data.bannerImageUrl;
						}
					})

					let exLabel = {
						element: "el-input",
						placeholder: "请输入",
					}
					// 链接类型特殊处理
					if (res.data.bannerType == 'InnerXcx') {
						for (const key in this.xcxPage) {
							if (res.data.bannerTarget.indexOf(this.xcxPage[key]) > -1) {
								this.bannerType = key
								break
							}
						}
						exLabel.prop = "param";
						exLabel.label = "跳转参数";
						exLabel.initValue = res.data.bannerTarget.split('=')[1]
						this.addFormOptions.splice(3, 0, exLabel)
					}
					if (res.data.bannerType == 'H5') {
						exLabel.prop = "link";
						exLabel.label = "跳转参数";
						exLabel.initValue = res.data.bannerTarget
						this.addFormOptions.splice(3, 0, exLabel)
					}

					this.$refs.dataForm.addInitValue();
				})
			}
		}
	},

	async mounted() {
		scrollTo(0, 800);
		await this.$fetch(
			"projectType_select",
		).then((res) => {
			this.addFormOptions.unshift({
				prop: "typeId",
				element: "el-cascader",
				placeholder: "请选择项目类型",
				label: "项目类型",
				options: this.$common.getTypeTree(res.data),
			});
		});
		this.getBannerInfo()
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
		.el-cascader--small {
			width: 100%;
		}
		.el-input__inner {
			height: 32px;
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