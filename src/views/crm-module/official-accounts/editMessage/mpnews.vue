<template>
	<div class="mpnews">
		<div class="form-line">
			<div class="label">图文消息：</div>
			<div>
				<el-button @click="addEditVisible = true" size="small" style="margin-right:10px">添加图文链接</el-button>
				<SelectPop style="width:auto;display:inline-block" :key="'SelectPop4399'" v-bind="SelectPopOptions" @select="handle_select">
					<el-button size="small">从素材库导入</el-button>
					<template slot="thumb_url" slot-scope="scope">
						<el-image style="width: 100px; height: 100px" :src="scope.row.thumb_url" fit="contain"></el-image>
					</template>
				</SelectPop>

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
		<div class="form-line" style="align-items:flex-start">
			<div class="label">描述：</div>
			<el-input type="textarea" placeholder="请输入内容" v-model="msgForm.description" :rows="2" resize="none" @input="emitForm"></el-input>
		</div>
		<div class="form-line">
			<div class="label">跳转链接：</div>
			<el-input placeholder="请以http://或https://开头" v-model="msgForm.url" @input="emitForm"></el-input>
		</div>
		<div class="form-line" style="align-items:flex-start">
			<div class="label">封面图：</div>
			<Upload-oss v-if="uploadOssElem" :objConfig="{ dir: 'web/runde_admin', project: 'icon_' }" :src.sync="msgForm.picurl" :initGetConfig="initGetConfig"
				@update:src="handle_uploadFinish" />
		</div>
		<img src="" />
		<!-- 编辑公众号 -->
		<rd-dialog ref="linkInput" :title="'输入链接'" :dialogVisible="addEditVisible" :showFooter="true" :width="'500px'" @submitForm="handle_getLinkHtmlInfo"
			@handleClose="addEditVisible = false">
			<el-input v-model="articleLink" placeholder="请输入以 https://mp.weixin.qq.com 开头的文章链接"></el-input>
		</rd-dialog>
	</div>
</template>

<script>
import UploadOss from '@/components/UploadOss'
import SelectPop from '@/components/SelectPop'
export default {
	props: {
		account: {
			type: Object,
			require: true,
		},
	},
	components: { UploadOss, SelectPop },
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
				picurl_t: "",
				description: "",
				url: ""
			},
			addEditVisible: false,
			articleLink: '',
			SelectPopOptions: {
				searchObj: {
					api: "graphic_message_get_material",
					formOptions: [],
					needType: false,
					params: {
						appId: '',
						appSecret: '',
						type: 'news'
					}
				},
				tableObj: {
					tableKey: [
						{
							name: "封面图",
							value: "thumb_url",
							width: 100,
							operate: true,
						},
						{
							name: "标题",
							value: "title",
						},
						{
							name: "描述",
							value: "digest",
						},
					],
					transItem: (item) => {
						return {
							thumb_url: `${process.env.VUE_APP_BASE_API}/wechat/console/wechat_material/handle_img?src=${encodeURIComponent(item.thumb_url)}`,
							// thumb_url: `https://mcdn.yiban.io/img_proxy?src=${encodeURIComponent(item.thumb_url)}`,
							thumb_url_t: item.thumb_url,
							title: item.title,
							digest: item.digest,
							url: item.url,
						}
					}
				}
			}
		}
	},
	watch: {
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
		handle_change(e) {
			this.msgForm.title = this.$refs.likeInput.innerHTML
			this.emitForm()
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
		async handle_getLinkHtmlInfo() {
			// 通过链接获取文本信息，解析出图片、描述、标题
			if (/^https:\/\/mp.weixin.qq.com/g.test(this.articleLink)) {
				// 满足链接条件
				let res = await this.$fetch(
					"graphic_message_get_article"
					, {
						url: this.articleLink
					});
				let htmlInfo = res.msg.replace(/\"/g, "'").replace(/ +/g, ' ')
				// 获取图片
				htmlInfo.match(/var cdn_url_1_1 = '(.?|.+?)';/g)

				let image = `${process.env.VUE_APP_BASE_API}/wechat/console/wechat_material/handle_img?src=${encodeURIComponent(RegExp.$1)}`
				// 获取可以上传的图片
				htmlInfo.match(/var cdn_url_1_1 = '(.?|.+?)';/g)
				let image_t = RegExp.$1
				// 获取描述
				htmlInfo.match(/var msg_desc = '(.?|.+?)';/g)
				let description = RegExp.$1
				// 获取标题
				htmlInfo.match(/var msg_title = '(.?|.+?)'./g)
				let title = RegExp.$1
				this.$refs.likeInput.innerHTML = title
				this.msgForm = {
					title: title,
					picurl: image,
					picurl_t: image_t,
					description: description,
					url: this.articleLink
				}
				this.addEditVisible = false
				this.articleLink = ''
			} else {
				// 不满足链接条件
				this.$message({
					message: "输入链接不合法",
					type: "error",
				});
			}

		},
		handle_uploadFinish() {
			this.msgForm.picurl_t = this.msgForm.picurl
			this.emitForm()
		},
		handle_select(data) {
			// 选择素材
			this.msgForm = {
				title: data.title,
				picurl: data.thumb_url,
				picurl_t: data.thumb_url_t,
				description: data.digest,
				url: data.url
			}
			this.$refs.likeInput.innerHTML = this.msgForm.title
		},
		emitForm() {
			this.$emit('msgData', this.msgForm)
		}
	},
	mounted() {
		this.selection = document.getSelection()
		this.range = document.createRange()

		this.SelectPopOptions.searchObj.params.appId = this.account.appId
		this.SelectPopOptions.searchObj.params.appSecret = this.account.appSecret

		this.dialogId = `mpnews-dialog-${Date.now()}`
		document.querySelector('.mpnews .dialog-wrapper').id = this.dialogId
		document.body.append(document.querySelector('.mpnews .dialog-wrapper'))
	},
	beforeDestroy() {
		// 既然要离开页面了，就把这个dialog标签删掉，做好文档流管理
		document.body.removeChild(document.body.querySelector(`#${this.dialogId}`))
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