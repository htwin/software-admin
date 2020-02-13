<template>
  <div>
    <div style="margin-top:20px;margin-left:20px">
      <router-link to="/soft/add">
        <el-button type="primary" size="mini">添加软件</el-button>
      </router-link>
      <a href="#/soft/add"></a>
    </div>
    <div>
      <el-table
        :data="softList.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="软件ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="软件名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="是否热门">
                <span>{{ props.row.ishot==1?"是":"否" }}</span>
              </el-form-item>
              <el-form-item label="软件评分">
                <span>{{ props.row.score }}</span>
              </el-form-item>
              <el-form-item label="软件下载数">
                <span>{{ props.row.download }}</span>
              </el-form-item>
              <el-form-item label="软件点赞数">
                <span>{{ props.row.thumb }}</span>
              </el-form-item>
              <el-form-item label="软件评论数">
                <span>{{ props.row.comment }}</span>
              </el-form-item>
              <el-form-item>
                
                <!-- 后面优化 -->

                <a :href="'#/tutorial/add?softwareId='+props.row.id"><el-button v-if="props.row.hasTutorial==0" size="small" plain> <el-link>添加教程</el-link></el-button></a>
           
              </el-form-item>

            </el-form>
          </template>
        </el-table-column>

        <el-table-column v-for="info in rightHeader" :key="info.key" 
          :property="info.key"
          :label="info.label"
         >
             <template slot-scope="scope" >
               <span v-if="scope.column.property.indexOf('time')!=-1">
                  {{scope.row[scope.column.property]|formatDate}}
               </span>
               <span v-if="scope.column.property.indexOf('time')==-1&&scope.column.property!='pic'">
                  {{scope.row[scope.column.property]}}
               </span>
               <img v-if="scope.column.property=='pic'" width="150px" height="100px" :src="scope.row[scope.column.property]"/>
                 
              </template>
              
          </el-table-column>

        <!-- <el-table-column label="id" prop="id"></el-table-column>
        <el-table-column label="软件名称" prop="name"></el-table-column>
        <el-table-column label="软件图片" prop="pic"></el-table-column>
        <el-table-column label="创建时间" prop="createtime"></el-table-column>
        <el-table-column label="修改时间" prop="updatetime"></el-table-column> -->
        <el-table-column>
          <template slot="header" slot-scope="scope">
            <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
          </template>
          <template slot-scope="scope">
             <router-link :to="'/soft/add?id='+scope.row.id">
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
import softApi from "@/api/soft"
import { formatDate } from '@/utils/date.js'
export default {
  data() {
    return {
      page: 1,
      size: 5,
      total: 17,
      dialogFormVisible: false,
      classify: {},
      form: {},
      
      rightHeader: [
        {
          label: 'ID',
          key: 'id'
        },
        {
          label: '软件名称',
          key: 'name'
        },
         {
          label: '软件图片',
          key: 'pic'
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
      softList:[]
    };
  },
  created(){
    softApi.search(this.page,this.size,{}).then(res=>{
    
      this.softList = res.data.data.rows;
      this.total = res.data.data.total;
      
    })
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
  methods: {

    changePage(page){
      console.log(page)
      softApi.search(page,this.size,{}).then(res=>{
    
      this.softList = res.data.data.rows;
      this.total = res.data.data.total;
      
    })
    },

    prevPage(){
      this.page = this.page - 1
       softApi.search(this.page,this.size,{}).then(res=>{
    
      this.softList = res.data.data.rows;
      this.total = res.data.data.total;
      
    })
    },
    nextPage(){
      this.page = this.page + 1
      softApi.search(this.page,this.size,{}).then(res=>{
    
      this.softList = res.data.data.rows;
      this.total = res.data.data.total;
      
    })
    },
    handleDelete(id) {

this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           softApi.deleteById(id).then(res=>{
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
<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
