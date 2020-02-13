<template>
  <div>
    <div style="margin-top:20px;margin-left:20px">
      <el-button plain size="mini" @click="handleAdd()">添加用户</el-button>
      <el-select size="mini" clearable  v-model="user.collegeId" @clear="clearChange()"  @change="changeCollege(user.collegeId)" placeholder="选择学院">
              <el-option
                v-for="item in collegeList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
      </el-select>
    </div>
    <div>
      <el-table
        :data="userList.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
      >
        <el-table-column
          v-for="info in rightHeader"
          :key="info.key"
          :width="info.key.indexOf('time')!=-1||info.key=='collegeName'?'180':'100'"
          :property="info.key"
          :label="info.label"
        >
          <template slot-scope="scope">
            <span
              v-if="scope.column.property.indexOf('time')!=-1"
            >{{scope.row[scope.column.property]|formatDate}}</span>
            <span
              v-if="scope.column.property.indexOf('time')==-1&&scope.column.property.indexOf('sex')==-1"
            >{{scope.row[scope.column.property]}}</span>
            <span
              v-if="scope.column.property.indexOf('sex')!=-1"
            >{{scope.row[scope.column.property]=='1'?'男':'女'}}</span>
          </template>
        </el-table-column>
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
          <el-form-item label="所属学院" label-width="100px">
            <el-select v-model="user.collegeId" placeholder="请选择">
              <el-option
                v-for="item in collegeList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

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
            <el-input-number v-model="user.age" :min="1" :max="200" label="描述文字"></el-input-number>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleCancel()">取 消</el-button>
          <el-button type="primary" @click="handleSave()">保存</el-button>
        </div>
      </el-dialog>
    </div>
    <div style="text-align:center;margin-top:10px">
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page.sync="page"
        @current-change="changePage"
        @prev-click="prevPage()"
        @next-click="nextPage()"
        :page-size="size"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import userApi from "@/api/user";
import collegeApi from "@/api/college";
import { formatDate } from "@/utils/date.js";
export default {
  data() {
    return {
      page: 1,
      size: 5,
      total: 0,
      dialogFormVisible: false,
      user: {},
      collegeList:[],
      rightHeader: [
        {
          label: "学院",
          key: "collegeName"
        },
        {
          label: "学号",
          key: "account"
        },
        {
          label: "姓名",
          key: "name"
        },
        {
          label: "年龄",
          key: "age"
        },
        {
          label: "性别",
          key: "sex"
        },
        {
          label: "创建时间",
          key: "createtime"
        },
        {
          label: "修改时间",
          key: "updatetime"
        }
      ],
      search: "",
      userList: []
    };
  },
  filters: {
    /*
    时间格式自定义 只需把字符串里面的改成自己所需的格式
   */

    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    }
  },
  created() {
    userApi.search(this.page, this.size, {}).then(res => {
      console.log(res.data);
      this.userList = res.data.data.rows;
      this.total = res.data.data.total;
    });

     collegeApi.list().then(res=>{
        console.log(res.data);
        if(res.data.success){
          this.collegeList = res.data.data;
        }else{
          this.$message({
            type:"error",
            message:"加载学院失败，请稍后再试！！！"
          })
        }
       
      })
  },
  methods: {
    clearChange(){
      this.user = {}
     
    },
    changeCollege(collegeId){
      userApi.search(this.page, this.size, this.user).then(res => {
      console.log(res.data);
      this.userList = res.data.data.rows;
      this.total = res.data.data.total;
    });
      console.log(collegeId);
    },
    handleSave() {
      userApi.save(this.user).then(res => {
        if (res.data.success) {
          this.$message({
            type: "info",
            message: "保存成功"
          });
          this.dialogFormVisible = false;
          this.$router.go(0);
          // this.classifyList.push(res.data.data) 后台没有返回数据
          // console.log(res.data.data)
        } else {
          this.$message({
            type: "error",
            message: "保存失败，请稍后再试！！！"
          });
        }
      });
    },
    changePage(page) {
      console.log(page);
      userApi.search(page, this.size, this.user).then(res => {
        this.userList = res.data.data.rows;
        this.total = res.data.data.total;
      });
    },

    prevPage() {
      this.page = this.page - 1;
      userApi.search(this.page, this.size, this.user).then(res => {
        this.userList = res.data.data.rows;
        this.total = res.data.data.total;
      });
    },
    nextPage() {
      this.page = this.page + 1;
      userApi.search(this.page, this.size, this.user).then(res => {
        this.userList = res.data.data.rows;
        this.total = res.data.data.total;
      });
    },

    handleEdit(entity) {
      this.user = entity;
      this.dialogFormVisible = true;
      console.log(this.user);
    },
    handleDelete(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          userApi.deleteById(id).then(res => {
            console.log(res.data);
            if (res.data.success) {
              this.$message({
                type: "info",
                message: "删除成功"
              });
              this.$router.go(0);
            } else {
              this.$message({
                type: "error",
                message: "删除失败，请稍后再试！！！"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleCancel() {
      this.dialogFormVisible = false;
      this.$router.go(0);
    },
    handleAdd() {
      this.dialogFormVisible = true;
      this.user = {};
    }
  }
};
</script>
 