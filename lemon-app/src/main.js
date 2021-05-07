import Vue from 'vue'
import App from './App'
import iconfont from './common/iconfont.css'

Vue.config.productionTip = false

Vue.prototype.doLogin = function() {
	let pages = getCurrentPages();
	if (pages.length) {
		let currentPage = pages[pages.length - 1];
		if ("pages/login/login" != currentPage.route) {
			uni.setStorageSync("currentPage", currentPage.route);
			uni.setStorageSync("currentPageOptions", currentPage.options);
		}
	}
};

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
