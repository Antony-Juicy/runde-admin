<template>
	<div class="graphicMessage-container">
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
		<div class="wrapper">
			<el-button class="create" type="primary" @click="handle_create">创建客服推送</el-button>
		</div>
		<!-- 编辑公众号 -->
		<rd-dialog :title="AddEditTitle" :dialogVisible="addEditVisible" :showFooter="false" :width="'1200px'" @handleClose="addEditVisible = false">
			<addEditGraphicMessage v-if="addEditVisible" :account="account" @close="addEditVisible = false"></addEditGraphicMessage>
		</rd-dialog>
	</div>
</template>

<script>

import addEditGraphicMessage from './addEditGraphicMessage'
export default {
	name: "graphicMessage",
	components: { addEditGraphicMessage },
	data() {
		return {
			officialAccounts: [],
			account: {},
			AddEditTitle: "创建客服消息",
			addEditVisible: false,

		}
	},
	methods: {
		handle_select_account(data) {
			this.account = data
		},
		handle_create() {
			this.addEditVisible = true
		},

	},
	async mounted() {
		let res = await this.$fetch(
			"get_official_accounts_list",
		);
		this.officialAccounts = res.data
		this.account = this.officialAccounts[0]
		// this.SelectPopOptions_label.searchObj.params.appId = this.account.appId
		// this.SelectPopOptions_user.searchObj.params.appId = this.account.appId
	}
}
</script>

<style lang="scss" scoped>
.graphicMessage-container {
	.wrapper {
		height: 100%;
		width: 100%;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		height: 300px;
	}
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
		.el-icon-arrow-down {
			margin-left: auto;
		}
	}
	.create {
		margin-top: 10px;
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