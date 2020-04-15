<template>
<div>
  <el-table v-loading="loading" :data="tableData" style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="课程名称">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="指导老师">
            <span>{{ props.row.teacher }}</span>
          </el-form-item>
          <el-form-item label="课程 ID">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item label="课程分类">
            <span>{{ props.row.type }}</span>
          </el-form-item>
          <el-form-item label="课程热度">
            <span>{{ props.row.hot }}</span>
          </el-form-item>
          <el-form-item label="课程描述">
            <span>{{ props.row.info }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column label="课程 ID" prop="id"></el-table-column>
    <el-table-column label="课程名称" prop="name"></el-table-column>
    <el-table-column label="描述" prop="info"></el-table-column>
    <el-table-column align="right">
      <template slot-scope="scope">
        <el-button size="mini" @click="edit(scope.row)">修改</el-button>
        <el-button size="mini" type="danger" @click="deleteUser(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页 -->
  <el-pagination
    background
    layout="prev, pager, next"
    :page-size="pageSize"
    :total="total"
    @current-change="page"
    style="text-align:center"
  ></el-pagination>
</div>
</template>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>

<script>
export default {
  methods: {
    deleteUser(row) {
      const that = this;
      axios
        .delete("http://47.115.143.135:8080/course/deleteById/" + row.id)
        .then(function(resp) {
          that.$message({
            message: "删除成功！",
            type: "success"
          });
          //刷新页面
          window.location.reload();
        });
    },
    edit(row) {
      this.$router.push({
        path: "/CourseUpdate",
        query: {
          id: row.id
        }
      });
    },
    page(currentPage) {
      const that = this;
      axios
        .get("http://47.115.143.135:8080/course/findAll/" + (currentPage - 1) + "/4")
        .then(function(resp) {
          //console.log(resp)
          that.tableData = resp.data.content;
          that.pageSize = resp.data.size;
          that.total = resp.data.totalElements;
        });
    }
  },
  data() {
    return {
      tableData: [],
      pageSize: 1,
      total: 11,
      loading:true,
    };
  },
  created() {
    const that = this;
    axios.get("http://47.115.143.135:8080/course/findAll/0/4").then(function(resp) {
      that.tableData = resp.data.content;
      that.pageSize = resp.data.size;
      that.total = resp.data.totalElements;
      that.loading = false;
    });
  }
};
</script>