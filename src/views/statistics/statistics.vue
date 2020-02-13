<template>
<el-container>
  <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="1">
        <router-link to="/statistics/statistics/college?index=1">各学院数据</router-link>
    </el-menu-item>
    <el-menu-item index="2">
        <router-link to="/statistics/statistics/software?index=2">软件数据</router-link>
    </el-menu-item>
    </el-menu>
</el-header>
  <el-main>
      <router-view/>
  </el-main>
</el-container>
</template>
<script>
export default {
    data(){
        return {
            activeIndex: '1',
        }
    },
    mounted(){
        var index = this.$route.query.index;
       
        if(index != undefined){
            this.activeIndex = index;
        }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  
}
</script>