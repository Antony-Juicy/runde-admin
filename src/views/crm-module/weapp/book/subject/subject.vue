<!-- 科目 -->
<template>
	<div class='subject-container'>
		<!-- 搜索栏 -->
		<search-form ref="searchForm" :formOptions="formOptions" :showNum="4" @onSearch="onSearch"></search-form>
		<div class="w-container">
			<div class="btn-wrapper" v-if="mode=='fromClass'">
				<el-button type="primary" size="small" @click="handleAdd">创建科目</el-button>
			</div>
			<!-- 表格主体 -->
			<rd-table :tableData="tableData" :tableKey="tableKey" :pageConfig.sync="pageConfig" fixedTwoRow @pageChange="pageChange">
				<template slot="defaultImageUrl" slot-scope="scope">
					<el-image style="width: 100px; height: 100px" :src="scope.row.defaultImageUrl" fit="contain"></el-image>
				</template>
				<template slot="enrolment" slot-scope="scope">
					<div>(实)&nbsp;&nbsp;{{scope.row.realEnrolment}}</div>
					<div>(虚)&nbsp;&nbsp;{{scope.row.totalEnrolment}}</div>
				</template>
				<template slot="bookSubjectTeacherArray" slot-scope="scope">
					<span class="subject-teacher" v-for="(item,index) in scope.row.bookSubjectTeacherArray" :key="index">{{item.teacherName}}</span>
				</template>
				<template slot="edit" slot-scope="scope">
					<el-button @click="handleEdit(scope.row)" type="text" size="small">查阅/编辑</el-button>
					<el-button @click="handleChapter(scope.row)" type="text" style="color: #67c23a" size="small">章节目录</el-button>
					<el-button @click="handleDelete(scope.row)" type="text" style="color: #ec5b56" size="small">删除</el-button>
				</template>
			</rd-table>
		</div>
		<fullDialog class="addEditSubject" :title="`${titleAddOrEdit}`" :inner="true" v-model="addEditVisible" @change="addEditVisible = false">
			<addEditSubject ref="addEditSubject" v-if="addEditVisible" @close="addEditVisible = false" @refresh="refresh" :book="nextBook"></addEditSubject>
		</fullDialog>
		<fullDialog class="chapter" title="科目管理 > 章节目录" v-model="chapterVisible" @change="handleChapterClose">
			<chapter v-if="chapterVisible" @close="handleChapterClose" :book="nextBook" :subject="subject"></chapter>
		</fullDialog>
	</div>
</template>

<script>

import fullDialog from "@/components/FullDialog";
import chapter from './chapter'
import addEditSubject from './addEditSubject'
import { scrollTo } from "@/utils/scroll-to";
export default {

	props: {
		book: {
			type: Object,
			default: () => { return {} }
		}
	},
	data() {
		return {
			formOptions: [
				{
					prop: "bookName",
					element: "el-input",
					placeholder: "请输入图书名称",
					disabled: false
				},
				{
					prop: "bookSubjectName",
					element: "el-input",
					placeholder: "请输入课程名称",
				},
				{
					prop: "bookSubjectStatus",
					element: "el-select",
					placeholder: "课程状态",
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
					value: "bookSubjectId",
					width: 80
				},
				{
					name: "课程名称",
					value: "bookSubjectName",
				},
				{
					name: "图书名称",
					value: "bookName",
				},
				{
					name: "项目分类",
					value: "typeName",
				},
				{
					name: "关键字",
					value: "bookSubjectKeywords",
				},
				{
					name: "状态",
					value: "bookSubjectStatus",
				},
				{
					name: "报名人数",
					value: "bookSubjectTotalEnrolment",
				},
				{
					name: "授课讲师",
					value: "bookSubjectTeacherArray",
					operate: true,
					width: 200,
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
			chapterVisible: false,
			subject: {},
			nextBook: {}
		};
	},
	components: { fullDialog, chapter, addEditSubject },
	computed: {
		mode() {
			if (Object.keys(this.book).length > 0) {
				return 'fromClass'; // 意思是班级管理那边打开的
			}
			else {
				return 'root'; // 意思是从左侧菜单打开的
			}
		}
	},

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
					"book_get_subjects",
					{
						loginUserId: this.$common.getUserId(),
						...this.pageConfig,
						...this.searchForm,
						...params,
						bookId: this.book.bookId
					}
				).then((res) => {
					this.tableData = res.data.records.map((item) => {
						try {
							item.bookSubjectTeacherArray = JSON.parse(item.bookSubjectTeacherArray)
						} catch (error) {
							item.bookSubjectTeacherArray = []
						}

						item.bookSubjectStatus = this.bookSubjectStatus2Zh(item.bookSubjectStatus)
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
		bookSubjectStatus2Zh(status) {
			switch (status) {
				case 'Open': return '上架';
				case "Close": return '下架';
				case "Hidden": return '隐藏';
			}
		},
		handleAdd() {
			this.titleAddOrEdit = '创建科目';
			this.addEditVisible = true
			this.nextBook = {
				bookName: this.book.bookName,
				bookId: this.book.bookId,
				typeName: this.book.typeName,
				typeId: this.book.typeId,
			}
			this.$nextTick(() => {
				this.$refs.addEditSubject.initGetConfig = true
			})
		},
		handleEdit(data) {
			this.titleAddOrEdit = '编辑科目';
			this.addEditVisible = true
			this.nextBook = {
				bookName: data.bookName,
				typeName: data.typeName,
				typeId: data.typeId,
				bookId: data.bookId,
			}
			this.$nextTick(() => {
				this.$refs.addEditSubject.initGetConfig = true
				this.$refs.addEditSubject.initFormData(data.bookSubjectId);
			})
		},
		handleDelete(data) {
			let info = "科目"
			this.$confirm(`此操作将删除此${info}, 是否继续?`, "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			}).then(async () => {
				await this.$fetch("book_delete_subject", {
					bookSubjectId: data.bookSubjectId,
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
		handleChapter(data) {
			this.chapterVisible = true
			this.subject = data
			this.nextBook = {
				bookName: data.bookName,
				typeName: data.typeName,
				typeId: data.typeId,
			}
		},
		handleChapterClose() {
			this.chapterVisible = false
		},
		refresh(val) {
			this.getTableData({
				pageNum: val || this.pageConfig.pageNum
			});
		},
	},

	async mounted() {
		scrollTo(0, 800);
		let projectType_select_res = await this.$fetch(
			"projectType_select",
		);
		let typeId_select = {
			prop: "typeId",
			element: "el-cascader",
			placeholder: "请选择项目类型",
			props: { checkStrictly: true },
			options: this.$common.getTypeTree(projectType_select_res.data),
		}


		if (this.mode == 'fromClass') {

			this.formOptions[0].initValue = this.book.bookName
			this.formOptions[0].disabled = true
			typeId_select.initValue = this.book.typeId
			typeId_select.disabled = true
		}
		this.formOptions.push(typeId_select);
		this.$refs.searchForm.addInitValue()
		this.getTableData();
	},
}
</script>
<style lang='scss' scoped>
.subject-container {
	/deep/ {
		.el-form-item__content {
			width: 495px;
		}

		.chapter {
			.full-dialog-container .content {
				background: #f0f2f5;
			}
		}
		.addEditSubject {
			&.el-loading-parent--relative {
				position: initial !important;
			}
		}
	}
}
.subject-teacher {
	display: inline-block;
	padding-bottom: 5px;
	padding-right: 5px;
}
</style>