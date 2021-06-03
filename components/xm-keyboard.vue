<template>
	<view class="keyboard">
		<view class="key-left">
			<view hover-class="view-hover__box" class="comm-key__box" @click="keyItmeClick(1)"><text>1</text></view>
			<view hover-class="view-hover__box" class="comm-key__box" @click="keyItmeClick(2)"><text>2</text></view>
			<view hover-class="view-hover__box" class="comm-key__box" @click="keyItmeClick(3)"><text>3</text></view>
			<view hover-class="view-hover__box" class="comm-key__box" @click="keyItmeClick(4)"><text>4</text></view>
			<view hover-class="view-hover__box" class="comm-key__box" @click="keyItmeClick(5)"><text>5</text></view>
			<view hover-class="view-hover__box" class="comm-key__box" @click="keyItmeClick(6)"><text>6</text></view>
			<view hover-class="view-hover__box" class="comm-key__box" @click="keyItmeClick(7)"><text>7</text></view>
			<view hover-class="view-hover__box" class="comm-key__box" @click="keyItmeClick(8)"><text>8</text></view>
			<view hover-class="view-hover__box" class="comm-key__box" @click="keyItmeClick(9)"><text>9</text></view>
			<view hover-class="view-hover__box" class="comm-key__box" @click="keyItmeClick(0)"><text>0</text></view>
			<view hover-class="view-hover__box" class="comm-key__box" @click="keyItmeClick('.')"><text>.</text></view>
		</view>
		<view class="key-right">
			<view hover-class="view-hover__box" class="comm-key__box" @click="keyDeleteItem"><text class="iconfont icon-jianpan_shanchu"></text></view>
			<view class="comm-key__box" :style="{ 'background-color': enterBg ? enterBg : '#92c3e8' }"><text>确定</text></view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'xm-keyboard',
	props: {
		enterBg: {
			type: String,
			default: '#92c3e8'
		}
	},
	data() {
		return {
			keyData: ''
		};
	},
	methods: {
		keyItmeClick(item) {
			this.keyData += item;
			this.$emit('key-item-click', this.keyData);
		},
		keyDeleteItem() {
			//先将string转换成array
			let { keyData } = this;
			if (!keyData) return;
			let keyDataArr = keyData.split('');
			//删除数组最后一位
			keyDataArr.splice(-1);
			//array-->string
			let str = keyDataArr.join('');
			this.keyData = str;
			this.$emit('key-item-click', this.keyData);
		}
	}
};
</script>

<style lang="scss" scoped>
.keyboard {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	.comm-key__box {
		height: 86rpx;
		background-color: #ffffff;
		border-radius: 10rpx;
		margin-bottom: 20rpx;
		font-size: 40rpx;
		font-weight: bold;
		text-align: center;
		line-height: 86rpx;
		color: #b3b3b3;
	}
	.key-left {
		flex: 0 0 75%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		view {
			flex: 0 0 calc(100% / 3 - 10rpx);
			&:nth-child(10) {
				flex: 0 0 calc(100% / 1.5);
			}
		}
	}
	.key-right {
		flex: 0 0 25%;
		padding-left: 20rpx;
		box-sizing: border-box;
		view {
			width: 100%;
			&:nth-child(2) {
				height: calc(86rpx * 3 + 40rpx);
				background-color: #68a1e8;
				line-height: calc(86rpx * 3 + 40rpx);
				color: #ffffff;
			}
		}
	}
	.icon-jianpan_shanchu {
		font-size: 60rpx;
		color: #b3b3b3;
	}
	.view-hover__box {
		background-color: rgb(228, 231, 237);
	}
}
</style>
