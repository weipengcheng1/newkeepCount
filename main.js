import Vue from 'vue'
import App from './App'

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


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
