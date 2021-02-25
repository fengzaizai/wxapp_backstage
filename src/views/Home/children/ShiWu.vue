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
      <el-table :data="shiwuList" :max-height="winHeight" stripe border>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="用户昵称" prop="nickName"></el-table-column>
        <el-table-column label="发布标题" prop="title"></el-table-column>
        <el-table-column label="类型" prop="type"></el-table-column>
        <el-table-column label="电话" prop="phone"></el-table-column>
        <el-table-column
          label="时间"
          width="90"
          sortable
          prop="date"
        ></el-table-column>
        <!-- 利用scope获取当前的索引 -->
        <el-table-column label="图片">
          <template slot-scope="scope">
            <div class="images_wrap">
              <!-- 将String的images转化为Array -->
              <div class="images" v-if="showMore">
                <image-min
                  v-for="(item, index) in JSON.parse(
                    shiwuList[scope.$index].images
                  )"
                  :key="index"
                  :images="item"
                />
              </div>
              <div class="images" v-else>
                <image-min
                  :images="JSON.parse(shiwuList[scope.$index].images)[0]"
                />
              </div>
              <div class="images_more" @click="changeShowMore">
                <p v-if="!showMore">展示更多</p>
                <p v-else>点击收回</p>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="state" width="180px">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="编辑"
              placement="top"
            >
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="handleEdit(scope.row._id)"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="删除"
              placement="top"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="handleDelete(scope.row._id)"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="设置"
              placement="top"
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
                @click="handleSet(scope.row._id)"
              ></el-button>
            </el-tooltip>
          </template>
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

import ImageMin from "../../../components/compontent/ImageMin";
export default {
  name: "ShiWu",
  components: {
    ImageMin,
  },
  data() {
    return {
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 2,
      },
      shiwuList: [],
      total: 0,
      showMore: false,
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
    //获取数据
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
      this.shiwuList = data.data.Xunwu;
      for (let v in this.shiwuList) {
        this.shiwuList[v].date = changeDate(this.shiwuList[v].date);
      }
      this.total = data.data.totalPage;
      // console.log(this.shiwuList);
    },
    //页面显示条数变化
    handleSizeChange(e) {
      store.dispatch("setPagesize", e);
      this.queryInfo.pagesize = e;
      this.getXunwuList();
    },
    //点击页面的的页数
    handleCurrentChange(e) {
      this.queryInfo.pagenum = e;
      this.getXunwuList();
    },
    userStateChange(e) {},
    //切换显示更多与点击收回
    changeShowMore() {
      this.showMore = !this.showMore;
    },
    handleEdit(_id) {},
    handleDelete(_id) {
      this.$prompt("请输入暗号：这个作品不错", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /这个作品不错/,
        inputErrorMessage: "请输入：这个作品不错",
      })
        .then(({ value }) => {
          this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              request({
                url:'/article/remove',
                params:{
                  _id,
                }
              })
              // this.$message({
              //   type: "success",
              //   message: "删除成功!",
              // });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消删除",
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    handleSet(_id) {},
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
.images_wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .images {
    flex: 2;
  }
  .images_more {
    // flex: 4;
    color: #409eff;
  }
}
</style>