<template>
	<div class="">
		<el-select v-model="accountId" placeholder="请选择">
			<el-option v-for="(item,index) in officialAccounts" :key="index" :label="item.appName" :value="index">
				<span style="float: left">{{ item.appName }}</span>
			</el-option>
		</el-select>
	</div>
</template>

<script>
export default {
	data() {
		return {
			officialAccounts: [],
            accountId:''
		}
	},
	async mounted() {
		let res = await this.$fetch(
			"get_official_accounts_list",
		);
		this.officialAccounts = res.data

	}
}
</script>

<style>
</style>