<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="用户ID">
      <el-input v-model="ruleForm.id" readonly style="width:500px"></el-input>
    </el-form-item>
    <el-form-item label="姓名" prop="username">
      <el-input v-model="ruleForm.username" style="width:500px"></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="sex">
      <el-radio-group v-model="ruleForm.sex">
        <el-radio label="男"></el-radio>
        <el-radio label="女"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="电话" prop="tell">
      <el-input v-model="ruleForm.tell" style="width:500px"></el-input>
    </el-form-item>
    <el-form-item label="住址" prop="address">
      <el-input v-model="ruleForm.address" style="width:500px"></el-input>
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
      ruleForm: {
        id: '',
        username: '',
        sex: '',
        tell:1,
        address:'',
      },
      rules: {
        username: [
            { required: true, message: '请输入用户名称', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          tell: [
            { required: true, message: '电话不能为空', trigger: 'blur' },
          ],
          address: [
            { required: true, message: '住址不能为空', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
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
            .put("http://47.115.143.135:8080/user/update", this.ruleForm)
            .then(function(resp) {
              // console.log(resp);
              if (resp.data == "success") {
                that.$message({
                  message: "修改成功！",
                  type: "success"
                });
                that.$router.push("/UserManager"); //修改后跳转到查询页面
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
        .get("http://47.115.143.135:8080/user/findById/" + this.$route.query.id)
        .then(function(resp) {
          that.ruleForm = resp.data;
        });
    }
  },
  created() {
    const that = this;
    //$route取参数，$router跳转
    axios
      .get("http://47.115.143.135:8080/user/findById/" + this.$route.query.id)
      .then(function(resp) {
        that.ruleForm = resp.data;
      });
  }
};
</script>
