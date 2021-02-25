<template>
  <el-container class="home-container">
    <!-- 头部 -->
    <el-header></el-header>
    <!-- 页面主体 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isColapse ? '64px' : '200px'">
        <div class="toggle_button" @click="toggleCollapse">|||</div>
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409eff"
          unique-opened
          :collapse="isColapse"
          :collapse-transition="false"
          router
          :default-active="path"
        >
          <el-submenu v-for="item in MenuList" :index="item.id" :key="item.id">
            <template slot="title">
              <i class="iconfont" :class="item.icon"></i>
              <span>{{ item.authName }}</span>
            </template>
            <!-- 将index属性作为跳转地址 -->
            <el-menu-item
              v-for="item2 in item.children"
              :index="item2.path"
              :key="item2.id"
              @click="saveNavState(item2.path)"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ item2.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
    <preview/>
  </el-container>
</template>

<script>
import { request } from "../../request/request";
import { mapState } from "vuex";
import preview from '../Preview/preview'
export default {
  name: "Home",
  data() {
    return {
      MenuList: [],
      isColapse: false,
    };
  },
  components:{
    preview
  },
  created() {
    this.getMenuList();
  },
  computed: {
    ...mapState({
      path: (state) => state.path.path,
    }),
    // path(){
    //   return this.$store.state.path.path
    // }
  },
  methods: {
    getMenuList() {
      request({
        url: "/search",
      })
        .then((v) => {
          this.MenuList = v.data;
        })
        .catch((v) => {
          if (v) {
            this.$message.error("token已失效请重新登陆");
            this.$router.push(`/login?redirect=${this.path}`);
            return;
          }
        });
    },
    //折叠按钮点击
    toggleCollapse() {
      this.isColapse = !this.isColapse;
    },
    saveNavState(e) {
      console.log(e);
    },
  },
};
</script>

<style scoped lang="less">
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373c41;
}
.el-aside {
  background-color: #333744;
}
.el-main {
  background-color: #eaedf1;
}
.el-menu {
  width: 100%;
  border: none;
}
.iconfont {
  margin-right: 10px;
}
.toggle_button {
  background-color: #4a5064;
  color: #fff;
  font-size: 10px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.2em;
}
.el-aside {
  transition: width 200ms;
}
</style>