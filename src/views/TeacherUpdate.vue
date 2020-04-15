<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="ID" prop="id">
      <el-input v-model="ruleForm.id" readonly style="width:500px"></el-input>
    </el-form-item>
    <el-form-item label="教师名称" prop="name">
      <el-input v-model="ruleForm.name" style="width:500px"></el-input>
    </el-form-item>
    <el-form-item label="指导课程" prop="teaching">
      <el-input v-model="ruleForm.teaching" style="width:500px"></el-input>
    </el-form-item>
    <el-form-item label="教学进度">
      <el-slider v-model="ruleForm.teachState" style="width:500px"></el-slider>
    </el-form-item>
    

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {},
      rules: {
          name: [
            { required: true, message: '请输入教师名称', trigger: 'blur' }
          ],
          teaching: [
            { required: true, message: '请输入指导课程', trigger: 'blur' },
          ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      
      const that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios
            .put("http://47.115.143.135:8080/teacher/update", this.ruleForm)
            .then(function(resp) {
              if (resp.data == "success") {
                that.$message({
                  message: "修改成功！",
                  type: "success"
                });
                that.$router.push("/TeacherManager"); //修改后跳转到查询页面
              } 
            });
            // axios拦截器
            axios.interceptors.response.use(
              response =>{
                return response;
              },
              error=>{
                that.$message.error("修改失败！");
                return Promise;
              }
            );
        } else {
          this.$message.error("修改失败！");
          return false;
        }
      });
      
    },
    //修改中的重置
    resetForm(formName) {
      const that = this;
      //$route取参数，$router跳转
      axios
        .get("http://47.115.143.135:8080/teacher/findById/" + this.$route.query.id)
        .then(function(resp) {
          that.ruleForm = resp.data;
        });
    }
  },
  created() {
    const that = this;
    //$route取参数，$router跳转
    axios
      .get("http://47.115.143.135:8080/teacher/findById/" + this.$route.query.id)
      .then(function(resp) {
        that.ruleForm = resp.data;
      });
  }
};
</script>
