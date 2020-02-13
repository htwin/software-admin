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
        <!-- <el-table-column label="id" prop="id"></el-table-column>
        <el-table-column label="类别名称" prop="name"></el-table-column>
        <el-table-column label="创建时间" prop="scope.row.id"></el-table-column>
        <el-table-column label="修改时间" prop="updatetime"></el-table-column> -->

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
          <template slot="header">
            <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
          </template>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>
       <el-dialog :title="classify.id==undefined?'增加类别':'编辑类别'" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="类别名称" label-width="100px">
          <el-input v-model="classify.name" autocomplete="off"></el-input>
        </el-form-item>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel()">取 消</el-button>
        <el-button type="primary" @click="handleSave()">保存</el-button>
      </div>
    </el-dialog>
    </div>
   
  </div>
  
</template>
<script>
import classifyApi from "@/api/classify"
 import { formatDate } from '@/utils/date.js'
export default {
  data() {
    return {
      dialogFormVisible: false,
      classify:{},
      form:{},
      search: "",
      classifyList:[],
      name:"123",
      rightHeader: [
        {
          label: 'ID',
          key: 'id'
        },
        {
          label: '类别名称',
          key: 'name'
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
    classifyApi.list().then(res=>{
      console.log(res.data.data)
      this.classifyList = res.data.data
    })
  },
  methods: {
    handleSave(){

      classifyApi.save(this.classify).then(res=>{
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
    handleEdit(entity) {
      this.classify = entity
      // this.classify.id = entity.id;
      // this.classify.name = entity.name;
      // this.classify.createtime = entity.createtime;
      // this.classify.updatetime = entity.updatetime;
      this.dialogFormVisible=true;
      console.log(this.classify.id)
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
      this.classify = {};
     this.dialogFormVisible=true;
    },
    handleCancel(){
     
     this.dialogFormVisible=false;
    this.$router.go(0);
    }
  }
};
</script>
