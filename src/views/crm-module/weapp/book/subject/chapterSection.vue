<!-- 小节 -->
<template>
	<div class='section-container'>
		<!-- 搜索栏 -->
		<search-form :formOptions="formOptions" :showNum="2" @onSearch="onSearch"></search-form>
		<div class="w-container">
			<div class="btn-wrapper">
				<el-button type="primary" size="small" @click="handleAdd">创建节</el-button>
			</div>
			<!-- 表格主体 -->
			<rd-table :tableData="tableData" :tableKey="tableKey" :pageConfig.sync="pageConfig" fixedTwoRow @pageChange="pageChange">
				<template slot="edit" slot-scope="scope">
					<el-button @click="handleEdit(scope.row)" type="text" size="small">查阅/编辑</el-button>
					<el-button @click="handleDelete(scope.row)" type="text" style="color: #ec5b56" size="small">删除</el-button>
				</template>
			</rd-table>
		</div>
		<fullDialog class="addEditSection" :title="`${titleAddOrEdit}`" v-model="addEditVisiable" @change="addEditVisiable = false">
			<addEditSection :book="book" :subject="subject" :chapter="chapter" ref="addEditSection" v-if="addEditVisiable" @close="addEditVisiable = false" @refresh="refresh">
			</addEditSection>
		</fullDialog>
	</div>
</template>

<script>

import fullDialog from "@/components/FullDialog";
import addEditSection from './addEditSection'
import { scrollTo } from "@/utils/scroll-to";
export default {

	components: { fullDialog, addEditSection },
	props: {
		book: {
			type: Object,
			default: () => { return {} }
		},
		subject: {
			type: Object,
			default: () => { return {} }
		},
		chapter: {
			type: Object,
			default: () => { return {} }
		}
	},
	data() {
		return {
			formOptions: [
				{
					prop: "bookChapterName",
					element: "el-input",
					placeholder: "请输入节名称"
				},
				{
					prop: "bookChapterStatus",
					element: "el-select",
					placeholder: "节状态",
					options: [
						{
							label: "上架",
							value: "Show"
						},
						{
							label: "下架",
							value: "Close"
						},
						{
							label: "隐藏",
							value: "Hidden"
						},
					]
				},
			],
			tableData: [],
			tableKey: [
				{
					name: "ID主键",
					value: "bookChapterId",
					width: 80
				},
				{
					name: "节名称",
					value: "bookChapterName",
				},
				{
					name: "图书",
					value: "bookName",
				},
				{
					name: "科目",
					value: "bookSubjectName",
				},
				{
					name: "状态",
					value: "bookChapterStatus",
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
			searchForm: {}, //搜索栏信息
			addEditVisiable: false,
			titleAddOrEdit: "创建"
		};
	},

	computed: {},

	watch: {},

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
				this.$fetch(
					"book_get_chapters",
					{
						loginUserId: this.$common.getUserId(),
						...this.pageConfig,
						...this.searchForm,
						...params,
						parentId: this.chapter.bookChapterId, // 查询小节要传章节id
					}
				).then((res) => {
					this.tableData = res.data.records.map((item) => {
						item.bookChapterStatus = this.bookChapterStatus2Zh(item.bookChapterStatus)
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
		bookChapterStatus2Zh(status) {
			switch (status) {
				case 'Open': return '上架';
				case "Close": return '下架';
				case "Hidden": return '隐藏';
			}
		},
		handleAdd() {
			this.titleAddOrEdit = "创建节"
			this.addEditVisiable = true
		},
		handleEdit(data) {
			this.addEditVisiable = true
			this.$nextTick(() => {
				this.$refs.addEditSection.initFormData(data.bookChapterId)
			})

		},
		handleDelete(data) {
			let info = "小节"
			this.$confirm(`此操作将删除此${info}, 是否继续?`, "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			}).then(async () => {
				await this.$fetch("book_delete_chapter", {
					bookChapterId: data.bookChapterId,
					loginUserId: this.$common.getUserId(),
				}).then((res) => {
					if (res) {
						this.$message({
							message: "删除成功",
							type: "success",
						});
						setTimeout(() => {
							this.getTableData({
								pageNum: (this.tableData.length == 1 && this.pageConfig.pageNum > 1) ? (this.pageConfig.pageNum - 1) : this.pageConfig.pageNum
							});
						}, 50);
					}
				});
			})
		},
		refresh(val) {
			this.getTableData({
				pageNum: val || this.pageConfig.pageNum
			});
		},
	},

	mounted() {
		scrollTo(0, 800);
		this.getTableData()
	},
}
</script>
<style lang='scss' scoped>
.section-container {
	/deep/ {
		.addEditSection {
			.full-dialog-container .content {
				background: #fff !important;
			}
			.full-dialog-container {
				top: 0;
				bottom: 0;
			}
			&.el-loading-parent--relative {
				position: initial !important;
			}
		}
	}
}
</style>