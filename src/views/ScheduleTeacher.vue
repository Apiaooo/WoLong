<template>
  <div style="text-align:center;">
    <!-- 弹出表单 -->
    <el-dialog title="修改排课" :visible.sync="dialogFormVisible">
      <h3>{{ruleForm.label}}</h3>
      <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="第一节">
          <el-input v-model="ruleForm.oneTeacher"></el-input>
        </el-form-item>
        <el-form-item label="第二节">
          <el-input v-model="ruleForm.twoTeacher"></el-input>
        </el-form-item>
        <el-form-item label="第三节">
          <el-input v-model="ruleForm.threeTeacher"></el-input>
        </el-form-item>
        <el-form-item label="第四节">
          <el-input v-model="ruleForm.fourTeacher"></el-input>
        </el-form-item>
        <el-form-item label="第五节">
          <el-input v-model="ruleForm.fiveTeacher"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="edit('ruleForm')">修改</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <div class="bot">
      <el-tooltip class="item" effect="dark" content="返回" placement="top">
        <el-button @click="jump" type="primary" icon="el-icon-back" circle></el-button>
      </el-tooltip>
    </div>
    <div class="box">
      <el-table v-loading="loading" :data="tableData" style="width: 100%;">
        <el-table-column prop="label" align="center" label="周" width="140"></el-table-column>
        <el-table-column align="center" label="上午">
          <el-table-column prop="oneTeacher" align="center" label="第一节" width="160"></el-table-column>
          <el-table-column prop="twoTeacher" align="center" label="第二节" width="160"></el-table-column>
          
        </el-table-column>
        <el-table-column align="center" label="下午">
          <el-table-column prop="threeTeacher" align="center" label="第三节" width="160"></el-table-column>
          <el-table-column prop="fourTeacher" align="center" label="第四节" width="160"></el-table-column>
        </el-table-column>

        <el-table-column align="center" label="晚上">
          <el-table-column prop="fiveTeacher" align="center" label="第五节" width="160"></el-table-column>
        </el-table-column>

        <el-table-column align="center" label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" @click="openEdit(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      ruleForm:{},
      id:'',
      loading:true,
    };
  },
  methods: {
    openEdit(id) {
      const that = this;
      this.dialogFormVisible = true;
      this.id = id;
      axios
        .get("http://47.115.143.135:8080/schedule/findById/" + id)
        .then(function(resp) {
          that.ruleForm = resp.data;
          //console.log(that.ruleForm)
        });
    },
    edit(formName) {
      const that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios
            .put("http://47.115.143.135:8080/schedule/update", this.ruleForm)
            .then(function(resp) {
              // console.log(resp);
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
    resetForm(formName) {
      const that = this;
      axios
        .get("http://47.115.143.135:8080/schedule/findById/" + this.id)
        .then(function(resp) {
          that.ruleForm = resp.data;
        });
    },
    jump(){
      this.$router.push('/Schedule')
    }
  },
  created() {
    const that = this;
    axios
      .get("http://47.115.143.135:8080/schedule/findAll/0/7")
      .then(function(resp) {
        // console.log(resp)
        that.tableData = resp.data.content;
        that.loading = false;
      });
  }
};
</script>

<style>
.box {
  position: relative;
  margin: 30px 0 0 110px;
  width: 1062px;
  height: 556px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.bot{
  position: absolute;
  margin: 250px 0 0 10px;
  width: 50px;
  height: 50px;
}
</style>