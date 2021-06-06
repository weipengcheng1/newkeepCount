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
				<template v-for="(item, index) in billList">
					<view class="card-item_box" :key="index">
						<view class="item-header__box">
							<view class="header-left__box">
								<text>{{ item.nowFormat }}</text>
								<text>星期一</text>
							</view>
							<view class="header-right__box">
								<view class="">
									<text class="cate_box">支</text>
									<text class="money_box">{{ item.payMoney }}</text>
								</view>
								<view class="">
									<text class="cate_box">收</text>
									<text class="money_box">{{ item.incomeMoney }}</text>
								</view>
							</view>
						</view>
						<view class="body-list__box">
							<template v-for="(it, key) in item.children">
								<view class="body-item__box" :key="key">
									<view class="item-left__box">
										<text :style="{ 'background-color': it.type == 'pay' ? '#68a1e8' : '#f0b73a' }" :class="['iconfont', it.typeDirIcon]"></text>
									</view>
									<view class="item-right__box">
										<view class="right-left__box">
											<text>{{ it.typeDirName }}</text>
											<text>
												{{ it.billTime }}
												<text v-if="it.billNote" style="display:inline ;margin: 0 8rpx;">
													|
													<text>{{ it.billNote }}</text>
												</text>
											</text>
										</view>
										<view class="right__box">
											<text>{{ it.type === 'pay' ? '-' + moneyDecimal(it.billMoney) : '+' + moneyDecimal(it.billMoney) }}</text>
										</view>
									</view>
								</view>
							</template>
						</view>
					</view>
				</template>
			</view>
			<view style="margin:60rpx 0;">
				<u-loadmore :status="status" :icon-type="iconType" :load-text="loadText" />
			</view>
			
		</view>
		<view class="fixed_box">
			<view class="fixed-cotent_box" @click="makeNoteOfIt">
				<text class="iconfont icon-jinrujizhang"></text>
				<text class="icon-text">记一笔</text>
			</view>
		</view>
		<xmPopup :show="show" :type-list="typeList" @close="show = false" @enter-submit="enterSubmitBill"></xmPopup>
	</view>
</template>

<script>
import xmPopup from '@/components/xm-popup.vue';
import { getKeepCountType, addBillRecords, getBillList } from '@/util/http.js';
export default {
	components: {
		xmPopup
	},
	data() {
		return {
			show: false,
			typeList: [],
			billList: [],
			pageInfo: {},
			nextPage: 1,
			status: 'loadmore',
			loadText: {
				loadmore: '上拉加载更多',
				nomore: '我也是有底线的'
			}
		};
	},
	onLoad() {
		const { openid } = uni.getStorageSync('openid');
		this.getBillListByOpenid(openid, this.nextPage);
		this.getSystemInfo()
	},
	onReachBottom() {
		console.log(111);
		const { openid } = uni.getStorageSync('openid');
		if (this.pageInfo.nowPage + 1 <= this.pageInfo.totalPage) {
			this.getBillListByOpenid(openid, this.nextPage);
		} else {
			this.status = 'nomore';
		}
	},
	methods: {
		getSystemInfo(){
			this.$system().then(resp=>{
				console.log(resp)
			})
		},
		moneyDecimal(val) {
			return val.toFixed(2);
		},
		//获取账单列表
		getBillListByOpenid(openid, page) {
			this.$request({ url: `${getBillList}?openid=${openid}&page=${page}` })
				.then(resp => {
					if (resp.statusCode === 200) {
						const { code, msg, items } = resp.data;
						if (code === 0) {
							this.billList = [...this.billList, ...items.list];
							this.pageInfo = items.pageInfo;
							this.nextPage = this.pageInfo.nextPage;
						} else {
							this.$msg(msg);
						}
					}
				})
				.catch(error => {
					return this.$msg('系统繁忙，请稍后重试！');
				});
		},
		getKeepCountTypeList(openid) {
			this.$request({ url: `${getKeepCountType}?openid=${openid}` })
				.then(resp => {
					if (resp.statusCode === 200) {
						const { code, msg, items } = resp.data;
						if (code === 0 && msg === 'success') {
							this.typeList = items;
						} else {
							this.$msg(msg);
						}
					}
				})
				.catch(error => {
					this.$msg(msg);
				});
		},
		makeNoteOfIt() {
			//先判断用户是否登录
			const { openid } = uni.getStorageSync('openid');
			this.getKeepCountTypeList(openid);
			this.show = true;
		},
		//提交订单
		async enterSubmitBill(obj) {
			console.log(obj);
			const { openid } = uni.getStorageSync('openid');
			const result = await this.$request({ url: addBillRecords, data: { ...obj, openid }, method: 'POST' });
			if (result.statusCode === 200) {
				const { code, msg } = result.data;
				if (code === 0) {
					this.$msg(msg, 'success');
					//关闭账单
					this.show = false;
				} else {
					this.$msg(msg);
				}
			} else {
				return this.$msg('系统错误,请稍后重试!');
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.cotainer {
	width: 100vw;
	// height: 100vh;
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
		margin-bottom: 20rpx;
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
	width: 200rpx;
	height: 94rpx;
	border-radius: 60rpx;
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
		font-size: 48rpx;
		color: #68a1e8;
		font-weight: bold;
	}
	.icon-text {
		font-size: 28rpx;
		color: #68a1e8;
		font-weight: bold;
		margin-left: 10rpx;
	}
}
.body-list__box {
	width: 100%;
	box-sizing: border-box;
	padding: 20rpx 30rpx;
	.body-item__box {
		display: flex;
		padding-bottom: 20rpx;
	}
	.item-left__box {
		flex: 0 0 80rpx;
		display: flex;
		justify-content: center;
		margin-right: 30rpx;
		text {
			display: inline-block;
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			box-sizing: border-box;
			font-size: 54rpx;
			color: #ffffff;
			text-align: center;
			line-height: 80rpx;
			vertical-align: middle;
		}
	}
	.item-right__box {
		flex: 0 0 calc(100% - 110rpx);
		display: flex;
	}
	.right-left__box {
		flex: 0 0 70%;
		text {
			display: inline-block;
			width: 100%;
			&:nth-child(1) {
				font-size: 28rpx;
				font-weight: bold;
				margin-bottom: 16rpx;
			}
			&:nth-child(2) {
				color: rgb(179, 179, 179);
				font-size: 24rpx;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
				width: 300rpx;
			}
		}
	}
	.right__box {
		flex: 0 0 30%;
		text-align: right;
		font-size: 38rpx;
		font-weight: bold;
	}
}
</style>
