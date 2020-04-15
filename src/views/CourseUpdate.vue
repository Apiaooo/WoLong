<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="课程ID" prop="id">
      <el-input v-model="ruleForm.id" readonly style="width:500px"></el-input>
    </el-form-item>
    <el-form-item label="课程名称" prop="name">
      <el-input v-model="ruleForm.name" style="width:500px"></el-input>
    </el-form-item>
    <el-form-item label="指导老师" prop="teacher">
      <el-input v-model="ruleForm.teacher" style="width:500px"></el-input>
    </el-form-item>
    <el-form-item label="类型" prop="type">
      <el-input v-model="ruleForm.type" style="width:500px"></el-input>
    </el-form-item>
    <el-form-item label="热度" prop="type">
      <el-slider v-model="ruleForm.hot" style="width:500px"></el-slider>
    </el-form-item>
    <el-form-item label="描述" prop="info">
      <el-input v-model="ruleForm.info" style="width:500px"></el-input>
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
            { required: true, message: '请输入课程名称', trigger: 'blur' }
          ],
          teacher: [
            { required: true, message: '请输入指导老师', trigger: 'blur' },
          ],
          type: [
            { required: true, message: '请输入课程类型', trigger: 'blur' },
          ],
          info: [
            { required: true, message: '请输入课程描述', trigger: 'blur' },
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
            .put("http://47.115.143.135:8080/course/update", this.ruleForm)
            .then(function(resp) {
              if (resp.data == "success") {
                that.$message({
                  message: "修改成功！",
                  type: "success"
                });
                that.$router.push("/CourseManager"); //修改后跳转到查询页面
              } else {
                this.$message.error("修改失败！");
              }
            });
        } else {
          return false;
        }
      });
    },
    //修改中的重置
    resetForm(formName) {
      const that = this;
      //$route取参数，$router跳转
      axios
        .get("http://47.115.143.135:8080/course/findById/" + this.$route.query.id)
        .then(function(resp) {
          that.ruleForm = resp.data;
        });
    }
  },
  created() {
    const that = this;
    //$route取参数，$router跳转
    axios
      .get("http://47.115.143.135:8080/course/findById/" + this.$route.query.id)
      .then(function(resp) {
        that.ruleForm = resp.data;
      });
  }
};
</script>