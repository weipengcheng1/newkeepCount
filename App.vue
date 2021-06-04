<script>
export default {
	onLaunch: function() {
		const { session_key, openid } = uni.getStorageSync('openid');
		if (!session_key || !openid) {
			this.$store.commit('login');
		}
	},
	onShow: function() {
		//判断用户有没有登录
		setTimeout(() => {
			const { session_key, openid } = uni.getStorageSync('openid');
			if (session_key && openid) {
				this.$store.commit('getUserPhoneByOpenid', { openid: openid });
			}	
		}, 1500);
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style lang="scss">
/*每个页面公共css */
@import './static/css/iconfont.css';
@import 'uview-ui/index.scss';
page {
	font-family: shouxieti;
}
</style>
