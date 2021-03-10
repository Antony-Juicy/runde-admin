<!-- 创建|编辑 科目 -->
<template>
	<div class='addEditCourse' id="addEditCourse">
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
import UploadOss from "@/components/UploadOss";
import RdEditor from "@/components/RdEditor";
import { scrollTo } from "@/utils/scroll-to";
import { Loading } from 'element-ui';
export default {
	props: {
		book: {
			type: Object,
			default: () => { return {} }
		}
	},
	data() {
		return {
			addFormOptions: [
				{
					prop: "typeName",
					element: "el-input",
					placeholder: "",
					label: "项目分类",
					disabled: true,
					// ! 数据来源 1：班级打开时来自班级信息 2：科目打开时来自所选科目信息
					initValue: this.book.typeName,
				},
				{
					prop: "bookSubjectName",
					element: "el-input",
					placeholder: "请输入",
					label: "科目名称",
				},
				{
					prop: "bookSubjectKeywords",
					element: "el-input",
					placeholder: "请输入",
					label: "关键字",
				},
				{
					prop: "bookSubjectTotalEnrolment",
					element: "el-input-number",
					placeholder: "请输入",
					label: "报名人数",
				},
				{
					prop: "bookSubjectStatus",
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
					prop: "bookSubjectPurchaseUrl",
					element: "el-input",
					placeholder: "请输入",
					label: "图书购买链接",
				},
			],
			addRules: {
				bookSubjectName: [{ required: true, message: "请输入科目名称", trigger: "blur" },],
				bookSubjectKeywords: [{ required: true, message: "请输入关键字", trigger: "blur" },],
				bookSubjectTeacherArray: [{ required: true, message: "请选择授课讲师", trigger: "blur" }],
				bookSubjectTotalEnrolment: [{ required: true, message: "请输入报名人数", trigger: "blur" },],
				bookSubjectStatus: [{ required: true, message: "请输入", trigger: "blur" },],
				orderValue: [{ required: true, message: "请输入", trigger: "blur" },],
				// bookSubjectPurchaseUrl: [{ required: true, message: "请输入", trigger: "blur" },],
			},
			btnLoading: false,
			mode: "add",// add 新增 edit 修改
			bookSubjectId: ""
		};
	},
	components: { RdForm, UploadOss, RdEditor },
	computed: {

	},

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
			this.courseDetail = val;
		},
		handleAdd() {

			this.$refs.dataForm.validate((val, data) => {
				if (val) {
					data.bookId = this.book.bookId
					// 由于某种问题，需要多做一次格式化成对象
					data.bookSubjectTeacherArray = data.bookSubjectTeacherArray.map(v => JSON.parse(v))
					// 后台保存的数据是用字符串，所以要格式化数组成字符串
					data.bookSubjectTeacherArray = JSON.stringify(data.bookSubjectTeacherArray);
					this.$fetch("book_add_subject", {
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
		handleSave(Imperceptible ) {
			this.$refs.dataForm.validate((val, data) => {
				if (val) {
					data.bookId = this.book.bookId
					data.bookSubjectId = this.bookSubjectId
					// 由于某种问题，需要多做一次格式化成对象
					let mark_teacherArray = JSON.parse(JSON.stringify(data.bookSubjectTeacherArray)); // 记录一下原来的数据，避免出现空白
					// 由于某种问题，需要多做一次格式化成对象
					data.bookSubjectTeacherArray = data.bookSubjectTeacherArray.map(v => JSON.parse(v))
					// 后台保存的数据是用字符串，所以要格式化数组成字符串
					data.bookSubjectTeacherArray = JSON.stringify(data.bookSubjectTeacherArray);
					this.$fetch("book_update_subject", {
						...data,
						loginUserId: this.$common.getUserId(),
					}).then((res) => {
						if (res.code == 200) {
							this.btnLoading = false;
							data.bookSubjectTeacherArray = mark_teacherArray // 把缓存的数据填回去就好了
							// todo 无感保存处理
							if (Imperceptible != true) {
								this.$message.success("保存成功");
								this.$emit("close");
							}
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
		initFormData(bookSubjectId) {
			this.mode = 'save';
			this.bookSubjectId = bookSubjectId;
		},
		async getCourseInfo() {
			if (this.mode == 'save') {
				await this.$fetch("book_subject_getInfo", {
					bookSubjectId: this.bookSubjectId,
					loginUserId: this.$common.getUserId(),
				}).then((res) => {
					let autoSave = false
					this.addFormOptions.forEach((item) => {
						item.initValue = res.data[item.prop];
						if (item.prop == 'bookSubjectTeacherArray') {
							try {
								let teacherArray = JSON.parse(res.data.bookSubjectTeacherArray)
								let teacherArray_d = []

								// 需要和最新的老师信息进行比对 
								// ! 规则： id相同，替换id对应的最新信息。id不存在，删除这条记录
								for (let index = 0; index < teacherArray.length; index++) {
									let match_index = this.addFormOptions[6].options.findIndex(v => v.value.match(`"teacherId":${teacherArray[index].teacherId}`))
									if (match_index > -1) {
										teacherArray_d.push(this.addFormOptions[6].options[match_index].value)
									}
									if (match_index == -1 || JSON.stringify(teacherArray[index]) != this.addFormOptions[6].options[match_index].value) {
										autoSave = true
									}
								}
								item.initValue = teacherArray_d
							} catch (error) {
								console.log(error)
								item.initValue = []
							}
						}
					})
					this.$refs.dataForm.addInitValue();
					if (autoSave) {
						this.$nextTick(() => {
							this.handleSave(true)
						})
					}
				})
			}
		}

	},

	async mounted() {
		let loadingInstance = Loading.service({
			target: document.querySelector('#addEditCourse'),
			lock: true,
		});
		scrollTo(0, 800);
		await this.$fetch("book_subject_get_teachers", {
			loginUserId: this.$common.getUserId(),
			bookId: this.book.bookId
		}).then(async (res) => {
			this.addFormOptions.splice(6, 0, {
				prop: "bookSubjectTeacherArray",
				element: "el-select",
				placeholder: "请选择",
				label: "授课讲师",
				filterable: true,
				multiple: true,
				options: res.data.map((item) => ({
					label: item.teacherName,
					value: JSON.stringify(item)
				}))
			});

			await this.getCourseInfo()
			loadingInstance.close()
		}).catch(() => {
			loadingInstance.close()
		})
	},
}
</script>
<style lang='scss' scoped>
.addEditCourse {
	/deep/ {
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
}
.btn-wrapper {
	margin-left: 400px;
}
</style>