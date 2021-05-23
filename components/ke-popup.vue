<template>
	<view class="ke-popup__box">
		<view class="popup-content__box"><view class="header_box"></view></view>
	</view>
</template>

<script>
export default {
	name: 'ke-popup',
	data() {
		return {};
	}
};
</script>

<style lang="scss" scoped>
.ke-popup__box {
	width: 100%;
	height: 100%;
	position: fixed;
	bottom: 0;
	left: 0;
	background-color: rgba($color: #000000, $alpha: 0.6);
	.popup-content__box {
		width: 100%;
		height: 80%;
		background-color: #ffffff;
		border-radius: 20rpx 20rpx 0 0;
		position: absolute;
		bottom: 0;
		left: 0;
	}
}
</style>
