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
						<div v-if="fansType == 'labelIds'" class="labelIds">
							<div class="origin-tips">选择标签后，消息将只推送给选中标签组的粉丝</div>
							<el-tag style="margin-right:10px" v-for="(item,index) in fansLabels" :key="index" @close="handle_removeLabel(index)" disable-transitions closable>
								{{item.name}}
							</el-tag>
							<SelectPop style="width:auto;display:inline-block" key="SelectPop1" v-bind="SelectPopOptions_label" @select="handle_selectLabel">
								<el-button size="small">添加标签</el-button>
							</SelectPop>
						</div>
						<div v-if="fansType == 'openIds'">
							<el-tag style="margin-right:10px" v-for="(item,index) in fansOpenIds" :key="index" @close="handle_removeUser(index)" disable-transitions closable>
								{{item.name}}
							</el-tag>
							<SelectPop style="width:auto;display:inline-block" key="SelectPop2" v-bind="SelectPopOptions_user" @select="handle_selectUser">
								<el-button size="small">添加粉丝</el-button>
								<template slot="labels" slot-scope="scope">
									<el-tag v-for="(item,index) in scope.row.labels" :key="index">{{item}}</el-tag>
								</template>
							</SelectPop>
						</div>
					</template>
					<template slot="mark">
						<div class="labelIds">
							<div class="origin-tips">给点击消息的粉丝打标签</div>
							<el-tag style="margin-right:10px" v-for="(item,index) in fansTags" :key="index" @close="handle_removeLabel2(index)" disable-transitions closable>
								{{item.name}}
							</el-tag>
							<SelectPop style="width:auto;display:inline-block" key="SelectPop3" v-bind="SelectPopOptions_label" @select="handle_selectLabel2">
								<el-button size="small">添加标签</el-button>
							</SelectPop>
						</div>
					</template>
				</RdForm>
			</div>
			<div class="right">
				<likePhone mode="notice" :cardData='formwork_content' :accountName="appName"></likePhone>
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
import SelectPop from '@/components/SelectPop'
import likePhone from '@/components/likePhone'
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
		},
		appName: {
			type: String,
			require: true
		}
	},
	components: { RdForm, SelectPop, likePhone },
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
				{
					prop: "mark",
					element: "el-input",
					placeholder: "",
					label: "粉丝标签",
					operate: true,
				}
			],
			addRules: {
				addFormOptions: [{ required: true, message: "模板名称", trigger: "blur" },],
			},
			// 模板的内容
			formwork_content: [],
			// 可选颜色
			predefineColors: [
				'#F4664A', '#FF7D75', '#000000', '#FF9823', '#F6BD16', '#5AD8A6', '#30BF78', '#6DC8EC', '#2C9EFF', '#1E9493', '#945FB9', '#666666', '#999999'
			],
			// 链接类型
			linkType: 'h5',
			// 链接类型里面要填的东西
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
			// 推送粉丝类型
			fansType: "allFans",
			// 可选标签
			tagsOptions: [],

			// 选中的粉丝
			fansOpenIds: [],
			// 选择用户组件数据 有点复杂
			SelectPopOptions_user: {
				searchObj: {
					api: "wechat_user_page_list",
					formOptions: [
						{
							prop: "nickName",
							element: "el-input",
							placeholder: "请输入用户名",
						},
						{
							prop: "labelName",
							element: "el-input",
							placeholder: "请输入标签名称",
						},
					],
					showNum: 2,
					needType: false,
					params: {
						appId: this.appId
					}
				},
				tableObj: {
					tableKey: [
						{
							name: "用户名",
							value: "nickName",
							width: 200,
						},
						{
							name: "用户标签",
							value: "labels",
							operate: true,
						},
					],
					transItem: (item) => {
						try {
							item.labels = (item.wechatUserTagModel.map(v => {
								return v.labelName
							}))
						} catch (error) {

						}
						return item
					}
				}
			},
			// 选中的标签
			fansLabels: [],
			// 选择标签数据组件 
			SelectPopOptions_label: {
				searchObj: {
					api: "get_official_accounts_label_page",
					formOptions: [
						{
							prop: "labelName",
							element: "el-input",
							placeholder: "请输入标签名称",
						},
						{
							prop: "labelType",
							element: "el-select",
							placeholder: "请选择标签类型",
							options: [
								{
									label: '系统标签',
									value: '0'
								},
								{
									label: '自定义标签',
									value: '1'
								}
							]
						},
					],
					showNum: 2,
					needType: false,
					params: {
						appId: this.appId,
					}
				},
				tableObj: {
					tableKey: [
						{
							name: "ID主键",
							value: "id",
							width: 80
						},
						{
							name: "标签名称",
							value: "labelName",
						},
						{
							name: "标签类型",
							value: "labelTypeZH",
						},
					],
					transItem: (item) => {
						item.labelTypeZH = item.labelType == '0' ? '系统标签' : '自定义标签'
						return item
					}
				}
			},
			// 用户点击后添加标签
			fansTags: []
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
	watch: {
	},
	methods: {
		analysis_content() {
			let content = this.formwork.content.replace(/ /g, '')
			let content_keys = content.match(/\{(.+?)\}}/g)
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
			this.$emit('close')
		},
		async handle_commit() {
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
					appid: this.linkContent.xcx[0].value,
					pagepath: this.linkContent.xcx[1].value,
					remark: this.linkContent.xcx[3].value,
				}
			}

			let formData = {
				appId: this.appId,
				appSecret: this.appSecret,
				msgTemplate: JSON.stringify(msgTemplate)
			}
			if (this.fansType == 'allFans') {
				formData.allFans = true
			}
			else if (this.fansType == 'labelIds') {
				if (!this.fansLabels.length > 0) {
					this.$message.error("需要选择推送的粉丝标签");
					return
				}
				formData.labelIds = this.fansLabels.map(v => { return v.id }).join(',')

			}
			else if (this.fansType == 'openIds') {
				if (!this.fansOpenIds.length > 0) {
					this.$message.error("需要指定推送的粉丝");
					return
				}

				formData.openIds = this.fansOpenIds.map(v => { return v.openId }).join(',')
			}
			if (this.fansTags.length > 0) {
				formData.fansTags = this.fansTags.map(v => { return v.id }).join(',')
			}
			let res = await this.$fetch(
				"send_official_accounts_formwrok",
				formData);
			// if (!res || this.$common.isEmpty(res.data)) {
			// 	return
			// }
			this.$message.success('发送成功')
			this.$emit('close')
		},

		handle_selectUser(data) {
			if (this.fansOpenIds.findIndex(v => v.openId == data.openId) > -1) {
				return
			}
			this.fansOpenIds.push({
				name: data.nickName,
				openId: data.openId
			})
		},
		handle_selectLabel(data) {
			if (this.fansLabels.findIndex(v => v.id == data.id) > -1) {
				return
			}
			this.fansLabels.push({
				name: data.labelName,
				id: data.id
			})
		},
		handle_selectLabel2(data) {
			if (this.fansTags.findIndex(v => v.id == data.id) > -1) {
				return
			}
			this.fansTags.push({
				name: data.labelName,
				id: data.id
			})
		},
		handle_removeLabel(index) {
			this.fansLabels.splice(index, 1)
		},
		handle_removeUser(index) {
			this.fansOpenIds.splice(index, 1)
		},
		handle_removeLabel2(index) {
			this.fansTags.splice(index, 1)
		},
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
			.labelIds {
				border: 1px solid #ccc;
				padding: 5px 10px;
			}
		}
		.right {
			flex-shrink: 0;
			margin: 0 30px 30px 30px;
			box-sizing: border-box;
		}
	}
	.down {
		padding: 20px;
		text-align: center;
	}
	.origin-tips {
		color: #ffaf53;
		font-size: 12px;
		padding-left: 4px;
	}
}
</style>