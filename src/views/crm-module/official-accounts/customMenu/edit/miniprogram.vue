<template>
	<div class="miniprogram">
		<div class="origin-tips">订阅者点击该子菜单会跳到以下小程序</div>
		<div class="form-line">
			<div class="label">选择小程序：</div>
			<el-select v-model="miniprogramIndex" @change="handle_changeAPP">
				<el-option v-for="(item,index) in miniprogramConfig" :key="index" :label="item.appName" :value="index"></el-option>
			</el-select>
		</div>
		<div class="form-line" v-if="msgForm.appId">
			<div class="label">小程序路径：</div>
			<el-select v-model="miniprogramPageIndex" @change="handle_changePath">
				<el-option v-for="(item,index) in miniprogramConfig[miniprogramIndex].pages" :key="index" :label="item.label" :value="index">
				</el-option>
			</el-select>
		</div>
		<template v-if="msgForm.paramsKey.length > 0">
			<div class="form-line" v-for="(item,index) in msgForm.paramsKey" :key="index">
				<div class="label">{{item.label}}：</div>
				<el-input v-model="msgForm.params[index]"></el-input>
			</div>
		</template>
		<div class="form-line">
			<div class="label">备用链接：</div>
			<el-input v-model="msgForm.remark" placeholder="请输入https:// 或 http:// 开头的链接"></el-input>
		</div>
	</div>
</template>

<script>
import miniprogramConfig from '../../miniprogram'
export default {
	props: {
		formData: {
			type: Object,
			require: true,
		}
	},
	data() {
		return {
			miniprogramConfig,
			msgForm: {
				appId: "",
				pagepath: "",
				remark: "",
				paramsKey: [],
				params: []
			},
			miniprogramIndex: '',
			miniprogramPageIndex: '',
		}
	},
	methods: {
		handle_changeAPP() {
			this.msgForm.pagepath = ''
			this.msgForm.appId = this.miniprogramConfig[this.miniprogramIndex].appId
			this.msgForm.paramsKey = []
			this.msgForm.params = []
			this.miniprogramPageIndex = ''
		},
		handle_changePath(index) {
			this.msgForm.pagepath = this.miniprogramConfig[this.miniprogramIndex].pages[index].value
			this.msgForm.paramsKey = this.miniprogramConfig[this.miniprogramIndex].pages[index].params || []
			this.msgForm.params = this.msgForm.paramsKey.map(() => '')
		},
	},
	mounted() {

		this.miniprogramIndex = this.miniprogramConfig.findIndex(v => v.appId == this.formData.appid) > -1 ? this.miniprogramConfig.findIndex(v => v.appId == this.formData.appid) : ''
		if (this.miniprogramIndex != '') {
			// 菜单是跳小程序的
			this.miniprogramPageIndex = this.miniprogramConfig[this.miniprogramIndex].pages.findIndex(v => v.value == this.formData.pagepath.split('?')[0])
			// 表单初始化
			this.msgForm.pagepath = this.miniprogramConfig[this.miniprogramIndex].pages[this.miniprogramPageIndex].value
			this.msgForm.paramsKey = this.miniprogramConfig[this.miniprogramIndex].pages[this.miniprogramPageIndex].params || []
			this.msgForm.appId = this.formData.appid
			this.msgForm.remark = this.formData.url
			if (this.msgForm.paramsKey.length > 0) {
				// 表示带了参数
				let params = this.formData.pagepath.split('?')[1].split('&').map(v => v.split('='))
				// 提取对应的参数
				this.msgForm.paramsKey.forEach((v, i) => {
					this.msgForm.params[i] = params.find(v2 => v2[0] == v.key)[1]
				})
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.miniprogram {
	padding: 20px;
}
.origin-tips {
	color: #ffaf53;
	font-size: 12px;
	padding-bottom: 20px;
}
</style>