<template>
  <div class="app-container">
    <el-form ref="soft" :model="form" label-width="120px">
      <el-form-item label="软件名称">
        <el-input v-model="soft.name" style="width:300px" />
      </el-form-item>
      <el-form-item label="软件类别">
        <el-select v-model="soft.classifyId" placeholder="请选择分类">
          <el-option label="视频剪辑" value="1" />
          <el-option label="娱乐办公" value="2" />
        </el-select>
      </el-form-item>

      <el-form-item style="width:500px">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          list-type="picture"
        >
          <el-button size="small" type="primary">上传软件图片</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>

      <el-form-item style="width:500px">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreviewFile"
          :on-remove="handleRemoveFile"
          :before-remove="beforeRemoveFile"
          multiple
          :limit="1"
          :on-exceed="handleExceed"
          :file-list="fileList2"
        >
          <el-button size="small" type="primary">上传软件</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item>
        软件介绍---富文本编辑器
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ],
      fileList2: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ],
      soft: {
        name: "",
        classifyId: ""
      }
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleRemoveFile(file, fileList) {
      console.log(file, fileList);
    },
    handlePreviewFile(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemoveFile(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  },
  onSubmit() {
    this.$message("submit!");
  },
  onCancel() {
    this.$message({
      message: "取消!",
      type: "warning"
    });
  }
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

