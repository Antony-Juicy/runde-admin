<template>
	<div class="editMessage">
		<div class="head" v-if="showName">
			<div class="form-line" style="width:600px;margin-right:30px">
				<div class="label">推送名称：</div>
				<el-input placeholder="名称用于区别不通过推送，仅自己可见，可自行设置" v-model="msgName" maxlength="30" show-word-limit></el-input>
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
				<imgmsg v-show="msgtype == 'image'" @msgData='handle_msgData'></imgmsg>
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
	watch: {
		msgtype: function (n, o) {
			this.emitForm()
		}
	},
	methods: {
		handle_msgData(data) {
			// step1 接收表单信息，转发到预览组件
			this.cardData[this.msgtype] = data
			// step2 重新组合一个满足接口形态的数据 ，向上传递
			this.emitForm()
		},
		emitForm() {
			let data = {}
			switch (this.msgtype) {
				case 'text': {
					data.content = this.cardData.text.content
					data.description = this.cardData.text.content
					data.url = this.cardData.text.url
					data.msgType = 'text'
					break;
				}
				case 'image': {
					data.mediaId = this.cardData.image.picurl
					data.msgType = 'image'
					break;
				}
				case 'mpnews': {
					data.title = this.cardData.mpnews.title
					data.picurl = this.cardData.mpnews.picurl_t
					data.description = this.cardData.mpnews.description
					data.msgType = 'news'
					break;
				}
				case 'miniprogrampage': {
					// 暂时不知道小程序的结构是怎样的
					break;
				}
			}
			data.appId = this.account.appId
			data.appSecret = this.account.appSecret
			this.$emit("msgForm", data)
		}
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