<template>
	<view class="">
		<u-popup v-model="popupShow" mode="bottom" border-radius="24" :closeable="true" @close="closePopup">
			<view class="" style="overflow: hidden;height: 100%;position: relative;">
				<view class="title__box"><text>记一笔</text></view>
				<view class="booking_box">
					<view class="booking-head__box">
						<view class="head-left__box">
							<view :class="['common-item__box left-item__box', tallyObj.type === 'pay' ? 'active-pay__box' : '']" @click="switchRevenueAndExpense('pay')">
								<text>支出</text>
							</view>
							<view :class="['common-item__box left-item__box', tallyObj.type === 'income' ? 'active-income__box' : '']" @click="switchRevenueAndExpense('income')">
								<text>收入</text>
							</view>
						</view>
						<view class="head-right__box">
							<view class="common-item__box right-item__box" @click="caleObj.caleShow = true">
								<text>{{ tallyObj.nowDate | dateFilter }}</text>
								<text class="iconfont icon-f11-copy"></text>
							</view>
						</view>
					</view>
					<view class="booking-body__box">
						<!-- 输入 -->
						<view class="body-int__box">
							<text class="iconfont icon-RMB"></text>
							<input type="number" :disabled="true" :focus="true" @focus="catchtouchstartTap" :value="tallyObj.inputVal" />
						</view>
						<!-- 分类 -->
						<view class="body-type_list__box">
							<scroll-view class="scroll-view__box" scroll-left="0" :scroll-x="true" :enable-flex="true">
								<template v-for="(item, index) in typeList">
									<view class="view-item__box" v-if="item.typeEn === tallyObj.type" v-for="(it, k) in item.children">
										<view class="item_box" :key="it.id" @click="chooseTypeDir(it.id)">
											<text
												:class="[
													'iconfont icon-type__box',
													it.typeDirIcon,
													tallyObj.type == 'pay' && tallyObj.typeId == it.id
														? 'active-pay__box'
														: tallyObj.type === 'income' && tallyObj.typeId == it.id
														? 'active-income__box'
														: ''
												]"
											></text>
											<text>{{ it.typeDirName }}</text>
										</view>
									</view>
								</template>
							</scroll-view>
						</view>
						<!-- 备注 -->
						<view class="body-note__box" @click="addBillNote">
							<text v-if="tallyObj.noteValue" style="color: #333333;font-size: 26rpx;">
								{{ tallyObj.noteValue }}
								<text style="margin-left: 20rpx;color: #68a1e8;font-size: 34rpx;">修改</text>
							</text>
							<text v-else>添加备注</text>
						</view>
						<!-- 键盘 -->
						<view class="body-key__box">
							<xm-keyboard :enter-bg="tallyObj.enterBg" @key-item-click="keyItemClick" @enter-key="enterSubmitBill" @key-item-delete="keyItemDelete"></xm-keyboard>
						</view>
					</view>
				</view>
			</view>
		</u-popup>
		<!-- 日历 -->
		<u-calendar v-model="caleObj.caleShow" mode="date" active-bg-color="#68a1e8" @change="calendarChange"></u-calendar>
		<!-- 备注 -->
		<u-popup v-model="caleObj.noteShow" mode="bottom" :mask-close-able="false" height="25%" border-radius="24" :closeable="true">
			<view class="note__box">
				<view class="title__box"><text>请添加备注</text></view>
				<view class="body__box">
					<view class="note-int__box">
						<u-field label-width="0" :maxlength="30" placeholder="请输入备注内容" v-model="tallyObj.noteValue" :border-bottom="false"></u-field>
					</view>
					<view class="note-btn__box">
						<view class="btn__box" @click="caleObj.noteShow = false"><text>确定</text></view>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
import xmKeyboard from './xm-keyboard.vue';
export default {
	name: 'xm-popup',
	components: {
		xmKeyboard
	},
	props: {
		show: {
			type: Boolean,
			default: false
		},
		typeList: {
			type: Array,
			default: () => {
				return [];
			}
		}
	},
	data() {
		return {
			//当前值
			tallyObj: {
				type: 'pay',
				typeId: 1,
				nowDate: new Date().getTime(),
				inputVal: '',
				enterBg: '#92c3e8',
				noteValue: ''
			},
			caleObj: {
				caleShow: false,
				noteShow: false
			}
		};
	},
	watch: {
		typeList(val) {
			if (val) this.isActiveClass();
		},
		show(val) {
			this.popupShow = val;
			//重置数据
			if (!val) {
				this.tallyObj.type = 'pay';
				this.isActiveClass();
				this.tallyObj.nowDate = new Date().getTime();
				this.tallyObj.inputVal = '';
				this.tallyObj.enterBg = '#92c3e8';
				this.tallyObj.noteValue = '';
			}
		}
	},
	computed: {
		popupShow: {
			get() {
				return this.show;
			},
			set() {
				return this.show;
			}
		},
		nowFomat() {
			let date = new Date(this.tallyObj.nowDate);
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();
			let timeFormat = `${year}-${month <= 9 ? '0' + month : month}-${day <= 9 ? '0' + day : day}`;
			return timeFormat;
		}
	},
	filters: {
		dateFilter(val) {
			//根据时间戳转换成标准时间格式
			let timeFormat = '';
			let nowDate = new Date();
			let date = new Date(val);
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();
			if (nowDate.getFullYear() === year) {
				timeFormat = `${month}月${day}日`;
			} else {
				timeFormat = `${year}年${month}月${day}日`;
			}
			return timeFormat;
		},
		iconFilter(val) {
			console.log(val);
		}
	},
	methods: {
		//确认提交账单
		enterSubmitBill() {
			//获取参数
			let { type, typeId, nowDate, inputVal, noteValue } = this.tallyObj;
			if (inputVal.length <= 0) return this.$msg('请输入正确金额！');
			nowDate = Math.round(nowDate / 1000);
			//进行提交
			this.$emit('enter-submit', { type, typeId, nowDate, inputVal: Number(inputVal), noteValue, nowFormat: this.nowFomat });
		},
		//选择小类
		chooseTypeDir(id) {
			this.tallyObj.typeId = id;
		},
		//阻止默认键盘
		catchtouchstartTap() {
			wx.hideKeyboard();
		},
		switchRevenueAndExpense(type) {
			//样式切换
			this.tallyObj.type = type;
			this.isActiveClass();
			this.tallyObj.enterBg = this.isSceneBgColor(this.tallyObj.type, this.tallyObj.inputVal);
		},
		calendarChange(e) {
			const { result } = e;
			console.log(e);
			this.tallyObj.nowDate = new Date(result).getTime();
		},
		//键盘输入
		keyItemClick(item) {
			let { inputVal } = this.tallyObj;
			if (item == '.') {
				let keyDataArr = inputVal.split('');
				let filterArr = keyDataArr.filter(it => {
					return it === '.';
				});
				if (filterArr.length >= 1) return;
			}
			inputVal += item;
			if (Number(inputVal) >= 1000000) return this.$msg('输入金额不能大于1000000');
			this.tallyObj.enterBg = this.isSceneBgColor(this.tallyObj.type, item);
			this.tallyObj.inputVal = inputVal;
		},
		//键盘删除
		keyItemDelete() {
			//先将string转换成array
			let { inputVal } = this.tallyObj;
			if (!inputVal) return;
			let keyDataArr = inputVal.split('');
			//删除数组最后一位
			keyDataArr.splice(-1);
			//array-->string
			let str = keyDataArr.join('');
			this.tallyObj.inputVal = str;
		},
		//判断当前场景颜色
		isSceneBgColor(type, intVal) {
			let bgColor = '';
			if (type === 'pay' && intVal) {
				bgColor = '#68a1e8';
			} else if (type === 'pay' && !intVal) {
				bgColor = '#92c3e8';
			} else if (type === 'income' && intVal) {
				console.log(1111);
				bgColor = '#f0b73a';
			} else {
				bgColor = '#f5d89a';
			}
			return bgColor;
		},
		//判断active class
		isActiveClass() {
			//根据当前类型获取第一个值
			const item = this.typeList.find(item => {
				return item.typeEn === this.tallyObj.type;
			});
			let childrenId = item.children[0].id;
			this.tallyObj.typeId = childrenId;
		},
		//添加备注
		addBillNote() {
			this.caleObj.noteShow = true;
		},
		closePopup() {
			this.$emit('close');
		}
	}
};
</script>

<style lang="scss" scoped>
.title__box {
	width: 100%;
	box-sizing: border-box;
	padding: 32rpx 0 0;
	text-align: center;
	font-size: 34rpx;
	font-weight: bold;
}
.booking_box {
	width: 100%;
	box-sizing: border-box;
	padding: 50rpx 50rpx 0;
	height: 100%;
	overflow: hidden;

	.booking-head__box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
	}
	.head-left__box {
		flex: 0 0 60%;
		display: flex;
		align-items: center;
	}
	.head-right__box {
		flex: 0 0 40%;
	}
	.left-item__box {
		width: 143rpx;

		&:not(:last-child) {
			margin-right: 20rpx;
		}
	}
	.right-item__box {
		min-width: 160rpx;
	}
	.common-item__box {
		box-sizing: border-box;
		padding: 17rpx 10rpx;
		color: #333333;
		background-color: #e1e1e1;
		border-radius: 44rpx;
		text-align: center;
	}
	.booking-body__box {
		width: 100%;
		box-sizing: border-box;
		padding-top: 40rpx;
	}
	.body-int__box {
		font-size: 60rpx;
		border-bottom: 4rpx solid #ebebeb;
		display: flex;
		align-items: center;
		padding: 10rpx 0;
		box-sizing: border-box;
		input {
			height: 80rpx;
			margin-left: 30rpx;
		}
	}
	.icon-RMB {
		font-size: 60rpx;
	}
	.body-type_list__box {
		box-sizing: border-box;
		width: 100%;
		padding-top: 30rpx;
	}
	.scroll-view__box {
		display: flex;
		height: 148rpx;
		justify-content: space-between;
	}
	.view-item__box {
		flex: 0 0 132rpx;
	}
	.icon-type__box {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		background-color: #e7e7e7;
		text-align: center;
		line-height: 80rpx;
		font-size: 40rpx;
		color: #a7a7aa;
	}
	.active-pay__box {
		background-color: #68a1e8;
		color: #ffffff;
	}
	.active-income__box {
		background-color: #f0b73a;
		color: #ffffff;
	}
	.item_box {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		text {
			&:nth-child(2) {
				margin-top: 18rpx;
				font-size: 24rpx;
				width: 100%;
				overflow: hidden;
				text-align: center;
				text-overflow: clip;
				white-space: nowrap;
			}
		}
	}
	.body-note__box {
		width: 100%;
		box-sizing: border-box;
		padding: 20rpx 0;
		font-size: 34rpx;
		color: #68a1e8;
		font-weight: bold;
	}
	.body-key__box {
		background-color: #f1f0f4;
		margin: 0 -50rpx;
		box-sizing: border-box;
		padding: 20rpx 50rpx;
		// position: absolute;
		// bottom: 0;
		// width: 100%;
	}
}
.note__box {
	width: 100%;
	box-sizing: border-box;
	.body__box {
		width: 100%;
		box-sizing: border-box;
		padding: 10rpx 20rpx;
	}
	.note-int__box {
		border-bottom: 4rpx solid #dedede;
	}
	.note-btn__box {
		width: 100%;
		box-sizing: border-box;
		padding: 20rpx 0;
		display: flex;
		justify-content: center;
	}
	.btn__box {
		width: 200rpx;
		line-height: 74rpx;
		border-radius: 40rpx;
		background-color: #68a1e8;
		color: #ffffff;
		text-align: center;
	}
}
</style>
