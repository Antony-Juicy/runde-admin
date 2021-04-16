<template>
	<div class="accountLabel">
		<!-- 搜索栏 -->
		<search-form ref="searchForm" :formOptions="formOptions" :showNum="5" @onSearch="onSearch"></search-form>
		<!-- 表格主体 -->
		<rd-table :tableData="tableData" :tableKey="tableKey" :pageConfig.sync="pageConfig" @pageChange="pageChange">
			<template slot="edit" slot-scope="scope">
				<el-button @click="handleEdit(scope.row)" type="text" size="small">查阅/编辑</el-button>
				<el-button @click="handleDelete(scope.row)" type="text" style="color: #ec5b56" size="small">删除</el-button>
			</template>
		</rd-table>
		<!-- 标签编辑 -->
		<rd-dialog :title="AddEditTitle" :dialogVisible="addEditVisible" :showFooter="false" :width="'600px'" @handleClose="addEditVisible = false">
			<addEditAccount ref="addEditAccount" v-if="addEditVisible" @refresh="getTableData" @close="addEditVisible=false"></addEditAccount>
		</rd-dialog>
	</div>
</template>

<script>
export default {
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
		}
	},
	methods: {
		onSearch(data) {
			this.searchForm = { ...data };
			this.pageConfig.pageNum = 1;
			this.getTableData();
		},
		pageChange(val) {
			this.pageConfig.pageNum = val.page;
			this.pageConfig.pageSize = val.limit;
			this.getTableData();
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
					appId: this.appId
				}
			);
			this.tableData = res.data.records.map((item) => {
                item.labelTypeZH = item.labelType == '0' ? '系统标签' : '自定义标签'
				return item;
			});
			this.pageConfig.totalCount = res.data.totalCount;
		},
		handleEdit() {

		},
		handleDelete() {

		}
	},
	mounted() {
		this.onSearch()
	}
}
</script>

<style lang="scss" scoped>
.accountLabel {
}
</style>