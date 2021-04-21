<template>
	<div class="imgmsg">
		<div class="form-line">
			<div class="label">添加图片：</div>
			<Upload-oss v-if="uploadOssElem" :objConfig="{ dir: 'web/runde_admin', project: 'icon_' }" :src.sync="msgForm.picurl" :initGetConfig="initGetConfig" />
		</div>
	</div>
</template>

<script>
import UploadOss from '@/components/UploadOss'
export default {
	components: { UploadOss },
	data() {
		return {
			uploadOssElem: true,
			initGetConfig: false,
			msgForm: {
				picurl: ""
			}
		}
	},
	watch: {
		'msgForm.picurl': function (n, o) {
			this.emitForm()
		}
	},
	methods: {
		emitForm() {
			this.$emit('msgData', this.msgForm)
		}
	},
	mounted() {

	}
}
</script>

<style lang='scss' scoped>
.imgmsg {
	
}
</style>