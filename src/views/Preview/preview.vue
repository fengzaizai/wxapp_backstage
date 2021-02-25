<template>
  <div class="preview" v-if="isShowPreview" @click="cancalImage">
    <img :src="showImageUrl" alt="" />
  </div>
</template>

<script>
import store from "../../store/index";
export default {
  name: "preview",
  computed: {
    showImageUrl() {
      return this.$store.state.path.showImageUrl;
    },
    isShowPreview() {
      return this.$store.state.path.isShowPreview;
    },
  },
  methods: {
    //改变状态管理当中的图片是否展示
    cancalImage() {
      store.dispatch("setIsShow");
    },
    created() {
      console.log(this.showImageUrl);
    },
  },
};
</script>

<style scoped lang="less">
.preview {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.678);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    height: 100%;
  }
}
</style>