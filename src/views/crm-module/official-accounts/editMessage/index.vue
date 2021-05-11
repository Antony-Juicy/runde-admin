<template>
	<div class="editMessage">
		<div class="head" v-if="showName">
			<div class="form-line" style="width:600px;margin-right:30px">
				<div class="label">推送名称：</div>
				<el-input placeholder="名称用于区别不通过推送，仅自己可见，可自行设置" v-model="msgName" @input="emitForm()" maxlength="30" show-word-limit></el-input>
				<!-- <div class="count" :class="{danger:msgName.length > 30}">{{msgName.length}}/30</div> -->
			</div>
		</div>
		<div class="form-content">
			<div class="left">
				<div class="form-line">
					<div class="label">消息类型：</div>
					<el-radio v-model="msgtype" label="mpnews">图文信息</el-radio>
					<el-radio v-model="msgtype" label="text">文字</el-radio>
					<el-radio v-model="msgtype" label="image">图片</el-radio>
					<el-radio v-model="msgtype" label="miniprogrampage">小程序</el-radio>
				</div>
				<mpnews v-show="msgtype == 'mpnews'" :account="account" @msgData='handle_msgData'></mpnews>
				<textmsg v-show="msgtype == 'text'" @msgData='handle_msgData'></textmsg>
				<imgmsg v-show="msgtype == 'image'" :account="account" @msgData='handle_msgData'></imgmsg>
				<miniprogrampage v-show="msgtype == 'miniprogrampage'" @msgData='handle_msgData'></miniprogrampage>
			</div>
			<div class="right">
				<likePhone :mode="msgtype" :cardData="cardData[msgtype]" :accountLogo="account.appImg" :accountName="account.appName"></likePhone>
			</div>

		</div>
	</div>
</template>

<script>
import mpnews from "./mpnews"
import textmsg from "./textmsg"
import imgmsg from "./imgmsg"
import miniprogrampage from "./miniprogrampage"
import likePhone from '@/components/likePhone'
/* 
	account 是微信公众号对象

	showName 是控制是否显示推送名称
*/
export default {
	props: {
		account: {
			typeof: Object,
			require: true
		},
		showName: {
			typeof: Boolean,
			default: false
		}
	},
	components: { mpnews, textmsg, imgmsg, miniprogrampage, likePhone },
	data() {
		return {
			msgName: "",
			msgtype: "mpnews",
			cardData: {
				mpnews: {},
				text: {},
				image: {},
				miniprogrampage: {}
			},
		}
	},
	watch: {},
	methods: {
		handle_msgData(data) {
			// step1 接收表单信息，转发到预览组件
			this.cardData[this.msgtype] = data
		},
		emitForm() {
			let data = {}
			let acceptFlag = true
			switch (this.msgtype) {
				case 'text': {
					if (this.$common.isEmpty(this.cardData.text.content)) {
						this.$message.error("请输入推送的文字内容");
						acceptFlag = false
					}
					if (this.cardData.text.needUrl && this.$common.isEmpty(this.cardData.text.description)) {
						this.$message.error("请输入推送的链接内容");
						acceptFlag = false
					}
					data.content = this.cardData.text.content.replace(/<span contenteditable="false" class="likeBtn">用户昵称<\/span>/g, '%s')
					data.content = data.content.replace(/&nbsp;/g, '')
					data.description = this.cardData.text.description
					data.url = this.cardData.text.url
					data.msgType = 'text'
					break;
				}
				case 'image': {
					if (this.$common.isEmpty(this.cardData.image.picurl)) {
						this.$message.error("请上传图片");
						acceptFlag = false
					}
					data.mediaId = this.cardData.image.media_id
					data.msgType = 'image'
					break;
				}
				case 'mpnews': {
					if (this.$common.isEmpty(this.cardData.mpnews.title)) {
						this.$message.error("请输入推送的标题");
						acceptFlag = false
					}
					if (this.$common.isEmpty(this.cardData.mpnews.picurl_t)) {
						this.$message.error("请上传图片");
						acceptFlag = false
					}
					data.url = this.cardData.mpnews.url
					data.title = this.cardData.mpnews.title.replace(/<span contenteditable="false" class="likeBtn">用户昵称<\/span>/g, '%s')
					data.title = data.title.replace(/&nbsp;/g, '')
					data.picurl = this.cardData.mpnews.picurl_t
					data.description = this.cardData.mpnews.description
					data.msgType = 'news'
					break;
				}
				case 'miniprogrampage': {
					// 暂时不知道小程序的结构是怎样的

					// 组合页面和他们的参数
					data.pagepath = this.cardData.miniprogrampage.pagepath + (() => {
						if (this.cardData.miniprogrampage.paramsKey.length == 0) {
							return ''
						}
						else {
							let query = "?"
							this.cardData.miniprogrampage.paramsKey.forEach((v, i) => {
								query += `${v.key}=${this.cardData.miniprogrampage.params[i]}`
								if (i < this.cardData.miniprogrampage.paramsKey.length - 1) {
									query += '&'
								}
							})
							return query
						}
					})()
					data.msgType = 'miniprogrampage'
					break;
				}
			}

			if ((this.msgtype == 'mpnews' || (this.msgtype == 'text' && this.cardData.text.needUrl)) && !/(http|https):\/\/([\w.]+\/?)\S*/.test(data.url)) {
				this.$message.error("请输入https://或http://开头的链接");
				acceptFlag = false
			}
			data.msgName = this.msgName
			data.appId = this.account.appId
			data.appSecret = this.account.appSecret
			// this.$emit("msgForm", data)
			if (acceptFlag) {
				return data
			} else {
				return false
			}
		},
		val(callback) {
			// 数据合法性校验
			let data = this.emitForm()
			if (!data) {
				return
			} else {
				callback(data)
			}
		},
	},
	mounted() {

	},

}
</script>

<style lang='scss' scoped>
.editMessage {
	border: 1px solid #ccc;
	padding: 20px 0;
	/deep/ {
		.form-line {
			display: flex;
			align-items: center;
			padding-bottom: 30px;
			.label {
				width: 100px;
				text-align: right;
				flex-shrink: 0;
				// padding-top:8px;
			}
		}
	}

	.head {
		.count {
			color: #ccc;
			margin-left: 20px;
			flex-shrink: 0;
			&.danger {
				color: red;
			}
		}
	}
	.form-content {
		margin: 10px 0;
		display: flex;
		.left {
			// margin-right: 100px;
			width: 100%;
		}
		.right {
			flex-shrink: 0;
			margin-right: 50px;
			margin-left: 50px;
		}
	}
}
</style>