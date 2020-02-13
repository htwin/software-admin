<template>
<div style="padding-left:20px">
    <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="各学院数据" name="first">
        <div id="myChart" :style="{width: '800px', height: '400px'}"></div>
    </el-tab-pane>
    <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
    <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
    <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
  </el-tabs>
</div>

  
</template>
<script>

export default {
  name: 'hello',
  data () { 
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted(){
    this.drawLine();
  },
  methods: {
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
            title: { text: '各学院软件下载数' },
            tooltip: {},
            xAxis: {
                data: ["信息工程学院","外国语学院","生物学院","资环学院","文学院","数理学院"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });
    }
  }
}
</script>
 