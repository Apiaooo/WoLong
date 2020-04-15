<template>
  <div class="Wai">
    <div class="mod1">
      <div class="advertisemen">
        <el-button type="primary" icon="el-icon-edit" circle @click="dialogFormVisible2 = true"></el-button>
      </div>
      <el-table v-loading="loading" :data="tableData" height="450px" style="width: 100%">
        <el-table-column label="ID" width="150">
          <template slot-scope="scope">
            <i class="el-icon-star-off"></i>
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="新闻" width="290">
          <template slot-scope="scope">
            <i class="el-icon-tickets"></i>
            <span style="margin-left: 10px">{{ scope.row.news }}</span>
          </template>
        </el-table-column>
        <el-table-column label="链接" width="290">
          <template slot-scope="scope">
            <i class="el-icon-paperclip"></i>
            <span style="margin-left: 10px">{{ scope.row.link }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="mod2"></div>
    <div class="mod3"></div>
    <div class="tips">温馨提示：新闻-右模块最多显示7条新闻，请删除多余新闻</div>
    <!-- 弹出表单 -->
    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="ID" style="width:200px">
          <el-input v-model="ruleForm.id" readonly></el-input>
        </el-form-item>
        <el-form-item label="新闻" style="width:650px">
          <el-input v-model="ruleForm.news"></el-input>
        </el-form-item>
        <el-form-item label="链接" style="width:650px">
          <el-input v-model="ruleForm.link"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="edit('ruleForm')">修改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 弹出表单2 -->
    <el-dialog title="添加" :visible.sync="dialogFormVisible2">
      <el-form :model="form" ref="form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="新闻" style="width:650px">
          <el-input v-model="form.news"></el-input>
        </el-form-item>
        <el-form-item label="链接" style="width:650px">
          <el-input v-model="form.link"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="add('form')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      dialogFormVisible2:false,
      ruleForm:{},
      loading:true,
      form:{
        news:'',
        link:'',
      }
      
    };
  },
  methods: {
    handleEdit(id) {
      const that = this;
      this.dialogFormVisible = true;
      axios
        .get("http://47.115.143.135:8080/newsRight/findById/" + id)
        .then(function(resp) {
          that.ruleForm = resp.data;
        });
    },
    handleDelete(id) {
      const that = this;
      axios
        .delete("http://47.115.143.135:8080/newsRight/deleteById/" + id)
        .then(function(resp) {
          that.$message({
            message: "删除成功！",
            type: "success"
          });
          //刷新页面
          window.location.reload();
        });
    },
    edit(formName){
      const that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios
            .put("http://47.115.143.135:8080/newsRight/update", this.ruleForm)
            .then(function(resp) {
              if (resp.data == "success") {
                that.$message({
                  message: "修改成功！",
                  type: "success"
                });
                window.location.reload();
              } else {
                this.$message.error("修改失败！");
              }
            });
        } else {
          return false;
        }
      });
    },
    add(formName){
      const that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
           axios.post('http://47.115.143.135:8080/newsRight/save',this.form).then(function(resp){
             if(resp.data == 'success'){
                that.$message({
                  message: '提交成功！',
                  type: 'success'
                });
                window.location.reload();             
             }else{
               that.$message.error('添加失败！');
             }
           })
          } else {
            return false;
          }
        });
    }
  },
  created() {
    const that = this;
    axios
      .get("http://47.115.143.135:8080/newsRight/findAll/0/10")
      .then(function(resp) {
        that.tableData = resp.data.content;
        that.pageSize = resp.data.size;
        that.total = resp.data.totalElements;
        that.loading = false;
      });
  }
};
</script>

<style>
.Wai{
    position: relative;
    margin: 10px 0 0 150px;
}
.advertisemen{
    padding: 10px 0 0 10px;
}
.mod1 {
  position: absolute;
  margin: 50px 0 0 20px;
  width: 900px;
  height: 500px;
  background-color: white;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.mod2 {
  position: absolute;
  margin: 40px 0 0 30px;
  width: 900px;
  height: 500px;
  background-color: white;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.mod3 {
  position: absolute;
  margin: 30px 0 0 40px;
  width: 900px;
  height: 500px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.tips{
  color: red;
  position: absolute;
  margin: 560px 0 0 20px;
}
</style>