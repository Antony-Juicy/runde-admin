<template>
	<div class="like-phone">
		<img src="@/assets/shouji.png" class="bg-shouji">
		<div class="over">
			<div class="inner">
				<div class="accountName">{{accountName}}</div>
				<div class="scroll-wrap">
					<div class="notice" v-if="mode == 'notice'">
						<template v-if="noticeCanFill">
							<div v-for="(item,index) in cardData" :key="index">
								<template v-if="item.key == 'first'">
									<div class="title" :style="{color:item.color}">{{item.value || '请输入内容'}}</div>
									<div class="date line">{{mmdd}}</div>
								</template>
								<template v-else-if="item.key == 'remark'">
									<div class="remark line" :style="{color:item.color}">{{item.value || '请输入内容'}}</div>
								</template>
								<template v-else>
									<div class="line ">
										<div class="label">{{item.label}}</div>
										<div class="value" :style="{color:item.color}">{{item.value || '请输入内容'}}</div>
									</div>
								</template>
								<div class="count" :class="{danger:noticeFontCount > 200}">{{noticeFontCount}} / 200</div>
							</div>
						</template>
						<template v-else>
							<div>{{cardData}}</div>
						</template>
					</div>
					<div class="text" v-if="mode == 'text'">
						<div class="avatar">
							<img :src="accountLogo || require('@/assets/logo.png')">
						</div>
						<div class="msg-card">
							<div class="just-text" v-html="cardData.content || '请输入文字消息'"></div>
							<div class="link-text" v-if="cardData.needUrl" @click="handle_goPage">{{cardData.description || '请输入链接名称'}}</div>
						</div>
					</div>
					<div class="mpnews" v-if="mode == 'mpnews'" @click="handle_goPage">
						<div class="avatar">
							<img :src="accountLogo || require('@/assets/logo.png')">
						</div>
						<div class="msg-card">
							<div class="title twoline" v-html="cardData.title || '请输入标题'"></div>
							<div class="down">
								<div class="description twoline">{{cardData.description || '请输入描述'}}</div>
								<img class="imgUrl" :src="cardData.picurl || require('@/assets/noPic.png')">
							</div>
						</div>
					</div>
					<div class="image" v-if="mode == 'image'">
						<div class="avatar">
							<img :src="accountLogo || require('@/assets/logo.png')">
						</div>
						<img v-if="cardData.picurl" class="imgUrl" :src="cardData.picurl">
						<div v-else class="default-img">请上传图片</div>
					</div>
					<div class="miniprogrampage" v-if="mode == 'miniprogrampage'">
						<div class="avatar">
							<img :src="accountLogo || require('@/assets/logo.png')">
						</div>
						<div class="msg-card">
							<div class="head">
								<img class="logo" :src="cardData.appLogo">
								<div class="appName oneline">{{cardData.appName || '请选择小程序'}}</div>
							</div>
							<div class="title oneline" v-html="cardData.title || '请输入卡片标题'"></div>
							<img class="imgUrl" v-if="cardData.picurl" :src="cardData.picurl">
							<div v-else class="default-img">请上传图片</div>
							<div class="tail">
								<img src="@/assets/miniprogram.png">
								<div>小程序</div>
							</div>
						</div>
					</div>
				</div>

				<customMenu ref="customMenu" v-if="mode == 'menu'" :menuData="cardData"></customMenu>
			</div>

		</div>
	</div>
</template>

<script>
import customMenu from './customMenu'
export default {
	props: {
		// mode : notice 模板通知 text 文字 mpnews 图文 image 图片 miniprogrampage 小程序 menu 菜单编辑
		/* 
			notice 的 cardData结构：
			cardData=[
				{
					color:'#000',
					key:'first',// 不影响渲染,
					label:'标签名', // key是first remark 的时候是不会显示的
					value:'值'
				}
			]
		*/
		/* 
			text 的 cardData 结构
			cardData='*******'
		*/
		/* 
			image 的 cardData 结构
			cardData='*******.png'
		*/
		/* 
			mpnews 的 cardData 结构
			cardData={
				title:"标题",
				description:"描述",
				picurl:"图片地址"
			}
		*/
		/* 
			miniprogrampage 的 cardData 结构
			cardData = {
				appName:"小程序名称",
				title:"小程序标题",
				picurl:"封面图"
			}
		*/
		/* 
			menu 的 cardData

			[
				{
					"name": "菜单",
					"sub_button": [
						{
							"type": "view",
							"name": "搜索",
							"url": "http://www.soso.com/",
							"sub_button": []
						},
					]
				}
			]


			menu模式下有两个抛出事件： 

			changeMenu 表示出现了新的排序后菜单数据
			addMenu 表示添加新的菜单栏
		*/
		mode: {
			type: String,
			require: true
		},
		cardData: {
			type: [Object, String, Array],
			require: true
		},
		// accountName 用于显示预览效果里面的公众号名称
		accountName: {
			type: String,
			require: true
		},
		// accountLogo 用于显示预览效果里面公众号发出消息的头像
		accountLogo: {
			type: String,
		}
	},
	components: { customMenu },
	data() {
		return {

		}
	},
	computed: {
		mmdd() {
			this.$common.getFormatDate(Date.now(), 'mm月dd日')
		},
		noticeFontCount() {
			if (this.mode == 'notice' && this.noticeCanFill) {
				let count = 0
				this.cardData.forEach((v) => {
					count += v.value.length
				})
				return count
			} else {
				return 0
			}
		},
		noticeCanFill() {
			if (this.mode == 'notice') {
				if (typeof this.cardData != 'string') {
					return true
				}
				else {
					return false
				}
			} else {
				return false
			}
		}
	},
	methods: {
		handle_goPage() {
			if (/^(https|http):\/\//g.test(this.cardData.url)) {
				window.open(this.cardData.url)
			}
		},
	}
}
</script>

<style lang='scss' scoped>
.like-phone {
	width: 100%;
	// height: 100%;
	position: relative;
	user-select: none;

	.inner {
		width: 100%;
		height: 100%;
		position: relative;
	}
	.accountName {
		height: 68px;
		text-align: center;
		line-height: 33px;
		padding-top: 20px;
		font-size: 16px;
		color: #000;
		font-weight: bold;
	}
	.scroll-wrap {
		height: calc(100% - 68px);
		overflow: auto;
		padding-bottom: 10px;
	}

	.scroll-wrap::-webkit-scrollbar {
		width: 6px;
		height: 6px;
	}
	.scroll-wrap::-webkit-scrollbar-thumb {
		width: 6px;
		height: 6px;
		border-radius: 10px;
		background-color: #d5d5d5;
		cursor: pointer;
	}
	.bg-shouji {
		position: absolute;
		width: 250px;
		z-index: 1;
	}
	.over {
		width: 250px;
		height: 520px;
		position: relative;
		z-index: 2;
		padding: 64px 21px 79px 19px;
	}

	.notice {
		background: #fff;
		width: 90%;
		padding: 20px 10px;
		margin: 10px;
		position: relative;
		border-radius: 6px;
		border: 1px solid rgb(207, 207, 207);
		.title {
			font-size: 16px;
			font-weight: bold;
		}
		.date {
			color: #ccc !important;
			margin-top: 5px;
		}
		.line {
			margin-bottom: 15px;
			display: flex;
			align-items: flex-start;
			color: #000;
			.label {
				flex-shrink: 0;
			}
			&:last-child() {
				margin-bottom: 0;
			}
		}
		.count {
			color: #ccc;
			position: absolute;
			bottom: 5px;
			right: 10px;
		}
		.count.danger {
			color: red;
		}
	}
	.text {
		display: flex;
		align-items: flex-start;
		padding: 0 10px;
		.just-text {
			margin-bottom: 10px;
			color: #000;
			font-size: 12px;
		}
		.link-text {
			color: rgb(0, 0, 238);
			cursor: pointer;
			font-size: 12px;
		}
	}
	.mpnews {
		display: flex;
		align-items: flex-start;
		padding: 0 10px;
		.title {
			font-size: 14px;
			font-weight: bold;
			margin-bottom: 5px;
		}
		.down {
			display: flex;
			.description {
				width: 100%;
				font-size: 12px;
				color: #ccc;
				height: 26px;
			}
			img {
				width: 40px;
				height: 40px;
				margin-left: 10px;
				flex-shrink: 0;
				object-fit: cover;
			}
		}
	}
	.image {
		display: flex;
		align-items: flex-start;
		padding: 0 10px;
		.imgUrl {
			max-width: 70%;
			max-height: 300px;
			margin-left: 10px;
			object-fit: scale-down;
		}
		.default-img {
			margin-left: 10px;
			width: 60%;
			height: 170px;
			background: #fff;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	.miniprogrampage {
		display: flex;
		align-items: flex-start;
		padding: 0 10px;
		font-size: 12px;
		.head {
			display: flex;
			align-items: center;
			margin-bottom: 5px;
			.logo {
				width: 10px;
				height: 10px;
				margin-right: 5px;
			}
			.appName {
				font-size: 13px;
				margin-top: 2px;
			}
		}
		.title {
			font-weight: bold;
			margin-bottom: 5px;
		}
		.imgUrl {
			width: 100%;
			height: 100px;
			margin-bottom: 10px;
			object-fit: cover;
		}
		.default-img {
			// width: 190px;
			height: 80px;
			margin-bottom: 10px;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.tail {
			border-top: 1px solid #eee;
			display: flex;
			align-items: center;
			padding-top: 3px;
			font-size: 12px;
			color: #ccc;
			img {
				width: 12px;
				height: 12px;
			}
			div {
				margin-left: 5px;
				margin-top: 3px;
			}
		}
	}

	.avatar {
		width: 30px;
		height: 30px;
		background: #fff;
		border-radius: 6px;

		img {
			width: 100%;
			height: 100%;
			transform: scale(0.9);
		}
	}
	.msg-card {
		width: 80%;
		background: #fff;
		border: 1px solid rgb(207, 207, 207);
		border-radius: 6px;
		position: relative;
		margin-top: 5px;
		margin-left: 10px;
		padding: 10px;
		&::after {
			content: ' ';
			width: 10px;
			height: 10px;
			background: rgb(255, 255, 255);
			position: absolute;
			z-index: 10;
			left: -6px;
			top: 9px;
			transform: rotateZ(45deg);
			border-left: 1px solid rgb(207, 207, 207);
			border-bottom: 1px solid rgb(207, 207, 207);
		}
	}
	/deep/ {
		.likeBtn {
			font-weight: initial;
			font-size: 12px;
			color: #409eff;
			padding: 2px 4px;
			border: 1px solid #409eff;
			border-radius: 4px;
			margin-bottom: 3px;
			display: inline-block;
		}
	}
}
/* 单行 */
.oneline {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

/* 双行 */
.twoline,
.threeline {
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	word-wrap: break-word;
	word-break: break-all;
	position: relative;
	white-space: normal;
}

.twoline {
	-webkit-line-clamp: 2;
}

/* 三行 */
.threeline {
	-webkit-line-clamp: 3;
}
</style>