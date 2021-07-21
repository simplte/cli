import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { fabric } from 'fabric';
// import store from "./store/index"
// 基础样式
import './assets/less/base.less';
// 字体图标
import './assets/iconfont/iconfont.css';
// 动画插件
import 'animate.css';
// 公共组件挂载
import toast from './components/Toast';
import loading from './components/Loading';
Vue.use(toast);
Vue.use(loading);
Vue.use(fabric);
// axios
import axios from 'axios';
Vue.prototype.$axios = axios;
// 轮播图

import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
Vue.use(VueAwesomeSwiper /* { default global options } */);
// 开发环境不提示官网地址
Vue.config.productionTip = false;
// 挂载封装的异步请求
import api from './api/install';
Vue.use(api);
// 图片懒加载
import VueLazyload from 'vue-lazyload';
import loadingImg from './assets/images/loadingForProduct.gif';
Vue.use(VueLazyload, {
	// preLoad: 1.3,
	// error: "dist/error.png",
	loading: loadingImg,
	attempt: 1
});
// 移动端调试
// import vconsole from "vconsole";
// let vConsole = new vconsole();
// export default vConsole;

router.beforeEach((to, from, next) => {
	/* 路由发生变化修改页面title */
	if (to.meta.title) {
		document.title = to.meta.title;
	}
	next();
});

new Vue({
	router,
	store,
	render: (h) => h(App)
}).$mount('#app');
