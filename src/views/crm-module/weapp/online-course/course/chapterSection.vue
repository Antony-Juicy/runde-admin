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
		<fullDialog class="addEditSection" :title="`${titleAddOrEdit}`" v-model="addEditVisible" @change="handleEditClose">
			<addEditSection ref="addEditSection" v-if="addEditVisible" @close="handleEditClose" @refresh="refresh" :courseClass="courseClass" :course="course" :chapter="chapter">
			</addEditSection>
		</fullDialog>
	</div>
</template>

<script>

import fullDialog from "@/components/FullDialog";
import addEditSection from './addEditSection'
import { scrollTo } from "@/utils/scroll-to";
export default {
	props: {
		courseClass: {
			type: Object,
			default: () => { return {} }
		},
		course: {
			type: Object,
			default: () => { return {} }
		},
		chapter: {
			type: Object,
			default: () => { return {} }
		}
	},
	components: { fullDialog, addEditSection },
	data() {
		return {
			formOptions: [
				{
					prop: "courseChapterName",
					element: "el-input",
					placeholder: "请输入节名称"
				},
				{
					prop: "courseChapterStatus",
					element: "el-select",
					placeholder: "节状态",
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
						},
					]
				},
			],
			tableData: [],
			tableKey: [
				{
					name: "ID主键",
					value: "courseChapterId",
					width: 80
				},
				{
					name: "节名称",
					value: "courseChapterName",
				},
				{
					name: "班级",
					value: "courseClassName",
				},
				{
					name: "科目",
					value: "courseName",
				},
				{
					name: "视频ID",
					value: "courseVideoId",
				},
				{
					name: "状态",
					value: "courseChapterStatus",
					width: 80
				},
				{
					name: "排序值",
					value: "orderValue",
					width: 80
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
			addEditVisible: false,
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
				this.$fetch(
					"online_course_get_chapters",
					{
						loginUserId: this.$common.getUserId(),
						...this.pageConfig,
						...this.searchForm,
						...params,
						parentId: this.chapter.courseChapterId, // 查询小节要传章节id
					}
				).then((res) => {
					this.tableData = res.data.records.map((item) => {
						item.courseChapterStatus = this.courseChapterStatus2Zh(item.courseChapterStatus)
						return item;
					});
					this.pageConfig.totalCount = res.data.totalCount;
					resolve();
				}).catch(err => {
					console.log(err)
					reject();
				});
			})
		},
		courseChapterStatus2Zh(status) {
			switch (status) {
				case 'Open': return '上架';
				case "Close": return '下架';
				case "Hidden": return '隐藏';
			}
		},
		handleAdd() {
			this.titleAddOrEdit = "创建节"
			this.addEditVisible = true
			this.markScroll = 0
		},
		handleEdit(data) {
			this.addEditVisible = true
			this.markScroll = document.documentElement.scrollTop
			this.$nextTick(() => {
				this.$refs.addEditSection.initFormData(data.courseChapterId)
			})
		},
		handleDelete(data) {
			let info = "小节"
			this.$confirm(`此操作将删除此${info}, 是否继续?`, "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			}).then(async () => {
				await this.$fetch("online_course_delete_chapter", {
					courseChapterId: data.courseChapterId,
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
		handleEditClose() {
			this.addEditVisible = false
			scrollTo(this.markScroll, 100)
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

			&.el-loading-parent--relative {
				position: initial !important;
			}
		}
		.full-dialog-container {
			top: 0;
			bottom: 0;
		}
	}
}
</style>