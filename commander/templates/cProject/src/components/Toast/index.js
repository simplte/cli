import toast from "./index.vue";
export default {
  install: vue => {
    const MyToast = vue.extend(toast);
    const instance = new MyToast();
    instance.$mount(document.createElement("div"));
    document.body.appendChild(instance.$el);
    vue.prototype.$toast = (msg, duration = 2000) => {
      instance.message = msg;
      instance.isShow = true;
      setTimeout(() => {
        instance.isShow = false;
      }, duration);
    };
  }
};
