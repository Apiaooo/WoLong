<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
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
          id: '',
          name: '',
          teacher: '',
          type:'',
          hot:0,
          info:'',
        },
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
        this.$refs[formName].validate((valid) => {
          if (valid) {
           axios.post('http://47.115.143.135:8080/course/save',this.ruleForm).then(function(resp){
             //console.log(resp);
             if(resp.data == 'success'){
                that.$message({
                  message: '提交成功！',
                  type: 'success'
                });
                that.$alert('<'+that.ruleForm.name+'>添加成功！', '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    that.$router.push('/CourseManager')//提交后跳转到查询页面
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