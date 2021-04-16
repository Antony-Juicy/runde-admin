<template>
	<div class='formwork-container'>
		<!-- 搜索栏 -->
		<search-form v-if="formOptions.length > 0" ref="searchForm" :formOptions="formOptions" :showNum="5" @onSearch="onSearch"></search-form>
		<!-- 表格主体 -->
		<div class="w-container">
			<rd-table :tableData="tableData" :tableKey="tableKey" :pageConfig.sync="pageConfig" @pageChange="pageChange">
				<template slot="edit" slot-scope="scope">
					<el-button @click="handleEdit(scope.row)" type="text" size="small">查阅/编辑</el-button>
				</template>
			</rd-table>

			<likePhone mode='text' :cardData="'通知内容通知内容通知内容通知内容通知内容通知内容通知内容'" accountName="公众号"></likePhone>
			<likePhone mode='imageText' :cardData='{title:" 标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题", description:"描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述", imgUrl:"https://tse3-mm.cn.bing.net/th/id/OIP.rZ6TpMQXVTQEmZwN1bVrLAHaHa?w=201&h=202&c=7&o=5&pid=1.7"}' accountName="公众号"></likePhone>
			<likePhone mode='image' :cardData="'https://tse3-mm.cn.bing.net/th/id/OIP.dyIhFIkD3ySYebAl0JjmSAHaLH?w=200&h=300&c=7&o=5&pid=1.7'" accountName="公众号"></likePhone>
			<likePhone mode='miniprogram' :cardData="{appLogo:'https://tse4-mm.cn.bing.net/th/id/OIP.48wQvO6GdrazorQd3tOZGwHaHa?w=197&h=198&c=7&o=5&pid=1.7',appName:'小程序名称小程序名称小程序名称小程序名称小程序名称',title:'小程序名称小程序名称小程序名称小程序名称小程序名称',imgUrl:'https://tse4-mm.cn.bing.net/th/id/OIP.YHIHn0znRU-OfddNxIpYogHaHa?w=200&h=200&c=7&o=5&pid=1.7'}" accountName="公众号"></likePhone>
		</div>

		<rd-dialog :title="'模板通知'" :dialogVisible="templateVisible" :showFooter="false" :width="'1200px'" @handleClose="templateVisible = false">
			<addEditFormwrok :formwork="formwork" v-if="templateVisible" :appName="official_accounts[searchForm.officialAccounts].appName"
				:appId="official_accounts[searchForm.officialAccounts].appId" :appSecret="official_accounts[searchForm.officialAccounts].appSecret" @refresh="getTableData"
				@close="templateVisible = false"></addEditFormwrok>
		</rd-dialog>
	</div>
</template>

<script>
import addEditFormwrok from './addEditFormwrok'
import likePhone from '@/components/likePhone'
export default {
	name: "formwork",
	components: { addEditFormwrok, likePhone },
	data() {
		return {
			formOptions: [
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
			templateVisible: false,
			pageConfig: {
				totalCount: 0,
				pageNum: 1,
				pageSize: 25,
			},
			searchForm: {}, //搜索栏信息,
			book: {},
			markScroll: 0,
			formwork: {},
			official_accounts: []
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
			searchForm.appId = this.official_accounts[this.searchForm.officialAccounts].appId
			searchForm.app_Secret = this.official_accounts[this.searchForm.officialAccounts].appSecret
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
		handleEdit(data) {
			this.formwork = data
			this.$nextTick(() => {
				this.templateVisible = true
			})

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
			unClearable: true,
			options: res.data.map((v, i) => {
				return {
					label: v.appName,
					value: i
				}
			}),
			// 需要指定一个公众号，默认就选第一个
			initValue: 0
		}
		this.formOptions.unshift(official_accounts);
		this.official_accounts = res.data
		this.$nextTick(() => {
			this.$refs.searchForm.addInitValue()
			// 这里是通过模拟search方法，是的searchFrom里面有值
			this.onSearch({ officialAccounts: 0 })
		})

	}
}
</script>

<style lang='scss' scoped>
.formwork-container {
	/deep/ {
		.el-input__icon {
			line-height: unset;
		}
	}
}
</style>