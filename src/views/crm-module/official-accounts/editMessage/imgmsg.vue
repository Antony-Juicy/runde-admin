<template>
	<div class="imgmsg">
		<div class="form-line" style="align-items:flex-start">
			<div class="label">添加图片：</div>
			<SelectPop v-bind="SelectPopOptions" @select="handle_select" :key="'SelectPop4397'">
				<img class="img180" :src="msgForm.picurl ?msgForm.picurl : `https://rdimg.rundejy.com/cmsuserInfo/20200624163441upload_oss.png`" alt="" />
				<template slot="thumb_url" slot-scope="scope">
					<el-image style="width: 100px; height: 100px" :src="scope.row.thumb_url" fit="contain"></el-image>
				</template>
				<template slot="header">
					<div class="upload-line">
						<Upload-oss v-if="uploadOssElem" :objConfig="{ dir: 'web/runde_admin', project: 'icon_' }" :src.sync="msgForm.picurl" :initGetConfig="initGetConfig" />
						<div class="origin-tips">选择本地图片上传到公众号素材库</div>
					</div>

				</template>
			</SelectPop>
		</div>
	</div>
</template>

<script>
import UploadOss from '@/components/UploadOss-btn'
import SelectPop from '@/components/SelectPop'
export default {
	props: {
		account: {
			typeof: Object,
			require: true
		}
	},
	components: { UploadOss, SelectPop },
	data() {
		return {
			uploadOssElem: true,
			initGetConfig: false,
			msgForm: {
				picurl: "",
				media_id: ""
			},
			showSource: false,
			SelectPopOptions: {
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
			}
		}
	},
	watch: {
		'msgForm.picurl': function (n, o) {
			this.emitForm()
		}
	},
	methods: {
		emitForm() {
			this.$emit('msgData', this.msgForm)
		},
		handle_select(data) {
			this.msgForm.media_id = data.media_id
			this.msgForm.picurl = data.thumb_url
		}
	},
	mounted() {
		this.SelectPopOptions.searchObj.params.appId = this.account.appId
		this.SelectPopOptions.searchObj.params.appSecret = this.account.appSecret
	}
}
</script>

<style lang='scss' scoped>
.imgmsg {
}
.upload-line {
	display: flex;
	align-items: center;
	padding-bottom:10px;
	.origin-tips {
		color: #ffaf53;
		font-size: 12px;
		padding-left: 10px;

	}
}
</style>