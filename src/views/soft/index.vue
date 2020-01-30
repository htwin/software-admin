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
        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
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
                <el-button size="small" plain>查看软件详情</el-button>
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
            <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="text-align:center;margin-top:10px">
      <el-pagination background layout="prev, pager, next" page-size="10" :total="total"></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      total: 50,
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
    handleAdd() {}
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
