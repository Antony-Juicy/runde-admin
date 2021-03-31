<!-- 章节 -->
<template>
	<div class='chapter-container'>
		<!-- 搜索栏 -->
		<search-form :formOptions="formOptions" :showNum="2" @onSearch="onSearch"></search-form>
		<div class="w-container">
			<div class="btn-wrapper">
				<el-button type="primary" size="small" @click="handleAdd">创建章</el-button>
			</div>
			<!-- 表格主体 -->
			<rd-table :tableData="tableData" :tableKey="tableKey" :pageConfig.sync="pageConfig" fixedTwoRow @pageChange="pageChange">

				<template slot="edit" slot-scope="scope">
					<el-button @click="handleEdit(scope.row)" type="text" size="small">查阅/编辑</el-button>
					<el-button @click="handleImport(scope.row)" type="text" size="small" style="color: rgb(255, 165, 0)">导入节</el-button>
					<br />
					<el-button @click="handleSection(scope.row)" type="text" style="color: #67c23a" size="small">查看小节</el-button>
					<el-button @click="handleDelete(scope.row)" type="text" style="color: #ec5b56" size="small">删除</el-button>
				</template>
			</rd-table>
		</div>
		<fullDialog class="addEditChapter" :title="`${titleAddOrEdit}`" v-model="addEditVisible" @change="handleEditClose">
			<addEditChapter :book="book" :subject="subject" ref="addEditChapter" v-if="addEditVisible" @close="handleEditClose" @refresh="refresh"></addEditChapter>
		</fullDialog>
		<fullDialog class="chapterSection" title="科目管理 > 章节目录 > 查看小节" v-model="chapterSectionVisible" @change="handleSectionClose">
			<chapterSection :book="book" :subject="subject" :chapter="chapter" v-if="chapterSectionVisible" @close="handleSectionClose"></chapterSection>
		</fullDialog>
		<!-- 链接 -->
		<rd-dialog :title="'EXCEL 导入到数据库'" :dialogVisible="importVisible" :showFooter="false" :width="'500px'" @handleClose="importVisible = false">
			<importFile v-if="importVisible" @submit="handleImportExcel" @cancel="importVisible = false" @download="handleDownTemp"></importFile>
		</rd-dialog>
	</div>
</template>

<script>


import fullDialog from "@/components/FullDialog";
import chapterSection from './chapterSection'
import addEditChapter from './addEditChapter'
import { scrollTo } from "@/utils/scroll-to";
import importFile from './importFile'
export default {

	components: { fullDialog, chapterSection, addEditChapter, importFile },
	props: {
		book: {
			type: Object,
			default: () => { return {} }
		},
		subject: {
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
					placeholder: "请输入章名称"
				},
				{
					prop: "bookChapterStatus",
					element: "el-select",
					placeholder: "章状态",
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
					value: "bookChapterId",
					width: 80
				},
				{
					name: "章名称",
					value: "bookChapterName",
				},
				{
					name: "图书名称",
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
			titleAddOrEdit: "创建",
			searchForm: {}, //搜索栏信息
			addEditVisible: false,
			chapterSectionVisible: false,
			chapter: {},
			markScroll: 0,
			importVisible: false,
			importFileBookChapterId: '',
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
						parentId: 0,
						bookSubjectId: this.subject.bookSubjectId, // 查询目录 bookSubjectId 查询所属科目
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
		handleAdd() {
			this.markScroll = 0
			this.titleAddOrEdit = "创建章节"
			this.addEditVisible = true
		},
		handleEdit(data) {
			this.markScroll = document.documentElement.scrollTop
			this.titleAddOrEdit = "编辑章节"
			this.addEditVisible = true

			this.$nextTick(() => {
				this.$refs.addEditChapter.initFormData(data.bookChapterId)
			})

		},
		handleSection(data) {
			this.markScroll = document.documentElement.scrollTop
			this.chapterSectionVisible = true
			this.chapter = data
		},
		handleSectionClose() {
			this.chapterSectionVisible = false;
			scrollTo(this.markScroll, 100)
		},
		handleEditClose() {
			this.addEditVisible = false
			scrollTo(this.markScroll, 100)
		},
		handleDelete(data) {
			let info = "章节"
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
		handleImport(data) {
			this.importFileBookChapterId = data.bookChapterId
			this.importVisible = true

		},
		handleDownTemp() {
			window.location.href = "/temp/import_section.xlsx"
		},
		// 上传文件 请求
		handleImportExcel(data) {
			let obj = new FormData();
			obj.append("excel", data.file);
			obj.append("bookChapterId", this.importFileBookChapterId);
			this.$fetch("book_import_section", obj).then((res) => {
				if (res.code == 200) {
					this.$message.success("操作成功")
					this.importVisible = false
					this.getTableData();
				}
			});
		},
		bookChapterStatus2Zh(status) {
			switch (status) {
				case 'Open': return '上架';
				case "Close": return '下架';
				case "Hidden": return '隐藏';
			}
		},
	},

	mounted() {
		scrollTo(0, 800);
		this.getTableData()
		// 因为元素层级的原因，要把这个dialog放到body下才能正常显示在遮罩层上面
		this.chapterDialogId = `chapter-dialog-${Date.now()}`
		document.querySelector('.chapter-container .dialog-wrapper').id = this.chapterDialogId
		document.body.append(document.querySelector('.chapter-container .dialog-wrapper'))
	},
	beforeDestroy() {
		// 既然要离开页面了，就把这个dialog标签删掉，做好文档流管理
		document.body.removeChild(document.body.querySelector(`#${this.chapterDialogId}`))
	}

}
</script>
<style lang='scss' scoped>
.chapter-container {
	/deep/ {
		.addEditChapter {
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