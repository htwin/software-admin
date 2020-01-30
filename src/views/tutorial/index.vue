<template>
  <div>
    <div style="margin-top:20px;margin-left:20px">
      <el-button type="primary" size="mini" @click="handleAdd()">添加教程</el-button>
    </div>
    <div>
      <el-table
        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
      >
        <el-table-column label="id" prop="id"></el-table-column>
        <el-table-column label="所属软件" prop="name"></el-table-column>
        <el-table-column label="创建时间" prop="createtime"></el-table-column>
        <el-table-column label="修改时间" prop="updatetime"></el-table-column>
        <el-table-column>
          <template slot="header" slot-scope="scope">
            <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
          </template>
          <template slot-scope="scope">
             <el-link type="primary">查看详情</el-link>
            <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
           
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
     
    </div>
   
  </div>
  
</template>
<script>
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
      search: ""
    };
  },
  methods: {
    handleEdit(id) {
      this.dialogFormVisible=true;
      console.log(id);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleAdd(){
     this.dialogFormVisible=true;
    }
  }
};
</script>
