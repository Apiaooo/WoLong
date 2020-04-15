<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="教师名称" prop="name">
      <el-input v-model="ruleForm.name" style="width:500px"></el-input>
    </el-form-item>
    <el-form-item label="指导课程" prop="teaching">
      <el-input v-model="ruleForm.teaching" style="width:500px"></el-input>
    </el-form-item>
    <el-form-item label="教学进度" prop="teachState">
      <el-slider v-model="ruleForm.teachState" style="width:500px"></el-slider>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          teaching: '',
          teachState:0,
        },
        rules: {
          name: [
            { required: true, message: '请输入教师名称', trigger: 'blur' }
          ],
          teaching: [
            { required: true, message: '请输入指导课程', trigger: 'blur' },
          ],
          teachState: [
            { required: true, message: '请输入教学进度', trigger: 'blur' },
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        const that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
           axios.post('http://47.115.143.135:8080/teacher/save',this.ruleForm).then(function(resp){
             //console.log(resp);
             if(resp.data == 'success'){
                that.$message({
                  message: '提交成功！',
                  type: 'success'
                });
                that.$alert('<'+that.ruleForm.name+'>添加成功！', '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    that.$router.push('/TeacherManager')//提交后跳转到查询页面
                  }
                });
                // that.resetForm(formName);提交后清空表单
             }else{
               this.$message.error('添加失败！');
             }
           })
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    }
  }
</script>