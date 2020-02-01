<template>
  <div class="app-container">
    <el-form ref="soft" :model="soft" label-width="120px">
      <el-form-item label="软件名称">
        <el-input v-model="soft.name" style="width:300px" />
      </el-form-item>
      <el-form-item label="软件类别">
        <el-select v-model="soft.classifyId" placeholder="请选择分类">
          <el-option :label="item.name" :value="item.id" v-for="(item,index) in classifyList" :key="index" />
        </el-select>
      </el-form-item>

      <el-form-item style="width:500px">
        <el-upload
          class="upload-demo"
          action="http://localhost:9000/soft/soft/uploadPic"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="picList"
          list-type="picture"
          :limit="1"
          :on-success="handleSuccessPic"
        >
          <el-button size="small" type="primary">上传软件图片</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>

      <el-form-item style="width:500px">
        <el-upload
          class="upload-demo"
          action="http://localhost:9000/soft/soft/uploadFile"
          :on-preview="handlePreviewFile"
          :on-remove="handleRemoveFile"
          :before-remove="beforeRemoveFile"
          multiple
          :limit="1"
          :on-exceed="handleExceed"
          :file-list="fileList"
          :on-success="handleSuccessFile"
        >
          <el-button size="small" type="primary">上传软件</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="软件介绍"> 
         <!-- <el-input type="textarea" v-model="soft.introduction" style="width:600px"></el-input> -->
        

         
         <quill-editor 
            v-model="soft.introduction" 
            ref="myQuillEditor" 
            :options="editorOption" 
           
            @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
            @change="onEditorChange($event)">
        </quill-editor>
       
      </el-form-item>
      <el-form-item>
        <el-button plain @click="doCommit()">保存</el-button>
        </el-form-item> 
    </el-form>
  </div>
</template>

<script>
import classifyApi from "@/api/classify"
import softApi from "@/api/soft"
export default {
  name: 'App',
  data() {
    
    return {
      editorOption: {
        theme:'snow'
      },
      picList: [],
      fileList: [],
      soft: {},
      classifyList:[]
    };
  },
  
  computed: {
        editor() {
            return this.$refs.myQuillEditor.quill;
        },
    },
  created(){
    this.soft.id = this.$route.query.id;
    if(this.soft.id != undefined){
      softApi.findById(this.soft.id).then(res=>{
       
        this.soft = res.data.data
         console.log("soft:"+this.soft.name)
      })
    }
    classifyApi.list().then(res=>{
      console.log(res.data.data)
      this.classifyList = res.data.data
    })


  },
  methods: {
    onContentChange (val) {
      this.editorTextCopy = val;
      console.log(this.editorTextCopy)
    },
    afterChange () {
    },
    handleSuccessFile(response, file, fileList){
      this.soft.url = response.data.url
    },
    handleSuccessPic(response, file, fileList){
      
      this.soft.pic = response.data.url
      console.log(this.soft.pic)
    },
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
    },
    doCommit(){
      console.log(this.soft)
      softApi.add(this.soft).then(res=>{
        if(res.data.success){
          this.$message({
            type:"info",
            message:"保存成功"
          })
           this.soft={};
        }else{
          this.$message({
            type:"error",
            message:"保存失败，请稍后再试！！"
          })
        }
      })
      
    },
    onEditorReady(editor) { // 准备编辑器
        },
        onEditorBlur(){}, // 失去焦点事件
        onEditorFocus(){}, // 获得焦点事件
        onEditorChange(){}, // 内容改变事件
        saveHtml:function(event){
          alert(this.content);
        }
  }
};
</script>

<style scoped>
.line {
  text-align: center;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

