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
					placeholder: "教师状态",
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
					]
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
		handleAdd() {
			this.titleAddOrEdit = "创建图标"
			this.addEditVisible = true;
			this.$nextTick(() => {
				this.$refs.addEditIcon.initGetConfig = true;
			});
		},
		getTableData(params = {}) {
			return new Promise((resolve, reject) => {
				const loading = this.$loading({
					lock: true,
					target: ".el-table",
				});
				this.$fetch(
					"config_get_icons",
					{
						loginUserId: this.$common.getUserId(),
						...this.pageConfig,
						...this.searchForm,
						...params
					}
				).then((res) => {
					this.tableData = res.data.records.map((item) => {
						item.iconStatus = this.iconStatus2Zh(item.iconStatus)
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
			this.titleAddOrEdit = "编辑讲师"
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
	},
	async created() {
		// 按分类搜索
		this.$fetch("projectType_normalList", {
			loginUserId: this.$common.getUserId(),
		}).then((res) => {
			let typeList = res.data.map((item) => ({
				label: item.typeName,
				value: item.typeId,
			}));
			this.formOptions.push({
				prop: "typeId",
				element: "el-select",
				placeholder: "分类",
				options: typeList,
			});
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