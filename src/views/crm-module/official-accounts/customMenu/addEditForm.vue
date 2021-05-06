<template>
	<div class="addEditForm">
		<div class="head-line">
			<div class="title">标题</div>
			<el-button class="delete" size="small">删除子菜单</el-button>
		</div>
		<div class="head-line-tips">已添加子菜单，仅可设置菜单名称。</div>
		<div class="form">
			<div class="form-line">
				<div class="label" style="margin-top:10px">菜单名称：</div>
				<div class="content">
					<el-input placeholder="请输入菜单名称"></el-input>
					<div class="form-tips">仅支持中英文和数字，字数不超过4个汉字或8个字母</div>
				</div>
			</div>
			<div class="form-line">
				<div class="label">菜单内容：</div>
				<div class="content">
					<el-radio v-model="type" label="msg">发送消息</el-radio>
					<el-radio v-model="type" label="h5">跳转网页</el-radio>
					<el-radio v-model="type" label="miniprogram">跳转小程序</el-radio>
				</div>
			</div>
			<div class="edit">
				<msg :account="account" v-if="type == 'msg'"></msg>
				<url v-if="type == 'h5'"></url>
				<miniprogram v-if="type == 'miniprogram'"></miniprogram>
			</div>
		</div>
	</div>
</template>

<script>
import msg from './edit/msg'
import url from './edit/url'
import miniprogram from './edit/miniprogram'
export default {
	props: {
		menuConfig: {
			typeof: Object,
			require: true,
		},
		choseMenuStatus: {
			typeof: Array,
			require: true,
		},
		account: {
			typeof: Object,
			require: true,
		}
	},
	components: { msg, url, miniprogram },
	data() {
		return {
			type: 'msg'
		}
	},
	computed: {},
}
</script>

<style lang="scss" scoped>
.addEditForm {
	padding: 20px;
	box-sizing: border-box;
	/deep/ {
		.form-line {
			display: flex;
			align-items: center;
			padding-bottom: 30px;
			.label {
				width: 100px;
				// text-align: right;
				flex-shrink: 0;
				margin-right: 20px;
				// padding-top:8px;
			}
			.el-input {
				width: 400px;
			}
		}
	}
}
.head-line {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 0 10px 0;
	border-bottom: 1px solid #eee;
	.title {
		font-size: 18px;
		font-weight: bold;
	}
}
.head-line-tips {
	font-size: 14px;
	color: #999;
	padding: 10px 0;
}
.form {
	.form-line {
		display: flex;
		padding: 10px 0;
		.label {
			width: 100px;
			// margin-top: 10px;
			font-size: 14px;
			margin-right: 20px;
			text-align: right;
		}
	}
	.form-tips {
		font-size: 14px;
		color: #999;
		padding: 10px 0;
	}
}
.edit {
	margin-top: 10px;
	padding: 10px;
	box-sizing: border-box;
	border: 1px solid #eee;
}
</style>