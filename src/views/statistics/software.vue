<template>
<div>
   <el-button  size="mini" @click="exportSoftware()">导出</el-button>
  <div id="myChart" :style="{width: '800px', height: '400px'}"></div>
  </div>
</template>
<script>
import statisticsApi from '@/api/statistics'
export default {
  name: 'hello',
  data () { 
    return {
      msg: 'Welcome to Your Vue.js App',
      software:[],
      count:0
    }
  },
  mounted(){
    statisticsApi.softNameAndDownload().then(res=>{
      if(res.data.success){
          this.software = res.data.data
          this.count = this.software.length
           this.drawLine();
      }else{
        this.$message({
          type:'error',
          message:'系统异常，请稍后再试！！！'
        })
      }
    })
   
  },
  methods: {
exportSoftware(){
        window.location.href="http://localhost:9000/statistics/statistics/exportSoftware";
    },
    
 genData(count) {
    var softList = this.software
    var legendData = [];
    var seriesData = [];
    var selected = {};
    for (var i = 0; i < count; i++) {
        name = softList[i].name;
        legendData.push(name);
        seriesData.push({
            name: softList[i].name,
            value: softList[i].download
        });
        selected[name] = i < 6;
    }

    return {
        legendData: legendData,
        seriesData: seriesData,
        selected: selected
    };

    
},

    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表

        var data = this.genData(this.count);
        myChart.setOption({
    title: {
        text: '学校软件下载统计',
        subtext: '',
        left: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c}次下载'
    },
    legend: {
        type: 'scroll',
        orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20,
        data: data.legendData,

        selected: data.selected
    },
    series: [
        {
            name: '',
            type: 'pie',
            radius: '55%',
            center: ['40%', '50%'],
            data: data.seriesData,
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
});
        
    }
  }
}
</script>
 