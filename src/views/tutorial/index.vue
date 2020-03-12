<template>
  <div>
    <div style="margin-top:20px;margin-left:20px">
      <router-link to="/tutorial/add">
        <el-button type="primary" size="mini">添加教程</el-button>
      </router-link>
      
    </div>
    <div>
      <el-table
        :data="tutorialList.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
      >
       <el-table-column v-for="info in rightHeader" :key="info.key" 
          :property="info.key"
          :label="info.label"
         >
             <template slot-scope="scope" >
               <span v-if="scope.column.property.indexOf('time')!=-1">
                  {{scope.row[scope.column.property]|formatDate}}
               </span>
               <span v-if="scope.column.property.indexOf('time')==-1">
                  {{scope.row[scope.column.property]}}
               </span>
               
                 
              </template>
              
          </el-table-column>
        <el-table-column>
          <template slot="header" slot-scope="scope">
            <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
          </template>
          <template slot-scope="scope">
            <!-- 后面优化 -->
            
              <router-link :to="'/tutorial/add?id='+scope.row.id">
         <el-button size="mini">编辑</el-button>
      </router-link>
          
           
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
     
    </div>
   <div style="text-align:center;margin-top:10px">
      <el-pagination background layout="prev, pager, next" :current-page.sync="page" @current-change="changePage" @prev-click="prevPage()" @next-click="nextPage()" :page-size="size" :total="total"></el-pagination>
    </div>
  </div>
  
</template>
<script>
import tutorialApi from "@/api/tutorial"
import { formatDate } from '@/utils/date.js'
export default {
  data() {
    return {
      page:1,
      size:10,
      total:0,
      dialogFormVisible: false,
      classify:{},
      form:{},
      rightHeader: [
        {
          label: 'ID',
          key: 'id'
        },
        {
          label: '所属软件',
          key: 'softName'
        },
        {
          label: '创建时间',
          key: 'createtime'
        },
        {
          label: '修改时间',
          key: 'updatetime'
        }
      ],
      search: "",
      tutorialList:[]
    };
  },
   filters: {
   /*
    时间格式自定义 只需把字符串里面的改成自己所需的格式
   */ 
 
   formatDate(time) {
    var date = new Date(time);
    return formatDate(date, 'yyyy-MM-dd hh:mm:ss'); 
   },
  
  },
  created(){
    tutorialApi.search(this.page,this.size,{}).then(res=>{
      console.log(res.data)
      this.tutorialList = res.data.data.rows;
      this.total = res.data.data.total;
      
    })
  },
  methods: {
    changePage(page){
      console.log(page)
      tutorialApi.search(page,this.size,{}).then(res=>{
    
      this.tutorialList = res.data.data.rows;
      this.total = res.data.data.total;
      
    })
    },

    prevPage(){
      this.page = this.page - 1
       tutorialApi.search(this.page,this.size,{}).then(res=>{
    
      this.tutorialList = res.data.data.rows;
      this.total = res.data.data.total;
      
    })
    },
    nextPage(){
      this.page = this.page + 1
      tutorialApi.search(this.page,this.size,{}).then(res=>{
    
      this.tutorialList = res.data.data.rows;
      this.total = res.data.data.total;
      
    })
    },
    handleEdit(id) {
      this.dialogFormVisible=true;
      console.log(id);
    },
    handleDelete(id) {

this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           tutorialApi.deleteById(id).then(res=>{
             console.log(res.data)
        if(res.data.success){
          this.$message({
            type:"info",
            message:"删除成功"
          })
          this.$router.go(0);
        }else{
          this.$message({
            type:"error",
            message:"删除失败，请稍后再试！！！"
          })
        }
      })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });


     
    },
    
  }
};
</script>
