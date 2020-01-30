<template>
  <div>
    <div style="margin-top:20px;margin-left:20px">
      <el-button type="primary" size="mini" @click="handleAdd()">添加用户</el-button>
    </div>
    <div>
      <el-table
        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
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
            <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="新增|编辑用户" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="学号" label-width="100px">
            <el-input v-model="form.account" autocomplete="off" style="width:200px"></el-input>
          </el-form-item>
          <el-form-item label="姓名" label-width="100px">
            <el-input v-model="form.name" autocomplete="off" style="width:200px"></el-input>
          </el-form-item>
          <el-form-item label="密码" label-width="100px">
            <el-input v-model="form.password" type="password" style="width:200px"></el-input>
          </el-form-item>
          <el-form-item label="性别" label-width="100px">
            <el-radio v-model="form.sex" label="1">男</el-radio>
            <el-radio v-model="form.sex" label="2">女</el-radio>
          </el-form-item>
          <el-form-item label="年龄" label-width="100px">
            <el-input-number v-model="form.age" @change="handleChange" :min="1" :max="200" label="描述文字"></el-input-number>
          </el-form-item> 
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">添加</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      classify: {},
      form: {},
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
      search: ""
    };
  },
  methods: {
    handleEdit(id) {
      this.dialogFormVisible = true;
      console.log(id);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleAdd() {
      this.dialogFormVisible = true;
    }
  }
}
</script>
 