<template>
  <div>
    <!-- 表格 -->
    <el-table
      v-loading="loading"
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
    >
      <el-table-column label="ID" prop="id"></el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="指导课程" prop="teaching"></el-table-column>
      <el-table-column label="教学进度" prop="teachState"></el-table-column>

      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>

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

<script>
export default {
  data() {
    return {
      pageSize: 1,
      total: 11,
      tableData: [],
      search: "",
      loading: true
    };
  },
  methods: {
    deleteUser(row) {
      const that = this;
      axios
        .delete("http://47.115.143.135:8080/teacher/deleteById/" + row.id)
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
        path: "/TeacherUpdate",
        query: {
          id: row.id
        }
      });
    },
    page(currentPage) {
      const that = this;
      axios
        .get("http://47.115.143.135:8080/teacher/findAll/" + (currentPage - 1) + "/10")
        .then(function(resp) {
          //console.log(resp)
          that.tableData = resp.data.content;
          that.pageSize = resp.data.size;
          that.total = resp.data.totalElements;
        });
    }
  },
  created() {
    const that = this;
    axios
      .get("http://47.115.143.135:8080/teacher/findAll/0/10")
      .then(function(resp) {
        // console.log(resp)
        that.tableData = resp.data.content;
        that.pageSize = resp.data.size;
        that.total = resp.data.totalElements;
        that.loading = false;
      });
  }
};
</script>

<style>
</style>