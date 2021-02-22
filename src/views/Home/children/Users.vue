<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- card -->
    <el-card class="box-card">
      <el-row :gutter="30">
        <el-col :span="7">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addAdmin">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表区 -->
      <el-table :data="userlist" stripe border>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="phone"></el-table-column>
        <el-table-column label="身份" prop="identity"></el-table-column>
        <el-table-column label="状态">
          <template v-slot:scope>
            <el-switch
              v-model="value"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="state" width="180px">
          <el-tooltip
            class="item"
            effect="dark"
            content="编辑管理员"
            placement="top"
          >
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
            ></el-button>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="删除管理员"
            placement="top"
          >
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
            ></el-button>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="设置权限"
            placement="top"
          >
            <el-button
              type="warning"
              icon="el-icon-setting"
              size="mini"
            ></el-button>
          </el-tooltip>
        </el-table-column>
      </el-table>
      <!-- 分页区 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { request } from "../../../request/request";
export default {
  name: "Users",
  data() {
    return {
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 2,
      },
      userlist: [],
      total: 0,
    };
  },
  computed: {
    path(){
      return this.$store.state.path.path
    }
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    async getUserInfo() {
      const data = await request({
        url: this.path,
        params: this.queryInfo,
      }).catch((err) => {
        if (err) {
          return this.message.error("获取用户列表失败");
        }
      });
      this.userlist = data.data.users;
      this.total = data.data.totalPage;
    },
    handleSizeChange(e) {
      this.queryInfo.pagesize = e;
      this.getUserInfo();
    },
    handleCurrentChange(e) {
      this.queryInfo.pagenum = e;
      this.getUserInfo();
    },
    userStateChange(e) {},
    async addAdmin(){
      const isSuperAuth = await request({
        url:'/superauth/yanzheng',
      })
      console.log(isSuperAuth.data)
      // this.$router.push('/addAdmin')
    }
  },
};
</script>

<style scoped lang="less">
.el-breadcrumb {
  margin-bottom: 15px;
  font-size: 12px;
}
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 100%;
}
.el-table {
  font-size: 12px;
  margin-top: 20px;
}
.el-pagination {
  margin-top: 20px;
}
.el-tooltip {
  padding: 10px 15px;
}
</style>