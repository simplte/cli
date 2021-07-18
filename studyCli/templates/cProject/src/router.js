import Vue from "vue";
import Router from "vue-router";
import demo from "./views/demo/index.vue";
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
};
Vue.use(Router);

const routes = [
  {
    path: "/",
    name: "demo1",
    meta: {
      title: "111"
    },
    component: demo
  },
];

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: "active",
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});
