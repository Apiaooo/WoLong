<template>
  <div class="bigbox">
    <div class="box1">
      <div class="add">
        <el-button type="primary" icon="el-icon-edit" circle @click="dialogFormVisible2 = true"></el-button>
      </div>
      <el-table v-loading="loading" :data="tableData" style="width: 100%">
        <el-table-column label="ID" width="180">
          <template slot-scope="scope">
            <i class="el-icon-star-off"></i>
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="名称" width="180">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>名称: {{ scope.row.name }}</p>
              <p>教室: {{ scope.row.room }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">
                  <i class="el-icon-notebook-2"></i>
                  {{ scope.row.name }}
                </el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="教室" width="180">
          <template slot-scope="scope">
            <i class="el-icon-school"></i>
            <span style="margin-left: 10px">{{ scope.row.room }}</span>
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
    <div class="box2"></div>
    <div class="box3"></div>
    <!-- 弹出表单 -->
    <el-dialog class="tan" title="编辑" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="ID" style="width:200px">
          <el-input v-model="ruleForm.id" readonly></el-input>
        </el-form-item>
        <el-form-item label="名称" style="width:200px">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="教室" style="width:200px">
          <el-input v-model="ruleForm.room"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="edit('ruleForm')">修改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 弹出表单2 -->
    <el-dialog class="tan" title="添加" :visible.sync="dialogFormVisible2">
      <el-form :model="form" ref="form" label-width="100px" class="demo-ruleForm" :rules="adda">
        <el-form-item label="名称" style="width:200px" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="教室" style="width:200px" prop="room">
          <el-input v-model="form.room"></el-input>
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
        name:'',
        room:'',
        value:1,
      },
      adda:{
          name: [
            { required: true, message: '请输入课程名称', trigger: 'blur' },
          ],
          room: [
            { required: true, message: '请输入教室', trigger: 'change' }
          ],
        }
      
    };
  },
  methods: {
    handleEdit(id) {
      const that = this;
      this.dialogFormVisible = true;
      axios
        .get("http://47.115.143.135:8080/courseClass/findById/" + id)
        .then(function(resp) {
          that.ruleForm = resp.data;
        });
    },
    handleDelete(id) {
      const that = this;
      axios
        .delete("http://47.115.143.135:8080/courseClass/deleteById/" + id)
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
            .put("http://47.115.143.135:8080/courseClass/update", this.ruleForm)
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
           axios.post('http://47.115.143.135:8080/courseClass/save',this.form).then(function(resp){
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
      .get("http://47.115.143.135:8080/courseClass/findAll/0/10")
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
.bigbox{
    position: relative;
    margin: 10px 0 0 200px;
}
.add{
    padding: 10px 0 0 10px;
}
.box1 {
  position: absolute;
  margin: 50px 0 0 20px;
  width: 700px;
  height: 500px;
  background-color: white;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.box2 {
  position: absolute;
  margin: 40px 0 0 30px;
  width: 700px;
  height: 500px;
  background-color: white;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.box3 {
  position: absolute;
  margin: 30px 0 0 40px;
  width: 700px;
  height: 500px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.tan{
  width:600px;
  padding-left: 30%;
}
</style>