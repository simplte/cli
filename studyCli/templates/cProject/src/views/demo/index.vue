<template>
  <div class="mianContent">demo1</div>
</template>
<script>
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
