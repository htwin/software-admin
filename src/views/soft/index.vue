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
                <el-button size="small" plain @Click="getTutorial(props.row.id)">查看详情</el-button>
                <el-button size="small" plain @Click="getTutorial(props.row.id)">添加教程</el-button>
           
              </el-form-item>

            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="id" prop="id"></el-table-column>
        <el-table-column label="软件名称" prop="name"></el-table-column>
        <el-table-column label="软件图片" prop="pic"></el-table-column>
        <el-table-column label="创建时间" prop="createtime"></el-table-column>
        <el-table-column label="修改时间" prop="updatetime"></el-table-column>
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
export default {
  data() {
    return {
      page: 1,
      size: 5,
      total: 17,
      dialogFormVisible: false,
      classify: {},
      form: {},
      tableData: [
        {
          id: "1",
          name: "王小黄",
          pic: "这是图片",
          score: 2.5,
          download: 5,
          thumb: 3,
          comment: 10,
          ishot: 1,
          createtime: "2016-05-02",
          updatetime: "2016-05-02"
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
