<template>
	<div class="msg">
		<div class="head">
			<div class="type-item" :class="[typeIndex == index? 'active' : '']" v-for="(item,index) in type" :key="index" @click="typeIndex = index">
				<i :class="[item.icon]"></i>
				{{item.name}}
			</div>
		</div>
		<div class="inner">
			<div class="is-msg" v-if="typeIndex == 0">
				<template v-if="this.content.from == ''">
					<SelectPop v-bind="SelectPopOptions" style="margin-right:30px">
						<div class="chose-item">
							<i class="el-icon-folder"></i>
							从素材库选择
						</div>
						<template slot="lane" slot-scope="scope">
							<div class="news-box" @click="handle_choseNews(scope.data)">
								<div class="news-item" v-for="(item,index) in scope.data.news_item" :key="index">
									<div class="thumb">
										<img :src="`https://mcdn.yiban.io/img_proxy?src=${item.thumb_url}`">
									</div>
									<div class="title">{{item.title}}</div>
								</div>
							</div>

						</template>
					</SelectPop>
					<!-- <div class="chose-item">
						<i class="el-icon-edit-outline"></i>
						自建图文
					</div> -->
					<!-- <div class="chose-item">
						<i class="el-icon-share"></i>
						转载文章
					</div> -->
				</template>
				<template v-else>
					<div class="chose-content" v-if="content.from == 'store'">
						<div class="news-box chosed">
							<div class="news-item" v-for="(item,index) in content.data" :key="index" @click="handle_goUrl(item)">
								<div class="thumb">
									<img :src="`https://mcdn.yiban.io/img_proxy?src=${item.thumb_url}`">
								</div>
								<div class="title">{{item.title}}</div>
							</div>
							<el-button class="clear" size="small" @click="handle_clear">删除</el-button>
						</div>
					</div>
				</template>
			</div>
			<div class="is-text" v-if="typeIndex == 1">
				<div class="likeInput" ref="likeInput" contenteditable @input="handle_input" @focus="handle_focus"></div>
				<div class="other">
					<div></div>
					<!-- <el-button class="addFace" size="small">添加表情</el-button> -->
					<div class="limit">{{text.length}} / 300</div>
				</div>
			</div>
			<div class="is-msg" v-if="typeIndex == 2">
				<SelectPop v-bind="SelectPopOptions_img" style="margin-right:30px" @select="handle_choseImg">
					<div class="chose-item">
						<i class="el-icon-folder"></i>
						从素材库选择
					</div>
					<template slot="thumb_url" slot-scope="scope">
						<el-image style="width: 100px; height: 100px" :src="scope.row.thumb_url" fit="contain"></el-image>
					</template>
				</SelectPop>
				<!-- <div class="chose-item">
					<i class="el-icon-folder"></i>
					从素材库选择
				</div> -->
				<div class="chose-item">
					<i class="el-icon-picture-outline"></i>
					上传图片
					<input type="file" accept="image/*" ref="fileInput_img" class="btn-hidden" @change="handle_uploadFileImg">
				</div>
			</div>
			<div class="is-msg" v-if="typeIndex == 3">
				<div class="chose-item">
					<i class="el-icon-folder"></i>
					从素材库选择
				</div>
				<div class="chose-item" @click="handle_showDialogForm('voice')">
					<i class="el-icon-mic"></i>
					上传音频
					<!-- <input type="file" accept="audio/*" ref="fileInput_voice" class="btn-hidden" @change="handle_uploadFileVoice"> -->
				</div>
			</div>
			<div class="is-msg" v-if="typeIndex == 4">
				<div class="chose-item">
					<i class="el-icon-folder"></i>
					从素材库选择
				</div>
				<div class="chose-item" @click="handle_showDialogForm('video')">
					<i class="el-icon-video-camera"></i>
					上传视频
					<!-- <input type="file" accept="video/*" ref="fileInput_video" class="btn-hidden" @change="handle_uploadFileVideo"> -->
				</div>
			</div>
		</div>
		<rd-dialog :title="dialog.title" :dialogVisible="dialog.visible" :showFooter="false" :width="'900px'" @handleClose="dialog.visible = false">
			<div class="upload-voice" v-if="dialog.type == 'voice' && dialog.visible">
				<div class="form-line">
					<div class="label" style="margin-top:10px">标题：</div>
					<div class="content">
						<el-input show-word-limit maxlength="30" v-model="dialog.form_voice.title"></el-input>
					</div>
				</div>
				<div class="form-line">
					<div class="label">分类：</div>
					<div class="content">
						<el-radio class="type-item" v-model="dialog.form_voice.type" v-for="(item,index) in dialog.voice_types" :key="index" :label="item.value">{{item.label}}
						</el-radio>
					</div>
				</div>
				<div class="form-line">
					<div class="label" style="margin-top:10px">音频内容：</div>
					<div class="content">
						<el-button style="position:relative">
							上传文件
							<input type="file" accept="audio/*" ref="fileInput_voice" class="btn-hidden" @change="handle_uploadFileVoice">
						</el-button>
						<div class="origin-tips">格式支持mp3、wma、wav、amr、m4a，文件大小不超过200M，音频时长不超过2小时</div>
					</div>

				</div>
				<el-button style="margin:auto;display:block" type="primary">保存</el-button>
			</div>
			<div class="upload-video" v-if="dialog.type == 'video' && dialog.visible">
				<div class="form-line">
					<div class="label" style="margin-top:10px">上传视频：</div>
					<div class="content">
						<el-button style="position:relative">
							上传文件
							<input type="file" accept="audio/*" ref="fileInput_voice" class="btn-hidden" @change="handle_uploadFileVoice">
						</el-button>
						<div class="origin-tips">请上传时长小于1小时的视频，支持主流的 视频格式 ，超出限制的视频请到腾讯视频上传</div>
					</div>
				</div>
				<div class="form-line">
					<div class="label" style="margin-top:10px">视频封面：</div>
					<div class="content">
					</div>
				</div>
				<div class="form-line">
					<div class="label" style="margin-top:10px">标题：</div>
					<div class="content">
						<el-input show-word-limit maxlength="30" v-model="dialog.form_voice.title"></el-input>
					</div>
				</div>
				<div class="form-line">
					<div class="label" style="margin-top:10px">分类：</div>
					<div class="content">
						<el-cascader v-model="dialog.form_video.type" :options="dialog.video_types"></el-cascader>
						<div class="origin-tips">填写准确的视频分类，可以让视频有更多被发现的机会。</div>
					</div>
				</div>
				<div class="form-line">
					<div class="label" style="margin-top:10px">视频介绍：<br>(选填)</div>
					<div class="content">
						<el-input show-word-limit maxlength="300" resize='none' rows="6" type="textarea" v-model="dialog.form_voice.description"></el-input>
					</div>
				</div>
				<div style="font-size:12px">上传视频请阅读 <a class="origin-tips" target="blank"
						href="https://mp.weixin.qq.com/cgi-bin/announce?action=getannouncement&key=11534769283aZG4O&version=1&lang=zh_CN&platform=2">《公众平台视频上传服务规则》</a></div>
				<el-button style="margin:auto;display:block" type="primary">保存</el-button>
			</div>
		</rd-dialog>
	</div>
</template>

<script>
import SelectPop from '@/components/SelectPop'
export default {
	// inject: ['account'],
	props: {
		account: {
			typeof: Object,
			require: true,
		}
	},
	components: { SelectPop },
	data() {
		return {
			type: [
				{
					name: "图文消息",
					icon: "el-icon-postcard"
				},
				{
					name: "文字",
					icon: "el-icon-edit-outline"
				},
				{
					name: "图片",
					icon: "el-icon-picture-outline"
				},
				{
					name: "音频",
					icon: "el-icon-mic"
				},
				{
					name: "视频",
					icon: "el-icon-video-camera"
				},
			],
			typeIndex: 0,
			text: "",
			// 图文弹出搜索框
			SelectPopOptions: {
				searchObj: {
					api: "custom_menu_get_material",
					formOptions: [],
					needType: false,
					params: {
						appId: '',
						appSecret: '',
						type: 'news',
					}
				},
				tableObj: {
					waterfall: true,
					lane: 2,
					transItem: (item) => {
						return {
							news_item: item.content.news_item,
							media_id: item.media_id
						}
					}
				}
			},
			SelectPopOptions_img: {
				searchObj: {
					api: "graphic_message_get_material",
					formOptions: [],
					needType: false,
					params: {
						appId: '',
						appSecret: '',
						type: 'image'
					}
				},
				tableObj: {
					tableKey: [
						{
							name: "图片",
							value: "thumb_url",
							width: 100,
							operate: true,
						},
						{
							name: "标题",
							value: "name",
						},
					],
					transItem: (item) => {
						return {
							thumb_url: `${process.env.VUE_APP_BASE_API}/wechat/console/wechat_material/handle_img?src=${encodeURIComponent(item.url)}`, // 投机一把 看看情况
							// thumb_url: `https://mcdn.yiban.io/img_proxy?src=${encodeURIComponent(item.thumb_url)}`,
							name: item.name,
							thumb_url_t: item.url,
							media_id: item.media_id
						}
					}
				}
			},
			SelectPopOptions_voice: {
				searchObj: {
					api: "graphic_message_get_material",
					formOptions: [],
					needType: false,
					params: {
						appId: '',
						appSecret: '',
						type: 'voice'
					}
				},
				tableObj: {
					tableKey: [
						{
							name: "图片",
							value: "thumb_url",
							width: 100,
							operate: true,
						},
						{
							name: "标题",
							value: "name",
						},
					],
					transItem: (item) => {
						return {
							thumb_url: `${process.env.VUE_APP_BASE_API}/wechat/console/wechat_material/handle_img?src=${encodeURIComponent(item.url)}`, // 投机一把 看看情况
							// thumb_url: `https://mcdn.yiban.io/img_proxy?src=${encodeURIComponent(item.thumb_url)}`,
							name: item.name,
							thumb_url_t: item.url,
							media_id: item.media_id
						}
					}
				}
			},
			SelectPopOptions_video: {
				searchObj: {
					api: "graphic_message_get_material",
					formOptions: [],
					needType: false,
					params: {
						appId: '',
						appSecret: '',
						type: 'video'
					}
				},
				tableObj: {
					tableKey: [
						{
							name: "图片",
							value: "thumb_url",
							width: 100,
							operate: true,
						},
						{
							name: "标题",
							value: "name",
						},
					],
					transItem: (item) => {
						return {
							thumb_url: `${process.env.VUE_APP_BASE_API}/wechat/console/wechat_material/handle_img?src=${encodeURIComponent(item.url)}`, // 投机一把 看看情况
							// thumb_url: `https://mcdn.yiban.io/img_proxy?src=${encodeURIComponent(item.thumb_url)}`,
							name: item.name,
							thumb_url_t: item.url,
							media_id: item.media_id
						}
					}
				}
			},
			content: {
				from: '',// store 素材库 、slef 自建 、 reprint 转载 
				media_id: '',// 给到后台转发到微信的关键信息是 media_id
				data: {},// 为了适应各种模式，使用一个中性的名称存放具体的数据内容，只做预览使用
			},
			dialog: {
				title: "添加音频",
				visible: false,
				type: "",// 可选项 voice video
				form_voice: {
					title: '',
					type: '1',
				},
				form_video: {
					title: '',
					type: '',
					description: ''
				},
				voice_types: [
					{ label: "财经", value: "1" },
					{ label: "动漫", value: "2" },
					{ label: "儿童", value: "3" },
					{ label: "搞笑", value: "4" },
					{ label: "健康", value: "5" },
					{ label: "教育", value: "6" },
					{ label: "军事", value: "7" },
					{ label: "科技", value: "8" },
					{ label: "历史", value: "9" },
					{ label: "旅行", value: "10" },
					{ label: "汽车", value: "11" },
					{ label: "情感", value: "12" },
					{ label: "体育", value: "13" },
					{ label: "外语", value: "14" },
					{ label: "文学", value: "15" },
					{ label: "校园", value: "16" },
					{ label: "音乐", value: "17" },
					{ label: "影视", value: "18" },
					{ label: "游戏", value: "19" },
					{ label: "娱乐", value: "20" }
				],
				video_types: [
					{
						"children":
							[{ "value": "电影周边", "label": "电影周边" }, { "value": "电影资讯", "label": "电影资讯" }, { "value": "电影剪辑", "label": "电影剪辑" }, { "value": "微电影", "label": "微电影" }, { "value": "影评", "label": "影评" }],
						"value": "电影",
						"label": "电影"
					},
					{
						"children":
							[{ "value": "电视剧剪辑", "label": "电视剧剪辑" }, { "value": "电视剧片花", "label": "电视剧片花" }, { "value": "剧集周边", "label": "剧集周边" }, { "value": "网络剧", "label": "网络剧" }],
						"value": "电视剧",
						"label": "电视剧"
					},
					{
						"children":
							[{ "value": "连载动画", "label": "连载动画" }, { "value": "原创动画", "label": "原创动画" }, { "value": "动漫周边", "label": "动漫周边" }, { "value": "宅文化", "label": "宅文化" }],
						"value": "动漫",
						"label": "动漫"
					},
					{
						"children":
							[{ "value": "国内时政", "label": "国内时政" }, { "value": "国际时政", "label": "国际时政" }, { "value": "国际社会", "label": "国际社会" }, { "value": "社会百态", "label": "社会百态" }, { "value": "人物访谈", "label": "人物访谈" }, { "value": "奇闻趣事", "label": "奇闻趣事" }, { "value": "法制", "label": "法制" }, { "value": "交通", "label": "交通" }, { "value": "正能量", "label": "正能量" }],
						"value": "新闻",
						"label": "新闻"
					}, {
						"children":
							[{ "value": "明星资讯", "label": "明星资讯" }, { "value": "饭拍饭制", "label": "饭拍饭制" }],
						"value": "娱乐",
						"label": "娱乐"
					}, {
						"children":
							[{ "value": "音乐真人秀", "label": "音乐真人秀" }, { "value": "喜剧节目", "label": "喜剧节目" }, { "value": "脱口秀", "label": "脱口秀" }, { "value": "真人秀", "label": "真人秀" }, { "value": "情感节目", "label": "情感节目" }, { "value": "舞台剧", "label": "舞台剧" }, { "value": "魔术", "label": "魔术" }, { "value": "戏曲", "label": "戏曲" }, { "value": "其他综艺", "label": "其他综艺" }],
						"value": "综艺",
						"label": "综艺"
					}, {
						"children":
							[{ "value": "鬼畜", "label": "鬼畜" }, { "value": "奇趣", "label": "奇趣" }, { "value": "段子剧", "label": "段子剧" }, { "value": "神回复", "label": "神回复" }, { "value": "熊孩子", "label": "熊孩子" }, { "value": "糗事", "label": "糗事" }, { "value": "爆笑原创", "label": "爆笑原创" }, { "value": "爆笑动物", "label": "爆笑动物" }, { "value": "爆笑恶搞", "label": "爆笑恶搞" }, { "value": "相声小品", "label": "相声小品" }],
						"value": "搞笑",
						"label": "搞笑"
					}, {
						"children":
							[{ "value": "篮球", "label": "篮球" }, { "value": "足球", "label": "足球" }, { "value": "体育趣闻", "label": "体育趣闻" }, { "value": "体育教学", "label": "体育教学" }, { "value": "综合体育", "label": "综合体育" }, { "value": "功夫搏击", "label": "功夫搏击" }, { "value": "极限运动", "label": "极限运动" }],
						"value": "体育",
						"label": "体育"
					}, {
						"children":
							[{ "value": "演唱会", "label": "演唱会" }, { "value": "音乐节目", "label": "音乐节目" }, { "value": "恶搞音乐", "label": "恶搞音乐" }, { "value": "翻唱", "label": "翻唱" }, { "value": "演奏", "label": "演奏" }, { "value": "影视音乐", "label": "影视音乐" }, { "value": "明星MV", "label": "明星MV" }, { "value": "达人MV", "label": "达人MV" }, { "value": "喊麦", "label": "喊麦" }, { "value": "音乐牛人", "label": "音乐牛人" }],
						"value": "音乐",
						"label": "音乐"
					}, {
						"children":
							[{ "value": "明星热舞", "label": "明星热舞" }, { "value": "舞蹈达人", "label": "舞蹈达人" }, { "value": "舞蹈教学", "label": "舞蹈教学" }, { "value": "舞蹈工作室", "label": "舞蹈工作室" }],
						"value": "舞蹈",
						"label": "舞蹈"
					}, {
						"children":
							[{ "value": "广场舞教学", "label": "广场舞教学" }, { "value": "广场舞欣赏", "label": "广场舞欣赏" }],
						"value": "广场舞",
						"label": "广场舞"
					}, {
						"children":
							[{ "value": "儿歌", "label": "儿歌" }, { "value": "益智", "label": "益智" }, { "value": "少儿动画", "label": "少儿动画" }, { "value": "少儿节目", "label": "少儿节目" }],
						"value": "少儿",
						"label": "少儿"
					}, {
						"children":
							[{ "value": "手机游戏", "label": "手机游戏" }, { "value": "网络游戏", "label": "网络游戏" }, { "value": "单机游戏", "label": "单机游戏" }, { "value": "游戏节目", "label": "游戏节目" }, { "value": "达人解说", "label": "达人解说" }, { "value": "电竞赛事", "label": "电竞赛事" }, { "value": "游戏展会", "label": "游戏展会" }, { "value": "游戏周边", "label": "游戏周边" }],
						"value": "游戏",
						"label": "游戏"
					}, {
						"children":
							[{ "value": "公司", "label": "公司" }, { "value": "创业", "label": "创业" }, { "value": "经济", "label": "经济" }, { "value": "消费", "label": "消费" }, { "value": "投资", "label": "投资" }, { "value": "理财", "label": "理财" }, { "value": "产经", "label": "产经" }, { "value": "股市", "label": "股市" }, { "value": "金融", "label": "金融" }, { "value": "房地产", "label": "房地产" }, { "value": "财经人物", "label": "财经人物" }, { "value": "收藏", "label": "收藏" }],
						"value": "财经",
						"label": "财经"
					}, {
						"children":
							[{ "value": "军情解读", "label": "军情解读" }, { "value": "军事节目", "label": "军事节目" }, { "value": "武器装备", "label": "武器装备" }, { "value": "战争历史", "label": "战争历史" }],
						"value": "军事",
						"label": "军事"
					}, {
						"children":
							[{ "value": "美味食谱", "label": "美味食谱" }, { "value": "烘焙", "label": "烘焙" }, { "value": "吃播大胃王", "label": "吃播大胃王" }, { "value": "美食猎奇", "label": "美食猎奇" }],
						"value": "美食",
						"label": "美食"
					}, {
						"children":
							[{ "value": "宠物", "label": "宠物" }, { "value": "两性", "label": "两性" }, { "value": "星座", "label": "星座" }, { "value": "情感", "label": "情感" }, { "value": "健康", "label": "健康" }, { "value": "休闲", "label": "休闲" }, { "value": "健身", "label": "健身" }, { "value": "家居", "label": "家居" }, { "value": "生活窍门", "label": "生活窍门" }, { "value": "风水命理", "label": "风水命理" }, { "value": "心灵", "label": "心灵" }, { "value": "彩票", "label": "彩票" }, { "value": "摄影", "label": "摄影" }],
						"value": "生活",
						"label": "生活"
					}, {
						"children":
							[{ "value": "时尚资讯", "label": "时尚资讯" }, { "value": "时尚大片", "label": "时尚大片" }, { "value": "美妆", "label": "美妆" }, { "value": "潮流奢品", "label": "潮流奢品" }, { "value": "男士时尚", "label": "男士时尚" }, { "value": "T台秀场", "label": "T台秀场" }, { "value": "穿搭", "label": "穿搭" }],
						"value": "时尚",
						"label": "时尚"
					}, {
						"children":
							[{ "value": "孕产", "label": "孕产" }, { "value": "喂养", "label": "喂养" }, { "value": "早教", "label": "早教" }, { "value": "萌宝", "label": "萌宝" }, { "value": "保健护理", "label": "保健护理" }],
						"value": "育儿",
						"label": "育儿"
					}, {
						"children":
							[{ "value": "旅行攻略", "label": "旅行攻略" }, { "value": "旅行趣闻", "label": "旅行趣闻" }, { "value": "旅途风光", "label": "旅途风光" }],
						"value": "旅游",
						"label": "旅游"
					}, {
						"children":
							[{ "value": "新车速递", "label": "新车速递" }, { "value": "试驾评测", "label": "试驾评测" }, { "value": "汽车资讯", "label": "汽车资讯" }, { "value": "用车", "label": "用车" }, { "value": "玩车", "label": "玩车" }, { "value": "车模", "label": "车模" }, { "value": "摩托车", "label": "摩托车" }, { "value": "汽车其他", "label": "汽车其他" }],
						"value": "汽车",
						"label": "汽车"
					}, {
						"children":
							[{ "value": "美食纪录片", "label": "美食纪录片" }, { "value": "自然纪录片", "label": "自然纪录片" }, { "value": "历史纪录片", "label": "历史纪录片" }, { "value": "社会纪录片", "label": "社会纪录片" }, { "value": "旅游纪录片", "label": "旅游纪录片" }, { "value": "军事纪录片", "label": "军事纪录片" }, { "value": "人文纪录片", "label": "人文纪录片" }],
						"value": "纪录片",
						"label": "纪录片"
					}, {
						"children":
							[{ "value": "演讲", "label": "演讲" }, { "value": "公开课", "label": "公开课" }, { "value": "职场教育", "label": "职场教育" }, { "value": "考试", "label": "考试" }, { "value": "技能教学", "label": "技能教学" }, { "value": "校园内外", "label": "校园内外" }, { "value": "人生课堂", "label": "人生课堂" }, { "value": "语言学习", "label": "语言学习" }, { "value": "知识百科", "label": "知识百科" }],
						"value": "教育",
						"label": "教育"
					}, {
						"children":
							[{ "value": "读书", "label": "读书" }, { "value": "艺术", "label": "艺术" }, { "value": "宗教", "label": "宗教" }, { "value": "历史", "label": "历史" }, { "value": "文化", "label": "文化" }],
						"value": "文化历史",
						"label": "文化历史"
					}, {
						"children":
							[{ "value": "评测", "label": "评测" }, { "value": "产品资讯", "label": "产品资讯" }, { "value": "智能生活", "label": "智能生活" }, { "value": "数码其他", "label": "数码其他" }],
						"value": "数码",
						"label": "数码"
					}, {
						"children":
							[{ "value": "科学实验", "label": "科学实验" }, { "value": "太空探索", "label": "太空探索" }, { "value": "科普", "label": "科普" }, { "value": "科学其他", "label": "科学其他" }],
						"value": "科学",
						"label": "科学"
					}, {
						"children":
							[{ "value": "机械", "label": "机械" }, { "value": "互联网", "label": "互联网" }, { "value": "科技前沿", "label": "科技前沿" }, { "value": "科技奇趣", "label": "科技奇趣" }, { "value": "航空航天", "label": "航空航天" }],
						"value": "科技",
						"label": "科技"
					}, {
						"children":
							[{ "value": "农业生产养殖", "label": "农业生产养殖" }, { "value": "农家生活", "label": "农家生活" }, { "value": "农村政策", "label": "农村政策" }],
						"value": "三农",
						"label": "三农"
					}, {
						"children":
							[{ "value": "广告", "label": "广告" }, { "value": "创意", "label": "创意" }, { "value": "自拍", "label": "自拍" }, { "value": "公益短片", "label": "公益短片" }, { "value": "青春", "label": "青春" }, { "value": "绝活", "label": "绝活" }],
						"value": "其他",
						"label": "其他"
					}
				]
			}
		}
	},
	watch: {
		typeIndex: function (n, o) {
			if (n == 1) {
				this.$nextTick(() => {
					this.$refs.likeInput.innerText = this.text
					this.$refs.likeInput.focus()
				})

			}
		},
		account: {
			handler: function (n, o) {

			},
			deep: true
		}
	},
	computed: {},
	methods: {
		handle_input(e) {
			this.text = this.$refs.likeInput.innerText
		},
		async handle_focus() {
			try {
				let c = await navigator.clipboard.readText()
				navigator.clipboard.writeText(c)
			} catch (error) {

			}
		},
		handle_choseNews(data) {
			// console.log(data)
			this.content.from = 'store'
			this.content.media_id = data.media_id
			this.content.data = data.news_item
		},
		handle_choseImg(data) {
			console.log(data)
		},
		handle_choseVoice(data) {
			console.log(data)
		},
		handle_choseVideo(data) {
			console.log(data)
		},
		handle_goUrl(data) {
			window.open(data.url)
		},
		async handle_uploadFileImg() {
			// 图片上传
			let formData = new FormData()
			formData.append('img', this.$refs.fileInput_img.files[0])
			formData.append('type', 'image')
			formData.append('appSecret', this.account.appSecret)
			formData.append('appId', this.account.appId)
			// 避免出现点击取消也触发change导致文件多次上传
			this.$refs.fileInput_img.value = ''

			let res = await this.$fetch(
				"graphic_message_upload_material"
				, formData);
			this.$message.success("图片已保存到素材库")
		},
		async handle_uploadFileVoice() {
			// 音频上传
			let formData = new FormData()
			formData.append('img', this.$refs.fileInput_voice.files[0])
			formData.append('type', 'voice')
			formData.append('appSecret', this.account.appSecret)
			formData.append('appId', this.account.appId)
			// 避免出现点击取消也触发change导致文件多次上传
			this.$refs.fileInput_voice.value = ''

			let res = await this.$fetch(
				"graphic_message_upload_material"
				, formData);
			this.$message.success("音频已保存到素材库")
		},
		async handle_uploadFileVideo() {
			// 音频上传
			let formData = new FormData()
			formData.append('img', this.$refs.fileInput_video.files[0])
			formData.append('type', 'video')
			formData.append('appSecret', this.account.appSecret)
			formData.append('appId', this.account.appId)
			// 避免出现点击取消也触发change导致文件多次上传
			this.$refs.fileInput_video.value = ''
			let res = await this.$fetch(
				"graphic_message_upload_material"
				, formData);
			this.$message.success("音频已保存到素材库")
		},
		handle_clear() {
			this.content = {
				from: '',// store 素材库 、slef 自建 、 reprint 转载 
				media_id: '',// 给到后台转发到微信的关键信息是 media_id
				data: {},// 为了适应各种模式，使用一个中性的名称存放具体的数据内容，只做预览使用
			}
		},
		updateSelectPopOptions(n) {
			// 图文
			this.SelectPopOptions.searchObj.params.appId = n.appId
			this.SelectPopOptions.searchObj.params.appSecret = n.appSecret
			// 图片
			this.SelectPopOptions_img.searchObj.params.appId = n.appId
			this.SelectPopOptions_img.searchObj.params.appSecret = n.appSecret
			// 音频
			this.SelectPopOptions_voice.searchObj.params.appId = n.appId
			this.SelectPopOptions_voice.searchObj.params.appSecret = n.appSecret
			// 视频
			this.SelectPopOptions_video.searchObj.params.appId = n.appId
			this.SelectPopOptions_video.searchObj.params.appSecret = n.appSecret
		},
		handle_showDialogForm(type) {

			this.dialog.title = type == 'voice' ? '上传音频' : '上传视频'
			this.dialog.type = type
			this.dialog.visible = true

			this.dialog.form_voice = {
				title: '',
				type: '1',
			}


		}
	},
	mounted() {
		this.updateSelectPopOptions(this.account)
	}
}
</script>

<style lang="scss" scoped>
.head {
	background: #f6f8f9;
	display: flex;
	.type-item {
		padding: 20px;
		min-width: 90px;
		cursor: pointer;
		display: flex;
		align-items: center;
		color: #999;
		user-select: none;
		i {
			margin-right: 5px;
			font-size: 20px;
		}
		&:hover {
			color: #409eff;
		}
		&.active {
			color: #409eff;
		}
	}
}
.inner {
	min-height: 350px;
	.is-msg {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		.chose-item {
			margin-top: 80px;
			height: 120px;
			width: 120px;
			margin-right: 30px;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			color: #999;
			font-size: 14px;
			cursor: pointer;
			border: 1px solid #eee;
			user-select: none;
			position: relative;
			i {
				font-size: 36px;
				margin-bottom: 15px;
			}
			&:last-child {
				margin-right: 0;
			}
			&:hover {
				background: #f6f8f9;
			}
		}
	}
	.is-text {
		.likeInput {
			height: 300px;
			overflow: auto;
			padding: 10px;
			width: 100%;
			word-break: break-all;
		}
		.other {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-top: 15px;
			border-top: 1px solid #eee;
			.limit {
				font-size: 14px;
				color: #999;
			}
		}
	}
	.chose-content {
		height: 100%;
		overflow: auto;
		width: 100%;
	}
}
.news-box {
	border: 1px solid #eee;
	padding: 5px;
	border-radius: 4px;
	margin-bottom: 10px;
	cursor: pointer;
	position: relative;
	&:hover {
		&::after {
			content: '';
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			right: 0;
			background: rgba(0, 0, 0, 0.4);
			z-index: 10;
		}
	}
	&.chosed {
		width: 370px;
		margin-top: 10px;
		&:hover {
			&::after {
				content: none;
			}
		}
		.news-item:hover {
			&::after {
				content: '';
				position: absolute;
				width: 100%;
				height: 100%;
				top: 0;
				right: 0;
				background: rgba(0, 0, 0, 0.4);
				z-index: 10;
			}
		}
	}
	.clear {
		position: absolute;
		bottom: 0;
		right: -80px;
	}
	.news-item {
		display: flex;
		margin-bottom: 5px;
		position: relative;
		.title {
			margin-top: 10px;
			font-size: 14px;
		}
		.thumb {
			width: 100px;
			height: 100px;
			margin-right: 10px;
			flex-shrink: 0;
			img {
				width: 100%;
				height: 100%;
				object-fit: fill;
			}
		}
	}
	.news-item:first-child {
		height: 150px;
		width: 100%;
		position: relative;
		.title {
			position: absolute;
			z-index: 2;
			bottom: 20px;
			color: #fff;
			text-align: center;
			width: 100%;
		}
		.thumb {
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			right: 0;
			z-index: 1;
			margin: 0;
			&::after {
				content: '';
				position: absolute;
				width: 100%;
				height: 100%;
				top: 0;
				right: 0;
				background: rgba(0, 0, 0, 0.548);
			}
		}
	}
}
.btn-hidden {
	position: absolute;
	height: 100%;
	width: 100%;
	z-index: 1;
	opacity: 0;
	left: 0;
	top: 0;
}
.origin-tips {
	color: #ffaf53;
	font-size: 12px;
	padding: 20px 0;
}
.form-line {
	align-items: flex-start !important;
	.type-item {
		margin-bottom: 20px;
	}
}
</style>