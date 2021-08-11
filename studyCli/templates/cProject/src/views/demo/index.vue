<template>
  <div class="mianContent">demo1</div>
</template>
<script>
import { axiosCanceler } from '../../api/axios/cancel.js';
export default {
  data() {
    return {};
  },
  components: {},
  watch: {},
  created() {
    this.$api.demo.demo().then((res) => {
      console.log(res);
    });
    this.$api.demo.demo().then((res) => {
      console.log(res);
    });
    this.$api.demo.demo().then((res) => {
      console.log(res);
    });
    this.$api.demo.demo().then((res) => {
      console.log(res);
    });
    setTimeout(() => {
      axiosCanceler.removeRouterPending();
    }, 10);
  },
  mounted() {},
  methods: {},
  beforeDestroy() {},
  filters: {},
  computed: {},
};
</script>

<style lang="less">
</style>
