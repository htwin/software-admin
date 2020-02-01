<template>
  <div>
    <div style="margin-top:20px;margin-left:20px">
      <el-button type="primary" size="mini" @click="handleAdd()">添加用户</el-button>
    </div>
    <div>
      <el-table
        :data="userList.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
      >
        <el-table-column label="id" prop="id"></el-table-column>
        <el-table-column label="学号" prop="account"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="年龄" prop="age" width="100"></el-table-column>
        <el-table-column label="性别" prop="sex" width="100"></el-table-column>
        <el-table-column label="创建时间" prop="createtime"></el-table-column>
        <el-table-column label="修改时间" prop="updatetime"></el-table-column>
        <el-table-column>
          <template slot="header" slot-scope="scope">
            <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
          </template>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog :title="user.id == undefined?'添加用户':'编辑用户'" :visible.sync="dialogFormVisible">
        <el-form :model="user">
          <el-form-item label="学号" label-width="100px">
            <el-input v-model="user.account" autocomplete="off" style="width:200px"></el-input>
          </el-form-item>
          <el-form-item label="姓名" label-width="100px">
            <el-input v-model="user.name" autocomplete="off" style="width:200px"></el-input>
          </el-form-item>
          <el-form-item label="密码" label-width="100px">
            <el-input v-model="user.password" type="password" style="width:200px"></el-input>
          </el-form-item>
          <el-form-item label="性别" label-width="100px">
            <el-radio v-model="user.sex" :label="1">男</el-radio>
            <el-radio v-model="user.sex" :label="0">女</el-radio>
          </el-form-item>
          <el-form-item label="年龄" label-width="100px">
            <el-input-number v-model="user.age"  :min="1" :max="200" label="描述文字"></el-input-number>
          </el-form-item> 
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleCancel()">取 消</el-button>
          <el-button type="primary" @click="handleSave()">保存</el-button>
        </div>
      </el-dialog>
    </div>
    <div style="text-align:center;margin-top:10px">
      <el-pagination background layout="prev, pager, next" :current-page.sync="page" @current-change="changePage" @prev-click="prevPage()" @next-click="nextPage()" :page-size="size" :total="total"></el-pagination>
    </div>
  </div>
</template>
<script>
import userApi from "@/api/user"
export default {
  data() {
    return {
      page:1,
      size:10,
      total:0,
      dialogFormVisible: false,
      user: {},
      tableData: [
        {
          id: "1",
          account: "1618130214",
          name: "王小黄",
          age: 18,
          sex: 1,
          createtime: "2016-05-02",
          updatetime: "2016-05-02"
        },
        {
          id: "1",
          account: "1618130214",
          name: "王小黄",
          age: 18,
          sex: 1,
          createtime: "2016-05-02",
          updatetime: "2016-05-02"
        }
      ],
      search: "",
      userList:[]
    };
  },
  created(){
    userApi.search(this.page,this.size,{}).then(res=>{
      console.log(res.data)
      this.userList = res.data.data.rows;
      this.total = res.data.data.total;
      
    })
  },
  methods: {
    handleSave(){
      userApi.save(this.user).then(res=>{
          if(res.data.success){
          this.$message({
            type:"info",
            message:"保存成功"
          })
          this.dialogFormVisible = false
          this.$router.go(0);
         // this.classifyList.push(res.data.data) 后台没有返回数据
         // console.log(res.data.data)
        }else{
          this.$message({
            type:"error",
            message:"保存失败，请稍后再试！！！"
          })
        }
      })
    },
    changePage(page){
      console.log(page)
      userApi.search(page,this.size,{}).then(res=>{
    
      this.userList = res.data.data.rows;
      this.total = res.data.data.total;
      
    })
    },

    prevPage(){
      this.page = this.page - 1
       userApi.search(this.page,this.size,{}).then(res=>{
    
      this.userList = res.data.data.rows;
      this.total = res.data.data.total;
      
    })
    },
    nextPage(){
      this.page = this.page + 1
      userApi.search(this.page,this.size,{}).then(res=>{
    
      this.userList = res.data.data.rows;
      this.total = res.data.data.total;
      
    })
    },

    handleEdit(entity) {
      this.user = entity;
      this.dialogFormVisible = true;
      console.log(this.user)
    
    },
    handleDelete(id) {

this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           userApi.deleteById(id).then(res=>{
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
    handleCancel(){
      this.dialogFormVisible = false;
      this.$router.go(0)
    },
    handleAdd() {
      this.dialogFormVisible = true;
      this.user = {};
    }
  }
}
</script>
 