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
					<text>2020年5月</text>
					<text class="iconfont icon-f11-copy"></text>
				</view>
				<view class="right-text__box">
					<text>总支出¥947.17</text>
					<text>总收入¥947.17</text>
				</view>
			</view>
		</view>
		<view class="body_box">
			<view class="card-list_box">
				<view class="card-item_box">
					<view class="item-header__box">
						<view class="header-left__box">
							<text>5月14日</text>
							<text>星期一</text>
						</view>
						<view class="header-right__box">
							<view class="">
								<text class="cate_box">支</text>
								<text class="money_box">0.00</text>
							</view>
							<view class="">
								<text class="cate_box">收</text>
								<text class="money_box">0.00</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="fixed_box">
			<view class="fixed-cotent_box"><text class="iconfont icon-jinrujizhang"></text></view>
		</view>
		<ke-popup></ke-popup>
	</view>
</template>

<script>
import kePopup from '@/components/ke-popup.vue';
export default {
	components: {
		kePopup
	},
	data() {
		return {};
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
		margin-right: 60rpx;
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
		padding: 20rpx 30rpx;
		background-color: #f8f8f8;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.header-left__box {
		flex: 0 0 50%;
		text {
			&:nth-child(1) {
				margin-right: 20rpx;
			}
		}
	}
	.header-right__box {
		flex: 0 0 50%;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		view {
			&:nth-child(1) {
				margin-right: 20rpx;
			}
		}
	}
	.cate_box {
		display: inline-block;
		width: 40rpx;
		height: 40rpx;
		background-color: #e7e7e7;
		border-radius: 8rpx;
		font-size: 24rpx;
		text-align: center;
		color: #757575;
		vertical-align: middle;
	}
	.money_box {
		font-size: 26rpx;
		font-weight: bold;
		margin-left: 8rpx;
	}
}
.fixed_box {
	width: 80rpx;
	height: 80rpx;
	border-radius: 50%;
	background-color: #ffffff;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
	position: fixed;
	bottom: 15%;
	right: 40rpx;
	.fixed-cotent_box {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}
	.icon-jinrujizhang {
		font-size: 40rpx;
		color: #68a1e8;
		font-weight: bold;
	}
}
</style>
