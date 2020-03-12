<template>

        <div>
          <el-button  size="mini" @click="exportCollege()">导出</el-button>
          

        <div id="myChart" :style="{width: '1000px', height: '500px'}"></div>
  
</div>
  
</template>
<script>
import statisticsApi from '@/api/statistics'
export default {
  name: 'hello',
  data () { 
    return {
      msg: 'Welcome to Your Vue.js App',
      colleges:[]
    }
  },
  mounted(){
    statisticsApi.collegeNameAndDownload().then(res=>{
          if(res.data.success){
              this.colleges = res.data.data;
              this.drawLine();//加载成功，画柱状图
          }else{
            this.$message({
              type:"error",
              message:"系统异常，请稍后再试！！！"
              })
          }
      })

  },
  
  methods: {
    exportCollege(){
        window.location.href="http://localhost:9000/statistics/statistics/exportCollege";
    },
     
    getData(){
      var colleges = this.colleges;
      var college = [];
      var download= [];
      for(var i=0;i<colleges.length;i++){
        college.push(colleges[i].name);
        download.push(colleges[i].download)
      }
      console.log(college)
      return {
        college:college,
        download:download
      }
  },
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        var data = this.getData();

        // 绘制图表
        myChart.setOption({
            title: { text: '各学院软件下载数' },
            tooltip: {},
            xAxis: {
                data: data.college
            },
            yAxis: {},
            series: [{
                name: '下载数',
                type: 'bar',
                data: data.download
            }]
        });
    }
  }
}
</script>
 