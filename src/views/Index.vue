<template>
  <el-container style="height: 100%; border: 1px solid #eee">
    <el-aside width="200px" style="background-color:#545c60">
      <!-- :default-openeds="['1','2','3','4']" -->
      <el-menu router 
        background-color="#545c64"
        text-color="#fff"
        style="border-right-width:0;"
        active-text-color="#ffd04b">
        <!-- border-right-width: 0;解决了二级菜单宽度多1px的问题 -->

        <!-- <el-submenu v-for="(item,index) in $router.options.routes" :index="index+'' " v-if="item.show" >
            <template slot="title">
              <i class="el-icon-menu"></i>{{item.name}}
            </template>
              <el-menu-item v-for="(item2,index2) in item.children" :index="item2.path" >
                  {{item2.name}}
              </el-menu-item>
        </el-submenu>-->
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-user"></i>用户管理
          </template>
          <el-menu-item index="UserManager">查询用户</el-menu-item>
          <el-menu-item index="AddUser">添加用户</el-menu-item>
          <el-menu-item index="reserveUser">预约用户</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-notebook-1"></i>课程管理
          </template>
          <el-menu-item index="CourseClass">课程类别</el-menu-item>
          <el-menu-item index="CourseManager">查询课程</el-menu-item>
          <el-menu-item index="AddCourse">添加课程</el-menu-item>
          <el-menu-item index="Schedule">课程表</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-setting"></i>Admin管理
          </template>
          <el-menu-item index="AdminManager">查询Admin</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-s-custom"></i>教师管理
          </template>
          <el-menu-item index="TeacherManager">查询教师</el-menu-item>
          <el-menu-item index="AddTeacher">添加教师</el-menu-item>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-brush"></i>首页资源管理
          </template>
          <el-menu-item index="Poster">轮播图</el-menu-item>
          <el-menu-item index="ImgManager">学生作品</el-menu-item>
          <el-menu-item index="NewsLeft">新闻-左</el-menu-item>
          <el-menu-item index="NewsRight">新闻-右</el-menu-item>
        </el-submenu>
        <el-submenu index="6">
          <template slot="title">
            <i class="el-icon-pie-chart"></i>数据统计
          </template>
          <el-menu-item index="show">数据展示</el-menu-item>
        </el-submenu>
        <el-submenu index="7">
          <template slot="title">
            <i class="el-icon-data-analysis"></i>教学情况
          </template>
          <el-menu-item index="State">教学情况总览</el-menu-item>
        </el-submenu>

      </el-menu>
    </el-aside>
    <el-container>
      <!-- 标头 -->
      <el-header style="text-align: right; font-size: 12px">
        
        <!-- 右上角按钮 -->
        <el-dropdown>
          <!-- 头像 -->
          <img
            style="width: 50px; height: 50px; 
            margin-top:11%;border-radius:25px;
            background-color:white"
            :src="url+headImg"
            ></img>
            <!-- 下拉栏 -->
            <el-dropdown-menu slot="dropdown" style="text-align:center">
              <el-dropdown-item>用户组：{{name}}</el-dropdown-item>
              <el-dropdown-item>
                <el-button @click="logout" type="danger" plain>退出</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        
      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    logout() {//退出登录
      window.sessionStorage.clear(); //清空token
      this.$router.push("/login"); //跳转到登录页面
    },
  },

  data() {
    return {
      name:'',
      headImg:'',
      url:'http://47.115.143.135:8080/image/',
    };
  },

  created(){
    // 读取存到sessionStorage里面的admin_name
    this.name = window.sessionStorage.getItem('name')
    this.headImg = window.sessionStorage.getItem('headImg')
  }

};
</script>

<style>
.el-header {
  background-color: #eef1f5;
  color: #333;
  line-height: 60px;
}
.el-aside {
  color: #333;
}
</style>