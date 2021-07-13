<template>
  <transition name="fade">
    <div v-if="isShow" class="toast-wrapper">
      {{ message }}
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      message: ""
    };
  }
};
</script>

<style lang="less" scoped>
.transform(@a) {
  -moz-transform: @a;
  -webkit-transform: @a;
  -ms-transform: @a;
  transform: @a;
}
.transition( @a ) {
  -moz-transition: @a;
  -webkit-transition: @a;
  -ms-transition: @a;
  transition: @a;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.toast-wrapper {
  position: fixed;
  z-index: 2000;
  left: 50%;
  top: 45%;
  .transition(all 0.25s); // 渐入渐出的时间
  .transform(translateX(-50%) translateY(-50%));
  text-align: center;
  border-radius: 5px;
  color: #fff;
  background: rgba(0, 0, 0, 0.75);
  font-size: 16px;
  line-height: 1;
  padding: 15px;
  max-width: 150px;
}
</style>
