<template>
	<div class="addEditAccount">
		<RdForm :formOptions="addFormOptions" :rules="addRules" :formLabelWidth="'150px'" ref="dataForm">
			<template slot="appImg">
				<Upload-oss v-if="uploadOssElem" :objConfig="{ dir: 'web/runde_admin', project: 'icon_' }" :src.sync="appImg" :initGetConfig="initGetConfig" @srcChangeFun="
						(data) => {
							appImg = data
							reloadElem('uploadOssElem')
						}
					" />
			</template>
		</RdForm>
		<div class="btns">
			<el-button @click="handle_close">取消</el-button>
			<el-button v-if="mode=='add'" @click="handle_add" type="primary">保存</el-button>
			<el-button v-if="mode=='save'" @click="handle_save" type="primary">保存</el-button>
		</div>

	</div>
</template>

<script>
import RdForm from "@/components/RdForm";
import UploadOss from '@/components/UploadOss'

export default {
	components: { RdForm, UploadOss },
	data() {
		return {
			addFormOptions: [
				{
					prop: "appId",
					element: "el-input",
					placeholder: "",
					label: "appId",
				},
				{
					prop: "appSecret",
					element: "el-input",
					placeholder: "",
					label: "appSecret",
				},
				{
					prop: "appSecret",
					element: "el-input",
					placeholder: "",
					label: "appSecret",
				},
				{
					prop: "token",
					element: "el-input",
					placeholder: "",
					label: "TOKEN",
				},
				{
					prop: "aesKey",
					element: "el-input",
					placeholder: "",
					label: "AESKey",
				},
				{
					prop: "appImg",
					element: "el-input",
					placeholder: "",
					label: "公众号头像",
					operate: true,
					initValue: 0,
				},
			],
			addRules: {
				appId: [{ required: true, message: '请输入公众号appId', trigger: 'blur' },],
				appSecret: [{ required: true, message: '请输入公众号appSecret', trigger: 'blur' },],
				appName: [{ required: true, message: '请输入公众号名称', trigger: 'blur' },],
				appImg: [{ required: true, message: '', trigger: 'blur' },],
				aesKey: [{ required: true, message: '请输入公众号AESKey', trigger: 'blur' },],
				token: [{ required: true, message: '请输入公众号TOKEN', trigger: 'blur' },],
			},
			uploadOssElem: true,
			appImg: "",
			initGetConfig: false,
			mode: 'add',
			accountId: ""
		}
	},
	methods: {
		handle_close() {
			this.$emit('close')
		},
		handle_add() {
			this.$refs.dataForm.validate((val, data) => {
				if (val) {
					if (this.appImg == '') {
						this.$message.error("请上传公众号头像");
						return;
					}
					data.appImg = this.appImg
					this.$fetch('add_official_account', {
						...data,
						loginUserId: this.$common.getUserId(),
					}).then((res) => {
						if (res.code == 200) {
							this.btnLoading = false
							this.$message.success('创建成功')
							this.$emit('close')
							this.$emit('refresh')
						}
					})
						.catch((err) => {
							console.log(err)
							this.btnLoading = false
						})
				}
			})
		},
		handle_save() {
			this.$refs.dataForm.validate((val, data) => {
				if (val) {
					if (this.appImg == '') {
						this.$message.error("请上传公众号头像");
						return;
					}
					data.appImg = this.appImg
					this.$fetch('update_official_account', {
						...data,
						id: this.accountId,
						loginUserId: this.$common.getUserId(),
					}).then((res) => {
						if (res.code == 200) {
							this.btnLoading = false
							this.$message.success('保存成功')
							this.$emit('close')
							this.$emit('refresh')
						}
					})
						.catch((err) => {
							console.log(err)
							this.btnLoading = false
						})
				}
			})
		},
		initFormData(account) {
			this.mode = 'save'
			this.addFormOptions = this.addFormOptions.map(v => {
				v.initValue = account[v.prop]
				return v
			})
			this.addFormOptions[3].initValue = 0
			this.appImg = account.appImg
			this.accountId = account.id
			this.$refs.dataForm.addInitValue()
		},
	},
	mounted() {

	}
}
</script>

<style lang='scss' scoped>
.addEditAccount {
	.btns {
		text-align: center;
	}
}
</style>