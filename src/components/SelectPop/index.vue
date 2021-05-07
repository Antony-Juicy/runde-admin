<template>

	<el-popover v-model="show" class="select-pop" placement="bottom-start" width="700" trigger="click" :append-to-body="false">
		<slot name="header"></slot>
		<search-form v-if="searchObj.formOptions.length > 0" :formOptions="searchObj.formOptions" :showNum="searchObj.showNum" @onSearch="onSearch" ref="searchForm"></search-form>
		<div class="scroll-box" ref="scrollBox" v-infinite-scroll="getTableData">
			<div v-if="tableObj.waterfall && !waterFallLoad" class="lane-wrapper">
				<div class="lane" v-for="(item,index) in tableObj.lane" :key="index">
					<div class='lane-item' v-for="(item,index) in waterFallData[index]" :key="index" @click="show = false">
						<slot name="lane" :data="item"></slot>
					</div>
				</div>
			</div>
			<el-table v-if="!tableObj.waterfall" :data="tableData">
				<el-table-column width="55" v-if="tableObj.multiple">
					<template slot-scope="scope">
						<el-checkbox v-model="scope.row.select" @change="handleMultiple(scope.row)"></el-checkbox>
					</template>
				</el-table-column>

				<template v-for="(item,index) in tableObj.tableKey">
					<el-table-column v-if="!item.operate" :prop="item.value" :label="item.name" :width="item.width" :key="index"></el-table-column>
					<el-table-column v-else :key="index" :label="item.name">
						<template slot-scope="scope">
							<slot :name="item.value" :row="scope.row"></slot>
						</template>
					</el-table-column>
				</template>
				<el-table-column fixed="right" label="操作" width="100">
					<template slot-scope="scope">
						<el-button @click="handleClick(scope.row)" type="text" size="small">选中</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div slot="reference" class="reference" @click="load">
			<slot></slot>
		</div>
		<slot name="footer"></slot>
		<!-- <el-button slot="reference">click 激活</el-button> -->
	</el-popover>
</template>

<script>
/* 
// 这个是搜索相关的配置，包含搜索条件配置
searchObj: {
	api: "填写配置的api名",
	// 这个是筛选条件配置举例 当前可筛选条件 labelName 和 labelType ，且labelType是选择类型，提供了两个可选项
	formOptions: [
		{
			prop: "labelName",
			element: "el-input",
			placeholder: "请输入标签名称",
		},
		{
			prop: "labelType",
			element: "el-select",
			placeholder: "请选择标签类型",
			options: [
				{
					label: '系统标签',
					value: '0'
				},
				{
					label: '自定义标签',
					value: '1'
				}
			]
		},
	],
	// 显示多少个筛选条件
	showNum: 2,
	// 是否需要显示项目分类筛选条件
	needType: false,
	// api接口的额外参数
	params: {
		appId: '',
	}
},
// 这里是表格内数据配置
tableObj: {
	// 这个是表格内显示的内容是什么
	tableKey: [
		{
			name: "ID主键",
			value: "id",
			width: 80,
		},
		{
			name: "标签名称",
			value: "labelName",
		},
		{
			name: "标签类型",
			value: "labelTypeZH",
			// 当 operate 为true 的时候，组价标签内可以通过 <template slot="labelTypeZH" slot-scope="scope"></template> 来填写自定义插槽显示的内容。且会附带作用域数据
			operate:true,
		},
	],
	// 多选
	multiple:true,
	// 这个是对表格元素可以再进行改动
	transItem: (item) => {
		item.labelTypeZH = item.labelType == '0' ? '系统标签' : '自定义标签'
		return item
	},
	// 启用瀑布流模式，数据加载不已表格形式呈现，每个数据单元都必须通过插槽渲染
	waterfall:true,
	// 瀑布流专用属性: 泳道数
	lane:2,
}

*/
export default {
	props: {
		searchObj: {
			type: Object,
			default: () => {
				return {}
			}
		},
		tableObj: {
			type: Object,
			default: () => {
				return []
			}
		}
	},
	data() {
		return {
			tableData: [],
			tableLoad: false,
			searchForm: {},
			pageConfig: {
				totalCount: 0,
				pageNum: 1,
				pageSize: 10,
				hasNext: true
			},
			show: false,
			waterFallData: [],
			waterFallLoad: false
		}
	},
	methods: {
		handleClick(data) {
			if (this.tableObj.multiple) {
				data.select = !data.select
				this.$emit('select', data)
			} else {
				this.show = false
				this.$emit('select', data)
			}

		},
		onSearch(data) {
			this.searchForm = { ...data };
			this.pageConfig.pageNum = 1;
			this.pageConfig.hasNext = true;
			this.tableData = JSON.parse(JSON.stringify([]))
			this.getTableData();
		},
		// 使用函数防抖，防止内容加长触发滚动等于在同一时间发起了两次请求
		async getTableData() {
			if (this.tableLoad) {
				return
			}
			if (!this.pageConfig.hasNext) {
				return
			}
			let markScollHeight
			// 记录下新增数据前的滚动区是滚到了哪里
			if (!this.tableObj.waterfall) {
				markScollHeight = this.tableData.length == 0 ? 0 : this.$refs.scrollBox.scrollHeight
			} else {
				markScollHeight = this.waterFallData[0].length == 0 ? 0 : this.$refs.scrollBox.scrollHeight
			}

			this.tableLoad = true
			// 深拷贝
			let searchForm = JSON.parse(JSON.stringify(this.searchForm))
			if (searchForm.typeId && searchForm.typeId.constructor == Array) {
				searchForm.typeId = searchForm.typeId.pop()
			}
			let res = await this.$fetch(
				this.searchObj.api,
				{
					loginUserId: this.$common.getUserId(),
					...this.pageConfig,
					...searchForm,
					...this.searchObj.params
				}
			).catch(() => { })
			if (!res || this.$common.isEmpty(res.data)) {
				return
			}

			let data = []
			// 暂时的话 只有这个获取公众号素材接口是需要特殊处理的，它返回的结构并不是和其他通用的分页请求格式保持风格统一。
			if (this.searchObj.api == 'graphic_message_get_material') {
				if (this.searchObj.params.type == 'news') {
					res.data.item.forEach(v => {
						data = data.concat(v.content.news_item)
					})
				} else {
					data = res.data.item
				}
				this.pageConfig.hasNext = res.data.item.length > 0
			}
			else if (this.searchObj.api == 'custom_menu_get_material') {
				data = res.data.item
				this.pageConfig.hasNext = res.data.item.length > 0
			}
			else {
				data = res.data.records
				this.pageConfig.hasNext = res.data.hasNext
			}

			data = data.map(v => {
				let item = {}
				if (typeof this.tableObj.transItem == 'function') {
					Object.assign(item, this.tableObj.transItem(v))
				}
				if (this.tableObj.multiple) {
					item.select = false
				}
				return item
			})
			let trHeight
			if (!this.tableObj.waterfall) {

				// 记录一下表单的每一栏是多高，这个一般都是固定的，可以随便选一个
				trHeight = this.$refs.scrollBox.querySelector('tr').offsetHeight || 0
				this.tableData = this.tableData.concat(data)
			}
			else {
				// 嘿 ！
				this.waterFallLoad = true
				// 数据切割
				data.forEach((v, i) => {
					let position = i % this.tableObj.lane
					if (!this.waterFallData[position]) {
						this.waterFallData[position] = []
					}
					this.waterFallData[position].push(v)
				})
			}

			this.pageConfig.pageNum++

			this.$nextTick(() => {
				// 数据更新之后，把滚动条滚动到上一个滚动的地方，且再往上一个tr，这样用户大概会感知到继续往下滚的内容是新加载出来的。
				// 做这个操作的最根本原因是，这个表单新加数据之后，其实并不会触发滚动区文档流往下新增，导致的问题就是用户滚动到底部之后，每次数据新增之后又触发了一个新的
				// 页面滚动到底部的事件，这就导致了请求会无休止的加载直至再无更多数据。这个问题比较严重，所以要做个特殊处理。
				if (!this.tableObj.waterfall) {
					this.$refs.scrollBox.scrollTo(0, markScollHeight - trHeight)
				}
				this.tableLoad = false
				this.waterFallLoad = false
				// 瀑布流就很神奇，waterFallLoad == true 会触发页面元素的隐藏，加载完成之后再显示元素这样插槽就会再次渲染，不然的话新增的插槽是不会显示的。
				this.$nextTick(() => {
					if (this.tableObj.waterfall) {
						// 然后再来定这个滚动高度，不然的话会一直回到上一个滚动位置
						this.$refs.scrollBox.scrollTo(0, markScollHeight)
					}
				})
			})
		},
		load() {
			this.tableLoad = false
			this.waterFallLoad = false
			if (!this.tableObj.waterfall) {
				if (this.tableData.length == 0) {
					this.getTableData()
				}
			} else {
				if (this.waterFallData[0].length == 0) {
					this.getTableData()
				}
			}

		},
		handleMultiple(data) {
			this.$emit('select', data)
		}
	},
	async created() {
		if (this.searchObj.needType) {
			let projectType_select_res = await this.$fetch(
				"projectType_select",
			);
			let typeId_select = {
				prop: "typeId",
				element: "el-cascader",
				placeholder: "请选择项目类型",
				// props: { checkStrictly: true },
				options: this.$common.getTypeTree(projectType_select_res.data),
			}
			this.searchObj.formOptions.push(typeId_select);
			this.$refs.searchForm.addInitValue()
		}

		if (this.tableObj.waterfall) {
			// this.tableObj.lane.forEach((v, i) => {
			// 	this.waterFallData[i] = []
			// })
			for (let index = 0; index < this.tableObj.lane; index++) {
				this.waterFallData[index] = []
			}

		}
	}
}
/**
 *  函数防抖 设定时间内多次事件一次相应
 *
 * @param {Function} fn
 * @param {number} wait
 * @returns
 */
function debounce(fn, wait) {
	let timer;
	return function () {
		var context = this;
		var args = arguments;
		if (timer) {
			clearTimeout(timer);
			timer = null;
		}
		timer = setTimeout(function () {
			fn.apply(context, args);
		}, wait);
	};
}
</script>

<style lang='scss' scoped>
.select-pop {
	/deep/ {
		.el-form--inline {
			width: 100% !important;
		}
		// 清除穿透样式内容
		.scroll-box .el-table {
			max-height: none !important;
			overflow: hidden;
		}
	}
}
.scroll-box {
	height: 300px;
	overflow: auto;
}
.lane-wrapper {
	display: flex;
	justify-content: space-between;
	.lane {
		width: 100%;
		margin-right: 20px;
		&:last-child {
			margin-right: 0px;
		}
	}
}
</style>