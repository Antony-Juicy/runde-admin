<template>
	<div class="editMessage">
		<div class="head">
			<div class="form-line" style="width:600px;margin-right:30px">
				<div class="label">推送名称：</div>
				<el-input placeholder="名称用于区别不通过推送，仅自己可见，可自行设置" v-model="msgName"></el-input>
				<div class="count" :class="{danger:msgName.length > 30}">{{msgName.length}}/30</div>
			</div>
		</div>
		<div class="form-content">
			<div class="left">
				<div class="form-line">
					<div class="label">推送名称：</div>
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
				<likePhone :mode="msgtype" :cardData="cardData[msgtype]" :accountName="account.appName"></likePhone>
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
			this.$emit("msgForm", this.cardData[this.msgtype])
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