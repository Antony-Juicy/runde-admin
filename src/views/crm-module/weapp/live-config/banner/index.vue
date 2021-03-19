<template>
	<div class='icon-container'>
		<!-- 搜索栏 -->
		<search-form :formOptions="formOptions" :showNum="3" @onSearch="onSearch"></search-form>
		<div class="w-container">
			<div class="btn-wrapper">
				<el-button type="primary" size="small" @click="handleAdd">创建轮播图</el-button>
			</div>
			<!-- 表格主体 -->
			<rd-table :tableData="tableData" :tableKey="tableKey" :pageConfig.sync="pageConfig" fixedTwoRow @pageChange="pageChange">

				<template slot="bannerImageUrl" slot-scope="scope">
					<el-image style="width: 100px; height: 100px" :src="scope.row.bannerImageUrl" fit="contain"></el-image>
				</template>
				<template slot="edit" slot-scope="scope">
					<el-button @click="handleEdit(scope.row)" type="text" size="small">查阅/编辑</el-button>
					<el-button @click="handleDelete(scope.row)" type="text" style="color: #ec5b56" size="small">删除</el-button>
				</template>
			</rd-table>
			<fullDialog :title="`${titleAddOrEdit}`" v-model="addEditVisible" @change="addEditVisible = false">
				<addEditBanner ref="addEditBanner" v-if="addEditVisible" @close="addEditVisible = false" @refresh="refresh"></addEditBanner>
			</fullDialog>
		</div>

	</div>
</template>


<script>
import fullDialog from "@/components/FullDialog";
import addEditBanner from './addEditBanner'
export default {
	data() {
		return {
			formOptions: [
				{
					prop: "bannerStatus",
					element: "el-select",
					placeholder: "轮播图状态",
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
				{
					prop: "bannerType",
					element: "el-select",
					placeholder: "跳转类型",
					options: [
						{
							label: "不跳转",
							value: "None"
						},
						{
							label: "网页",
							value: "H5"
						},
						{
							label: "小程序页面",
							value: "InnerXcx"
						},
						// {
						// 	label: "小程序外",
						// 	value: "OutSideXcx"
						// }
					]
				},

			],
			tableData: [

			],
			tableKey: [
				{
					name: "ID主键",
					value: "bannerId",
					width: 80
				},
				{
					name: "项目分类",
					value: "typeName",
				},
				{
					name: "轮播图片",
					value: "bannerImageUrl",
					operate: true,
					width: 120
				},
				{
					name: "跳转类型",
					value: "bannerType",
					width: 80,
				},
				{
					name: "跳转目标",
					value: "bannerTarget",
				},
				{
					name: "状态",
					value: "bannerStatus",
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
			titleAddOrEdit: "创建轮播图",
			searchForm: {}, //搜索栏信息
			addEditVisible: false,
		}
	},
	components: { fullDialog, addEditBanner },
	methods: {
		handleAdd() {
			this.titleAddOrEdit = "创建轮播图"
			this.addEditVisible = true;
			this.$nextTick(() => {
				this.$refs.addEditBanner.initGetConfig = true;
			});
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
					"config_get_banners",
					{
						loginUserId: this.$common.getUserId(),
						...this.pageConfig,
						...searchForm,
						...params
					}
				).then((res) => {
					this.tableData = res.data.records.map((item) => {
						item.bannerStatus = this.bannerStatus2Zh(item.bannerStatus)
						if (item.bannerType == 'None') {
							item.bannerTarget = "/"
						}
						Object.assign(item, this.bannerType2Zh(item))
						// item.bannerType = this.bannerType2Zh(item.bannerType)
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

		refresh(val) {
			this.getTableData({
				pageNum: val || this.pageConfig.pageNum
			});
		},
		handleEdit(data) {
			this.titleAddOrEdit = "编辑轮播图"
			this.addEditVisible = true;
			this.$nextTick(() => {
				this.$refs.addEditBanner.initGetConfig = true;
				this.$refs.addEditBanner.initFormData(data.bannerId);
			});
		},
		handleDelete(data) {
			let info = "图标"
			this.$confirm(`此操作将删除此${info}, 是否继续?`, "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			}).then(async () => {
				await this.$fetch("config_delete_banner", {
					bannerId: data.bannerId,
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
		bannerStatus2Zh(status) {
			switch (status) {
				case 'Open': return '上架';
				case "Close": return '下架';
				case "Hidden": return '隐藏';
			}
		},
		bannerType2Zh(data) {
			let type = {
				bannerType: "",
				bannerTarget: "",
			}
			let xcxPage = {
				"InnerXcxLive": "/pagesLive/pages/index/index?liveId=",
				"InnerXcxCourse": "/pages/Course/Play/Play?id=",
				"InnerXcxBook": "/pages/Book/Book?id=",
			}
			if (data.bannerType == 'InnerXcx') {
				for (const key in xcxPage) {
					if (data.bannerTarget.indexOf(xcxPage[key]) > -1) {
						data.bannerType = key
						type.bannerTarget = data.bannerTarget.split('=')[1]
						break
					}
				}
			}
			switch (data.bannerType) {
				case 'None': type.bannerType = '无目标'; type.bannerTarget = '/'; break;
				case 'H5': type.bannerType = '网页'; type.bannerTarget = data.bannerTarget; break;
				case 'InnerXcxLive': type.bannerType = '直播'; break;
				case 'InnerXcxCourse': type.bannerType = '科目'; break;
				case 'InnerXcxBook': type.bannerType = '图书'; break;
				case 'OutSideXcx': type.bannerType = '小程序外'; break;
			}
			return type
		}

	},
	async created() {
		// 按分类搜索
		this.$fetch(
			"projectType_select",
		).then((res) => {
			this.formOptions.push({
				prop: "typeId",
				element: "el-cascader",
				placeholder: "请选择项目类型",
				options: this.$common.getTypeTree(res.data),
			})
		});
		await this.getTableData()
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