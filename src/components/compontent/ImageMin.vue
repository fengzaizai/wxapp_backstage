<template>
  <div class="image_min">
    <img :src="images" alt="" width="40" @click="clickImage">
  </div>
</template>

<script>
import store from "../../store/index";
export default {
  name: "ImageMin",
  props:{
    images:{
      type:String,
      default:''
    }
  },
  created() {
   
  },
  methods: {
    clickImage(){
      store.dispatch("setImagePath", this.images)
    }
  },
};
</script>

<style scoped lang="less">
.image_min{
  img{
    float: left;
    cursor:pointer;
  }
}
</style>