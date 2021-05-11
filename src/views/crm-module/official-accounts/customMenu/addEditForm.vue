<template>
	<div class="addEditForm">
		<div class="head-line">
			<div class="title">{{isNew ? '新增菜单' : formData.name}}</div>
			<el-button class="delete" size="small" v-if="!isNew && hasChild" @click="handle_delete">删除菜单</el-button>
		</div>
		<div class="head-line-tips" v-if="hasChild">已添加子菜单，仅可设置菜单名称。</div>
		<div class="form">
			<div class="form-line" style="align-items:flex-start">
				<div class="label" style="margin-top:10px">菜单名称：</div>
				<div class="content">
					<el-input placeholder="请输入菜单名称" v-model="formData.name" maxlength="7" show-word-limit></el-input>
					<div class="form-tips">仅支持中英文和数字，字数不超过4个汉字或8个字母</div>
				</div>
			</div>
			<template v-if="!hasChild">
				<div class="form-line">
					<div class="label">菜单内容：</div>
					<div class="content">
						<el-radio v-model="type" label="msg">发送消息</el-radio>
						<el-radio v-model="type" label="h5">跳转网页</el-radio>
						<el-radio v-model="type" label="miniprogram">跳转小程序</el-radio>
					</div>
				</div>
				<div class="edit">
					<msg v-if="type == 'msg'" :account="account" :formData="formData"></msg>
					<url v-if="type == 'h5'" :account="account" :formData="formData"></url>
					<miniprogram v-if="type == 'miniprogram'" :formData="formData"></miniprogram>
				</div>
			</template>

		</div>
		<el-button style="margin:auto;display:block;margin-top:20px" type="primary" @click="handle_save">保存</el-button>
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
			type: 'msg',
			hasChild: false,
			isNew: false,
			formData: {
				name: "",
				url: "",
				type: ""
			}
		}
	},
	watch: {
		choseMenuStatus: function (n, o) {
			this.initFormA()
		}
	},
	computed: {},
	methods: {
		// 关注菜单状态
		initFormA() {
			this.isNew = false
			if (this.choseMenuStatus[1] == -1) {
				if (this.choseMenuStatus[0] == -2) {
					// 选择了新增底部菜单
					this.hasChild = false
					this.isNew = true
					this.formData = {
						name: ""
					}
					this.type = 'msg'
				} else {
					// 选择了底部菜单
					if (this.menuConfig[this.choseMenuStatus[0]].sub_button.length == 0) {
						// 当前没有子菜单 可以选择功能
						this.hasChild = false
					} else {
						// 当前有子菜单 只能修改名字
						this.hasChild = true
					}
					this.initFormB(this.menuConfig[this.choseMenuStatus[0]])
				}
			}
			else {
				this.hasChild = false
				if (this.choseMenuStatus[1] == -2) {
					// 选择了新增子菜单
					this.isNew = true
					this.formData = {
						name: ""
					}
					this.type = 'msg'
				} else {
					// 选择了子菜单
					this.initFormB(this.menuConfig[this.choseMenuStatus[0]].sub_button[this.choseMenuStatus[1]])
				}
			}
		},
		// 关注菜单表单内数据
		initFormB(data) {
			this.formData = {
				name: data.name,
				type: data.type,
				url: data.url
			}
			this.type = this.transType(data.type)
			if (this.type == 'miniprogram') {
				this.formData.appid = data.appid
				this.formData.pagepath = data.pagepath
			}
		},
		transType(type) {
			let t = ''
			switch (type) {
				case 'media_id': t = 'msg'; break; // 这个是图片、视频、音频
				case 'view': t = 'h5'; break; // 这个是链接
				case 'view_limited': t = 'msg'; break; // 这个是图文信息
				case 'miniprogram': t = 'miniprogram'; break;// 这个是小程序
			}
			return t
		},
		handle_save(){
			console.log("保存菜单")
		},
		handle_delete(){
			console.log("删除菜单")
		}
	},
	mounted() {
		this.initFormA()
	}
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
			.el-input,.el-select,.el-textarea {
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