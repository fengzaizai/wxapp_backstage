<template>
  <!-- 登陆容器 -->
  <div class="login_container">
    <div class="login_box">
      <!-- 头像 -->
      <div class="avatar_box">
        <div class="iconfont icon-geren-copy"></div>
      </div>
      <!-- 登陆表单 -->
      <el-form
        ref="loginFormRef"
        class="login_form"
        :model="form"
        :rules="rules"
      >
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            prefix-icon="el-icon-lock"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { setToken } from "../../utils/auth";
import { request } from "../../request/request";

export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户账号", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    path(){
      return this.$store.state.path.path
    }
  },
  methods: {
    resetLoginForm() {
      // console.log(this.$refs.loginFormRef)
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return;
        const token = await request({
          method: "post",
          url: "/login",
          data: {
            username: this.form.username,
            password: this.form.password,
          },
        });
        if (token.data === "username-err") {
          return this.$message.error("用户不存在");
        }
        if (token.data === "password-err") {
          return this.$message.error("密码错误");
        }
        if (token.status === 200) {
          this.$message({
            message: "登录成功",
            type: "success",
          });
          //将token存储到sessionStorage
          setToken(token.data)
          //跳转到vuex中的path 默认/welcome
          this.$router.push(this.path);
        } else {
          return this.$message.error("登陆失败");
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
.login_container {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e8e8e8;
  .login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: relative;
    .avatar_box {
      background-color: #fff;
      width: 80px;
      height: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0px 0px 4px 4px #ddd;
      border-radius: 50%;
      padding: 5px;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      .iconfont {
        width: 70px;
        height: 70px;
        text-align: center;
        line-height: 100%;
        background-color: #eee;
        font-size: 60px;
        border-radius: 50%;
      }
    }
    .login_form {
      position: absolute;
      bottom: 0;
      padding: 0 20px;
      width: 100%;
      box-sizing: border-box;
    }

    .btns {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>