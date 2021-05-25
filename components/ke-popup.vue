<template>
	<view class="ke-popup__box">
		<view class="popup-content__box">
			<view class="ke-popup__header__box">
				<view class="ke-popup__header__btn">
					<text class="iconfont icon-guanbi"></text>
					<text>取消</text>
				</view>
				<view class="ke-popup__header__title"><text>我是标题</text></view>
				<view class="ke-popup__header_btn">
					<text class="iconfont icon-guanbi"></text>
					<text>确定</text>
				</view>
			</view>
		</view>
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
	.ke-popup__header__box {
		width: 100%;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		view {
			flex: 0 0 calc(100% / 3);
		}
	}
}
</style>
