<template>
	<div class='formwork-container'>
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
			<rd-table :tableData="tableData" :tableKey="tableKey" :pageConfig.sync="pageConfig" @pageChange="pageChange">
				<template slot="edit" slot-scope="scope">
					<el-button @click="handleEdit(scope.row)" type="text" size="small">查阅/编辑</el-button>
				</template>
			</rd-table>
		</div>

		<rd-dialog :title="'模板通知'" :dialogVisible="templateVisible" :showFooter="false" :width="'1200px'" @handleClose="templateVisible = false">
			<addEditFormwrok :formwork="formwork" v-if="templateVisible" :appName="account.appName" :appId="account.appId" :appSecret="account.appSecret" @refresh="getTableData"
				@close="templateVisible = false"></addEditFormwrok>
		</rd-dialog>
	</div>
</template>

<script>
import addEditFormwrok from './addEditFormwrok'
export default {
	name: "formwork",
	components: { addEditFormwrok },
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
			officialAccounts: [],
			account: {}
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
		refresh(val) {
			this.getTableData({
				pageNum: val || this.pageConfig.pageNum
			});
		},
		async getTableData(params = {}) {
			let searchForm = JSON.parse(JSON.stringify(this.searchForm))
			let res = await this.$fetch(
				"get_official_accounts_formwrok_list",
				{
					loginUserId: this.$common.getUserId(),
					...this.pageConfig,
					...searchForm,
					...params,
					appId: this.account.appId,
					appSecret: this.account.appSecret
				}
			);
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

		},
		handle_select_account(data) {
			this.account = data
		}
	},
	async mounted() {
		let res = await this.$fetch(
			"get_official_accounts_list",
		);
		this.officialAccounts = res.data
		this.account = this.officialAccounts[0]
		this.$nextTick(() => {
			// 把选择公众号的东西放到搜索区
			document.querySelector('.formwork-container .search-box').insertBefore(this.$refs.accountOption.$el, document.querySelector('.formwork-container .el-form-item'))
		})
		// 这里是通过模拟search方法，是的searchFrom里面有值
		this.onSearch()

	}
}
</script>

<style lang='scss' scoped>
.formwork-container {
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
		.logo {
			height: 20px;
			width: 20px;
			margin-right: 10px;
			object-fit: contain;
		}
	}
}
.account-option {
	display: flex;
	align-items: center;
	cursor: pointer;
	padding: 4px 4px;
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
.formwork-container {
	/deep/ {
		.el-input__icon {
			line-height: unset;
		}
	}
}
</style>