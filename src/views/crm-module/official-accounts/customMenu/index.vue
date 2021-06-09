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
				<!-- <div></div> -->
				<div v-if="sortStatus" class="sort-tips">
					请在右侧预览区拖动菜单以调整顺序
				</div>
				<div v-else>
					<addEditForm :menuConfig="menuConfig" :choseMenuStatus="choseMenuStatus" :account="account" mode="" ref="editForm"></addEditForm>
				</div>
			</div>
			<div class="right">
				<likePhone mode='menu' ref="likePhone" :cardData="menuConfig" :accountName="account.appName"></likePhone>
				<div class="btns">
					<el-button class="sort-change" size="small" @click="handle_changeSortStatus">{{ sortStatus?'完成' : '菜单排序'}} </el-button>
					<el-button class="preview" size="small" v-if="!sortStatus">菜单预览</el-button>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
import likePhone from '@/components/likePhone'
import addEditForm from './addEditForm'
export default {
	name: "customMenu",
	components: { likePhone, addEditForm },
	data() {
		return {
			officialAccounts: [],
			account: {},
			menuConfig: [
				{
					"name": "菜单1",
					"sub_button": [
						{
							"type": "view",
							"name": "搜索1",
							"url": "http://www.soso.com/",
							"sub_button": []
						},
						{
							"type": "miniprogram",
							"name": "小程序",
							"url": "http://mp.weixin.qq.com",
							"appid": "wx95dd488825b3da3d",
							"pagepath": "pages/Book/Book?id2=10&id1=20"
						},
					]
				},
				{
					"name": "菜单2",
					"sub_button": [
						{
							"type": "view",
							"name": "搜索3",
							"url": "http://www.soso.com/",
							"sub_button": []
						},
					]
				},
			],
			sortStatus: false,
			choseMenuStatus: [0, -1],
		}

	},
	provide: function () {
		return {
			changeMenu: this.handle_changeMenu,
			choseMenu: this.handle_choseMenu,
			sortStatus: () => {
				return this.sortStatus
			},
			choseMenuStatus: () => {
				return this.choseMenuStatus
			},
			account: () => {
				return this.account
			}
		}
	},
	methods: {
		handle_select_account(data) {
			this.account = data
		},
		handle_changeMenu(data) {
			this.menuConfig = []
			this.$nextTick(() => {
				this.menuConfig = JSON.parse(JSON.stringify(data))
				this.choseMenuStatus = [0, -1]
			})
		},
		handle_changeSortStatus() {
			if (!this.sortStatus) {
				this.$confirm('更改菜单排序会放弃当前更改内容', '确认信息', {
					distinguishCancelAndClose: true,
					confirmButtonText: '排序',
					cancelButtonText: '取消'
				}).then(() => {
					this.sortStatus = !this.sortStatus
				}).catch(action => {

				});
			}
			else {
				this.sortStatus = !this.sortStatus
			}

		},
		handle_choseMenu(data) {
			if (JSON.stringify(data) != JSON.stringify(this.choseMenuStatus)) {
				this.$confirm('切换菜单会放弃当前更改内容', '确认信息', {
					distinguishCancelAndClose: true,
					confirmButtonText: '切换',
					cancelButtonText: '取消'
				}).then(() => {
					this.choseMenuStatus = data
				}).catch(action => {

				});
			}
		},
		
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
		min-height: calc(100vh - 200px);
		background: #fff;
		margin-top: 20px;
		overflow: hidden;
		display: flex;
		.left {
			width: 100%;
			height: 100%;
		}
		.right {
			flex-shrink: 0;
			margin: 20px 100px;
			.btns {
				margin: 20px auto 0 auto;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
	.sort-change {
		display: block;
	}
	.sort-tips {
		margin-top: 200px;
		height: 100%;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #999;
		font-size: 14px;
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