<template>
	<div class="addEditFormwrok" id="addEditFormwrok">
		<div class="up">
			<div class="left">
				<RdForm :formOptions="addFormOptions" :rules="addRules" :formLabelWidth="'150px'" ref="dataForm">
					<template slot="content">
						<div class="content">
							<div class="tips">微信接口限制，模板消息内容请在200字以内</div>
							<div class="content-item" v-for="(item,index) in formwork_content" :key="index">
								<div class="label">{{item.label}}</div>
								<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="item.value" resize="none">
								</el-input>
								<el-color-picker class="color-picker" v-model="item.color" size='small' show-alpha :predefine="predefineColors"></el-color-picker>
							</div>
						</div>
					</template>
					<template slot="link">
						<div>
							<el-radio v-model="linkType" label="h5">跳转链接（支持外链）</el-radio>
							<el-radio v-model="linkType" label="xcx">跳转小程序</el-radio>
						</div>
						<div class="content">
							<div class="content-item center" v-for="(item,index) in linkContent[linkType]" :key="index">
								<div class="label">{{item.label}}</div>
								<el-input :rows="2" :placeholder="item.placeholder" v-model="item.value" resize="none"></el-input>
							</div>
						</div>
					</template>
					<template slot="push2">
						<div>
							<el-radio v-model="fansType" label="allFans">全部粉丝</el-radio>
							<el-radio v-model="fansType" label="labelIds">粉丝标签</el-radio>
							<el-radio v-model="fansType" label="openIds">指定用户</el-radio>
						</div>
						<template v-if="fansType == 'labelIds'">
							<el-select v-model="fansTages" multiple filterable placeholder="请选择粉丝标签">
								<el-option v-for="item in tagsOptions" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</template>
					</template>
				</RdForm>
			</div>
			<div class="right">
				<div class="like-phone">
					<img src="@/assets/shouji.png" class="bg-shouji">
					<div class="over">
						<div class="notice">
							<div v-for="(item,index) in formwork_content" :key="index">
								<template v-if="item.key == 'first'">
									<div class="title" :style="{color:item.color}">{{item.value || '请输入内容'}}</div>
									<div class="date line">4月14日</div>
								</template>
								<template v-else-if="item.key == 'remark'">
									<div class="remark line" :style="{color:item.color}">{{item.value || '请输入内容'}}</div>
								</template>
								<template v-else>
									<div class="line ">
										<div class="label">{{item.label}}</div>
										<div class="value" :style="{color:item.color}">{{item.value || '请输入内容'}}</div>
									</div>
								</template>
								<div class="count" :class="{danger:noticeFontCount > 200}">{{noticeFontCount}} / 200</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="down">
			<el-button @click="handle_close">取消</el-button>
			<el-button @click="handle_commit" type="primary">群发</el-button>
		</div>

	</div>
</template>

<script>
import RdForm from "@/components/RdForm";
export default {
	props: {
		formwork: {
			type: Object,
			require: true
		},
		appId: {
			type: String,
			require: true
		},
		appSecret: {
			type: String,
			require: true
		}
	},
	components: { RdForm },
	data() {
		return {
			addFormOptions: [
				{
					prop: "title",
					element: "el-input",
					placeholder: "",
					label: "模板名称",
					initValue: this.formwork.title,
					disabled: true,
				},
				{
					prop: "content",
					element: "el-input",
					placeholder: "",
					label: "编辑内容",
					operate: true,
				},
				{
					prop: "link",
					element: "el-input",
					placeholder: "",
					label: "跳转链接",
					operate: true,
				},
				{
					prop: "push2",
					element: "el-input",
					placeholder: "",
					label: "推送给谁",
					operate: true,
				},
			],
			addRules: {
				addFormOptions: [{ required: true, message: "模板名称", trigger: "blur" },],
			},
			formwork_content: [],
			predefineColors: [
				'#F4664A', '#FF7D75', '#000000', '#FF9823', '#F6BD16', '#5AD8A6', '#30BF78', '#6DC8EC', '#2C9EFF', '#1E9493', '#945FB9', '#666666', '#999999'
			],
			linkType: 'h5',
			linkContent: {
				h5: [
					{
						label: "* 链接地址：",
						placeholder: "请以http://或https://开头",
						value: "",
						key: "url",
					}
				],
				xcx: [
					{
						label: "* 小程序ID：",
						placeholder: "请输入已关联的小程序app ID",
						value: "",
						key: "appid",
					},
					{
						label: "* 跳转页面路径：",
						placeholder: "请输入 示例：page/index",
						value: "",
						key: "pagepath",
					},
					{
						label: "备用链接：",
						placeholder: "不支持跳转小程序的将跳至此",
						value: "",
						key: "remark",
					}
				]
			},
			fansType: "allFans",
			tagsOptions: [],
			fansTages: ''
		}
	},
	computed: {
		noticeFontCount() {
			let count = 0
			this.formwork_content.forEach((v) => {
				count += v.value.length
			})
			return count
		}
	},
	methods: {
		analysis_content() {
			let content = this.formwork.content.replace(/ /g, '')
			let content_keys = content.match(/\{(.+?)\}}/g)
			console.log(content, content_keys)
			let formwork_content = []
			for (const i of content_keys) {
				i.match(/\{{(.+?)\}}/g)
				let key = RegExp.$1.split('.')[0]
				if (i.indexOf('first') > 1) {
					// 是首字段
					formwork_content.push({
						label: '首字段：',
						value: "",
						color: "#000000",
						key: key
					})
				}
				else if (i.indexOf('remark') > 1) {
					// 是尾字段
					formwork_content.push({
						label: '尾字段：',
						value: "",
						color: "#000000",
						key: key
					})
				}
				else {
					// 获取属性名称
					let end = content.indexOf(i)
					let start = content.lastIndexOf('}', end) + 1
					let label = content.slice(start, end)
					formwork_content.push({
						label,
						value: "",
						color: "#000000",
						key: key
					})
				}

			}
			this.formwork_content = formwork_content
		},
		handle_close() {

		},
		handle_commit() {
			// 实际上 form 里面没有需要提交的数据  坑了
			if (this.noticeFontCount > 200) {
				this.$message.error("模板消息内容请在200字以内");
				return
			}
			if (this.linkType == 'h5' && this.linkContent.h5[0].value == '') {
				this.$message.error("请输入连接地址");
				return
			}
			if (this.linkType == 'xcx' && this.$common.hasEmpty([this.linkContent.xcx[0].value, this.linkContent.xcx[1].value])) {
				this.$message.error("请输入小程序跳转参数");
				return
			}

			let msgTemplate = {
				template_id: this.formwork.template_id,
				data: {}
			}
			this.formwork_content.forEach(v => {
                msgTemplate.data[v.key] = {}
				msgTemplate.data[v.key].value = v.value
				msgTemplate.data[v.key].color = v.color
			})
			if (this.linkType == 'h5') {
				msgTemplate.url = this.linkContent.h5[0].value
			}
			else {
				msgTemplate.miniprogram = {
                    appid:this.linkContent.xcx[0].value,
                    pagepath:this.linkContent.xcx[1].value,
                    remark:this.linkContent.xcx[3].value,
				}
			}
			let formData = {
				appId: this.appId,
				appSecret: this.appSecret,
				msgTemplate: JSON.stringify(msgTemplate)
			}
			console.log(formData)
		}
	},
	mounted() {
		this.analysis_content()
	}

}
</script>

<style lang='scss' scoped>
.addEditFormwrok {
	width: 100%;
	.up {
		padding-top: 20px;
		border: 1px solid #ccc;
		display: flex;
		.left {
			width: 100%;
			.content {
				border: 1px solid #ccc;
				box-sizing: border-box;
				padding: 10px;
				.tips {
					font-size: 12px;
					color: #ffaf53;
					line-height: normal;
					margin-bottom: 10px;
				}
				.content-item {
					display: flex;
					align-items: flex-start;
					margin-bottom: 20px;
					.label {
						flex-shrink: 0;
						line-height: 24px;
						width: 120px;
						text-align: right;
					}
					&:last-child {
						margin-bottom: 0;
					}
					.color-picker {
						margin-left: 10px;
					}
					&.center {
						align-items: center;
					}
				}
			}
		}
		.right {
			flex-shrink: 0;
			margin: 0 30px 30px 30px;
			box-sizing: border-box;
			.like-phone {
				width: 100%;
				height: 100%;
				position: relative;
				user-select: none;
				.bg-shouji {
					position: absolute;
					z-index: 1;
				}
				.over {
					width: 345px;
					height: 696px;
					position: relative;
					z-index: 2;
					padding: 87px 26px;
				}
				.notice {
					background: #fff;
					width: 80%;
					padding: 20px 10px;
					margin: 10px;
					position: relative;
					.title {
						font-size: 16px;
						font-weight: bold;
					}
					.date {
						color: #ccc !important;
						margin-top: 5px;
					}
					.line {
						margin-bottom: 15px;
						display: flex;
						align-items: flex-start;
						color: #000;
						.label {
							flex-shrink: 0;
						}
						&:last-child() {
							margin-bottom: 0;
						}
					}
					.count {
						color: #ccc;
						position: absolute;
						bottom: 5px;
						right: 10px;
					}
					.count.danger {
						color: red;
					}
				}
			}
		}
	}
	.down {
		padding: 20px;
		text-align: center;
	}
}
</style>