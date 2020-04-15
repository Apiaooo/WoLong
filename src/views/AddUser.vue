<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="用户姓名" prop="username">
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
    <el-form-item label="报名时间" required>
      <el-form-item prop="time">
        <el-date-picker type="date" 
          placeholder="选择日期" 
          value-format="yyyy-MM-dd"
          v-model="ruleForm.time" 
          style="width: 250px;">
        </el-date-picker>
      </el-form-item>
    </el-form-item>
    <el-form-item label="学费" prop="money">
      <el-input v-model="ruleForm.money" style="width:500px"></el-input>
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
          username: '',
          sex: '',
          tell:'',
          address:'',
          time:'',
          money:'',
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
            { min: 8, max: 11, message: '请输入正确的号码', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '住址不能为空', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ],
          time: [
            { type: 'string', required: true, message: '请选择日期', trigger: 'change' }
          ],
          money: [
            { required: true, message: '学费不能为空', trigger: 'blur' },
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        const that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
           axios.post('http://47.115.143.135:8080/user/save',this.ruleForm).then(function(resp){
             //console.log(resp);
             if(resp.data == 'success'){
                that.$message({
                  message: '提交成功！',
                  type: 'success'
                });
                that.$alert('<'+that.ruleForm.username+'>添加成功！', '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    that.$router.push('/UserManager')//提交后跳转到查询页面
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
    },
  }
</script>