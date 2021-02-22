<template>
  <div>
    <h3>你好！！！</h3>
  </div>
</template>

<script>
export default {
  name:'Welcome',
  created() {
    window.setTimeout(() => {
      this.$router.push('/users')
    },2000)
  },
}
</script>

<style scoped lang="less">

</style>