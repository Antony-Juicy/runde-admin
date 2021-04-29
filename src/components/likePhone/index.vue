<template>
	<div class="like-phone">
		<img src="@/assets/shouji.png" class="bg-shouji">
		<div class="over">
			<div class="inner">
				<div class="accountName">{{accountName}}</div>
				<div class="notice" v-if="mode == 'notice'">
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
				<div class="menu" v-if="mode == 'menu'">
					<div class="relative" ref="menus">
						<div class="left-pad">
							<img src="@/assets/kb-1.png">
						</div>
						<div v-for="(item,index) in cardData" :key="index" :data-index="index" class="menu-item" :draggable='false' @mousedown="handle_wantDrag">
							{{item.name}}
						</div>
					</div>

				</div>
			</div>

		</div>
	</div>
</template>

<script>
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
		mode: {
			type: String,
			require: true
		},
		cardData: {
			type: [Object, String, Array],
			require: true
		},
		accountName: {
			type: String,
			require: true
		},
		accountLogo: {
			type: String,
		}
	},
	data() {
		return {
			drag: {
				rect: {},
				mouse: {},
				elm: {},
				dragWrapper: {},
				dragSelector: ".menu-item",
				interval_start: 0,
				interval_stop: 0
			}
		}
	},
	computed: {
		mmdd() {
			this.$common.getFormatDate(Date.now(), 'mm月dd日')
		},
		noticeFontCount() {
			if (this.mode == 'notice') {
				let count = 0
				this.cardData.forEach((v) => {
					count += v.value.length
				})
				return count
			} else {
				return 0
			}
		}
	},
	methods: {
		handle_goPage() {
			if (/^(https|http):\/\//g.test(this.cardData.url)) {
				window.open(this.cardData.url)
			}
		},
		handle_wantDrag(e) {
			this.drag.dragWrapper = this.$refs.menus
			// 获取目标元素的绝对位置
			this.drag.rect = e.target.getBoundingClientRect()
			this.drag.layerX = e.layerX
			this.drag.layerY = e.layerY
			this.drag.mouse = {
				b_x: e.screenX,
				b_y: e.screenY,
			}
			e.path[0].classList.add('chose')
			e.path[0].addEventListener('mousemove', this.handle_doDrag)

			// 事件管理
			document.body.addEventListener('mousemove', this.handle_draging)
			document.body.addEventListener('mouseup', this.handle_dragEnd)
			this.drag.dragWrapper.querySelectorAll(`${this.drag.dragSelector}`).forEach(v => {
				v.addEventListener('mouseover', this.handle_dragInto)
				v.addEventListener('mouseout', this.handle_dragLeave)
			})
		},
		handle_doDrag(e) {
			let copy_elm = e.path[0].cloneNode(true)
			copy_elm.style.position = 'fixed'
			copy_elm.style.zIndex = '9999'
			copy_elm.style.width = this.drag.rect.width + 'px'
			copy_elm.style.height = this.drag.rect.height + 'px'
			copy_elm.style.left = this.drag.rect.left + 'px'
			copy_elm.style.top = this.drag.rect.top + 'px'
			copy_elm.style.opacity = '0.8'
			copy_elm.style.background = '#fff'
			copy_elm.style.boxSizing = 'border-box'
			copy_elm.style.transform = 'matrix(1,0,0,1,0,0)'
			copy_elm.style.border = '2px solid #448ef7'
			copy_elm.style.pointerEvents = 'none'
			copy_elm.style.transformOrigin = `${parseInt(String(this.drag.rect.layerX / this.drag.rect.width), 5) * 10000}% ${parseInt(String(this.drag.rect.layerY / this.drag.rect.height), 5) * 10000}%`
			this.drag.elm = copy_elm
			e.path[0].removeEventListener('mousemove', this.handle_doDrag)

			// 最后渲染一个临时的元素
			this.drag.dragWrapper.appendChild(copy_elm)
		},
		handle_draging(e) {
			this.drag.elm.style.transform = `matrix(1,0,0,1,${e.screenX - this.drag.mouse.b_x},${e.screenY - this.drag.mouse.b_y})`
		},
		handle_dragInto(e) {
			if (e.target.className.indexOf('chose') == -1) {
				let chose = this.drag.dragWrapper.querySelector(`${this.drag.dragSelector}.chose`)
				let target = e.path[0]
				let chose_move_offsetX = chose.offsetLeft - target.offsetLeft
				let chose_move_offsetY = target.offsetTop - chose.offsetTop
				chose.style.transition = ""
				target.style.transition = ""
				chose.remove
				if (chose.offsetLeft > target.offsetLeft && chose.offsetTop == target.offsetTop) {
					// 选中目标左移
					this.drag.dragWrapper.insertBefore(chose, target)
				} else {
					// 选中目标右移
					if (target.nextElementSibling) {
						this.drag.dragWrapper.insertBefore(chose, target.nextElementSibling)
					} else {
						this.drag.dragWrapper.appendChild(chose)
					}
				}
				let target_move_offsetX = chose.offsetLeft - target.offsetLeft
				let target_move_offsetY = target.offsetTop - chose.offsetTop
				chose.style.transform = `translate(${chose_move_offsetX}px,${chose_move_offsetY}px)`
				target.style.transform = `translate(${target_move_offsetX}px,${target_move_offsetY}px)`
				setTimeout(() => {
					chose.style.transition = 'transform 1000ms ease 0s'
					chose.style.transform = 'translate(0,0)'
					target.style.transition = 'transform 1000ms ease 0s'
					target.style.transform = 'translate(0,0)'
				})
			}
		},
		handle_dragLeave(e) {
			if (e.target.className.indexOf('chose')) {
				e.target.classList.remove('target')
			}
		},
		handle_dragEnd(e) {
			document.body.removeEventListener('mousemove', this.handle_draging)
			this.drag.elm.remove()
			this.drag.dragWrapper.querySelectorAll(`${this.drag.dragSelector}`).forEach(v => {
				v.removeEventListener('mouseover', this.handle_dragInto)
				v.removeEventListener('mouseout', this.handle_dragLeave)
				v.removeAttribute("style");
			})
			try {
				this.drag.dragWrapper.querySelector(`${this.drag.dragSelector}.target`).classList.remove('target')
			} catch (error) {
			}
			try {
				this.drag.dragWrapper.querySelector(`${this.drag.dragSelector}.chose`).classList.remove('chose')
			} catch (error) {

			}
			document.body.removeEventListener('mouseup', this.handle_dragEnd)
			setTimeout(() => {
				this.updateMenuSort()
			}, 100);

		},
		updateMenuSort() {
			let newSort = []
			this.$refs.menus.querySelectorAll('.menu-item').forEach(v => {
				newSort.push(Number(v.dataset.index))
			})
			let newMenu = []
			newSort.forEach((v, i) => {
				newMenu[i] = this.cardData[v]
			})

			this.$emit('changeMenu', newMenu)
		}
	}
}
</script>

<style lang='scss' scoped>
.like-phone {
	width: 100%;
	height: 100%;
	position: relative;
	user-select: none;

	.inner {
		width: 100%;
		height: 100%;
		position: relative;
	}
	.bg-shouji {
		position: absolute;

		z-index: 1;
	}
	.over {
		width: 345px;
		height: 696px;
		position: relative;
		z-index: 2;
		padding: 87px 28px 87px 24.5px;
	}
	.accountName {
		height: 68px;
		text-align: center;
		line-height: 33px;
		padding-top: 35px;
		font-size: 16px;
		color: #000;
		font-weight: bold;
	}
	.notice {
		background: #fff;
		width: 80%;
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
			font-size: 15px;
		}
		.link-text {
			color: rgb(0, 0, 238);
			cursor: pointer;
		}
	}
	.mpnews {
		display: flex;
		align-items: flex-start;
		padding: 0 10px;
		.title {
			font-size: 16px;
			font-weight: bold;
			margin-bottom: 5px;
		}
		.down {
			display: flex;
			.description {
				width: 100%;
				font-size: 13px;
				color: #ccc;
				height: 28px;
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
			height: 300px;
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
		.head {
			display: flex;
			align-items: center;
			margin-bottom: 5px;
			.logo {
				width: 20px;
				height: 20px;
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
			width: 190px;
			height: 152px;
			margin-bottom: 10px;
			object-fit: cover;
		}
		.default-img {
			width: 190px;
			height: 152px;
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
	.menu {
		// height: 40px;
		width: 100%;
		background: rgb(253, 250, 250);
		position: absolute;
		bottom: 0;
		.relative {
			padding: 5px 0;
			height: 50px;
			box-sizing: border-box;
			position: relative;
			display: flex;

			& > div {
				box-sizing: border-box;
				border-right: 1px solid #eee;
			}
			& > div:last-child {
				border-right: none;
			}
		}
		.left-pad {
			height: 40px;
			width: 40px;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-shrink: 0;
			background: rgb(253, 250, 250);
			img {
				width: 60%;
				height: 60%;
			}
		}
		.menu-item {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 14px;
			pointer-events: all;
			background: rgb(253, 250, 250);
		}
		.menu-item.target {
			background: rgb(230, 230, 230);
		}
	}
	.avatar {
		width: 40px;
		height: 40px;
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