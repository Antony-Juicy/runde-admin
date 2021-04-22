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
		<div class="form-line">
			<div class="label">描述：</div>
			<el-input type="textarea" placeholder="请输入内容" v-model="msgForm.description" :rows="2" resize="none" @input="emitForm"></el-input>
		</div>
		<div class="form-line">
			<div class="label">跳转链接：</div>
			<el-input placeholder="请输入内容" v-model="msgForm.url" @input="emitForm"></el-input>
		</div>
		<div class="form-line">
			<div class="label">封面图：</div>
			<Upload-oss v-if="uploadOssElem" :objConfig="{ dir: 'web/runde_admin', project: 'icon_' }" :src.sync="msgForm.picurl" :initGetConfig="initGetConfig" />
		</div>

	</div>
</template>

<script>

import UploadOss from '@/components/UploadOss'
export default {
	components: { UploadOss },
	data() {
		return {
			selection: {},
			range: {},
			lock: false,
			lastEditRange: false,
			uploadOssElem: true,
			initGetConfig: false,
			msgForm: {
				title: "",
				picurl: "",
				description: "",
				url: ""
			}

		}
	},
	watch: {
		'msgForm.picurl': function (n, o) {
			this.emitForm()
		}
	},
	methods: {
		handle_insertUserName() {
			this.$refs.likeInput.focus()
			var span = document.createElement('span');
			span.setAttribute('contenteditable', false);
			span.innerText = '用户昵称';
			span.classList.add('likeBtn');
			var sel = window.getSelection();
			var text = document.createElement('span')
			text.innerText = " "
			// debugger
			if (sel.rangeCount > 0) {
				var range = sel.getRangeAt(0);
				//判断光标是否在 id = editor 的元素内
				if (range.startContainer == this.$refs.likeInput) {
					range.insertNode(span);
					range.insertNode(text);
					range.setStartAfter(span)
				} else if (range.startContainer.parentElement == this.$refs.likeInput) {
					range.insertNode(span);
					range.insertNode(text);
					range.setStartAfter(span)
					range.collapse(true)
				}
				this.$nextTick(()=>{
					this.handle_change()
				})
			}

		},
		handle_change(e) {
			this.msgForm.title = this.$refs.likeInput.innerHTML
			this.emitForm()
		},
		handle_focus() {
			if (this.$refs.likeInput.innerHTML == '请输入') {
				this.$refs.likeInput.innerHTML = ""
			}
		},
		handle_blur() {
			if (this.$refs.likeInput.innerHTML == '') {
				this.$refs.likeInput.innerHTML = "请输入"
			}
		},
		emitForm() {
			this.$emit('msgData', this.msgForm)
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
			border-radius: 4px;
			margin-bottom: 5px;
		}
	}
}
</style>