<template>
  <div>
    <!-- 数据展示 -->
    <div class="data_show">
      <span class="title" style="font-size:40px;font-weight:500">数据统计</span>
      <!-- 用户数量 -->
      <div class="userData">
        <img src="../../img/userIcon.png" style="height:50px;margin:25px 0 0 10px">
        <div class="user_box">
          <span style="font-size:20px;font-weight:900">用户数量</span></br>
          <span>{{userData}}</span>
        </div>
      </div>
      <!-- 课程数量 -->
      <div class="courseData">
        <img src="../../img/bookIcon.png" style="height:50px;margin:25px 0 0 10px">
        <div class="book_box">
          <span style="font-size:20px;font-weight:900">课程数量</span></br>
          <span>{{courseData}}</span>
        </div>
      </div>
      <!-- 教师数量 -->
      <div class="teacherData">
        <img src="../../img/teacherIcon.png" style="height:50px;margin:25px 0 0 10px">
        <div class="teacher_box">
          <span style="font-size:20px;font-weight:900">教师数量</span></br>
          <span>{{teacherData}}</span>
        </div>
      </div>
      <!-- 管理员数量 -->
      <div class="adminData">
        <img src="../../img/adminIcon.png" style="height:50px;margin:25px 0 0 10px">
        <div class="admin_box">
          <span style="font-size:20px;font-weight:900">管理员数量</span></br>
          <span>{{adminData}}</span>
        </div>
      </div>
    </div>
    <!-- 图表展示 -->
    <div class="chart">
      <div id="myChart" :style="{width: '600px', height: '350px'}"></div>
      <div id="dom" :style="{width: '600px', height: '350px'}"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "hello",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      userData:0,
      courseData:0,
      teacherData:0,
      adminData:0,
      moneyData:0,
      studentData:0,
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      //先加载后台的数据并赋值，若在create中加载并赋值，赋值后的数据在methods失效（在标签中不会）
      const that = this;
      axios.get("http://47.115.143.135:8080/user/findMoneyAndCount/").then(function(resp) {
        that.moneyData = resp.data;
        var dom = document.getElementById('dom');
        var chat2 = that.$echarts.init(dom);
        var arr = that.moneyData;
      
        var option2 = {
          title:{text:"                                               营业收入"},
            xAxis: {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月','7月','8月','9月','10月','11月','12月']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
              data: that.moneyData,
              type: 'line'
          }]
        }
        chat2.setOption(option2);
      });
      axios.get("http://47.115.143.135:8080/user/findTimeAndCount/").then(function(resp) {
        that.studentData = resp.data;
        // 基于准备好的dom，初始化echarts实例
        let myChart = that.$echarts.init(document.getElementById("myChart"));
        // 绘制图表
        myChart.setOption({
          title: { text: "                                                报名趋势" },
          tooltip: {},
          xAxis: {
            data: ["1月", "2月", "3月", "4月", "5月", "6月","7月","8月","9月","10月","11月","12月"]
          },
          yAxis: {},
          series: [
            {
              name: "报名数",
              type: "bar",
              data: that.studentData,
            }
          ]
        });
      });
      
    },
    
  },
  created() {
    const that = this;
    axios.get("http://47.115.143.135:8080/user/findAll/0/6").then(function(resp) {
      //console.log(resp)
      that.userData = resp.data.totalElements;
    });
    axios.get("http://47.115.143.135:8080/course/findAll/0/4").then(function(resp) {
      that.courseData = resp.data.totalElements;
    });
    axios.get("http://47.115.143.135:8080/admin/findAll/0/3").then(function(resp) {
      that.adminData = resp.data.totalElements;
    });
    axios.get("http://47.115.143.135:8080/teacher/findAll/0/5").then(function(resp) {
      that.teacherData = resp.data.totalElements;
    });
  }
};
</script>

<style>
/* 数据显示部分 */
.data_show {
  height: 300px;
  /* background-color: rgb(232, 238, 238); */
}
.title{
  position: relative;
  top: 30px;
  left: 44%;
}
.userData {
  background-color: white;
  height: 100px;
  width: 200px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  position: relative;
  top: 70px;
  left: 150px;
}
.user_box{
  text-align: center;
  /* border: 1px solid red; */
  width: 50%;
  margin: -55px 0 0 80px;
}
.courseData{
  background-color: white;
  height: 100px;
  width: 200px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  position: relative;
  top: -30px;
  left: 420px;
}
.book_box{
  text-align: center;
  width: 50%;
  margin: -55px 0 0 80px;
  height: auto;
}
.teacherData{
  background-color: white;
  height: 100px;
  width: 200px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  position: relative;
  top: -130px;
  left: 670px;
}
.teacher_box{
  text-align: center;
  width: 50%;
  margin: -55px 0 0 80px;
  height: auto;
}
.adminData{
  background-color: white;
  height: 100px;
  width: 200px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  position: relative;
  top: -230px;
  left: 920px;
}
.admin_box{
  text-align: center;
  width: 50%;
  margin: -55px 0 0 80px;
  height: auto;
}
/* 图表展示部分 */
.chart {
  height: 400px;
  /* background-color: aquamarine; */
}
#myChart{
  margin:0 0 0 50px;
}
#dom{
  margin: -350px 0 0 650px;
}
</style>