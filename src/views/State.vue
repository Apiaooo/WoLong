<template>
  <div>
    <div class="model1">
      <div class="m1_box">
        <div id="m1_chart" style="width:550px;height:250px"></div>
      </div>
    </div>

    <div class="model2">
      <div class="m2_box1">
        <div id="m2_c" style="width:250px;height:250px"></div>
      </div>
      <div class="m2_box2">
        <div id="m2_chart" style="width:250px;height:250px"></div>
      </div>
    </div>

    <div class="model3">
      <span style="font-size:20px;position: relative;top:15px;left:36%">教学计划</span>
      <div class="m3_box">
        <el-timeline>
          <el-timeline-item  style="height:70px" timestamp="2020/7/01" placement="top">
            <el-card 
            style="height:50px;
                    width:180px;
                    text-align:center;
                    background-color:#FAFAD2;" 
                    :body-style="{ padding: '0px' }">
              <p>分配上课时间</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item style="height:70px" timestamp="2020/7/05" placement="top">
            <el-card 
            style="height:50px;
                    width:180px;
                    text-align:center;
                    background-color:#FAFAD2;" 
                    :body-style="{ padding: '0px' }">
              <p>正式上课</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item style="height:70px" timestamp="2020/7/15" placement="top">
            <el-card 
            style="height:50px;
                    width:180px;
                    text-align:center;
                    background-color:#FAFAD2;" 
                    :body-style="{ padding: '0px' }">
              <p>阶段小测</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>

    <div class="model4">
      <div class="m4_box">
        <span class="m4_title">课程进度</span>
        <el-progress class="m4_chart" type="circle" :percentage="course_state"></el-progress>
      </div>
      <div class="m4_box1">
        <span style="font-size:12px">小刘老师</span>
        <el-progress :color="'#E6A23C'" :percentage="teacher_state[0]"></el-progress>
      </div>
      <div class="m4_box2">
        <span style="font-size:12px">小曾老师</span>
        <el-progress :color="'#67C23A'" :percentage="teacher_state[1]"></el-progress>
      </div>
      <div class="m4_box3">
        <span style="font-size:12px">小张老师</span>
        <el-progress :color="'#F56C6C'" :percentage="teacher_state[2]"></el-progress>
      </div>
      <div class="m4_box4">
        <span style="font-size:12px">小陈老师</span>
        <el-progress :color="'#909399'" :percentage="teacher_state[3]"></el-progress>
      </div>
    </div>

    <div class="model5">
      <span class="m5_title">课程表</span>
      <div class="m5_box">
        <el-table v-loading="loading" :data="schedules" width="100%" height="100%">
          <el-table-column prop="label" align="center" label="周" ></el-table-column>
          <el-table-column align="center" label="上午">
            <el-table-column prop="oneCourse" align="center" label="第一节"></el-table-column>
            <el-table-column prop="twoCourse" align="center" label="第二节"></el-table-column>
            
          </el-table-column>
          <el-table-column align="center" label="下午">
            <el-table-column prop="threeCourse" align="center" label="第三节"></el-table-column>
            <el-table-column prop="fourCourse" align="center" label="第四节"></el-table-column>
          </el-table-column>

          <el-table-column align="center" label="晚上">
            <el-table-column prop="fiveCourse" align="center" label="第五节"></el-table-column>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        { name: "硬笔-楷书" },
        { name: "硬笔-行书" },
        { name: "硬笔-隶书" },
      ],
      course_state:0,
      teacher_state:[],
      schedules:[],
      loading:true,
    };
  },
  mounted() {
    this.drawLine();
  },
  created() {
    const that = this;
    axios.get("http://47.115.143.135:8080/teacher/findAvgState").then(function(resp) {
      that.course_state = resp.data;
    });
    axios.get("http://47.115.143.135:8080/teacher/findTeachState").then(function(resp) {
      that.teacher_state = resp.data;
    });
    axios
      .get("http://47.115.143.135:8080/schedule/findAll/0/7")
      .then(function(resp) {
        console.log(resp)
        that.schedules = resp.data.content;
        that.loading = false;
      });
  },
  methods: {
    drawLine() {
      const that = this;
      axios.get("http://47.115.143.135:8080/courseState/findAll/0/10").then(function(resp) {
        var datas=resp.data.content;
          //图2
        var dom = document.getElementById("m2_chart");
        var chat2 = that.$echarts.init(dom);
        var option2 = {
          backgroundColor: "#F5F5F5",

          title: {
            text: "产品热度",
            left: "center",
            top: 10,
            textStyle: {
              color: "black"
            }
          },

          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },

          visualMap: {
            show: false,
            min: 0,   //min和max要根据自己的数值区域来设置，低于会全黑，高于全白
            max: 100,
            inRange: {
              colorLightness: [0, 1]
            }
          },
          series: [
            {
              name: "课程名称",
              type: "pie",
              radius: "55%",
              center: ["50%", "50%"],
              data: datas.sort(function(a, b) {
                return a.value - b.value;
              }),
              roseType: "radius",
              label: {
                color: "black"
              },
              labelLine: {
                lineStyle: {
                  color: "black"
                },
                smooth: 0.2,
                length: 10,
                length2: 20
              },
              itemStyle: {
                color: "#c23531",
                shadowBlur: 200,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              },

              animationType: "scale",
              animationEasing: "elasticOut",
              animationDelay: function(idx) {
                return Math.random() * 200;
              }
            }
          ]
        };
        chat2.setOption(option2);
      });
      axios.get("http://47.115.143.135:8080/courseClass/findAll/0/10").then(function(resp) {
        var datas=resp.data.content;
          //图2
        var dom = document.getElementById("m2_c");
        var chat2 = that.$echarts.init(dom,"light");
        var option2 = {
            backgroundColor: "#F5F5F5",

            title: {
                text: "产品类型",
                left: "center",
                top: 10,
                textStyle: {
                  color: "black"
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },

            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    },
                    data:datas
                }
            ]
        };
        chat2.setOption(option2);
      });
      let myChart = this.$echarts.init(
        document.getElementById("m1_chart"),
        "light"
      );
      // 绘制图表
      myChart.setOption({
        title: {
          text: "总体趋势"
        },
        tooltip: {
          trigger: "axis"
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "1-2月",
            "3-4月",
            "5-6月",
            "7-8月",
            "9-10月",
            "11-12月",
            "2020年"
          ]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "硬笔书法学生数",
            type: "line",
            stack: "总量",
            data: [50, 65, 20, 45, 80, 55, 30],
            smooth: true
          },
          {
            name: "毛笔书法学生数",
            type: "line",
            stack: "总量",
            data: [60, 30, 35, 55, 25, 50, 33],
            smooth: true
          },
          {
            name: "产品热度",
            type: "line",
            stack: "总量",
            data: [150, 232, 201, 154, 190, 330, 410],
            smooth: true
          },
          {
            name: "教学质量",
            type: "line",
            stack: "总量",
            data: [320, 332, 301, 334, 390, 330, 320],
            smooth: true
          },
          {
            name: "营业利润",
            type: "line",
            stack: "总量",
            data: [820, 932, 500, 934, 1000, 900, 800],
            smooth: true
          }
        ]
      });
      
    },
  }
};
</script>

<style>
/* 模块一 ---------------------------------------------------------*/
.model1 {
  position: relative;
  margin: 0 0 0 20px;
  width: 600px;
  height: 280px;
  /* background-color: aqua; */
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.m1_box {
  position: relative;
  top: 20px;
}
#m1_chart {
  margin: 0 0 0 25px;
}
/* 模块二--------------------------------------------------------- */
.model2 {
  position: relative;
  margin: -280px 0 0 650px;
  width: 600px;
  height: 280px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.m2_box1 {
  position: absolute;
  width: 50%;
  height: 100%;
}
#m2_c{
  position: relative;
  margin: 15px 0 0 35px;
}

.m2_box2 {
  position: absolute;
  margin: 0 0 0 300px;
  width: 50%;
  height: 100%;
  /* background-color: burlywood; */
}
#m2_chart {
  position: relative;
  margin: 15px 0 0 15px;
}

/* 模块三--------------------------------------------------------- */
.model3 {
  position: relative;
  margin: 25px 0 0 20px;
  width: 320px;
  height: 320px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.m3_box{
  position: relative;
  top: 30px;
  left: 15px;
  height: 80%;
  width: 90%;
}
/* 模块四-------------------------------------------------------- */
.model4 {
  position: relative;
  margin: -320px 0 0 370px;
  width: 320px;
  height: 320px;
  /* background-color: cornflowerblue; */
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.m4_box {
  text-align: center;
}
.m4_title {
  position: absolute;
  top: 20px;
  left: 36%;
  font-size: 20px;
}
.m4_chart {
  position: relative;
  top: 55px;
}
.m4_box1 {
  width: 45%;
  position: relative;
  margin: 65px 0 0 20px;
}
.m4_box2 {
  width: 45%;
  position: relative;
  margin: -40px 0 0 170px;
}
.m4_box3 {
  width: 45%;
  position: relative;
  margin: 20px 0 0 20px;
}
.m4_box4 {
  width: 45%;
  margin: -40px 0 0 170px;
}

/* 模块五------------------------------------------------------ */
.model5 {
  position: relative;
  margin: -320px 0 0 720px;
  width: 535px;
  height: 320px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.m5_title{
  position: absolute;
  top: 15px;
  left: 45%;
  font-size: 20px;
}
.m5_box{
  position: absolute;
  top: 50px;
  left: 25px;
  width: 90%;
  height: 80%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

</style>