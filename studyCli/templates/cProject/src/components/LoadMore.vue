<template>
  <div>
    <div v-if="isShowLoading" class="loadMore">
      <div class="loading-rotate lazy"></div>
      正在加载中
    </div>
    <div v-if="noMore" class="noMoreInfos">
      没有更多了
    </div>
  </div>
</template>

<script>
export default {
  name: "loadingMore",
  props: {
    isShowLoading: Boolean,
    noMore: Boolean
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="less">
.loading-rotate {
  position: relative;
  width: 20px;
  height: 20px;
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
  border-top-color: #ff4500;
  border-radius: 50%;
  z-index: 10;
}
.loading-rotate:after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 20px;
  height: 20px;
  border: 3px solid #ddd;
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
.loadMore {
  height: 20px;
  -ms-wrap-margin: 100%;
  display: flex;
  justify-content: center;
  margin-top: 5px;
  margin-bottom: 5px;
}
.noMoreInfos {
  margin-top: 5px;
  text-align: center;
  margin-bottom: 5px;
}
</style>
