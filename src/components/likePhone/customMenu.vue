<template>
	<div class="menu">
		<div class="relative">
			<div class="left-pad">
				<img src="@/assets/kb-1.png">
			</div>
			<div ref="menus" class="menu-area">
				<template v-if="!sortStatus()">
					<div v-for="(item,index) in menuData" :key="index" :data-index="index" class="menu-item"
						:class="{showing:choseMenuStatus()[0] == index && choseMenuStatus()[1] == -1}" :draggable='false' @click="handle_choseMenu([index,-1])">
						{{item.name}}
						<div class="sub-list" v-if="choseMenuStatus()[0] == index" @click.stop>
							<div class="relative">
								<div class="sub-menu-item" :class="{showing:choseMenuStatus()[1] == index2}" v-for="(item2,index2) in item.sub_button" :key="index2"
									@click="handle_choseMenu([index,index2])">
									{{item2.name}}</div>
								<div class="sub-add" :class="{showing:choseMenuStatus()[1] == -2}" @click="handle_choseMenu([index,-2])">
									<i class="el-icon-plus"></i>
								</div>
							</div>
						</div>
					</div>
				</template>
				<template v-else>
					<div v-for="(item,index) in menuData" :key="index" :data-index="index" class="menu-item" :draggable='false' @mousedown="handle_wantDrag">
						<i class="el-icon-s-unfold"></i>{{item.name}}
					</div>
				</template>
			</div>
			<div v-if="menuData.length < 3 && !sortStatus()" class="add-menu" :class="{showing:choseMenuStatus()[0] == -2}" style="cursor:pointer" @click="handle_choseMenu([-2,-1])">
				<i class="el-icon-plus"></i>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		menuData: {
			typeof: Object,
			require: true,
		},
	},
	inject: ['changeMenu', 'choseMenu', 'sortStatus', 'choseMenuStatus'],
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
			},
		}
	},
	methods: {
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
			copy_elm.style.transition = ''
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
			try {
				this.drag.elm.remove()
			} catch (error) {

			}
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
				this.drag.dragWrapper.querySelector(`${this.drag.dragSelector}.chose`).removeEventListener('mousemove', this.handle_doDrag)
				this.drag.dragWrapper.querySelector(`${this.drag.dragSelector}.chose`).classList.remove('chose')
			} catch (error) {

			}
			document.body.removeEventListener('mouseup', this.handle_dragEnd)
			this.updateMenuSort()
		},
		handle_choseMenu(data) {
			
			this.choseMenu(data)
		},
		updateMenuSort() {
			let newSort = []
			this.$refs.menus.querySelectorAll('.menu-item').forEach(v => {
				newSort.push(Number(v.dataset.index))
			})
			let newMenu = []
			newSort.forEach((v, i) => {
				newMenu[i] = JSON.parse(JSON.stringify(this.menuData[v]))
			})
			this.changeMenu(newMenu)
		},
		handle_addMenu(data) {
			this.addMenu(data)
		},
	},
}
</script>

<style lang="scss" scope>
.menu {
	// height: 40px;
	width: 100%;
	background: rgb(253, 250, 250);
	position: absolute;
	bottom: 0;
	& > .relative {
		padding: 5px 0;
		height: 45px;
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
		height: 100%;
		width: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		background: rgb(253, 250, 250);
		img {
			width: 60%;
			height: 60%;
			object-fit: scale-down;
		}
	}
	.menu-area {
		display: flex;
		width: 100%;
		align-items: center;
		justify-content: center;
	}
	.menu-item {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 12px;
		pointer-events: all;
		background: rgb(253, 250, 250);
		position: relative;
		border-right: 1px solid #eee;
		.el-icon-s-unfold {
			margin-top: -2px;
			margin-right: 5px;
			pointer-events: none;
		}
		.sub-list {
			position: absolute;
			bottom: 40px;
			padding-bottom: 10px;
			width: 100%;
			z-index: 9999;
			color: #000;
			& > .relative {
				position: relative;
				background: #f6f5f5;
				// padding: 10px;
				border: 1px solid #d8d8d8;
				border-radius: 5px;
				overflow: hidden;
			}
			&::after {
				display: block;
				width: 10px;
				height: 10px;
				background: #f6f5f5;
				position: absolute;
				content: '';
				left: 0;
				right: 0;
				margin: auto;
				bottom: 5px;
				transform: rotateZ(45deg);
				border-bottom: 1px solid #d8d8d8;
				border-right: 1px solid #d8d8d8;
			}

			.sub-add {
				padding: 10px 0;
				width: 100%;
				text-align: center;
				cursor: pointer;
				&:hover {
					background-color: #eee;
				}
			}
			.sub-add.showing {
				position: relative;
				border: 1px solid #448ef7;
				border-radius: 3px;
				z-index: 10;
			}
			.sub-menu-item {
				padding: 10px 0;
				width: 100%;
				text-align: center;
				border-bottom: 1px solid #d8d8d8;
				cursor: pointer;
				position: relative;
				z-index: 10;
				&:hover {
					background-color: #eee;
				}
			}
			.sub-menu-item.showing {
				border: 1px solid #448ef7;
				border-radius: 3px;
			}
			.sub-menu-item:last-child {
				border-bottom: none;
			}
		}
	}
	.menu-item.showing {
		outline: 1px solid #448ef7;
		color: #448ef7;
		box-sizing: border-box;
		z-index: 10;
	}
	.menu-item:last-child {
		border-right: none;
	}

	.add-menu {
		max-width: 100%;
		min-width: 40px;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 14px;
		padding: 0 5px;
		cursor: pointer;
		&:hover {
			color: #448ef7;
		}
	}
	.add-menu.showing {
		outline: 1px solid #448ef7;
		color: #448ef7;
		box-sizing: border-box;
		z-index: 10;
	}
}
</style>