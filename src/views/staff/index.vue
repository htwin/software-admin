<template>
  <div>
    <div style="margin-top:20px;margin-left:20px">
      <el-button plain size="mini" @click="handleAdd()">添加新员工</el-button>
      <el-select
        size="mini"
        clearable
        v-model="searchEntity.collegeId"
        @clear="clearChange()"
        @change="changeStore(searchEntity.storeId)"
        placeholder="选择门店"
      >
        <el-option v-for="item in storeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <el-input v-model="searchEntity.name" size="mini" style="width:200px" placeholder="请输入员工姓名"></el-input>
      <el-button size="mini" type="primary" icon="el-icon-search">搜索</el-button>
    </div>
    <div>
      <el-table :data="staffList" border style="width: 100%">
        <el-table-column fixed prop="name" label="员工姓名" width="150"></el-table-column>
        <el-table-column prop="storeName" label="所属门店" width="200"></el-table-column>
        <el-table-column label="头像" width="100">
          <template slot-scope="scope">
            <img width="90" height="90" :src="baseUrl+scope.row.img" />
          </template>
        </el-table-column>
        <el-table-column prop="score" label="评分" width="120"></el-table-column>
        <el-table-column prop="introduction" label="简介" width="600"></el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button @click="handleDelete(scope.row.id)" type="text" size="small">删除</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog :title="staff.id == undefined?'添加用户':'编辑用户'" :visible.sync="dialogFormVisible">
        <el-form :model="staff">
          <el-form-item label="所属门店" label-width="100px">
            <el-select v-model="staff.storeId" placeholder="请选择">
              <el-option
                v-for="item in storeList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="员工姓名" label-width="100px">
            <el-input v-model="staff.name" autocomplete="off" style="width:200px"></el-input>
          </el-form-item>
          <el-form-item label="头像" label-width="100px">
            <!-- <el-input v-model="staff.img" autocomplete="off" style="width:200px"></el-input> -->

            <el-upload
              class="avatar-uploader"
              action="http://47.102.120.6:9000/healthCareProvider/uploadImg"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="staff.img" :src="baseUrl+staff.img" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="简介" label-width="100px">
            <el-input v-model="staff.introduction"  type="textarea" style="width:400px"></el-input>
          
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
        @size-change="handleSizeChange"
        @current-change="changePage"
        :current-page.sync="page"
        @prev-click="prevPage()"
        @next-click="nextPage()"
        :page-sizes="[5, 10, 30, 100]"
        :page-size="size"
        layout="total, sizes, prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import staffApi from "@/api/staff";
import storeApi from "@/api/store";
import { formatDate } from "@/utils/date.js";
import { Loading } from "element-ui";
export default {
  data() {
    return {
      baseUrl: "http://health.htjava.top",
      page: 1,
      size: 5,
      total: 0,
      dialogFormVisible: false,
      staff: {},
      searchEntity: {},
      loading: {},
      collegeList: [],
      staffList: [],
      storeList: [],
      search: "",
      page: 1,
      size: 5,
      total: 0
    };
  },

  created() {},
  mounted() {
    this.getStaffList();
    this.getStoreList();
  },
  methods: {
    handleCancel() {
      this.dialogFormVisible = false;
      this.$router.go(0);
    },

    /**
     * 删除
     */
    handleDelete(id) {
      this.$confirm("此操作将永久删除该员工, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          staffApi.deleteById(id).then(res => {
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
    /**
     * 保存
     */
    handleSave() {
      staffApi.save(this.staff).then(res => {
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
    /**
     * 添加新员工
     */
    handleAdd() {
      this.dialogFormVisible = true;
      this.staff = {};
    },
    /**
     * 获取门店列表
     */
    getStoreList() {
      storeApi.storeAllList().then(res => {
        if (res.data.success) {
          this.storeList = res.data.data;
        }
      });
    },

    /**
     * 获取员工列表
     */
    getStaffList() {
      staffApi.staffList(this.page, this.size).then(res => {
        if (res.data.success) {
          this.staffList = res.data.data.rows;
          this.total = res.data.data.total;
          console.log(this.staffList.length);
        }
      });
    },
    handleSizeChange(size) {
      this.size = size;
      this.getStaffList();
    },
    /**
     * 选择指定页码
     */
    changePage(page) {
      this.page = page;
      this.getStaffList();
    },
    /**
     * 上一页
     */
    prevPage() {
      this.page = this.page - 1;
      this.getStaffList();
    },

    /**
     * 下一页
     */
    nextPage() {
      this.page = this.page + 1;
      this.getStaffList();
    },

    handleAvatarSuccess(res, file) {
     console.log(res)
      if(res.success){
        this.staff.img = res.data
      }else{

      }
      console.log(this.staff.img)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
 