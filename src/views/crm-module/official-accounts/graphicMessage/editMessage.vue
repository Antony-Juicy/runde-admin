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
				<mpnews v-if="msgtype == 'mpnews'"></mpnews>
			</div>
			<div class="right">
				<likePhone :mode="msgtype" :cardData="{}"></likePhone>
			</div>

		</div>
		<div class="bottom">

		</div>

	</div>
</template>

<script>
import mpnews from "./mpnews"
import likePhone from '@/components/likePhone'
export default {
	components: { mpnews, likePhone },
	data() {
		return {
			msgName: "",
			msgtype: "mpnews",
			cardData: {},
		}
	},
	methods: {

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
			padding-bottom: 10px;
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
        .left{
            margin-right: 100px;
        }
	}
}
</style>