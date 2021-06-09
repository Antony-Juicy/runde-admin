<template>
	<div class="miniprogrampage">
		<div class="form-line" style="padding-bottom:0">
			<div class="label">卡片标题：</div>
			<div class="likeInput" ref='likeInput' contenteditable="true" @input="handle_change" @focus="handle_focus" @blur="handle_blur">请输入</div>
		</div>
		<div class="form-line">
			<div class="label"></div>
			<div class="insert">
				<div style="margin-right:10px">点击插入</div>
				<el-button size="mini" plain @click="handle_insertUserName">用户昵称</el-button>
			</div>
		</div>
		<div class="origin-tips" style="margin-left:90px">要求小程序的appid需要与公众号有关联关系</div>
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
			<div class="label">封面图：</div>
			<Upload-oss v-if="uploadOssElem" :objConfig="{ dir: 'web/runde_admin', project: 'icon_' }" :src.sync="msgForm.picurl" :initGetConfig="initGetConfig" />
		</div>
	</div>
</template>

<script>
import miniprogramConfig from '../miniprogram'
import UploadOss from '@/components/UploadOss'
export default {
	components: { UploadOss },
	data() {
		return {
			uploadOssElem: true,
			initGetConfig: false,
			msgForm: {
				title: "",
				picurl: "",
				appid: "",
				pagepath: "",
				appLogo: "",
				appName: "",
				paramsKey: [],
				params: []
			},
			miniprogramConfig: miniprogramConfig,
			miniprogramIndex: '',
			miniprogramPageIndex: '',
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
		handle_change(e) {
			this.msgForm.title = this.$refs.likeInput.innerHTML
			this.emitForm()
		},
		handle_changeAPP() {
			this.msgForm.pagepath = ''
			this.msgForm.appId = this.miniprogramConfig[this.miniprogramIndex].appId
			this.msgForm.appName = this.miniprogramConfig[this.miniprogramIndex].appName
			this.msgForm.appLogo = this.miniprogramConfig[this.miniprogramIndex].appLogo
			this.msgForm.paramsKey = []
			this.msgForm.params = []
			this.miniprogramPageIndex = ''
			this.emitForm()
		},
		handle_changePath(index) {
			// console.log(data)
			this.msgForm.pagepath = this.miniprogramConfig[this.miniprogramIndex].pages[index].value
			this.msgForm.paramsKey = this.miniprogramConfig[this.miniprogramIndex].pages[index].params || []
			this.msgForm.params = this.msgForm.paramsKey.map(() => '')
		},
		emitForm() {
			this.$emit('msgData', this.msgForm)
		}
	},
	watch: {
		'msgForm.picurl': function (n, o) {
			this.emitForm()
		}
	},
	mounted() {
	}
}
</script>

<style lang="scss" scoped>
.miniprogrampage {
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
	.origin-tips {
		color: #ffaf53;
		font-size: 12px;
		padding-left: 10px;
		margin-bottom: 20px;
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