<template>
  <div>
    <div style="margin-top:20px;margin-left:20px">
      <el-button plain size="mini" @click="handleAdd()">添加门店</el-button>
      
      <el-input v-model="searchEntity.name" size="mini" style="width:200px" placeholder="请输入门店名称"></el-input>
      <el-button size="mini" type="primary" icon="el-icon-search">搜索</el-button>
    </div>
    <div>
     
      <el-dialog :title="'添加门店'" :visible.sync="dialogFormVisible">
        <el-form :model="store">
          <el-form-item label="门店名称" label-width="100px">
            <el-input v-model="store.name" autocomplete="off" style="width:200px"></el-input>
          </el-form-item>
          <el-form-item label="城市" label-width="100px">
            <el-select v-model="store.cityId" placeholder="请选择" @change="changeCity">
              <el-option
                v-for="item in cityList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="区/县" label-width="100px">
            <el-select v-model="store.countyId" placeholder="请选择" @change="changeCounty">
              <el-option
                v-for="item in countyList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="详细地址" label-width="100px">
            <el-input v-model="store.address" autocomplete="off" style="width:200px"></el-input>
          </el-form-item>
           <el-form-item label="电话" label-width="100px">
            <el-input v-model="store.telephone" autocomplete="off" style="width:200px"></el-input>
          </el-form-item>
           <el-form-item label="服务时间" label-width="100px">
            <el-input v-model="store.businessHours" autocomplete="off" style="width:200px"></el-input>
          </el-form-item>
          
          <el-form-item label="门店图片" label-width="100px">
            <!-- <el-input v-model="store.img" autocomplete="off" style="width:200px"></el-input> -->

            <el-upload
              class="avatar-uploader"
              action="http://127.0.0.1:9000/store/uploadImg"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="store.img" :src="baseUrl+store.img" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
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
import storeApi from "@/api/store";
import countyApi from "@/api/county";
import cityApi from "@/api/city";
import { formatDate } from "@/utils/date.js";
import { Loading } from "element-ui";
export default {
  data() {
    return {
     // baseUrl: "http://health.htjava.top",
     baseUrl:"http://127.0.0.1",
      page: 1,
      size: 5,
      total: 0,
      dialogFormVisible: false,
      store: {},
      searchEntity: {},
      loading: {},
      storeList: [],//门店列表
      countyList:[],//区县列表
      search: "",
      page: 1,
      size: 5,
      total: 0,
      cityList:[],
      city:{},//当前选择的城市对象
      county:{},//当前选择的区县对象
    };
  },

  created() {},
  mounted() {
    
    this.getCityList();//获取城市列表



    this.getStoreList();
  },
  methods: {

    //城市改变后触发
    changeCity(cityId){
      //首先清空 区县列表
      this.countyList = [];
    
      //根据城市id 获取到当前选择的城市对象
       var city  = this.cityList.find((item)=>{
          return item.id === cityId;
      });
      this.city = city;

      //根据城市id  查询区/县
      this.getCountyListByCityId(cityId);
    },

    //区县改变后触发
    changeCounty(countyId){
      console.log(countyId)
        var county = this.countyList.find((item)=>{
          return item.id === countyId;
        })
        this.county = county;
        console.log(this.county)
    },
    /**
     * 根据城市 id 获取区县列表
     */
    getCountyListByCityId(cityId){
        countyApi.getcountyListByCityId(cityId).then(res=>{
           if (res.data.success) {
            this.countyList = res.data.data;
          }else{

          }
        })
    },
    getCityList(){
      cityApi.cityAllList().then(res=>{
        if (res.data.success) {
          this.cityList = res.data.data;
        }
      })
    },
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
          storeApi.deleteById(id).then(res => {
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

      console.log(this.store)

      // storeApi.save(this.store).then(res => {
      //   if (res.data.success) {
      //     this.$message({
      //       type: "info",
      //       message: "保存成功"
      //     });
      //     this.dialogFormVisible = false;
      //     this.$router.go(0);
      //     // this.classifyList.push(res.data.data) 后台没有返回数据
      //     // console.log(res.data.data)
      //   } else {
      //     this.$message({
      //       type: "error",
      //       message: "保存失败，请稍后再试！！！"
      //     });
      //   }
      // });
    },
    /**
     * 添加新员工
     */
    handleAdd() {
      this.dialogFormVisible = true;
      this.store = {};
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

    
    handleSizeChange(size) {
      this.size = size;
      this.getstoreList();
    },
    /**
     * 选择指定页码
     */
    changePage(page) {
      this.page = page;
      this.getstoreList();
    },
    /**
     * 上一页
     */
    prevPage() {
      this.page = this.page - 1;
      this.getstoreList();
    },

    /**
     * 下一页
     */
    nextPage() {
      this.page = this.page + 1;
      this.getstoreList();
    },

    handleAvatarSuccess(res, file) {
     console.log(res)
      if(res.success){
        this.store.img = res.data
      }else{

      }
      console.log(this.store.img)
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
 