import Vue from 'vue'
import VueRouter from 'vue-router'
import UserManager from '../views/UserManager'
import AddUser from '../views/AddUser'
import Index from '../views/Index'
import UserUpdate from '../views/UserUpdate'
import Home from '../views/Home'
import AddCourse from '../views/AddCourse'
import CourseManager from '../views/CourseManager'
import CourseUpdate from '../views/CourseUpdate'
import Login from '../components/Login'
import show from '../views/show'
import State from '../views/State'
import Schedule from '../views/Schedule'
import reserveUser from '../views/reserveUser'
import TeacherManager from '../views/TeacherManager'
import AddTeacher from '../views/AddTeacher'
import TeacherUpdate from '../views/TeacherUpdate'
import CourseClass from '../views/CourseClass'
import ScheduleTeacher from '../views/ScheduleTeacher'
import UserState from '../views/UserState'
import AdminManager from '../views/AdminManager'
import ImgManager from '../views/ImgManager'
import Poster from '../views/Poster'
import NewsLeft from '../views/NewsLeft'
import NewsRight from '../views/NewsRight'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name:'首页',
    component:Home
  },
  {
    path:'/user',
    name:'用户管理',
    component:Index,
    redirect:"/show",
    show:true,
    children:[
      {
        path:'/UserManager',
        name:'查询用户',
        component:UserManager
      },
      {
        path:'/AddUser',
        name:'添加用户',
        component:AddUser
      },
      //修改用户资料
      {
        path:'/update',
        name:'更新用户',
        component:UserUpdate,
        show:false
      },
      {
        path:'/reserveUser',
        name:'预约用户',
        component:reserveUser
      },
      {
        path:'/UserState',
        name:'用户状态',
        component:UserState
      }
    ]
  },
  {
    path:'/study',
    name:'课程管理',
    component:Index,
    show:true,
    children:[
      {
        path:'/CourseClass',
        name:'课程类别',
        component:CourseClass
      },
      {
        path:'/CourseManager',
        name:'查询课程',
        component:CourseManager
      },
      {
        path:'/AddCourse',
        name:'添加课程',
        component:AddCourse
      },
      {
        path:'/CourseUpdate',
        name:'修改课程',
        component:CourseUpdate,
      },
      {
        path:'/Schedule',
        name:'课程表',
        component:Schedule,
      },
      {
        path:'/ScheduleTeacher',
        name:'教师排课',
        component:ScheduleTeacher,
      }
    ]
  },
  {
    path:'/Admin',
    name:'Admin管理',
    component:Index,
    show:true,
    children:[
      {
        path:'/AdminManager',
        name:'查询Admin',
        component:AdminManager
      },
    ]
  },
  
  {
    path:'/teacher',
    name:'教师管理',
    component:Index,
    children:[
      {
        path:'/TeacherManager',
        name:'教师信息',
        component:TeacherManager
      },
      {
        path:'/AddTeacher',
        name:'添加教师',
        component:AddTeacher
      },
      {
        path:'/TeacherUpdate',
        name:'修改教师',
        component:TeacherUpdate
      }
    ]
  },
  {
    path:'/DataShow',
    name:'数据统计',
    component:Index,
    show:true,
    children:[
      {
        path:'/show',
        name:'图表',
        component:show,
      },
    ]
  },
  {
    path:'/Img',
    name:'首页资源管理',
    component:Index,
    children:[
      {
        path:'/ImgManager',
        name:'学生作品管理',
        component:ImgManager,
      },
      {
        path:'/Poster',
        name:'轮播图管理',
        component:Poster,
      },
      {
        path:'/NewsLeft',
        name:'新闻左模块管理',
        component:NewsLeft,
      },
      {
        path:'/NewsRight',
        name:'新闻右模块管理',
        component:NewsRight,
      },
    ]
  },
  {
    path:'/StudentState',
    name:'教学情况',
    component:Index,
    children:[
      {
        path:'/State',
        name:'教学情况总览',
        component:State
      },
    ]
  },
  {
    path:'/Login',
    name:'登录界面',
    component:Login,
  },
  
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//挂在路由导航守卫
router.beforeEach((to,from,next) => {
  //to表示要访问的路径
  //from代表从哪个路径跳转而来
  //next是一个函数，表示放行
  //   next() 放行   next('/login') 强制跳转

  if(to.path === '/login') return next()
  if(to.path === '/') return next()
  
  //获取token
  const tokenStr = window.sessionStorage.getItem('token')

  if(!tokenStr) return next('/login') //如果未登录（无token值）跳转到登录页面

  next() //已登录直接放行
})

export default router
