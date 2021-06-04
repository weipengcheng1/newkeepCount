import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import {
	getUserOpenid,
	regUserInfo
} from "@/util/http.js"
import {
	request,
	login
} from "@/util/util.js";
const store = new Vuex.Store({
	state: {

	},
	mutations: {
		async login() {
			const loginInfo = await login('weixin');
			//获取到code然后交换openid
			const code = loginInfo.code;
			let result = await request({
				url: getUserOpenid,
				data: {
					code
				},
				method: 'POST'
			});
			if (result.statusCode === 200) {
				const {
					code,
					msg,
					items
				} = result.data;
				if (code === 0) {
					//将openid保存起来
					if (items.openid || items.session_key) {
						uni.setStorageSync("openid", items)
					} else {
						uni.showToast({
							title: '获取登录状态错误',
							icon: 'none'
						})
					}
				} else {
					uni.showToast({
						title: msg,
						icon: 'none'
					})
				}
			} else {
				uni.showToast({
					title: '系统错误',
					icon: 'none'
				})
			}
		},
		async getUserPhoneByOpenid(state, params) {
			const result = await request({
				url: regUserInfo,
				data: {
					openid: params.openid
				},
				method: "POST"
			})
			if (result.statusCode === 200) {
				const {
					errcode,
					errMsg,
					info
				} = result.data;
				if (errcode === 0) {
					state.phone = info.item ? info.item.phone : ''
				}
			} else {
				uni.showToast({
					title: '系统错误',
					icon: 'none'
				})
			}
		}
	},
	actions: {

	}
})


export default store;
