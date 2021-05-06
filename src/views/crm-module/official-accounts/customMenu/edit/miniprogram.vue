<template>
	<div class="miniprogram">
		<div class="origin-tips">订阅者点击该子菜单会跳到以下小程序</div>
		<div class="form-line">
			<div class="label">选择小程序</div>
			<el-select v-model="miniprogramIndex" @change="handle_changeAPP">
				<el-option v-for="(item,index) in miniprogramConfig" :key="index" :label="item.appName" :value="index"></el-option>
			</el-select>
		</div>
		<div class="form-line" v-if="msgForm.appId">
			<div class="label">选择页面</div>
			<el-select v-model="msgForm.pagepath">
				<el-option v-for="(item,index) in miniprogramConfig[miniprogramIndex].pages" :key="index" :label="item.label" :value="item.value"></el-option>
			</el-select>
		</div>
		<div class="form-line">
			<div class="label">备用链接</div>
			<el-input v-model="url" placeholder="请输入https:// 或 http:// 开头的链接"></el-input>
		</div>
	</div>
</template>

<script>
import miniprogramConfig from '../../miniprogram'
export default {
	data() {
		return {
			miniprogramConfig,
			msgForm: {
				appId: "",
				pagepath: "",
			},
			miniprogramIndex: ''
		}
	},
	methods: {
		handle_changeAPP() {
			this.msgForm.pagepath = ''
			this.msgForm.appId = this.miniprogramConfig[this.miniprogramIndex].appId
		}
	}
}
</script>

<style lang="scss" scoped>
.miniprogram {
	padding: 20px;
	width: 700px;
}
.origin-tips {
	color: #ffaf53;
	font-size: 12px;
	padding-bottom: 20px;
}
</style>