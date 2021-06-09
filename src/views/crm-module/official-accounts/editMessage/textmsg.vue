<template>
	<div class="textmsg">
		<div class="form-line" style="padding-bottom:0">
			<div class="label">文字消息：</div>
			<div class="likeInput" ref='likeInput' contenteditable="plaintext-only" @input="handle_change" @focus="handle_focus" @blur="handle_blur"></div>
		</div>

		<div class="form-line">
			<div class="label"></div>
			<div class="insert">
				<div style="margin-right:10px">点击插入</div>
				<el-button size="mini" plain @click="handle_insertUserName">用户昵称</el-button>
			</div>
		</div>

		<div class="form-line">
			<div class="label">跳转链接：</div>
			<div>
				<el-radio v-model="msgForm.needUrl" :label="true">需要</el-radio>
				<el-radio v-model="msgForm.needUrl" :label="false">不需要</el-radio>
			</div>
		</div>
		<template v-if="msgForm.needUrl">
			<div class="form-line">
				<div class="label">跳转链接：</div>
				<el-input placeholder="请以输入http://或https://开头的链接" v-model="msgForm.url" @input="emitForm"></el-input>
			</div>
			<div class="form-line">
				<div class="label">链接描述：</div>
				<el-input placeholder="请输入内容" v-model="msgForm.description" @input="emitForm"></el-input>
			</div>
		</template>

	</div>
</template>

<script>
export default {
	data() {
		return {
			msgForm: {
				content: "",
				url: "",
				needUrl: false
			},

		}
	},
	watch: {
		'msgForm.needUrl': function (n, o) {
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
			var text = document.createTextNode(' ')
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
				this.$nextTick(() => {
					this.handle_change()
				})
			}

		},
		async handle_focus() {
			if (this.$refs.likeInput.innerHTML == '请输入') {
				this.$refs.likeInput.innerHTML = ""
			}
			try {
				let c = await navigator.clipboard.readText()
				navigator.clipboard.writeText(c)
			} catch (error) {

			}

		},
		handle_blur() {
			if (this.$refs.likeInput.innerHTML == '') {
				this.$refs.likeInput.innerHTML = "请输入"
			}
		},
		handle_change(e) {
			this.msgForm.content = this.$refs.likeInput.innerHTML
			this.emitForm()
		},
		emitForm() {
			this.$emit('msgData', this.msgForm)
		}
	}
}
</script>

<style lang="scss" scoped>
.textmsg {
	.likeInput {
		width: 100%;
		padding: 10px;
		border: 1px solid #dcdfe6;
		border-radius: 4px;
		transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
		line-height: 26px;
		max-height: 150px;
		overflow: auto;
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