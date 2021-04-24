<template>
	<div class="accountLabel">
		<!-- 搜索栏 -->
		<el-dropdown ref="accountOption" trigger="click" placement="bottom-start">
			<div class="select-accoumt">
				<img class="logo" :src='account.appImg'>
				<div>{{account.appName}}</div>
				<i class="el-icon-arrow-down el-icon--right"></i>
			</div>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item v-for="(item,index) in officialAccounts" :key="index">
					<div class="account-option" @click="handle_select_account(item)">
						<img :src="item.appImg" class="logo">
						<span>{{ item.appName }}</span>
					</div>
				</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
		<search-form ref="searchForm" :formOptions="formOptions" :showNum="5" @onSearch="onSearch" @onReset="onReset"></search-form>
		<!-- 表格主体 -->
		<div class="w-container">
			<div class="btn-wrapper">
				<el-button type="primary" size="small" @click="handleAdd">新增标签</el-button>
			</div>
			<rd-table :tableData="tableData" :tableKey="tableKey" :pageConfig.sync="pageConfig" @pageChange="pageChange">
				<template slot="edit" slot-scope="scope">
					<el-button @click="handleEdit(scope.row)" type="text" size="small">查阅/编辑</el-button>
					<el-button v-if="scope.row.labelType == '1'" @click="handleDelete(scope.row)" type="text" style="color: #ec5b56" size="small">删除</el-button>
				</template>
			</rd-table>
		</div>

		<!-- 标签编辑 -->
		<rd-dialog :title="AddEditTitle" :dialogVisible="addEditVisible" :showFooter="false" :width="'600px'" @handleClose="addEditVisible = false">
			<div class="label-form">
				<RdForm :formOptions="addFormOptions" :rules="addRules" :formLabelWidth="'150px'" ref="dataForm">
				</RdForm>
				<div class="btns">
					<el-button @click="dialog_handleClose">取消</el-button>
					<el-button v-if="mode=='add'" @click="dialog_handleAdd" type="primary">新增</el-button>
					<el-button v-if="mode=='save'" @click="dialog_handleSave" type="primary">保存</el-button>
				</div>
			</div>

		</rd-dialog>
	</div>
</template>

<script>
import RdForm from "@/components/RdForm";
export default {
	components: { RdForm },
	props: {
		appId: {
			type: String,
			require: true
		}
	},
	data() {
		return {
			formOptions: [
				{
					prop: "labelName",
					element: "el-input",
					placeholder: "请输入标签名称",
				},
				{
					prop: "labelType",
					element: "el-select",
					placeholder: "标签类型",
					options: [
						{
							label: "系统标签",
							value: "0"
						},
						{
							label: "自定义标签",
							value: "1"
						},
					]
				},
			],
			tableData: [],
			tableKey: [
				{
					name: "ID主键",
					value: "id",
					width: 80
				},
				{
					name: "标签名",
					value: "labelName",
				},
				{
					name: "标签类型",
					value: "labelTypeZH",
				},
				{
					name: "操作",
					value: "edit",
					operate: true,
					width: 180
				},
			],
			pageConfig: {
				totalCount: 0,
				pageNum: 1,
				pageSize: 10,
			},
			AddEditTitle: "新增标签",
			addEditVisible: false,
			addFormOptions: [
				{
					prop: "labelName",
					element: "el-input",
					placeholder: "",
					label: "标签名称",
				},
				{
					prop: "labelType",
					element: "el-select",
					placeholder: "",
					label: "标签类型",
					options: [
						{
							label: "系统标签",
							value: 0
						},
						{
							label: "自定义标签",
							value: 1
						}
					]
				},
			],
			addRules: {
				labelName: [{ required: true, message: '请输入标签名称', trigger: 'blur' },],
				labelType: [{ required: true, message: '请输入标签类型', trigger: 'blur' },],
			},
			mode: 'add',
			officialAccounts: [],
			account: {},
			label: {},
			choseAccountVisible: false,
		}
	},
	methods: {
		onSearch(data) {
			this.searchForm = { ...data };
			this.pageConfig.pageNum = 1;
			this.getTableData();
		},
		onReset() {
			this.account = this.officialAccounts[0];
			this.searchForm = {};
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
		async getTableData(params = {}) {
			let searchForm = this.searchForm
			let res = await this.$fetch(
				"get_official_accounts_label_page",
				{
					loginUserId: this.$common.getUserId(),
					...this.pageConfig,
					...searchForm,
					...params,
					appId: this.account.appId
				}
			);
			this.tableData = res.data.records.map((item) => {
				item.labelTypeZH = item.labelType == '0' ? '系统标签' : '自定义标签'
				return item;
			});
			this.pageConfig.totalCount = res.data.totalCount;
		},
		handleAdd() {
			this.mode = 'add'
			this.AddEditTitle = "新增标签"
			this.addEditVisible = true
			this.addFormOptions.forEach(v => {
				v.initValue = ''
			})
			this.$nextTick(() => {
				this.$refs.dataForm.addInitValue()
			})
		},
		handleEdit(data) {
			this.mode = 'save'
			this.AddEditTitle = "编辑标签"
			this.label = data
			this.addFormOptions.forEach(v => {
				v.initValue = data[v.prop]
			})
			this.addEditVisible = true
			this.$nextTick(() => {
				this.$refs.dataForm.addInitValue()
			})
			// this.addFormOptions
		},
		handleDelete(data) {
			if (data.labelType == '0') {
				this.$confirm(`系统标签不能删除`, "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning",
				})
			} else {
				let info = "标签"
				this.$confirm(`此操作将删除此${info}, 是否继续?`, "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning",
				}).then(async () => {
					await this.$fetch("delete_official_accounts_label", {
						wechatLabelId: data.id,
						loginUserId: this.$common.getUserId(),
					}).then((res) => {
						if (res) {
							this.$message({
								message: "删除成功",
								type: "success",
							});
							setTimeout(() => {
								this.getTableData({
									pageNum: (this.tableData.length == 1 && this.pageConfig.pageNum > 1) ? (this.pageConfig.pageNum - 1) : this.pageConfig.pageNum
								});
							}, 50);
						}
					});
				})
			}

		},
		dialog_handleClose() {
			this.addEditVisible = false
		},
		dialog_handleAdd() {

			this.$refs.dataForm.validate((val, data) => {
				if (val) {
					this.$fetch('add_official_accounts_label', {
						...data,
						appId: this.account.appId,
						loginUserId: this.$common.getUserId(),
					}).then((res) => {
						if (res.code == 200) {
							this.btnLoading = false
							this.$message.success('保存成功')
							this.addEditVisible = false
							this.refresh()
						}
					})
						.catch((err) => {
							console.log(err)
							this.btnLoading = false
						})
				}
			})
		},
		dialog_handleSave() {

			this.$refs.dataForm.validate((val, data) => {
				if (val) {
					this.$fetch('update_official_accounts_label', {
						...data,
						id: this.label.id,
						appId: this.account.appId,
						loginUserId: this.$common.getUserId(),
					}).then((res) => {
						if (res.code == 200) {
							this.btnLoading = false
							this.$message.success('保存成功')
							this.addEditVisible = false
							this.refresh()
						}
					}).catch((err) => {
						console.log(err)
						this.btnLoading = false
					})
				}
			})
		},
		handle_select_account(data) {
			this.account = data
			this.choseAccountVisible = false
			this.refresh(0)
		}
	},
	async mounted() {
		// 把选择公众号的东西放到搜索区
		document.querySelector('.accountLabel .search-box').insertBefore(this.$refs.accountOption.$el, document.querySelector('.accountLabel .el-form-item'))
		let res = await this.$fetch(
			"get_official_accounts_list",
		);
		this.officialAccounts = res.data
		this.account = this.officialAccounts[0]
		this.onSearch()
		// 因为元素层级的原因，要把这个dialog放到body下才能正常显示在遮罩层上面
		this.dialogId = `accountLabel-dialog-${Date.now()}`
		document.querySelector('.accountLabel .dialog-wrapper').id = this.dialogId
		document.body.append(document.querySelector('.accountLabel .dialog-wrapper'))
	},
	beforeDestroy() {
		// 既然要离开页面了，就把这个dialog标签删掉，做好文档流管理
		document.body.removeChild(document.body.querySelector(`#${this.dialogId}`))
	}
}
</script>

<style lang='scss' scoped>
.accountLabel {
	.select-accoumt {
		display: flex;
		align-items: center;
		background-color: #fff;
		border-radius: 4px;
		height: 32px;
		padding: 0 10px;
		border: 1px solid #dcdfe6;
		margin-top: 4px;
		margin-right: 10px;
		min-width: 200px;
		.logo {
			height: 20px;
			width: 20px;
			margin-right: 10px;
			object-fit: contain;
		}
		.el-icon-arrow-down{
			margin-left: auto;
		}
	}
}
.label-form {
	.btns {
		text-align: center;
	}
}
.account-option {
	display: flex;
	align-items: center;
	cursor: pointer;
	padding: 4px 4px;
	min-width: 200px;
	&:hover {
		background-color: #f5f7fa;
	}
	.logo {
		width: 40px;
		height: 40px;
		object-fit: contain;
		margin-right: 10px;
	}
}
</style>