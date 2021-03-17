<template>
	<div class='icon-container'>
		<!-- 搜索栏 -->
		<search-form :formOptions="formOptions" :showNum="3" @onSearch="onSearch"></search-form>
		<div class="w-container">
			<div class="btn-wrapper">
				<el-button type="primary" size="small" @click="handleAdd">创建图标</el-button>
			</div>
			<!-- 表格主体 -->
			<rd-table :tableData="tableData" :tableKey="tableKey" :pageConfig.sync="pageConfig" fixedTwoRow @pageChange="pageChange">

				<template slot="iconImageUrl" slot-scope="scope">
					<el-image style="width: 100px; height: 100px" :src="scope.row.iconImageUrl" fit="contain"></el-image>
				</template>
				<template slot="edit" slot-scope="scope">
					<el-button @click="handleEdit(scope.row)" type="text" size="small">查阅/编辑</el-button>
					<el-button @click="handleDelete(scope.row)" type="text" style="color: #ec5b56" size="small">删除</el-button>
				</template>
			</rd-table>
			<fullDialog :title="`${titleAddOrEdit}`" v-model="addEditVisible" @change="addEditVisible = false">
				<addEditIcon ref="addEditIcon" v-if="addEditVisible" @close="addEditVisible = false" @refresh="refresh"></addEditIcon>
			</fullDialog>
		</div>

	</div>
</template>


<script>
import fullDialog from "@/components/FullDialog";
import addEditIcon from './addEditIcon'
export default {
	data() {
		return {
			formOptions: [
				{
					prop: "iconTitle",
					element: "el-input",
					placeholder: "请输入图标名",
				},
				{
					prop: "iconStatus",
					element: "el-select",
					placeholder: "图标状态",
					options: [
						{
							label: "上架",
							value: "Open"
						},
						{
							label: "下架",
							value: "Close"
						},
						{
							label: "隐藏",
							value: "Hidden"
						}
					],
				},

			],
			tableData: [

			],
			tableKey: [
				{
					name: "ID主键",
					value: "linkId",
					width: 80
				},
				{
					name: "图标标题",
					value: "iconTitle",
				},
				{
					name: "项目分类",
					value: "typeName",
				},
				{
					name: "图标图片",
					value: "iconImageUrl",
					operate: true,
					width: 120
				},
				{
					name: "跳转类型",
					value: "linkType",
				},
				{
					name: "跳转链接",
					value: "iconLink",
				},
				{
					name: "状态",
					value: "iconStatus",
				},
				{
					name: "排序值",
					value: "orderValue",
				},
				{
					name: "操作",
					value: "edit",
					operate: true,
					width: 200,
				},
			],
			pageConfig: {
				totalCount: 0,
				pageNum: 1,
				pageSize: 10,
			},
			titleAddOrEdit: "创建讲师",
			searchForm: {}, //搜索栏信息
			addEditVisible: false,
		}
	},
	components: { fullDialog, addEditIcon },
	methods: {
		onSearch(data) {
			this.searchForm = { ...data };
			this.pageConfig.pageNum = 1;
			this.getTableData();
		},
		pageChange(val) {
			this.pageConfig.pageNum = val.page;
			this.pageConfig.pageSize = val.limit;
			this.getTableData();
		},
		getTableData(params = {}) {
			return new Promise((resolve, reject) => {
				const loading = this.$loading({
					lock: true,
					target: ".el-table",
				});
				let searchForm = JSON.parse(JSON.stringify(this.searchForm))
				if (searchForm.typeId && searchForm.typeId.constructor == Array) {
					searchForm.typeId = searchForm.typeId.pop()
				}
				this.$fetch(
					"config_get_icons",
					{
						loginUserId: this.$common.getUserId(),
						...this.pageConfig,
						...searchForm,
						...params
					}
				).then((res) => {
					this.tableData = res.data.records.map((item) => {
						item.iconStatus = this.iconStatus2Zh(item.iconStatus)
						if(item.linkType == 'None'){
							item.iconLink = '/'
						}
						Object.assign(item,this.linkType2Zh(item))
						return item;
					});
					this.pageConfig.totalCount = res.data.totalCount;
					setTimeout(() => {
						loading.close();
					}, 200);
					resolve();
				}).catch(err => {
					loading.close();
					console.log(err)
					reject();
				});
			})
		},
		refresh(val) {
			this.getTableData({
				pageNum: val || this.pageConfig.pageNum
			});
		},
		handleAdd() {
			this.titleAddOrEdit = "创建图标"
			this.addEditVisible = true;
			this.$nextTick(() => {
				this.$refs.addEditIcon.initGetConfig = true;
			});
		},
		handleEdit(data) {
			this.titleAddOrEdit = "编辑图标"
			this.addEditVisible = true;
			this.$nextTick(() => {
				this.$refs.addEditIcon.initGetConfig = true;
				this.$refs.addEditIcon.initFormData(data.linkId);
			});
		},
		handleDelete(data) {
			let info = "图标"
			this.$confirm(`此操作将删除此${info}, 是否继续?`, "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			}).then(async () => {
				await this.$fetch("config_delete_icon", {
					linkId: data.linkId,
					loginUserId: this.$common.getUserId(),
				}).then((res) => {
					if (res) {
						this.$message({
							message: "删除成功",
							type: "success",
						});
						setTimeout(() => {
							this.getTableData();
						}, 50);
					}
				});
			})
		},
		iconStatus2Zh(status) {
			switch (status) {
				case 'Open': return '上架';
				case "Close": return '下架';
				case "Hidden": return '隐藏';
			}
		},
		linkType2Zh(data) {
			let type = {
				linkType: "",
				iconLink: "",
			}
			let xcxPage = {
				"InnerXcxLive": "/pagesLive/pages/index/index?liveId=",
				"InnerXcxCourse": "pages/Course/Play/Play?id=",
				"InnerXcxBook": "/pages/Book/Book?id=",
			}
			if (data.linkType == 'InnerXcx') {
				for (const key in xcxPage) {
					if (data.iconLink.indexOf(xcxPage[key]) > -1) {
						data.linkType = key
						type.iconLink = data.iconLink.split('=')[1]
						break
					}
				}
			}
			switch (data.linkType) {
				case 'None': type.linkType = '无目标'; type.iconLink = '/'; break;
				case 'H5': type.linkType = '网页'; type.iconLink = data.iconLink; break;
				case 'InnerXcxLive': type.linkType = '直播'; break;
				case 'InnerXcxCourse': type.linkType = '科目'; break;
				case 'InnerXcxBook': type.linkType = '图书'; break;
				case 'OutSideXcx': type.linkType = '小程序外'; break;
			}
			return type
		},
	},
	created() {
		// 按分类搜索
		this.$fetch(
			"projectType_select",
		).then((res) => {
			this.formOptions.push({
				prop: "typeId",
				element: "el-cascader",
				placeholder: "请选择项目类型",
				props: { checkStrictly: true },
				options: this.$common.getTypeTree(res.data),
			})
		});
		this.getTableData()
	},
}
</script>

<style lang='scss' scoped>
.icon-container {
	/deep/ {
		.el-form-item__content {
			width: 495px;
		}
	}
	.full-dialog-container .top-title {
		padding-left: 50px;
	}
}
</style>