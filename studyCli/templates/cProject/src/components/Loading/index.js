import loading from "./index.vue";
export default {
  install: vue => {
    const MyLoading = vue.extend(loading);
    const instance = new MyLoading();
    instance.$mount(document.createElement("div"));
    document.body.appendChild(instance.$el);
    vue.prototype.$loading = bool => {
      instance.isShow = bool;
    };
  }
};
