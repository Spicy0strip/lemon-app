import Vue from 'vue'
import App from './App'
import iconfont from './common/iconfont.css'

Vue.config.productionTip = false

Vue.prototype._get = function(isOpen, url, data, success, fail, complete) {
    data = data || {};
    data.openId = uni.getStorageSync('token') || '';
    if (!data.openId && isOpen) {
        uni.navigateTo({
            url: '/pages/login/login',
        });
        return ;
    }
    uni.request({
		url: `http://39.96.82.21:82/shop/${url}`,
		data: data,
		dataType: 'json',
		method: 'GET',
		success: (res) => {
			if (res.statusCode !== 200 || typeof res.data !== 'object') {
				return false;
			}
			if (res.data.code !== 200) {
				this.showError(res.data.message, function() {
					fail && fail(res);
				});
				return false;
			} else {
				success && success(res.data);
			}
		},
		fail: (res) => {
			fail && fail(res);
		},
		complete: (res) => {
			uni.hideLoading();
			complete && complete(res);
		},
	});
}

/**
 * 显示失败提示框
 */
Vue.prototype.showError = function(msg, callback) {
	uni.showModal({
		title: '友情提示',
		content: msg,
		showCancel: false,
		success: function(res) {
			callback && callback();
		}
	});
};

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
