<template>
  <div>
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <!-- logo -->
      
      <el-tag
        v-for="item in items"
        :key="item.label"
        :type="item.type"
        effect="dark"
        style="margin:15px auto auto 10px;
              box-shadow: 0 2px 4px rgba(255,165,0,0.5), 0 0 6px rgba(255,165,0,0.5);
              color:black"
      ><img src="../../img/home_Logo.png" style="width:100px;height:110%"></img></el-tag>
      <!-- 菜单栏 -->
      <el-menu-item index="1" style="float:right" @click="jump_login">管理员入口</el-menu-item>
      
      <el-menu-item index="2" style="float:right" @click="jump_courseShow">开设课程</el-menu-item>
      <el-menu-item index="3" style="float:right" @click="jump_teacherShow">师资团队</el-menu-item>
      <el-menu-item index="4" style="float:right" @click="jump_imgShow">学生作品</el-menu-item>
    </el-menu>

    <!-- 轮播图 -->
    <el-carousel indicator-position="none">
      <el-carousel-item class="lunbo-box-item" v-for="(item,index) in abc_img" :key="index">
        <img :src="url+item.imgName" class="lunbotu" alt="轮播图" style="width:100%" />
      </el-carousel-item>
    </el-carousel>
    <!-- 侧边导航 -->
    <div class="right_menu">
      <el-menu  class="el-menu-vertical-demo" :collapse="true">
        <el-menu-item index="1" @click="dialogFormVisible1 = true">
          <span slot="title">公众号</span>
          <!-- <i class="el-icon-circle-plus-outline"></i> -->
          <img style="width:20px;height:20px" src="../../img/QRIcon.png" alt="" />
        </el-menu-item>
        <el-menu-item index="2" @click="dialogFormVisible = true">
          <span slot="title">预报名登记</span>
          <i class="el-icon-document"></i>
        </el-menu-item>
          
        <el-menu-item index="3" @click="backTop">
          <span slot="title">返回顶部</span>
          <i class="el-icon-caret-top"></i>
        </el-menu-item>
      </el-menu>
    </div>
    <!-- 弹出二维码 -->
    <el-dialog class="qrbox" style="width:940px" title="公众号二维码" :visible.sync="dialogFormVisible1" >
      <img src="../../img/QRcode.jpg" alt="" />
    </el-dialog>
    <!-- 弹出预报名表单 -->
    <el-dialog class="ybmbox" title="预报名登记" :visible.sync="dialogFormVisible" >
      <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm" :rules="ybm">
        <el-form-item label="姓名"  style="width:350px" prop="name">
          <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="ruleForm.sex" placeholder="请选择性别">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="预上课时间" >
          <el-form-item prop="time">
            <el-date-picker type="date" 
              placeholder="选择日期" 
              value-format="yyyy-MM-dd"
              v-model="ruleForm.time" 
              style="width: 250px;">
            </el-date-picker>
          </el-form-item>
        </el-form-item>
        <el-form-item label="联系电话" style="width:350px" prop="tell">
          <el-input v-model="ruleForm.tell" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
     <!-- 广告 -->
    <div class="Ad">
      <span class="ad-head">与您一同走进</span><span class="ad-head" style="color:red">书法</span>
     <!-- 宣传1 -->
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple"><div style="padding-top:10px">中国书法</div></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple"><div style="padding-top:10px">字里千秋</div></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple"><div style="padding-top:10px">一手好字</div></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple"><div style="padding-top:10px">相伴一生</div></div>
        </el-col>
      </el-row>
      <!-- 宣传2 -->
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple"><div style="padding-top:10px">一撇一竖</div></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple"><div style="padding-top:10px">锋芒毕露</div></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple"><div style="padding-top:10px">走进卧龙</div></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple"><div style="padding-top:10px">笔下生辉</div></div>
        </el-col>
      </el-row>
    </div>
    <!-- 书社介绍 -->
    <div class="info_show">
      <div class="info_one">
        书生意气，面点江山。协同共进，会聚知音。我们相聚的初衷是书法，书法促使我们结缘     <span style="color:red">！</span>
      </div>
      <div class="info_two">
        在学习书法的过程中收获的
        不仅仅是书法上的进步，更多的是友谊和成长。十年如一日，我们风
        雨兼程，有过辉煌，有过低谷，在辉煌的时刻思索如何进步，在低谷
        的时候互相鼓励，不拋弃不放弃。学员之间志同道合，友好相处，
        互相鼓励，互相学习，珍惜相识的缘分，在培训期间收获最真挚的友谊。
      </div>
      <div class="info_three">
        卧龙书社萦绕着浓烈的笔墨书香，卷起袖手，轻舞灵笔。引你走
        进书画之家，领你共同书画人生。炫动青春，心迎新升。停渚于书画
        之家，居住于书画之家，为你的青春添上一抹新的韵味，为你的生活
        书画一片新的色彩!
      </div>
    </div>
    <!-- 书社资讯 -->
    <div class="news_show">
      <div class="news_left">
        <template>
          <div class="block" style="width:100%;height:100%">
            <el-carousel height="347px">
              <el-carousel-item v-for="(item,index) in news" :key="index">
                <a href=""><img style="width:100%;height:100%" :src="url+item.imgName" /></a>
                <div class="news_info"><div style="padding-top:30px;color:white">{{item.info}}</div></div>
              </el-carousel-item>
            </el-carousel>
          </div>
        </template>
      </div>
      <div class="news_right">
        <ul class="nr_box">
          <li v-for="(item,index) in newsRight" :key="index">
            <div style="padding-top:10px">
              <el-tag>{{index+1}}</el-tag> 
              &nbsp;<a :href="item.link" style="text-decoration:none;color:black;">{{item.news}}</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 作品展示 -->
    <div class="img_show">
     <img src="../../img/title2.png" style="width:500px">
      <!-- 图片懒加载 -->
      <div class="image__lazy">
        <el-image v-for="(item,index) in urls" 
                  :key="index" 
                  :src="url+item.fileName" 
                  lazy 
                  style="width:320px;height:250px;margin-left:10px;margin-top:10px">
        </el-image>
      </div>
    </div>
    <!-- 师资介绍 -->
    <div class="teacher_show">
      <img src="../../img/title3.png" style="width:300px"></br>
      <!-- 介绍卡片 -->
      <el-col :span="8" v-for="(item, index) in teacher" :key="index" style="width:30%">
        <div class="car_show">
            <el-card :body-style="{ padding: '10px'}" style="width:400px;height:450px">
              <img :src="item.src" class="image">
              <div style="padding: 14px;">
                <span style="font-size:20px">{{item.name}}</span></br></br>
                <span>{{item.info}}</span>
                <!-- 评分 -->
                <div class="block">
                  <span class="demonstration">------教师评分------</span>
                  <el-rate v-model="item.value" 
                            disabled
                            show-score
                            text-color="#ff9900">
                  </el-rate>
                </div>
              </div>
            </el-card>
        </div>
      </el-col>
    </div>
    <!-- 开设课程 -->
    <div class="course_show">
      <img src="../../img/title4.png" style="width:300px"></br>
      <!-- 硬笔 -->
      <ul class="YB" style="list-style:none;">
        <li v-for="(item,index) in course_YB" :key="index" style="float:left">
          <div class="course_box">
            <el-card class="box-card" :body-style="{ backgroundColor: item.color}">
              <img :src="item.src" style="width:60%">
            </el-card>
            <span>{{item.name}}</span>
          </div>
        </li>
      </ul>
      <!-- 毛笔 -->
      <ul class="YB" style="list-style:none;">
        <li v-for="(item,index) in course_MB" :key="index" style="float:left">
          <div class="course_box">
            <el-card class="box-card" :body-style="{ backgroundColor: item.color}">
              <img :src="item.src" style="width:60%">
            </el-card>
            <span>{{item.name}}</span>
          </div>
        </li>
      </ul>
      
    </div>
    <!-- 底部 -->
    <div class="last">
      <div class="last_box">
        <span>地址：儒江东路名郡36栋101室</span></br>
        <span>联系电话：12345678  邮箱：123456@163.com</span>
      </div>
    </div>
      
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex2: "1",
      url: "http://47.115.143.135:8080/image/",
      abc_img: [],
      items: [{ type: "warning", label: "卧龙书社" }],
      urls: [],
      teacher:[
        {name:'小刘老师',src: require("../../img/teacher.jpg"),info:'硬笔书法指导',value:4.0},
        {name:'小刘老师',src: require("../../img/teacher.jpg"),info:'毛笔书法指导',value:3.7},
        {name:'小刘老师',src: require("../../img/teacher.jpg"),info:'硬笔书法指导',value:3.5},
      ],
      activeKey: 0,
      course_YB:[
        {name:'硬笔-行书',src: require("../../img/YB1.png"),color:'#00FFFF'},
        {name:'硬笔-楷书',src: require("../../img/YB2.png"),color:'#EE82EE'},
        {name:'硬笔-隶书',src: require("../../img/YB3.png"),color:'#7FFFAA'},
        {name:'硬笔-篆书',src: require("../../img/YB4.png"),color:'#FFFFE0'},
        {name:'硬笔-草书',src: require("../../img/YB5.png"),color:'#E1FFFF'},
      ],
      course_MB:[
        {name:'毛笔-行书',src: require("../../img/MB1.png"),color:'#409EFF'},
        {name:'毛笔-楷书',src: require("../../img/MB2.png"),color:'#909399'},
        {name:'毛笔-隶书',src: require("../../img/MB3.png"),color:'#F56C6C'},
        {name:'毛笔-篆书',src: require("../../img/MB4.png"),color:'#E6A23C'},
        {name:'毛笔-草书',src: require("../../img/MB5.png"),color:'#67C23A'},
      ],
      news:[],
      newsRight:[],
      dialogFormVisible:false,
      dialogFormVisible1:false,
      ruleForm: {
        name:'',
        sex:'',
        tell:'',
        time:''
      },
      ybm: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          tell: [
            { required: true, message: '电话不能为空', trigger: 'blur' },
          ],
        }
    };
  },
  created(){
    const that = this;
    axios.get("http://47.115.143.135:8080/img/findAll/0/100").then(function(resp) {
      that.urls = resp.data.content;
    });
    axios.get("http://47.115.143.135:8080/poster/findAll/0/100").then(function(resp) {
      that.abc_img = resp.data.content;
    });
    axios.get("http://47.115.143.135:8080/newsLeft/findAll/0/100").then(function(resp) {
      that.news = resp.data.content;
    });
    axios.get("http://47.115.143.135:8080/newsRight/findAll/0/100").then(function(resp) {
      that.newsRight = resp.data.content;
    });
  },
  methods: {
    handleSelect(key, keyPath) {
      //console.log(key, keyPath);
    },
    jump_imgShow(){
      document.querySelector(".img_show").scrollIntoView(true)
    },
    jump_teacherShow(){
      document.querySelector(".teacher_show").scrollIntoView(true)
    },
    jump_courseShow(){
      document.querySelector(".course_show").scrollIntoView(true)
    },
    jump_login(){
      this.$router.push("/login");
    },
    backTop(index){
      document.querySelector(".el-menu-demo").scrollIntoView(true)
    },
    submitForm(formName) {
        const that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
           axios.post('http://47.115.143.135:8080/reserve/save',this.ruleForm).then(function(resp){
             if(resp.data == 'success'){
                that.$message({
                  message: '提交成功！',
                  type: 'success'
                });
                that.$alert('<'+that.ruleForm.name+'>预报名成功！', '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    window.location.reload();
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
  }
};
</script>

<style>

.el-row {
  left: 16%;
  top: 50px;
  width:70%;
  margin-bottom: 20px;
  
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  
  background: #99a9bf;
}
.bg-purple {
  text-align: center;
  font-size: 25px;
  font-family: cursive;
  background: white;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  
  border-radius: 4px;
  min-height: 50px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.Ad{
  width:100%;
  height:270px;
  /* background:rgb(26, 25, 25); */
  background-image: url('../../img/bg1.jpg');
  text-align: center
}
.ad-head{
  position: relative;
  top: 30px;
  color:white; 
  font-size: 50px;
  font-family: KaiTi;
}
.right_menu{
  position: fixed;
  left: 96%;
  z-index: 500;
  border: 1px solid #EBEEF5;
}
/* 弹出框 */
.qrbox{
  padding-left: 18%;
}
.ybmbox{
  width: 900px;
  padding-left: 20%;
}
/* 书社介绍 */
.info_show{
  height: 360px;
  width: 100%;
  /* background-color: aquamarine; */
}
.info_one{
  position: absolute;
  margin: 5% 0 0 8%;
  height: 25%;
  width: 25%;
  /* border: 1px solid black; */
  font-size: 32px;
  font-weight: 900;
}
.info_two{
  position: absolute;
  margin: 5% 0 0 38%;
  height: 30%;
  width: 25%;
  /* border: 1px solid black; */
  font-size: 20px;
  color: #6B778D;
}
.info_three{
  position: absolute;
  margin: 5% 0 0 68%;
  height: 30%;
  width: 25%;
  /* border: 1px solid black; */
  font-size: 20px;
  color: #6B778D;
}
/* 书社资讯 */
.news_show{
  height: 500px;
  background-color: #F5F5F5;
}
.news_left{
  position: absolute;
  margin: 5% 0 0 9.5%;
  width: 40%;
  height: 48%;
  /* border: 1px solid black; */
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
.news_right{
  position: absolute;
  margin: 5% 0 0 51%;
  width: 40%;
  height: 48%;
  /* border: 1px solid black; */
  background-color: white;
  /* box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1) */
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
.news_info{
  position: absolute;
  top: 70%;
  height: 30%;
  width: 100%;
  background:rgba(119,136,153,0.5);
  text-align: center;
}
.nr_box{
  position: relative;
  margin: 3% 0 0 3%;
  width: 90%;
  height: 85%;
  overflow: hidden;/*超出部分隐藏*/ 
  white-space: nowrap;/*不自动换行*/ 
  padding: 10px;
  border: 1px solid #99a9bf;
  list-style: none; 
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
  
.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
/* 作品展示 */
.img_show{
  text-align: center;
  height: auto;
}
.image__lazy{
  position: relative;
  top: -30px;
}
.teacher_show{
  position: relative;
  margin-top: 30px;
  height: 600px;
  text-align: center;
}
/* 卡片 */
.car_show{
  margin-left: 20%;
  text-align: center;
}
.time {
    font-size: 13px;
    color: #999;
  }
  
  .image {
    width: 100%;
    height: 300px;
    display: block;
  }
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
/* 课程展示 */
.course_show{
  margin-top: 20px;
  text-align: center;
  /* background-color: cadetblue; */
  height: 500px;
}
.box-card {  
  position: relative;
  left: 5%;
  width: 250px;
  }
.course_box{
  position: relative;
  top: 10px;
  left: 5%;
  /* border: 1px solid black; */
  width: 280px;
  height: 120px;
}
/* 底部 */
.last{
  position: relative;
  margin-top: 10px;
  text-align: center;
  height: 60px;
  background-color: #545C6E;
}
.last_box{
  color: rgb(53, 53, 63);
  position: relative;
  top: 10px;
}
</style>