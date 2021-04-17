<template>
	<div class="mpnews">
		<div class="form-line">
			<div class="label">图文消息：</div>
			<div>
				<el-button>添加图文链接</el-button>
				<el-button>从素材库导入</el-button>
				<span class="tips">（添加链接或素材库导入都将覆盖以下内容）</span>
			</div>
		</div>
		<div class="form-line" style="padding-bottom:0">
			<div class="label">图文标题：</div>
			<div class="likeInput" ref='likeInput' contenteditable="true" @input="handle_change" @focus="handle_focus" @blur="handle_blur">请输入</div>
		</div>

		<div class="form-line">
			<div class="label"></div>
			<div class="insert">
				<div style="margin-right:10px">点击插入</div>
				<el-button size="mini" plain @click="handle_insertUserName">用户昵称</el-button>
			</div>
		</div>
		<div class="form-line" style="padding-bottom:0">
			<div class="label">描述：</div>
			<el-input type="textarea" placeholder="请输入内容" :rows="2">
				
			</el-input>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			tilte: "",
			selection: {},
			range: {},
			lock: false,
			lastEditRange: false
		}
	},
	methods: {
		handle_insertUserName() {
		},
		handle_change(e) {
			this.tilte = this.$refs.likeInput.innerHTML
		},
		handle_focus() {
		},
		handle_blur() {
		}
	},
	mounted() {
		this.selection = document.getSelection()
		this.range = document.createRange()
	}
}
</script>

<style lang='scss' scoped>
.mpnews {
	.likeInput {
		width: 100%;
		padding: 10px;
		border: 1px solid #dcdfe6;
		border-radius: 4px;
		transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
		line-height: 26px;
		&:focus {
			border-color: #409eff;
		}
	}
	.insert {
		display: flex;
		align-items: center;
		margin-top: 10px;
	}
	/deep/ {
		.likeBtn {
			display: inline-block;
			color: #409eff;
			padding: 2px 4px;
			border: 1px solid #409eff;
			user-select: none;
		}
	}
}
</style>