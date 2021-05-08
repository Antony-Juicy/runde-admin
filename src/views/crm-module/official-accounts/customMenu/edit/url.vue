<template>
	<div class="url">
		<div class="origin-tips">订阅者点击该子菜单会跳到以下链接</div>
		<div class="form-line">
			<div class="label">页面地址</div>
			<el-input v-model="formData.url" placeholder="请输入https:// 或 http:// 开头的链接"></el-input>
		</div>
		<div class="title" v-if="title">可以识别出标题</div>
		<SelectPop style="width:auto;display:inline-block" :key="'SelectPop4399'" v-bind="SelectPopOptions" @select="handle_select">
			<el-button size="small">从公众号图文消息中选择</el-button>
			<template slot="thumb_url" slot-scope="scope">
				<el-image style="width: 100px; height: 100px" :src="scope.row.thumb_url" fit="contain"></el-image>
			</template>
		</SelectPop>

	</div>
</template>

<script>
import SelectPop from '@/components/SelectPop'
export default {
	props: {
		account: {
			type: Object,
			require: true,
		},
		formData: {
			type: Object,
			require: true,
		}
	},
	components: { SelectPop },
	data() {
		return {
			title: '',
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
		account: {
			handler: function (n, o) {
				this.updateSelectPopOptions(n)
			},
			deep: true
		}
	},
	methods: {
		handle_select(data) {

		},
		updateSelectPopOptions(n) {
			// 图文
			this.SelectPopOptions.searchObj.params.appId = n.appId
			this.SelectPopOptions.searchObj.params.appSecret = n.appSecret
		}
	},
	mounted() {
		this.updateSelectPopOptions(this.account)
	}
}
</script>

<style lang="scss" scoped>
.url {
	padding: 20px;
}
.origin-tips {
	color: #ffaf53;
	font-size: 12px;
	padding-bottom: 20px;
}
.title {
	margin-bottom: 20px;
	color: #999;
	font-size: 14px;
}
</style>