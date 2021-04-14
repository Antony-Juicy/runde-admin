<template>
	<div class='book-container'>
		<!-- 搜索栏 -->
		<search-form ref="searchForm" :formOptions="formOptions" :showNum="5" @onSearch="onSearch"></search-form>
		<!-- 表格主体 -->
		<rd-table :tableData="tableData" :tableKey="tableKey" :pageConfig.sync="pageConfig" @pageChange="pageChange">
			<template slot="edit" slot-scope="scope">
				<el-button @click="handleEdit(scope.row)" type="text" size="small">查阅/编辑</el-button>
			</template>
		</rd-table>

		<rd-dialog :title="'模板通知'" :dialogVisible="templateVisible" :showFooter="false" :width="'1200px'" @handleClose="templateVisible = false">
			<addEditFormwrok></addEditFormwrok>
		</rd-dialog>
	</div>
</template>

<script>
import addEditFormwrok from './addEditFormwrok'
export default {
	name: "formwork",
	components: {addEditFormwrok},
	data() {
		return {
			formOptions: [
				{}
			],
			tableData: [],
			tableKey: [
				{
					name: "模板ID",
					value: "template_id",
				},
				{
					name: "模板名称",
					value: "title",
				},
				{
					name: "一级行业",
					value: "primary_industry",
				},
				{
					name: "二级行业",
					value: "deputy_industry",
				},
				{
					name: "操作",
					value: "edit",
					operate: true,
					width: 200,
				},
			],
			templateVisible: true,
			pageConfig: {
				totalCount: 0,
				pageNum: 1,
				pageSize: 25,
			},
			searchForm: {}, //搜索栏信息,
			book: {},
			markScroll: 0,


		}
	},
	methods: {
		onSearch(data) {
			this.searchForm = { ...data };
			this.pageConfig.pageNum = 1;
			this.getTableData();
		},

		async getTableData(params = {}) {
			let searchForm = JSON.parse(JSON.stringify(this.searchForm))
			searchForm.appId = JSON.parse(searchForm.officialAccounts).appId
			searchForm.app_Secret = JSON.parse(searchForm.officialAccounts).appSecret
			let res = await this.$fetch(
				"get_official_accounts_formwrok_list",
				{
					loginUserId: this.$common.getUserId(),
					...this.pageConfig,
					...searchForm,
					...params,
				}
			);
			// console.log(res)
			this.tableData = res.data.template_list
		},
		handleAdd() {

		},
		handleEdit() {

		},
		pageChange() {

		}
	},
	async mounted() {
		let res = await this.$fetch(
			"get_official_accounts_list",
		);
		let official_accounts = {
			prop: "officialAccounts",
			element: "el-select",
			placeholder: "选择公众号",
			options: res.data.map(v => {
				return {
					label: v.appName,
					value: JSON.stringify(v)
				}
			}),
			// 需要指定一个公众号，默认就选第一个
			initValue: JSON.stringify(res.data[0])
		}
		this.formOptions.unshift(official_accounts);
		this.$refs.searchForm.addInitValue()
		// 这里是通过模拟search方法，是的searchFrom里面有值
		this.onSearch({ officialAccounts: JSON.stringify(res.data[0]) })
	}
}
</script>

<style lang='scss' scoped>
.book-container {
	/deep/ {
		.el-input__icon {
			line-height: unset;
		}
	}
}
</style>