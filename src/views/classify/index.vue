<template>
  <div>
    <div style="margin-top:20px;margin-left:20px">
      <el-button type="primary" size="mini" @click="handleAdd()">新增</el-button>
    </div>
    <div>
      <el-table
        :data="classifyList.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
      >
        <el-table-column label="id" prop="id"></el-table-column>
        <el-table-column label="类别名称" prop="name"></el-table-column>
        <el-table-column label="创建时间" prop="createtime"></el-table-column>
        <el-table-column label="修改时间" prop="updatetime"></el-table-column>
        <el-table-column>
          <template slot="header" slot-scope="scope">
            <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
          </template>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
       <el-dialog title="新增|编辑类别" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="类别名称" label-width="100px">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSave()">保存</el-button>
      </div>
    </el-dialog>
    </div>
   
  </div>
  
</template>
<script>
import classifyApi from "@/api/classify"
export default {
  data() {
    return {
      dialogFormVisible: false,
      classify:{},
      form:{},
      tableData: [
        {
          id: "1",
          name: "王小黄",
          createtime: "2016-05-02",
          updatetime: "2016-05-02"
        },
        {
          id: "123",
          name: "王小黄",
          createtime: "2016-05-02",
          updatetime: "2016-05-02"
        }
      ],
      search: "",
      classifyList:[]
    };
  },
  created(){
    classifyApi.list().then(res=>{
      console.log(res.data.data)
      this.classifyList = res.data.data
    })
  },
  methods: {
    handleSave(){
      classifyApi.save(this.form).then(res=>{
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
            type:"info",
            message:"保存失败，请稍后再试！！！"
          })
        }
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
           classifyApi.deleteById(id).then(res=>{
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
    handleAdd(){
     this.dialogFormVisible=true;
    }
  }
};
</script>
