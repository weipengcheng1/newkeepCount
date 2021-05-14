<template>
	<view class="cotainer">
		<view class="header_box">
			<view class="header-top__box">
				<view class="type_box">
					<text>全部类型</text>
					<text class="iconfont icon-leixing"></text>
				</view>
			</view>
			<view class="header-bottom__box">
				<view class="left-text__box">
					<text>📅</text>
					<text>2020年5月</text>
					<text class="iconfont icon-f11-copy"></text>
				</view>
				<view class="right-text__box">
					<text>😭总支出¥947.17</text>
					<text>🤩总收入¥947.17</text>
				</view>
			</view>
		</view>
		<view class="body_box">
			<view class="card-list_box">
				<view class="card-item_box">
					<view class="item-header__box">
						<view class="header-left__box">
							<text>📅</text>
							<text>5月14日</text>
							<text>星期一</text>
						</view>
						<view class="header-right__box">
							<view class="">
								<text>支</text>
								<text>0.00</text>
							</view>
							<view class="">
								<text>收</text>
								<text>0.00</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: 'Hello'
		};
	},
	onLoad() {},
	methods: {}
};
</script>

<style lang="scss" scoped>
.cotainer {
	width: 100vw;
	height: 100vh;
	box-sizing: border-box;
}
.header_box {
	width: 100%;
	box-sizing: border-box;
	padding: 20rpx 10rpx;
	background-color: #68a1e8;
	.header-top__box {
		width: 100%;
		box-sizing: border-box;
	}
	.header-bottom__box {
		width: 100%;
		box-sizing: border-box;
		display: flex;
		align-content: center;
		font-size: 26rpx;
		color: #ffffff;
		padding: 30rpx 0 0 20rpx;
	}
	.type_box {
		width: 200rpx;
		padding: 14rpx 15rpx;
		font-size: 26rpx;
		font-weight: bold;
		background-color: rgba($color: #fff, $alpha: 0.3);
		color: #ffffff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		text-align: center;
		text {
			&:nth-child(1) {
				flex: 0 0 70%;
				border-right: 1px solid rgba($color: #fff, $alpha: 0.3);
			}
			&:nth-child(2) {
				flex: 0 0 calc(100% - 70%);
				font-size: 26rpx;
			}
		}
	}
	.left-text__box {
		margin-right: 30rpx;
	}
	.right-text__box {
		text {
			&:nth-child(1) {
				margin-right: 20rpx;
			}
		}
	}
}
.body_box {
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	background-color: #efefef;
	padding: 20rpx 15rpx;
	.card-list_box {
		width: 100%;
		box-sizing: border-box;
	}
	.card-item_box {
		width: 100%;
		background-color: #ffffff;
		box-sizing: border-box;
		border-radius: 20rpx;
		overflow: hidden;
		box-shadow: 1rpx 3rpx 5rpx 4rpx rgba(0, 0, 0, 0.1);
		&:not(:last-child) {
			margin-bottom: 20rpx;
		}
	}
	.item-header__box {
		width: 100%;
		box-sizing: border-box;
		padding: 16rpx 20rpx;
		background-color: #f8f8f8;
		
	}
}
</style>
