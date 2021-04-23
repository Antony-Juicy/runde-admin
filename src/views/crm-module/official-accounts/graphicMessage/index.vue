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
			<!-- 组件 -->
			<editMessage @msgForm="handle_msgForm" :showName="true" :account="account" v-if="addEditVisible"></editMessage>
			<div class="form-line">
				<div class="label"></div>
			</div>
			<!-- 推送给谁 -->
			<!-- <div class="form-line">
				<div class="label">推送给谁：</div>
				<div class="labelIds">
					<div class="origin-tips">选择标签后，消息将只推送给选中标签组的粉丝</div>
					<el-tag style="margin-right:10px" v-for="(item,index) in fansLabels" :key="index" @close="handle_removeLabel(index)" disable-transitions closable>
						{{item.name}}
					</el-tag>
					<SelectPop style="width:auto;display:inline-block" key="SelectPop1" v-bind="SelectPopOptions_label" @select="handle_selectLabel">
						<el-button size="small">添加标签</el-button>
					</SelectPop>
				</div>
			</div> -->

		</rd-dialog>
	</div>
</template>

<script>
import editMessage from '../editMessage'
export default {
	name: "graphicMessage",
	components: { editMessage },
	data() {
		return {
			officialAccounts: [],
			account: {},
			AddEditTitle: "创建客服消息",
			addEditVisible: true,
			SelectPopOptions_label:{},
			fansLabels:[]
		}
	},
	methods: {
		handle_select_account(data) {
			this.account = data
		},
		handle_create() {
			this.addEditVisible = true
		},
		handle_msgForm(data) {
			// 这里接收客服消息编辑区的表单信息
			console.log(data)
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
		.logo {
			height: 20px;
			width: 20px;
			margin-right: 10px;
			object-fit: contain;
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
.form-line {
	display: flex;
	padding: 20px 30px;
	.labelIds {
		padding: 0px 10px;
	}
	.origin-tips {
		color: #ffaf53;
		font-size: 12px;
		padding-left: 4px;
		padding-bottom: 10px;
	}
}
</style>