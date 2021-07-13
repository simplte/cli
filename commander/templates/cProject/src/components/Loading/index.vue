<template>
  <transition name="fade">
    <!--loding s-->
    <div v-if="isShow" ontouchmove="return false;" class="loadingbg">
      <div class="loading">
        <div class="loading-rotate lazy"></div>
        <div class="loading_text">努力加载中</div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      isShow: false
    };
  }
};
</script>

<style lang="less" scoped>
.loading-rotate {
  margin: 0 auto;
  position: relative;
  width: 30px;
  height: 30px;
  -webkit-animation: rotate 1s linear infinite;
  animation: rotate linear 1s infinite;
  transform-origin: center center;
  box-sizing: border-box;
}
.loading-rotate:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 3px solid transparent;
  border-top-color: #ddd;
  border-radius: 50%;
  z-index: 10;
}
.loading-rotate:after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 30px;
  height: 30px;
  border: 3px solid #f2f4f7;
  box-sizing: border-box;
  border-radius: 50%;
}
/*旋转位置不停变化*/
.loading-rotate.lazy {
  -webkit-animation: rotate-lazy 6s ease-in-out infinite;
  animation: rotate-lazy ease-in-out 6s infinite;
}
@-webkit-keyframes rotate-lazy {
  0 {
    -webkit-transform: rotate(0);
  }
  25% {
    -webkit-transform: rotate(450deg);
  }
  50% {
    -webkit-transform: rotate(900deg);
  }
  75% {
    -webkit-transform: rotate(1350deg);
  }
  100% {
    -webkit-transform: rotate(1800deg);
  }
}

.loadingbg {
  background-color: #f2f4f7;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 998;
}
.loadingbg .loading {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 71px;
  height: 71px;
  margin: -33px 0 0 -33px;
}
.loadingbg .loading .loading_icon {
  display: block;
  width: 36px;
  height: 36px;
  background: url(//appnew.ly.com/hc/1/img/icon_tg_loading1.gif) no-repeat;
  background-size: 36px 36px;
  margin: 0 auto;
}
.loadingbg .loading .loading_text {
  font-size: 14px;
  margin-top: 12px;
  text-align: center;
  color: #999;
  font-family: "Microsoft YaHei", "微软雅黑", Arial, SimSun, sans-serif;
}
</style>
