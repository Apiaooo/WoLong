<template>
  <div>
    <div class="re">
      <el-tooltip class="item" effect="dark" content="返回" placement="top">
        <el-button @click="jump" type="primary" icon="el-icon-back" circle></el-button>
      </el-tooltip>
    </div>
    <div class="header">
      <h2 style="padding-top:25px">{{ruleForm.username}} 同学的学习状态</h2>
    </div>
    <div class="statebox">
      <div class="book">
        <div class="one_state">
          <h3>学习进度</h3>
          <el-progress style="margin-top:10px" type="circle" :percentage="ruleForm.studyState"></el-progress>
          <div style="margin-top:10px">
            <el-tag type="success" effect="dark">
              <i class="el-icon-notebook-1"></i>课程：{{ruleForm.study}}
            </el-tag>
          </div>
          <h3 style="margin-top:50px">教师满意度</h3>
          <el-rate
            v-model="ruleForm.assess"
            disabled
            show-score
            text-color="#ff9900"
          ></el-rate>
        </div>
        <div class="two_state">
          <h3>学生表现</h3>
          <div class="tw_box1">
              <div class="tw_show">{{ruleForm.judge}}</div>
          </div></br></br>
          ~~~~~~~~~~~~~~~~~~~~~~~~</br>
          ~~~~~~~~~~~~~~~~~~~~~~~~</br>
          ~~~~~~~~~~~~~~~~~~~~~~~~</br>
          ~~~~~~~~~~~~~~~~~~~~~~~~</br>
          ~~~~~~~~~~~~~~~~~~~~~~~~</br>
          ~~~~~~~~~~~~~~~~~~~~~~~~</br>
          <el-button @click="openEdit" type="primary" icon="el-icon-edit" circle></el-button>
        </div>
      </div>
    </div>
    <!-- 弹出表单 -->
    <el-dialog class="editTb" title="修改状态" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="学习进度">
          <el-slider v-model="ruleForm.studyState"></el-slider>
        </el-form-item>
        <el-form-item label="课程">
          <el-input v-model="ruleForm.study"></el-input>
        </el-form-item>
        <el-form-item label="教师满意度">
          <el-rate style="margin-top:10px" v-model="ruleForm.assess"></el-rate>
        </el-form-item>
        <el-form-item label="学生表现">
          <el-input v-model="ruleForm.judge"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="edit('ruleForm')">修改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm:{
        study:'',
        studyState:0,
        assess:0,
        judge:'',
      },
      dialogFormVisible:false,
    };
  },
  methods:{
    jump(){
      this.$router.push('/UserManager')
    },
    openEdit(){
      this.dialogFormVisible = true;
    },
    edit(formName){
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
                window.location.reload();
              } else {
                this.$message.error("修改失败！");
              }
            });
        } else {
          return false;
        }
      });
    }
  },
  created(){
    const that = this;
    axios
      .get("http://47.115.143.135:8080/user/findById/" + this.$route.query.id)
      .then(function(resp) {
        that.ruleForm = resp.data;
    });
  }
};
</script>

<style>
.header {
  text-align: center;
  position: relative;
  margin-left: 300px;
  width: 500px;
  height: 80px;
  background-color: #d0e17d;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
.statebox {
  text-align: center;
  position: relative;
  margin: 10px 0 0 150px;
  width: 800px;
  height: 500px;
}
.book {
  width: 100%;
  height: 100%;
  background: #f5deb3;
  background: linear-gradient(
        to left bottom,
        transparent 50%,
        rgba(0, 0, 0, 0.1) 0
      )
      no-repeat 100% 0 / 2em 2em,
    linear-gradient(-135deg, transparent 1.4em, #f5deb3 0);
}
.one_state {
  position: absolute;
  margin: 50px 0 0 30px;
  width: 350px;
  height: 400px;
  border: 1px solid #909399;
}
.two_state {
  position: absolute;
  margin: 50px 0 0 420px;
  width: 350px;
  height: 400px;
  border: 1px solid #909399;
}
.tw_box1{
    position: relative;
    margin: 20px 0 0 80px;
    width: 200px;
    height: 100px;
    background-color: darkgrey;
    opacity:0.3;
    border-radius: 50px
}
.tw_show{
    position: absolute;
    margin: 20px 0 0 50px;
    width: 100px;
    height: 60px;
    color: red;
    font-size: 50px;
    font-family: 楷体;
}
.re{
    position: absolute;
    margin: 100px 0 0 40px;
}
.editTb{
  width: 800px;
  padding-left: 25%;
}
</style>