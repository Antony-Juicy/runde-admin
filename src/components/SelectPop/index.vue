<template>

	<el-popover v-model="show" class="select-pop" placement="bottom-start" width="700" trigger="click" :append-to-body="false">
		<search-form v-if="searchObj.formOptions.length > 0" :formOptions="searchObj.formOptions" :showNum="searchObj.showNum" @onSearch="onSearch" ref="searchForm"></search-form>
		<div class="scroll-box" v-infinite-scroll="getTableData">
			<el-table :data="tableData" v-loading="tableLoad">
				<template v-for="(item,index) in tableObj.tableKey">
					<el-table-column v-if="!item.operate" :prop="item.value" :label="item.name" :width="item.width" :key="index"></el-table-column>
					<el-table-column v-else :key="index">
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
		<!-- <el-button slot="reference">click 激活</el-button> -->
	</el-popover>
</template>

<script>
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
			show: false
		}
	},
	methods: {
		handleClick(data) {
			this.show = false
			this.$emit('select', data)
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
			).catch(() => { this.tableLoad = false })
			let data = []
			if (res.data.hasOwnProperty('records')) {
				data = res.data.records
				this.pageConfig.hasNext = res.data.hasNext
			} else if (res.data.hasOwnProperty('item')) {
				data = res.data.item
				this.pageConfig.hasNext = res.data.item_count + this.tableData.length < res.data.total_count
			}
			if (typeof this.tableObj.transItem == 'function') {
				data.map(v => {
					return this.tableObj.transItem(v)
				})
			}
			this.tableData = this.tableData.concat(data)
			this.tableLoad = false
			this.pageConfig.pageNum++
		},
		load() {
			this.getTableData()
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
	}
}
.scroll-box {
	height: 200px;
	overflow: auto;
}
</style>