<template>
	<div class="url">
		<div class="origin-tips">订阅者点击该子菜单会跳到以下链接</div>
		<div class="form-line">
			<div class="label">页面地址</div>
			<el-input v-model="url" placeholder="请输入https:// 或 http:// 开头的链接"></el-input>
		</div>
		<div class="title" v-if="title">可以识别出标题</div>
		<el-button  size="small">从公众号图文消息中选择</el-button>
	</div>
</template>

<script>
export default {
	data() {
		return {
			url: '',
			title: ''
		}
	}
}
</script>

<style lang="scss" scoped>
.url {
	padding: 20px;
}
.origin-tips {
	color: #ffaf53;
	font-size: 12px;
	padding-bottom: 20px;
}
.title {
	margin-bottom: 20px;
	color: #999;
	font-size: 14px;
}
</style>