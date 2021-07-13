<template>
  <div v-show="isShow" ontouchmove="return false;" class="refreshbg">
    <div class="refresh" @click="refurbish">
      <img src="@@/images/refresh.png" alt="" class="refreshImg" />
      <div class="refresh-text">网络出问题了，请点击重试</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    refurbish() {
      this.$emit("refurbish");
    }
  }
};
</script>

<style lang="less" scoped>
.refreshbg {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 998;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(247, 247, 247, 1);
  width: 100%;
  height: 100%;
}
.refresh {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
}

.refreshImg {
  margin: 152.5px auto 0;

  width: 31px;
  height: 28.5px;
}

.refresh-text {
  margin-top: 27px;
  width: 100%;
  font-size: 15px;
  text-align: center;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  font-family: PingFangSC-Regular;
  line-height: 27.5px;
}
</style>
