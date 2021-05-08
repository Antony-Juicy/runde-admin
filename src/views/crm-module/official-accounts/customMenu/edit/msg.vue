<template>
	<div class="msg">
		<div class="head">
			<div class="type-item" :class="[typeIndex == index? 'active' : '']" v-for="(item,index) in type" :key="index" @click="typeIndex = index">
				<i :class="[item.icon]"></i>
				{{item.name}}
			</div>
		</div>
		<div class="content">
			<div class="is-msg" v-if="typeIndex == 0">
				<template v-if="this.content.from == ''">
					<SelectPop v-bind="SelectPopOptions" style="margin-right:30px">
						<div class="chose-item">
							<i class="el-icon-folder"></i>
							从素材库选择
						</div>
						<template slot="lane" slot-scope="scope">
							<div class="news-box" @click="handle_choseNews(scope.data)">
								<div class="news-item" v-for="(item,index) in scope.data.news_item" :key="index">
									<div class="thumb">
										<img :src="`https://mcdn.yiban.io/img_proxy?src=${item.thumb_url}`">
									</div>
									<div class="title">{{item.title}}</div>
								</div>
							</div>

						</template>
					</SelectPop>
					<!-- <div class="chose-item">
						<i class="el-icon-edit-outline"></i>
						自建图文
					</div> -->
					<!-- <div class="chose-item">
						<i class="el-icon-share"></i>
						转载文章
					</div> -->
				</template>
				<template v-else>
					<div class="chose-content" v-if="content.from == 'store'">
						<div class="news-box chosed">
							<div class="news-item" v-for="(item,index) in content.data" :key="index" @click="handle_goUrl(item)">
								<div class="thumb">
									<img :src="`https://mcdn.yiban.io/img_proxy?src=${item.thumb_url}`">
								</div>
								<div class="title">{{item.title}}</div>
							</div>
							<el-button class="clear" size="small" @click="handle_clear">删除</el-button>
						</div>
					</div>
				</template>
			</div>
			<div class="is-text" v-if="typeIndex == 1">
				<div class="likeInput" ref="likeInput" contenteditable @input="handle_input" @focus="handle_focus"></div>
				<div class="other">
					<div></div>
					<!-- <el-button class="addFace" size="small">添加表情</el-button> -->
					<div class="limit">{{text.length}} / 300</div>
				</div>
			</div>
			<div class="is-msg" v-if="typeIndex == 2">
				<SelectPop v-bind="SelectPopOptions_img" style="margin-right:30px" @select="handle_choseImg">
					<div class="chose-item">
						<i class="el-icon-folder"></i>
						从素材库选择
					</div>
					<template slot="thumb_url" slot-scope="scope">
						<el-image style="width: 100px; height: 100px" :src="scope.row.thumb_url" fit="contain"></el-image>
					</template>
				</SelectPop>
				<!-- <div class="chose-item">
					<i class="el-icon-folder"></i>
					从素材库选择
				</div> -->
				<div class="chose-item">
					<i class="el-icon-picture-outline"></i>
					上传图片
					<input type="file" accept="image/*" ref="fileInput_img" class="btn-hidden" @change="handle_uploadFileImg">
				</div>
			</div>
			<div class="is-msg" v-if="typeIndex == 3">
				<div class="chose-item">
					<i class="el-icon-folder"></i>
					从素材库选择
				</div>
				<div class="chose-item">
					<i class="el-icon-mic"></i>
					上传音频
					<input type="file" accept="audio/*" ref="fileInput_voice" class="btn-hidden" @change="handle_uploadFileVoice">
				</div>
			</div>
			<div class="is-msg" v-if="typeIndex == 4">
				<div class="chose-item">
					<i class="el-icon-folder"></i>
					从素材库选择
				</div>
				<div class="chose-item">
					<i class="el-icon-video-camera"></i>
					上传视频
					<input type="file" accept="video/*" ref="fileInput_video" class="btn-hidden" @change="handle_uploadFileVideo">
				</div>
			</div>
		</div>

	</div>
</template>

<script>
import SelectPop from '@/components/SelectPop'
export default {
	// inject: ['account'],
	props: {
		account: {
			typeof: Object,
			require: true,
		}
	},
	components: { SelectPop },
	data() {
		return {
			type: [
				{
					name: "图文消息",
					icon: "el-icon-postcard"
				},
				{
					name: "文字",
					icon: "el-icon-edit-outline"
				},
				{
					name: "图片",
					icon: "el-icon-picture-outline"
				},
				{
					name: "音频",
					icon: "el-icon-mic"
				},
				{
					name: "视频",
					icon: "el-icon-video-camera"
				},
			],
			typeIndex: 0,
			text: "",
			// 图文弹出搜索框
			SelectPopOptions: {
				searchObj: {
					api: "custom_menu_get_material",
					formOptions: [],
					needType: false,
					params: {
						appId: '',
						appSecret: '',
						type: 'news',
					}
				},
				tableObj: {
					waterfall: true,
					lane: 2,
					transItem: (item) => {
						return {
							news_item: item.content.news_item,
							media_id: item.media_id
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
			SelectPopOptions_voice: {
				searchObj: {
					api: "graphic_message_get_material",
					formOptions: [],
					needType: false,
					params: {
						appId: '',
						appSecret: '',
						type: 'voice'
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
			SelectPopOptions_video: {
				searchObj: {
					api: "graphic_message_get_material",
					formOptions: [],
					needType: false,
					params: {
						appId: '',
						appSecret: '',
						type: 'video'
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
			content: {
				from: '',// store 素材库 、slef 自建 、 reprint 转载 
				media_id: '',// 给到后台转发到微信的关键信息是 media_id
				data: {},// 为了适应各种模式，使用一个中性的名称存放具体的数据内容，只做预览使用
			}
		}
	},
	watch: {
		typeIndex: function (n, o) {
			if (n == 1) {
				this.$nextTick(() => {
					this.$refs.likeInput.innerText = this.text
					this.$refs.likeInput.focus()
				})

			}
		},
		account: {
			handler: function (n, o) {

			},
			deep: true
		}
	},
	computed: {},
	methods: {
		handle_input(e) {
			this.text = this.$refs.likeInput.innerText
		},
		async handle_focus() {
			try {
				let c = await navigator.clipboard.readText()
				navigator.clipboard.writeText(c)
			} catch (error) {

			}
		},
		handle_choseNews(data) {
			// console.log(data)
			this.content.from = 'store'
			this.content.media_id = data.media_id
			this.content.data = data.news_item
		},
		handle_choseImg(data) {
			console.log(data)
		},
		handle_choseVoice(data) {
			console.log(data)
		},
		handle_choseVideo(data) {
			console.log(data)
		},
		handle_goUrl(data) {
			window.open(data.url)
		},
		async handle_uploadFileImg() {
			// 图片上传
			let formData = new FormData()
			formData.append('img', this.$refs.fileInput_img.files[0])
			formData.append('type', 'image')
			formData.append('appSecret', this.account.appSecret)
			formData.append('appId', this.account.appId)
			// 避免出现点击取消也触发change导致文件多次上传
			this.$refs.fileInput_img.value = ''

			let res = await this.$fetch(
				"graphic_message_upload_material"
				, formData);
			this.$message.success("图片已保存到素材库")
		},
		async handle_uploadFileVoice() {
			// 音频上传
			let formData = new FormData()
			formData.append('img', this.$refs.fileInput_voice.files[0])
			formData.append('type', 'voice')
			formData.append('appSecret', this.account.appSecret)
			formData.append('appId', this.account.appId)
			// 避免出现点击取消也触发change导致文件多次上传
			this.$refs.fileInput_voice.value = ''

			let res = await this.$fetch(
				"graphic_message_upload_material"
				, formData);
			this.$message.success("音频已保存到素材库")
		},
		async handle_uploadFileVideo() {
			// 音频上传
			let formData = new FormData()
			formData.append('img', this.$refs.fileInput_video.files[0])
			formData.append('type', 'video')
			formData.append('appSecret', this.account.appSecret)
			formData.append('appId', this.account.appId)
			// 避免出现点击取消也触发change导致文件多次上传
			this.$refs.fileInput_video.value = ''
			let res = await this.$fetch(
				"graphic_message_upload_material"
				, formData);
			this.$message.success("音频已保存到素材库")
		},
		handle_clear() {
			this.content = {
				from: '',// store 素材库 、slef 自建 、 reprint 转载 
				media_id: '',// 给到后台转发到微信的关键信息是 media_id
				data: {},// 为了适应各种模式，使用一个中性的名称存放具体的数据内容，只做预览使用
			}
		},
		updateSelectPopOptions(n) {
			// 图文
			this.SelectPopOptions.searchObj.params.appId = n.appId
			this.SelectPopOptions.searchObj.params.appSecret = n.appSecret
			// 图片
			this.SelectPopOptions_img.searchObj.params.appId = n.appId
			this.SelectPopOptions_img.searchObj.params.appSecret = n.appSecret
			// 音频
			this.SelectPopOptions_voice.searchObj.params.appId = n.appId
			this.SelectPopOptions_voice.searchObj.params.appSecret = n.appSecret
			// 视频
			this.SelectPopOptions_video.searchObj.params.appId = n.appId
			this.SelectPopOptions_video.searchObj.params.appSecret = n.appSecret
		}
	},
	mounted() {
		this.updateSelectPopOptions(this.account)
	}
}
</script>

<style lang="scss" scoped>
.head {
	background: #f6f8f9;
	display: flex;
	.type-item {
		padding: 20px;
		min-width: 90px;
		cursor: pointer;
		display: flex;
		align-items: center;
		color: #999;
		user-select: none;
		i {
			margin-right: 5px;
			font-size: 20px;
		}
		&:hover {
			color: #409eff;
		}
		&.active {
			color: #409eff;
		}
	}
}
.content {
	min-height: 350px;
	.is-msg {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		.chose-item {
			margin-top: 80px;
			height: 120px;
			width: 120px;
			margin-right: 30px;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			color: #999;
			font-size: 14px;
			cursor: pointer;
			border: 1px solid #eee;
			user-select: none;
			position: relative;
			i {
				font-size: 36px;
				margin-bottom: 15px;
			}
			&:last-child {
				margin-right: 0;
			}
			&:hover {
				background: #f6f8f9;
			}
		}
	}
	.is-text {
		.likeInput {
			height: 300px;
			overflow: auto;
			padding: 10px;
			width: 100%;
			word-break: break-all;
		}
		.other {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-top: 15px;
			border-top: 1px solid #eee;
			.limit {
				font-size: 14px;
				color: #999;
			}
		}
	}
	.chose-content {
		height: 100%;
		overflow: auto;
		width: 100%;
	}
}
.news-box {
	border: 1px solid #eee;
	padding: 5px;
	border-radius: 4px;
	margin-bottom: 10px;
	cursor: pointer;
	position: relative;
	&:hover {
		&::after {
			content: '';
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			right: 0;
			background: rgba(0, 0, 0, 0.4);
			z-index: 10;
		}
	}
	&.chosed {
		width: 370px;
		margin-top: 10px;
		&:hover {
			&::after {
				content: none;
			}
		}
		.news-item:hover {
			&::after {
				content: '';
				position: absolute;
				width: 100%;
				height: 100%;
				top: 0;
				right: 0;
				background: rgba(0, 0, 0, 0.4);
				z-index: 10;
			}
		}
	}
	.clear {
		position: absolute;
		bottom: 0;
		right: -80px;
	}
	.news-item {
		display: flex;
		margin-bottom: 5px;
		position: relative;
		.title {
			margin-top: 10px;
			font-size: 14px;
		}
		.thumb {
			width: 100px;
			height: 100px;
			margin-right: 10px;
			flex-shrink: 0;
			img {
				width: 100%;
				height: 100%;
				object-fit: fill;
			}
		}
	}
	.news-item:first-child {
		height: 150px;
		width: 100%;
		position: relative;
		.title {
			position: absolute;
			z-index: 2;
			bottom: 20px;
			color: #fff;
			text-align: center;
			width: 100%;
		}
		.thumb {
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			right: 0;
			z-index: 1;
			margin: 0;
			&::after {
				content: '';
				position: absolute;
				width: 100%;
				height: 100%;
				top: 0;
				right: 0;
				background: rgba(0, 0, 0, 0.548);
			}
		}
	}
}
.btn-hidden {
	position: absolute;
	height: 100%;
	width: 100%;
	z-index: 1;
	opacity: 0;
}
</style>