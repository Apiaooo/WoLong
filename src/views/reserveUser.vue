<template>
  <div>
    <!-- 表格 -->
    <el-table
      v-loading="loading"
      :data="tableData.filter(data => !search || data.username.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
    >
      <el-table-column label="用户ID" prop="id"></el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="性别" prop="sex"></el-table-column>
      <el-table-column label="电话" prop="tell"></el-table-column>
      <el-table-column align="right">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"/>
      </template>  
        
        <template slot-scope="scope">
          <el-button size="mini" @click="openEdit(scope.row.id)">缴费</el-button>
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

    <!-- 弹出表格 -->
    <el-dialog title="补全资料" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="ruleForm.sex" placeholder="请选择性别">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="ruleForm.tell"></el-input>
        </el-form-item>
        <el-form-item label="住址">
          <el-input v-model="ruleForm.address"></el-input>
        </el-form-item>
        <el-form-item label="上课时间" required>
            <el-form-item prop="time">
                <el-date-picker type="date" 
                placeholder="选择日期" 
                value-format="yyyy-MM-dd"
                v-model="ruleForm.time" 
                style="width: 250px;">
                </el-date-picker>
            </el-form-item>
        </el-form-item>
        <el-form-item label="学费">
          <el-input v-model="ruleForm.money"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="edit('ruleForm')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  methods: {
    deleteUser(row) {
      const that = this;
      axios
        .delete("http://47.115.143.135:8080/reserve/deleteById/" + row.id)
        .then(function(resp) {
          that.$message({
            message: "删除成功！",
            type: "success"
          });
          //刷新页面
          window.location.reload();
        });
    },
    openEdit(id) {
      this.dialogFormVisible = true;
      const that = this;
      this.id = id
      axios
        .get("http://47.115.143.135:8080/reserve/findById/" + id)
        .then(function(resp) {
          that.ruleForm = resp.data;
        });
    },
    edit(formName){
      this.ruleForm.username = this.ruleForm.name;
      this.ruleForm.id = '';
      console.log(this.ruleForm.id);
      const that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios.post('http://47.115.143.135:8080/user/save',this.ruleForm).then(function(resp){
             //console.log(resp);
             if(resp.data == 'success'){
                that.$message({
                  message: '缴费成功！',
                  type: 'success'
                });
                that.dialogFormVisible = false;
                // that.resetForm(formName);提交后清空表单
             }else{
               this.$message.error('缴费失败！');
             }
           })
          } else {
            return false;
          }
      });
    },
    
    page(currentPage) {
      const that = this;
      axios
        .get("http://47.115.143.135:8080/reserve/findAll/" + (currentPage - 1) + "/10")
        .then(function(resp) {
          that.tableData = resp.data.content;
          that.pageSize = resp.data.size;
          that.total = resp.data.totalElements;
        });
    },
    
  },

  data() {
    return {
      pageSize: 1,
      total: 11,
      tableData: [],
      ruleForm:{
          username:'',
          address:'',
          money:0,
      },
      search: '',
      id:'',
      loading:true,
      dialogFormVisible:false,
    };
  },

  created() {
    const that = this;
    axios.get("http://47.115.143.135:8080/reserve/findAll/0/10").then(function(resp) {
      // console.log(resp);
      that.tableData = resp.data.content;
      that.pageSize = resp.data.size;
      that.total = resp.data.totalElements;
      that.loading = false;
    });
  }
};
</script>