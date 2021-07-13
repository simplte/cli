<template>
  <div v-show="isShow">
    <div class="activityMask" @touchmove.prevent></div>
    <div class="activityPop" :style="'background-color:' + useBgColor">
      <p class="title">{{ rulesTitle }}</p>
      <div class="popContent">
        <p v-html="rulesContents">{{ rulesContents }}</p>
      </div>
    </div>
    <div class="close" @click="closePop"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      useBgColor: "",
      scrollY: 0
    };
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    rulesContents: {
      type: String,
      default: ""
    },
    rulesTitle: {
      type: String,
      default: ""
    },
    bgColor: {
      type: String,
      default: ""
    }
  },
  methods: {
    closePop() {
      this.$emit("closePop");
    }
  },
  watch: {
    bgColor(val) {
      if (this.bgColor.indexOf(",") > 0) {
        this.useBgColor = `rgba(${this.bgColor})`;
      } else {
        this.useBgColor = this.bgColor;
      }
    }
  },
  mounted() {}
};
let bodyEl = document.getElementsByClassName("activityMask");
let top = 0;

function stopBodyScroll(isFixed) {
  if (isFixed) {
    top = window.scrollY;

    bodyEl.addevent;
    bodyEl.style.top = -top + "px";
  } else {
    bodyEl.style.position = "";
    bodyEl.style.top = "";

    window.scrollTo(0, top); // 回到原先的top
  }
}
</script>

<style lang="less" scoped>
.activityMask {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.76);
  z-index: 100;
}

.activityPop {
  position: absolute;
  top: 91px;
  left: 22px;
  z-index: 101;
  height: 308px;
  overflow-y: scroll;
  width: 328px;
  border-radius: 10px;
  background: #fff;
  box-sizing: border-box;
  color: #fff;
  -webkit-overflow-scrolling: touch;
  .title {
    text-align: center;
    font-size: 18px;
    margin-top: 25px;
  }
  .popContent {
    line-height: normal;
    margin-top: 15px;
    padding: 0 20px 20px 20px;
    box-sizing: border-box;
    font-size: 14px;
    -webkit-overflow-scrolling: touch;
  }
}

.close {
  position: absolute;
  right: 163px;
  top: 500px;
  width: 32px;
  height: 32px;
  z-index: 101;
  border-radius: 50%;
  border: 2px solid #fff;
}
.close:before,
.close:after {
  position: absolute;
  top: 3px;
  left: 15px;
  content: " ";
  height: 25px;
  width: 2px;
  background-color: #fff;
}
.close:before {
  transform: rotate(45deg);
}
.close:after {
  transform: rotate(-45deg);
}
</style>
