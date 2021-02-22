<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>发布管理</el-breadcrumb-item>
      <el-breadcrumb-item>失物招领</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- card -->
    <el-card class="box-card">
      <el-row :gutter="30">
        <el-col :span="7">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 用户列表区 -->
      <el-table :data="xunwuList" :max-height="winHeight" stripe border>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="发布标题" prop="title"></el-table-column>
        <el-table-column label="类型" prop="type"></el-table-column>
        <el-table-column label="用户昵称" prop="nickName"></el-table-column>
        <el-table-column label="电话" prop="phone"></el-table-column>
        <el-table-column
          label="时间"
          width="90"
          sortable
          prop="date"
        ></el-table-column>
        <el-table-column label="状态"></el-table-column>
        <el-table-column label="操作" prop="state" width="180px">
        </el-table-column>
      </el-table>
      <!-- 分页区 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { changeDate } from "../../../utils/date";
import { request } from "../../../request/request";
import store from "../../../store/index";
export default {
  name: "ShiWu",
  data() {
    return {
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 2,
      },
      xunwuList: [],
      total: 0,
    };
  },
  created() {
    this.getXunwuList();
  },
  computed: {
    path() {
      return this.$store.state.path.path;
    },
    pagesize() {
      this.queryInfo.pagesize = this.$store.state.path.pagesize;
      return this.$store.state.path.pagesize;
    },
    winHeight() {
      return window.innerHeight - 300;
    },
  },
  methods: {
    async getXunwuList() {
      this.queryInfo.pagesize = this.pagesize;
      const data = await request({
        url: this.path,
        params: this.queryInfo,
      }).catch((err) => {
        if (err) {
          return this.message.error("获取列表失败");
        }
      });
      this.xunwuList = data.data.Xunwu;
      for (let v in this.xunwuList) {
        this.xunwuList[v].date = changeDate(this.xunwuList[v].date);
      }
      // console.log(this.xunwuList)
      this.total = data.data.totalPage;
    },
    handleSizeChange(e) {
      store.dispatch('setPagesize',e)
      this.queryInfo.pagesize = e
      this.getXunwuList();
    },
    handleCurrentChange(e) {
      this.queryInfo.pagenum = e;
      this.getXunwuList();
    },
    userStateChange(e) {},
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