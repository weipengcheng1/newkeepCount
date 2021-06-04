import Vue from 'vue'
import App from './App'
import store from "./store"
import uView from "uview-ui";
Vue.use(uView);

Vue.prototype.$msg = (title, icon = 'none') => {
	return new Promise((resolve, reject) => {
		uni.showToast({
			title: title,
			icon: icon
		})
	})
}

import {
	request
} from "@/util/util.js";

Vue.prototype.$request = request;


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
