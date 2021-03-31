<template>
	<div class="import-box">
		<div class="file-line">
			<div class="icon">
				<img src="@/assets/import-icon.png">
			</div>
			<el-upload class="upload" action="#" :before-remove="beforeRemove" :on-remove="handleRemoveFile" :limit="1" :on-exceed="handleExceed" :on-change="handleChangeFile"
				:file-list="fileList" :before-upload="beforeAvatarUpload" :auto-upload="false" accept=".xls,.xlsx">
				<el-button class="select" type="primary">选择</el-button>
			</el-upload>
		</div>
		<div class="d-flex">
			<el-button type="primary" size="small" @click="handleDownTemp">下载模板</el-button>
			<div class="tips">请选择 .xls .xlsx 文件上传</div>
		</div>

		<div class="btn-box">
			<el-button type="primary" @click="handleImportExcel">导入</el-button>
			<el-button type="danger" @click="handleCancel">取消</el-button>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			importFile: false,
			fileList: [],
		}
	},
	methods: {
		handleImportExcel() {
			if (!this.importFile) {
				this.$message.warning("请上传文件");
				return;
			}
			this.$emit('submit', { file: this.importFile })
		},
		// 导入上传之前的文件格式校验
		beforeAvatarUpload(file) {
			let testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
			const extension = testmsg === 'xls'
			const extension2 = testmsg === 'xlsx'
			// const isLt2M = file.size / 1024 / 1024 < 10
			if (!extension && !extension2) {
				this.$message({
					message: '上传文件只能是 xls、xlsx格式!',
					type: 'warning'
				});
			}
			return extension || extension2
		},
		// 上传文件
		handleExceed(files, fileList) {
			this.$message.warning(
				`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length
				} 个文件`
			);
		},
		beforeRemove(file, fileList) {
			return this.$confirm(`确定移除 ${file.name}？`);
		},
		handleRemoveFile() {
			this.importFile = false
		},
		handleChangeFile(file) {
			this.importFile = file.raw;
		},
		handleCancel() {
			this.$emit('cancel')
		},
		handleDownTemp(){
			this.$emit('download')
		}
	}
}
</script>

<style lang='scss' scoped>
.import-box {
	.file-line {
		display: flex;
		align-items: center;
		box-sizing: border-box;
		border: 1px solid #979797;
		height: 60px;
		.icon {
			width: 60px;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			background: #ebebeb;
			flex-shrink: 0;
			img {
				width: 40px;
				height: 40px;
				object-fit: scale-down;
			}
		}
		.file-name {
			height: 100%;
			width: 100%;
			padding: 16px;
			font-size: 20px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.upload {
			display: flex;
			flex-direction: row-reverse;
			height: 100%;
			width: 100%;
			/deep/ {
				.el-upload-list {
					width: 100%;
					height: 100%;
					display: flex;
					align-items: center;
					padding: 0 16px;
					li {
						margin: 0;
					}
					li:focus {
						outline: none !important;
					}
				}
			}
		}

		.select {
			height: 100%;
			border-radius: 0;
			font-size: 20px;
			flex-shrink: 0;
		}
	}

	.d-flex {
		display: flex;
		align-items: center;
		margin-top: 20px;
		.el-button{
			padding: 0;
			width:60px;
			height:30px;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.tips {
			color: #999999;
			font-size: 12px;
			line-height: inherit;
			margin-left: 20px;
		}
	}
	.btn-box {
		margin-top: 35px;
		text-align: center;
		.el-button {
			width: 131px;
			height: 55px;
			font-size: 20px;
		}
		.el-button:nth-child(1) {
			margin-right: 30px;
		}
	}
}
</style>