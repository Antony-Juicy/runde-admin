<!-- 创建|编辑图书 -->
<template>
	<div class="addEditBook" id="addEditBook">
		<RdForm :formOptions="addFormOptions" :rules="addRules" :formLabelWidth="'150px'" ref="dataForm">
			<template slot="bookType">
				<el-radio v-model="bookType" label="Charge"> 收费 </el-radio>
				<el-radio v-model="bookType" label="Free"> 免费 </el-radio>
			</template>
			<template slot="bookImageUrl">
				<Upload-oss v-if="uploadOssElem" :objConfig="{ dir: 'web/runde_admin', project: 'icon_' }" :src.sync="bookImageUrl" :initGetConfig="initGetConfig" @srcChangeFun="
						(data) => {
							bookImageUrl = data
							reloadElem('uploadOssElem')
						}
					" />
			</template>
			<template slot="bookDetailImageUrl">
				<Upload-oss v-if="uploadOssElem2" :objConfig="{ dir: 'web/runde_admin', project: 'icon_' }" :src.sync="bookDetailImageUrl" :initGetConfig="initGetConfig"
					@srcChangeFun="
						(data) => {
							bookDetailImageUrl = data
							reloadElem('uploadOssElem2')
						}
					" />
			</template>
			<template slot="bookTeacherArray">
				<el-select multiple filterable v-model="bookTeacherArray" placeholder="请选择授课讲师">
					<el-option v-for="(item, index) in bookTeacherArrayOptions" :key="index" :label="item.label" :value="item.value"></el-option>
				</el-select>
			</template>
			<template slot="bookDetail">
				<RdEditor height="600px" placeholder="编辑班级详细介绍" :quillContent="bookDetailByEdit" @change="changeEditor" />
			</template>
		</RdForm>
		<div class="btn-wrapper">
			<el-button v-if="mode == 'add'" type="primary" size="small" :loading="btnLoading" @click="handleAdd" v-prevent-re-click="2000">立即创建
			</el-button>
			<el-button v-if="mode == 'save'" type="primary" size="small" :loading="btnLoading" @click="handleSave" v-prevent-re-click="2000">保存
			</el-button>
			<el-button size="small" @click="handleClose('dataForm')">取消</el-button>
		</div>
	</div>
</template>

<script>
import RdForm from '@/components/RdForm'
import UploadOss from '@/components/UploadOss'
import RdEditor from '@/components/RdEditor'
import { scrollTo } from '@/utils/scroll-to'
import { Loading } from 'element-ui'
export default {
	components: { RdForm, UploadOss, RdEditor },

	data() {
		return {
			addFormOptions: [
				{
					prop: 'bookName',
					element: 'el-input',
					placeholder: '请输入',
					label: '图书名称',
				},
				{
					prop: 'bookKeywords',
					element: 'el-input',
					placeholder: '请输入',
					label: '关键字',
				},
				{
					prop: 'bookImageUrl',
					element: 'el-input',
					label: '封面图(5:6)',
					operate: true,
					initValue: 0,
				},
				{
					prop: 'bookDetailImageUrl',
					element: 'el-input',
					label: '详情轮播图(21:9)',
					operate: true,
					initValue: 0,
				},
				{
					prop: 'bookTeacherArray',
					element: 'el-input',
					placeholder: '请选择',
					label: '授课讲师',
					operate: true,
					initValue: '0',
				},
				{
					prop: 'bookLabel',
					element: 'el-select',
					placeholder: '请输入图书标签',
					label: '图书标签',
					filterable: true,
					multiple: true,
					allowCreate: true,
					defaultFirstOption: true,
					options: [],
					initValue: 0,
				},
				{
					prop: 'bookType',
					element: 'el-input',
					placeholder: '请选择',
					label: '收费模式',
					operate: true,
					initValue: 'Charge',
				},
				{
					prop: 'bookEnrollFee',
					element: 'el-input-number',
					placeholder: '请输入',
					label: '报名费用',
				},
				{
					prop: 'bookStatus',
					element: 'el-radio',
					placeholder: '请选择显示状态',
					label: '显示状态',
					options: [
						{
							label: '上架',
							value: 'Open',
						},
						{
							label: '下架',
							value: 'Close',
						},
						{
							label: '隐藏',
							value: 'Hidden',
						},
					],
					initValue: 'Open',
				},
				{
					prop: 'activityId',
					element: 'el-input-number',
					placeholder: '请输入',
					label: '活动ID',
					initValue: '',
				},
				{
					prop: 'labelInfo',
					element: 'el-input',
					placeholder: '请输入',
					label: '活动标志',
					initValue: '',
				},
				{
					prop: 'staffId',
					element: 'el-input-number',
					placeholder: '请输入',
					label: '员工ID',
					initValue: '',
				},
				{
					prop: 'title',
					element: 'el-input',
					placeholder: '请输入',
					label: '分享标题',
					initValue: '',
				},
				{
					prop: 'content',
					element: 'el-input',
					placeholder: '请输入',
					label: '分享描述',
					initValue: '',
				},
				{
					prop: 'orderValue',
					element: 'el-input-number',
					placeholder: '请输入',
					label: '排序值',
				},

				{
					prop: 'bookDescribe',
					element: 'el-input',
					placeholder: '请输入',
					label: '图书介绍',
					initValue: '',
				},
				{
					prop: 'bookPurchaseUrl',
					element: 'el-input',
					placeholder: '请输入',
					label: '图书购买链接',
					initValue: '',
				},
				{
					prop: 'bookDetail',
					element: 'el-input',
					placeholder: '请输入',
					label: '详细介绍',
					operate: true,
					initValue: '0',
				},
			],
			addRules: {
				typeId: [{ required: true, message: '请选择项目名类型', trigger: 'blur' },],
				bookName: [{ required: true, message: '请输入图书名称', trigger: 'blur' },],
				bookKeywords: [{ required: true, message: '请输入关键字', trigger: 'blur' },],
				bookImageUrl: [{ required: true, message: '请上传封面图', trigger: 'blur' },],
				bookDetailImageUrl: [{ required: true, message: '请上传详情轮播图', trigger: 'blur' },],
				bookTeacherArray: [{ required: true, message: '请选择授课讲师', trigger: 'blur' },],
				bookLabel: [{ required: true, message: '请输入图书标签', trigger: 'blur' },],
				bookType: [{ required: true, message: '请选择收费模式', trigger: 'blur' },],
				bookEnrollFee: [{ required: true, message: '请输入报名费用', trigger: 'blur' },],
				bookStatus: [{ required: true, message: '请选择图书状态', trigger: 'blur' },],
				orderValue: [{ required: true, message: '请输入排序值', trigger: 'blur' },],
				bookDescribe: [{ required: true, message: '请输入图书介绍', trigger: 'blur' },],
				// bookPurchaseUrl: [{ required: true, message: '请输入图书购买链接', trigger: 'blur' },],
				bookDetail: [{ required: true, message: '请上传详情介绍', trigger: 'blur' },],
			},
			uploadOssElem: true,
			uploadOssElem2: true,
			initGetConfig: false,
			bookType: 'Charge',
			bookImageUrl: '',
			bookDetailImageUrl: '',
			bookDetail: '', // 用于后续保存富文本时使用
			bookDetailByEdit: '', // 用于编辑时初始化富文本内容使用
			bookTeacherArray: [],
			oldBookTeacherArray: [],
			bookTeacherArrayOptions: [],
			btnLoading: false,
			mode: 'add', // add 新增 edit 修改
			bookId: '',
		}
	},

	computed: {},

	watch: {
		bookType: function (n, o) {
			if (n == 'Charge') {
				this.addFormOptions.splice(8, 0, {
					prop: 'bookEnrollFee',
					element: 'el-input-number',
					placeholder: '请输入',
					label: '报名费用',
				})
			} else {
				this.addFormOptions.splice(8, 1)
			}
			scrollTo(0, 800)
		},
	},

	methods: {
		// 上传组件
		reloadElem(dataElem) {
			console.log('reload')
			// 重新加载组件
			this[dataElem] = false
			this.$nextTick(() => {
				this[dataElem] = true
			})
		},
		handleClose(formName) {
			this.$refs[formName].resetFields()
			this.$emit('close')
		},
		changeEditor(val) {
			this.bookDetail = val
		},
		handleAdd() {
			this.$refs.dataForm.validate((val, data) => {
				if (val) {
					if (this.bookImageUrl == '') {
						this.$message.error('请上传封面图')
						return
					} else {
						data.bookImageUrl = this.bookImageUrl
					}
					if (this.bookDetailImageUrl == '') {
						this.$message.error('请上传详情轮播图')
						return
					} else {
						data.bookDetailImageUrl = this.bookDetailImageUrl
					}
					if (this.bookDetail == '') {
						this.$message.error('请上传详情介绍')
						return
					} else {
						data.bookDetail = this.bookDetail
					}
					if (this.bookTeacherArray.length == 0) {
						this.$message.error("请选择授课讲师");
						return;
					}

					if (!data.activityId) {
						delete data.activityId
					}
					if (!data.staffId) {
						delete data.staffId
					}
					// else if (this.bookTeacherArray.length > 5) {
					// 	this.$message.error("授课老师不能多于5个");
					// 	return;
					// }
					else {
						// 由于某种问题，需要多做一次格式化成对象
						// 后台保存的数据是用字符串，所以要格式化数组成字符串
						data.bookTeacherArray = JSON.stringify(this.bookTeacherArray.map(v => JSON.parse(v)));
					}

					data.bookType = this.bookType
					// 提取最后一层的类型id
					if (data.typeId.length >= 0) {
						data.typeId = data.typeId.pop()
					}
					// 标签转化成 , 隔开的字符串
					data.bookLabel = data.bookLabel.join(',')

					// 后台保存的数据是用字符串，所以要格式化数组成字符串
					// data.bookTeacherArray = JSON.stringify(data.bookTeacherArray)
					this.$fetch('book_add_book', {
						...data,
						loginUserId: this.$common.getUserId(),
					})
						.then((res) => {
							if (res.code == 200) {
								this.btnLoading = false
								this.$message.success('创建成功')
								this.$emit('close')
								this.$emit('refresh')
							}
							data.bookLabel = data.bookLabel.split(',')
						})
						.catch((err) => {
							console.log(err)
							this.btnLoading = false
							data.bookLabel = data.bookLabel.split(',')
						})
				}
			})
		},
		handleSave(Imperceptible) {
			this.$refs.dataForm.validate((val, data) => {
				if (val) {
					if (this.bookImageUrl == '') {
						this.$message.error('请上传封面图')
						return
					} else {
						data.bookImageUrl = this.bookImageUrl
					}
					if (this.bookDetailImageUrl == '') {
						this.$message.error('请上传详情轮播图')
						return
					} else {
						data.bookDetailImageUrl = this.bookDetailImageUrl
					}
					if (this.bookDetail == '') {
						this.$message.error('请上传详情介绍')
						return
					} else {
						data.bookDetail = this.bookDetail
					}
					if (this.bookTeacherArray.length == 0) {
						this.$message.error('请选择授课老师')
						return
					}
					// else if (this.teacherArray.length > 5) {
					// 	this.$message.error("授课老师不能多于5个");
					// 	return;
					// }
					else {
						// 由于某种问题，需要多做一次格式化成对象
						// 后台保存的数据是用字符串，所以要格式化数组成字符串
						data.bookTeacherArray = JSON.stringify(
							this.bookTeacherArray.map((v) => JSON.parse(v))
						)
					}

					if (!data.activityId) {
						delete data.activityId
					}
					if (!data.staffId) {
						delete data.staffId
					}
					
					data.bookType = this.bookType

					data.bookId = this.bookId

					// 提取最后一层的类型id
					if (data.typeId.length >= 0) {
						data.typeId = data.typeId.pop()
					}

					// 标签转化成 , 隔开的字符串
					data.bookLabel = data.bookLabel.join(',')


					if (!this.oldBookTeacherArray.every((v) => this.bookTeacherArray.includes(v))) {
						this.$confirm(
							`检测到删除授课老师，会同时修改科目数据, 是否继续?`,
							'提示',
							{
								confirmButtonText: '确定',
								cancelButtonText: '取消',
								type: 'warning',
							}
						).then(async () => {
							doUpdate.call(this)
						})
					} else {
						doUpdate.call(this)
					}


					function doUpdate() {
						this.$fetch('book_update_book', {
							...data,
							loginUserId: this.$common.getUserId(),
						})
							.then((res) => {
								if (res.code == 200) {
									this.btnLoading = false

									// todo 无感保存处理
									if (Imperceptible != true) {
										this.$message.success("保存成功");
										this.$emit("close");
									}
									this.$emit("refresh");
								}
								data.bookLabel = data.bookLabel.split(',')
							})
							.catch((err) => {
								console.log(err)
								this.btnLoading = false
								data.bookLabel = data.bookLabel.split(',')
							})
					}
				}
			})
		},
		initFormData(bookId) {
			this.mode = 'save'
			this.bookId = bookId
		},
		async getBookInfo() {
			if (this.mode == 'save') {
				await this.$fetch('book_book_getInfo', {
					bookId: this.bookId,
					loginUserId: this.$common.getUserId(),
				}).then((res) => {
					let autoSave = false
					this.addFormOptions.forEach((item) => {
						item.initValue = res.data[item.prop]
						if (item.prop == 'bookType') {
							this.bookType = res.data.bookType
						}
						if (item.prop == 'bookImageUrl') {
							this.bookImageUrl = res.data.bookImageUrl
						}
						if (item.prop == 'bookDetailImageUrl') {
							this.bookDetailImageUrl = res.data.bookDetailImageUrl
						}
						if (item.prop == 'bookDetail') {
							this.bookDetail = res.data.bookDetail
							this.bookDetailByEdit = res.data.bookDetail
						}
						if (item.prop == 'bookLabel') {
							item.initValue = res.data.bookLabel.split(',')
						}
						if (item.prop == 'bookTeacherArray') {
							try {
								let teacherArray = JSON.parse(res.data.bookTeacherArray)
								let teacherArray_d = []
								// 需要和最新的老师信息进行比对 
								// ! 规则： id相同，替换id对应的最新信息。id不存在，删除这条记录
								for (let index = 0; index < teacherArray.length; index++) {
									let match_index = this.bookTeacherArrayOptions.findIndex(v => v.value.match(`"teacherId":${teacherArray[index].teacherId}`))
									if (match_index > -1) {
										teacherArray_d.push(this.bookTeacherArrayOptions[match_index].value)
									}
									if (match_index == -1 || JSON.stringify(teacherArray[index]) != this.bookTeacherArrayOptions[match_index].value) {
										autoSave = true
									}
								}

								this.oldBookTeacherArray = teacherArray_d
								this.bookTeacherArray = teacherArray_d

							} catch (error) { }
						}
					})
					this.$refs.dataForm.addInitValue()
					if (autoSave) {
						// console.log("自动保存")
						this.$nextTick(() => {
							this.handleSave(true)
						})

					}
				})
			}
		},

	},

	async mounted() {
		let loadingInstance = Loading.service({
			target: document.querySelector('#addEditBook'),
			lock: true,
		})
		scrollTo(0, 800)
		// 不知道为什么黑化，所以加一点点延时暂时解决
		await this.$common.sleep(100)
		// 项目类型 选项来源后台数据，使用请求返回的数值组装表单内容

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
		await this.$fetch('config_get_teachers_list', {
			loginUserId: this.$common.getUserId(),
		})
			.then(async (res) => {
				this.bookTeacherArrayOptions = res.data.map((item) => ({
					label: item.teacherName,
					value: JSON.stringify(item),
				}))

				await this.getBookInfo()
				loadingInstance.close()
			})
			.catch(() => {
				loadingInstance.close()
			})
	},
}
</script>
<style lang='scss' scoped>
.addEditBook {
	/deep/ {
		.img180 {
			width: 100px;
			height: 100px;
		}
		.el-cascader--small {
			width: 100%;
		}
		.el-input--small .el-input__inner {
			min-height: 32px;
		}
		.el-select .el-input__inner {
			min-height: 32px;
		}
		.el-input--suffix .el-input__inner {
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
}
</style>