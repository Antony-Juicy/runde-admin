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
			<div class="likeInput" ref='likeInput' contenteditable="plaintext-only" @input="handle_change" @focus="handle_focus" @blur="handle_blur">请输入</div>
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
			<el-input placeholder="请以输入http://或https://开头的链接" v-model="msgForm.url" @input="emitForm"></el-input>
		</div>
		<div class="form-line" style="align-items:flex-start">
			<div class="label">封面图：</div>
			<!-- <Upload-oss v-if="uploadOssElem" :objConfig="{ dir: 'web/runde_admin', project: 'icon_' }" :src.sync="msgForm.picurl" :initGetConfig="initGetConfig"
				@update:src="handle_uploadFinish" /> -->

			<SelectPop ref="SelectPop" v-bind="SelectPopOptions_img" @select="handle_selectImg" :key="'SelectPop4397'">
				<img class="img180" :src="msgForm.picurl ?msgForm.picurl : `https://rdimg.rundejy.com/cmsuserInfo/20200624163441upload_oss.png`" alt="" />
				<template slot="thumb_url" slot-scope="scope">
					<el-image style="width: 100px; height: 100px" :src="scope.row.thumb_url" fit="contain"></el-image>
				</template>
				<template slot="header">
					<div class="upload-line">
						<div class="choseFileForm">
							<input class="btn-hidden" ref="fileInput" type="file" accept="image/*" @change="handle_uploadFile" />
							<el-button class="btn-over" @click="handle_hackFileInput"><i class="el-icon-upload"></i>本地上传</el-button>
						</div>
						<div class="origin-tips">选择本地图片上传到公众号素材库</div>
					</div>

				</template>
			</SelectPop>
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
// import UploadOss from '@/components/UploadOss'
import SelectPop from '@/components/SelectPop'
export default {
	props: {
		account: {
			type: Object,
			require: true,
		},
	},
	components: { SelectPop },
	data() {
		return {
			selection: {},
			range: {},
			lock: false,
			lastEditRange: false,
			// uploadOssElem: true,
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
			},
			SelectPopOptions_img: {
				searchObj: {
					api: "graphic_message_get_material",
					formOptions: [],
					needType: false,
					params: {
						appId: '',
						appSecret: '',
						type: 'image'
					}
				},
				tableObj: {
					tableKey: [
						{
							name: "图片",
							value: "thumb_url",
							width: 100,
							operate: true,
						},
						{
							name: "标题",
							value: "name",
						},
					],
					transItem: (item) => {
						return {
							thumb_url: `${process.env.VUE_APP_BASE_API}/wechat/console/wechat_material/handle_img?src=${encodeURIComponent(item.url)}`, // 投机一把 看看情况
							// thumb_url: `https://mcdn.yiban.io/img_proxy?src=${encodeURIComponent(item.thumb_url)}`,
							name: item.name,
							thumb_url_t: item.url,
							media_id: item.media_id
						}
					}
				}
			},
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
				picurl: data.thumb_url,     // 素材的图片有防盗保护，所以要通过api请求流显示，不能作为上传参数
				picurl_t: data.thumb_url_t, // 如果是素材的图片，_t 才是原始图片路径
				description: data.digest,
				url: data.url
			}
			this.$refs.likeInput.innerHTML = this.msgForm.title
		},
		handle_selectImg(data) {
			this.msgForm.media_id = data.media_id
			this.msgForm.picurl = data.thumb_url // 素材的图片有防盗保护，所以要通过api请求流显示，不能作为上传参数
			this.msgForm.picurl_t = data.thumb_url_t // 如果是素材的图片，_t 才是原始图片路径
		},
		handle_hackFileInput() {
			this.$refs.fileInput.click()
		},
		async handle_uploadFile() {
			let formData = new FormData()
			formData.append('img', this.$refs.fileInput.files[0])
			formData.append('type', 'image')
			formData.append('appSecret', this.account.appSecret)
			formData.append('appId', this.account.appId)
			// 避免出现点击取消也触发change导致文件多次上传
			this.$refs.fileInput.value = ''

			let res = await this.$fetch(
				"graphic_message_upload_material"
				, formData);
			this.$message.success("图片已保存到素材库")
			// 自动刷新素材列表
			this.$refs.SelectPop.onSearch({})
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

		this.SelectPopOptions_img.searchObj.params.appId = this.account.appId
		this.SelectPopOptions_img.searchObj.params.appSecret = this.account.appSecret

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
.upload-line {
	display: flex;
	align-items: center;
	padding-bottom: 10px;
	.origin-tips {
		color: #ffaf53;
		font-size: 12px;
		padding-left: 10px;
	}
	.choseFileForm {
		position: relative;
		.btn-hidden {
			position: absolute;
			height: 100%;
			width: 100%;
			z-index: 1;
			opacity: 0;
		}
		.btn-over {
			position: relative;
			z-index: 2;
		}
	}
}
</style>