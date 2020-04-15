<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="head_box">
        <img src="../../img/logo.png" alt />
      </div>
      <!-- 登录表单区域 -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
          <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.name" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" type="password"></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="seccode">
          <el-input v-model="loginForm.seccode" 
                    prefix-icon="el-icon-edit-outline" 
                    type="seccode" 
                    :suffix="loginForm.seccode"
                    @keydown.enter.native="login('loginForm')"
                    style="width:300px">
          </el-input>
          <div class="seccode_box" @click="createCode" :style="bgColor">
            <span class="checkCode" >{{checkCode}}</span>
          </div>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item  class="btns">
          <el-button type="primary" @click="login('loginForm')">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      //登录表单的数据绑定对象
      loginForm:{
        name:'admin',
        password:'admin12345',
        seccode:'',//验证码
      },
      checkCode:'',
      bgColor:'',
      //表单的验证规则对象
      loginFormRules:{
        //验证用户名是否合法
        name:[
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password:[
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        seccode: [
          { required: true, message: "请输验证码", trigger: "blur" }
        ]
      },
     
    }
  },
  mounted () {
    this.createCode();
  },
  methods:{
    //验证码
    createCode() {
      let code = "";
      let codeLength = 4; //验证码的长度  
      //输入框里I与l显示的样式一样因此不加入
      let random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
        'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z','a','b','c','d','e','f','g','h','i','j','k','m','n','o','p','q','r','s','t','u','v','w','x','y','z'); //随机数  
      for(let i = 0; i < codeLength; i++) { //循环操作  
        let index = Math.floor(Math.random() * 60); //取得随机数的索引（0~62）  
        code += random[index]; //根据索引取得随机数加到code上  
      }
      this.checkCode = code; //把code值赋给验证码  
      //随机背景颜色
      let r = parseInt(Math.random() * 256)
      let g = parseInt(Math.random() * 256)
      let b = parseInt(Math.random() * 256)
      this.bgColor = `backgroundColor:rgba(${r},${g},${b},0.3)`
    },
    //重置功能
    resetLoginForm(){
      this.$refs.loginFormRef.resetFields();
    },
    //登录
    login(loginFormRef){
      if(this.loginForm.seccode == '') {
         this.$message({
              message: "验证码不能为空",
              type: "warning"
        });
        this.createCode();
        return false;
      };
      if(this.loginForm.seccode != this.checkCode) {
         this.$message({
              message: "验证码错误，注意大小写字母",
              type: "warning"
        });
        this.createCode();
        return false;
      };
      const that = this;
        this.$refs.loginFormRef.validate((valid) => {
          if (valid) {
           axios.post('http://47.115.143.135:8080/admin/login',this.loginForm).then(function(resp){
            console.log(resp.data);
            if(resp.data.status == 400) return that.$message.error('用户名不存在');
            if(resp.data.status == 401) return that.$message.error('密码错误');
            that.$message.success('登录成功');
            //将登录成功之后的token和用户名保存到客户端的sessionStorage中
            window.sessionStorage.setItem("token",resp.data.token);
            window.sessionStorage.setItem("name",resp.data.data.name);
            window.sessionStorage.setItem("headImg",resp.data.data.headImg);
            //跳转到管理页面
            that.$router.push("/user");
           })
          }
        });
    }
  } 
};
</script>

<style lang="less" scoped>
.login_container {
  background-color: #92c5cc;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 350px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%); //在横轴与纵轴的移动
}
.head_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #ddd;
  }
}
.login_form{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}
.btns{
    display: flex;
    justify-content: flex-end;
}
.seccode_box{
  border-radius:3px;
  width: 110px;
  margin-top: -40px;
  margin-left:300px; 
  position: absolute;
  text-align: center;
}
</style>