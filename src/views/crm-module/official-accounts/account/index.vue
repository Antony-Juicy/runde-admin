<template>
	<!-- 公众号管理 5月1日 前上线  -->
	<div class="account-container">
		<!-- 搜索栏 -->
		<search-form ref="searchForm" :formOptions="formOptions" :showNum="5" @onSearch="onSearch"></search-form>
		<div class="w-container">
			<div class="btn-wrapper">
				<el-button type="primary" size="small" @click="handleAdd">新增公众号</el-button>
			</div>
			<!-- 表格主体 -->
			<rd-table :tableData="tableData" :tableKey="tableKey" :pageConfig.sync="pageConfig" @pageChange="pageChange">
				<template slot="appImg" slot-scope="scope">
					<el-image style="width: 100px; height: 100px" :src="scope.row.appImg" fit="contain"></el-image>
				</template>
				<template slot="edit" slot-scope="scope">
					<el-button @click="handleEdit(scope.row)" type="text" size="small">查阅/编辑</el-button>
					<el-button @click="handleLabel(scope.row)" type="text" style="color: #67c23a" size="small">查看标签</el-button>
					<!-- <el-button @click="handleDelete(scope.row)" type="text" style="color: #ec5b56" size="small">删除</el-button> -->

				</template>

			</rd-table>
		</div>

		<!-- 编辑公众号 -->
		<rd-dialog :title="AddEditTitle" :dialogVisible="addEditVisible" :showFooter="false" :width="'600px'" @handleClose="addEditVisible = false">
			<addEditAccount ref="addEditAccount" v-if="addEditVisible" @refresh="refresh" @close="addEditVisible=false"></addEditAccount>
		</rd-dialog>
		<!-- 编辑标签 -->
		<fullDialog class="accountLabel" :title="'公众号标签'" v-model="labelVisible" @change="labelVisible = false">
			<accountLabel ref="accountLabel" :appId="appId" v-if="labelVisible" @refresh="refresh"></accountLabel>
		</fullDialog>
	</div>
</template>

<script>
import addEditAccount from './addEditAccount'
import fullDialog from "@/components/FullDialog";
import accountLabel from './accountLabel'
export default {
	name: "account",
	components: { addEditAccount, fullDialog, accountLabel },
	data() {
		return {
			formOptions: [
				{
					prop: "appName",
					element: "el-input",
					placeholder: "请输入公众号名称",
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
					name: "公众号名称",
					value: "appName",
				},
				{
					name: "appId",
					value: "appId",
				},
				{
					name: "公众号图标",
					value: "appImg",
					operate: true,
					width: 120,
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
			addEditVisible: false,
			AddEditTitle: "新增公众号",
			labelVisible: false,
			appId: "", // 编辑标签专用属性
		}
	},
	methods: {
		onSearch(data) {
			this.searchForm = { ...data };
			this.pageConfig.pageNum = 1;
			this.getTableData();
		},
		refresh(val) {
			this.getTableData({
				pageNum: val || this.pageConfig.pageNum
			});
		},
		pageChange(val) {
			this.pageConfig.pageNum = val.page;
			this.pageConfig.pageSize = val.limit;
			this.getTableData();
		},
		async getTableData(params = {}) {
			let searchForm = JSON.parse(JSON.stringify(this.searchForm))
			let res = await this.$fetch(
				"get_official_accounts_page",
				{
					loginUserId: this.$common.getUserId(),
					...this.pageConfig,
					...searchForm,
					...params,
				}
			);
			this.tableData = res.data.records.map((item) => {
				return item;
			});
			this.pageConfig.totalCount = res.data.totalCount;
		},
		handleAdd() {
			this.AddEditTitle = '新增公众号'
			this.addEditVisible = true
			this.$nextTick(() => {
				this.$refs.addEditAccount.initGetConfig = true
			})
		},
		handleEdit(data) {
			this.AddEditTitle = '编辑公众号'
			this.addEditVisible = true
			this.$nextTick(() => {
				this.$refs.addEditAccount.initGetConfig = true
				this.$refs.addEditAccount.initFormData(data)
			})
		},
		handleDelete(data) {
			let info = "公众号"
			this.$confirm(`此操作将删除此${info}, 是否继续?`, "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			}).then(async () => {
				await this.$fetch("delete_official_account", {
					wechatNameId: data.id,
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
		},
		handleLabel(data) {
			this.labelVisible = true
			this.appId = data.appId

		}
	},
	mounted() {
		this.onSearch()
	}


}
</script>

<style lang='scss' scoped>
.account-container {
	/deep/ {
		.accountLabel .full-dialog-container {
			overflow: initial;
		}
		.accountLabel .full-dialog-container .content {
			background: #f0f2f5;
		}
	}
}
</style>