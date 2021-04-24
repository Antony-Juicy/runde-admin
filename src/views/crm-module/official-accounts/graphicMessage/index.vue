<template>
	<div class="graphicMessage-container">
		<el-dropdown ref="accountOption" trigger="click" placement="bottom-start">
			<div class="select-accoumt">
				<img class="logo" :src='account.appImg'>
				<div>{{account.appName}}</div>
				<i class="el-icon-arrow-down el-icon--right"></i>
			</div>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item v-for="(item,index) in officialAccounts" :key="index">
					<div class="account-option" @click="handle_select_account(item)">
						<img :src="item.appImg" class="logo">
						<span>{{ item.appName }}</span>
					</div>
				</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
		<div class="wrapper">
			<el-button class="create" type="primary" @click="handle_create">创建客服推送</el-button>
		</div>
		<!-- 编辑公众号 -->
		<rd-dialog :title="AddEditTitle" :dialogVisible="addEditVisible" :showFooter="false" :width="'1200px'" @handleClose="addEditVisible = false">
			<!-- 组件 -->
			<editMessage ref="editMessage" hidden:showName="true" :account="account" v-if="addEditVisible"></editMessage>
			<div class="form-line">
				<div class="label">推送给谁
					<el-popover placement="top-start" width="200" trigger="hover" content="仅能推送给48小时内与公众号有互动的粉丝">
						<i class="el-icon-warning-outline" slot="reference"></i>
					</el-popover>
					：
				</div>
				<div>
					<el-radio v-model="fansType" label="allFans">全部粉丝</el-radio>
					<el-radio v-model="fansType" label="labelIds">粉丝标签</el-radio>
					<!-- <el-radio v-model="fansType" label="openIds">指定用户</el-radio> -->
				</div>
			</div>
			<!-- 推送给谁 -->
			<div class="form-line" v-if="fansType=='labelIds'">
				<div class="label"> </div>
				<div class="labelIds">
					<div class="origin-tips">选择标签后，消息将只推送给选中标签组的粉丝</div>
					<el-tag style="margin-right:10px" v-for="(item,index) in fansLabels" :key="index" @close="handle_removeLabel(index)" disable-transitions closable>
						{{item.name}}
					</el-tag>
					<SelectPop style="width:auto;display:inline-block" key="SelectPop1" v-bind="SelectPopOptions_label" @select="handle_selectLabel">
						<el-button size="small">添加标签</el-button>
					</SelectPop>
				</div>
			</div>
			<div class="form-line" v-if="fansType=='openIds'">
				<div class="label"> </div>
				<div class="labelIds">
					<div class="origin-tips">选择粉丝后，消息将只推送给选中的粉丝</div>
					<el-tag style="margin-right:10px" v-for="(item,index) in fansOpenIds" :key="index" @close="handle_removeUser(index)" disable-transitions closable>
						{{item.name}}
					</el-tag>
					<SelectPop style="width:auto;display:inline-block" key="SelectPop2" v-bind="SelectPopOptions_user" @select="handle_selectUser">
						<el-button size="small">添加粉丝</el-button>
						<template slot="labels" slot-scope="scope">
							<el-tag v-for="(item,index) in scope.row.labels" :key="index">{{item}}</el-tag>
							<div v-if="scope.row.labels.length == 0">无标签</div>
						</template>
					</SelectPop>
				</div>
			</div>
			<div class="form-line">
				<div class="label">粉丝标签
					<el-popover placement="bottom-start" width="200" trigger="hover"
						content="如果消息内容设置中插入了链接,则可以对点如果消息内容设置中插入了链接,则可以对点击消息跳转链接的粉丝和未点击消息的粉丝分別打上标签,便于统计分析(注意:若消息本身不可跳转到链接,则无法统计,关联跳转到小程序也无法统计)">
						<i class="el-icon-warning-outline" slot="reference"></i>
					</el-popover>
					：
				</div>
				<div class="labelIds">
					<div class="origin-tips">给点击消息的粉丝打标签</div>
					<el-tag style="margin-right:10px" v-for="(item,index) in fansTags" :key="index" @close="handle_removeLabel2(index)" disable-transitions closable>
						{{item.name}}
					</el-tag>
					<SelectPop style="width:auto;display:inline-block" key="SelectPop1" v-bind="SelectPopOptions_label" @select="handle_selectLabel2">
						<el-button size="small">添加标签</el-button>
					</SelectPop>
				</div>
			</div>
			<div class="btns">
				<el-button @click="handle_close">取消</el-button>
				<el-button @click="handle_commit" type="primary">群发</el-button>
			</div>
		</rd-dialog>
	</div>
</template>

<script>
import editMessage from '../editMessage'
import SelectPop from '@/components/SelectPop'
export default {
	name: "graphicMessage",
	components: { editMessage, SelectPop },
	data() {
		return {
			officialAccounts: [],
			account: {},
			AddEditTitle: "创建客服消息",
			addEditVisible: false,
			fansType: 'allFans',
			// 用户点击后添加标签
			fansTags: [],
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
						appId: '',
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
			formData: {},
		}
	},
	methods: {
		handle_select_account(data) {
			this.account = data
		},
		handle_create() {
			this.addEditVisible = true
		},
		handle_msgForm(data) {
			// 这里接收客服消息编辑区的表单信息
			console.log(data)
			this.formData = data
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
		handle_removeLabel(index) {
			this.fansLabels.splice(index, 1)
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
		handle_removeLabel2(index) {
			this.fansTags.splice(index, 1)
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
		handle_removeUser(index) {
			this.fansOpenIds.splice(index, 1)
		},
		handle_close() {
			this.addEditVisible = false
		},
		handle_commit() {
			this.$refs.editMessage.val(async data => {
				let formData = {
					...data
				}
				// 额外的表单信息组合 要加上对应的合法性校验处理
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

				// 这个是给用户打标签的数据
				if (this.fansTags.length > 0) {
					formData.fansTags = this.fansTags.map(v => { return v.id }).join(',')
				}

				let res = await this.$fetch(
					"graphic_message_send_msg",
					{
						...formData
					}
				);
				this.addEditVisible = false
			})

		}
	},
	async mounted() {
		let res = await this.$fetch(
			"get_official_accounts_list",
		);
		this.officialAccounts = res.data
		this.account = this.officialAccounts[0]
		this.SelectPopOptions_label.searchObj.params.appId = this.account.appId
		this.SelectPopOptions_user.searchObj.params.appId = this.account.appId
	}
}
</script>

<style lang="scss" scoped>
.graphicMessage-container {
	.wrapper {
		height: 100%;
		width: 100%;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		height: 300px;
	}
	.select-accoumt {
		display: flex;
		align-items: center;
		background-color: #fff;
		border-radius: 4px;
		height: 32px;
		padding: 0 10px;
		border: 1px solid #dcdfe6;
		margin-top: 4px;
		margin-right: 10px;
		min-width: 200px;
		.logo {
			height: 20px;
			width: 20px;
			margin-right: 10px;
			object-fit: contain;
		}
		.el-icon-arrow-down {
			margin-left: auto;
		}
	}
	.create {
		margin-top: 10px;
	}
}
.account-option {
	display: flex;
	align-items: center;
	cursor: pointer;
	padding: 4px 4px;
	min-width: 200px;
	&:hover {
		background-color: #f5f7fa;
	}
	.logo {
		width: 40px;
		height: 40px;
		object-fit: contain;
		margin-right: 10px;
	}
}
.form-line {
	display: flex;
	padding: 20px 0px;
	.label {
		width: 100px;
		text-align: right;
	}
	.origin-tips {
		color: #ffaf53;
		font-size: 12px;
		padding-left: 4px;
		padding-bottom: 10px;
	}
}
.btns {
	text-align: center;
}
</style>