<template>
	<div class="customMenu-container">
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
			<div class="left">
				<div></div>
			</div>
			<div class="right">
				<likePhone mode='menu' :cardData="menuConfig" :accountName="account.appName" @changeMenu='handle_changeMenu'></likePhone>
			</div>
		</div>
	</div>
</template>

<script>
import likePhone from '@/components/likePhone'
export default {
	name: "customMenu",
	components: { likePhone },
	data() {
		return {
			officialAccounts: [],
			account: {},
			menuConfig: [
				{name:'菜单1'},
				{name:'菜单2'},
				{name:'菜单3'}
			]
		}

	},

	methods: {
		handle_select_account(data) {
			this.account = data
		},
		handle_changeMenu(data){
			this.menuConfig = data
		}
	},
	async mounted() {
		let res = await this.$fetch(
			"get_official_accounts_list",
		);
		this.officialAccounts = res.data
		this.account = this.officialAccounts[0]
	}
}
</script>

<style lang="scss" >
.customMenu-container {
	.wrapper {
		height: calc(100vh - 200px);
		background: #fff;
		margin-top: 20px;
		overflow: hidden;
		display: flex;
		.left {
			width: 100%;
		}
		.right {
			flex-shrink: 0;
			margin: 20px 20px;
		}
	}
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