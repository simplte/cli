<template lang="html">
  <div
    class="yo-scroll"
    :class="{ down: refresState === 0, up: refresState == 1, refresh: refresState === 2, touch: touching }"
    @touchstart="touchStart($event)"
    @touchmove="touchMove($event)"
    @touchend="touchEnd($event)"
    @scroll="infiniteLoading ? onScroll($event) : undefined"
  >
    <div class="inner" :style="{ transform: 'translate3d(0, ' + top + 'px, 0)' }">
      <div class="pull-refresh">
        <span class="down-tip">下拉更新</span>
        <span class="up-tip">松开更新</span>
        <span class="refresh-tip">更新中</span>
      </div>
      <slot> </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    offset: {
      type: Number,
      default: 40
    },
    enableRefresh: {
      type: Boolean,
      default: true
    },
    onRefresh: {
      type: Function,
      default: undefined,
      required: false
    }
  },
  data() {
    return {
      top: 0,
      refresState: 0,
      startY: 0,
      touching: false,
      infiniteLoading: false
    };
  },
  methods: {
    touchStart(e) {
      // 获取滚动开始时点击点的y轴坐标
      this.startY = e.targetTouches[0].pageY;
      // 获取点击元素的滚轮在下拉时的位置
      this.startScroll = this.$el.scrollTop || 0;
      this.touching = true;
    },
    touchMove(e) {
      // 是否能滚动，点击元素的滚轮在下拉时的位置是否大于0，是不是已经开始滚动了，如果满足其中一个场景，不继续执行
      if (!this.enableRefresh || this.$el.scrollTop > 0 || !this.touching) {
        return;
      }
      // 计算点击的点在滚动时y轴的坐标 - 滚动开始时点击点的y轴坐标 - 开始滚动时点击的元素距离顶部的高度
      let diff = e.targetTouches[0].pageY - this.startY - this.startScroll;
      if (diff > 0) e.preventDefault();
      // 距离顶部的偏移量
      this.top = Math.pow(diff, 0.8) + (this.refresState === 2 ? this.offset : 0);

      if (this.refresState === 2) {
        return;
      }
      // 如果偏移量大于设置的高度，下拉操作，小于返回原样
      if (this.top >= this.offset) {
        this.refresState = 1;
      } else {
        this.refresState = 0;
      }
    },
    touchEnd(e) {
      if (!this.enableRefresh) return;
      this.touching = false;
      if (this.refresState === 2) {
        // 刷新中
        this.refresState = 2;
        this.top = this.offset;
        return;
      }
      if (this.top >= this.offset) {
        // 开始刷新
        this.refresh();
      } else {
        // 取消刷新
        this.refresState = 0;
        this.top = 0;
      }
    },
    refresh() {
      this.refresState = 2;
      this.top = this.offset;
      this.onRefresh(this.refreshDone);
    },
    refreshDone() {
      this.refresState = 0;
      this.top = 0;
    },

    onScroll(e) {
      if (this.infiniteLoading) {
        return;
      }
      let outerHeight = this.$el.clientHeight;
      let innerHeight = this.$el.querySelector(".inner").clientHeight;
      let scrollTop = this.$el.scrollTop;
      let ptrHeight = this.onRefresh ? this.$el.querySelector(".pull-refresh").clientHeight : 0;
    }
  }
};
</script>
<style>
.yo-scroll {
  position: absolute;
  top: 0px;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  background-color: #ddd;
}
.yo-scroll .inner {
  position: absolute;
  top: -20px;
  width: 100%;
  transition-duration: 300ms;
}
.yo-scroll .pull-refresh {
  position: relative;
  left: 0;
  top: -10px;
  width: 100%;
  /* height: 20px; */
  display: flex;
  align-items: center;
  justify-content: center;
}
.yo-scroll.touch .inner {
  transition-duration: 0ms;
}
.yo-scroll.down .down-tip {
  display: block;
}
.yo-scroll.up .up-tip {
  display: block;
}
.yo-scroll.refresh .refresh-tip {
  display: block;
}
.yo-scroll .down-tip,
.yo-scroll .refresh-tip,
.yo-scroll .up-tip {
  display: none;
}
</style>
