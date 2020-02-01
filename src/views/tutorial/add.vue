<template>
  <div class="app-container">
    <el-form ref="tutorial" :model="tutorial" label-width="120px">
      <el-form-item label="所属软件" v-if="softwareId != undefined">
        <el-input v-model="tutorial.softName" :disabled="true" style="width:300px"></el-input>
      </el-form-item>
       <el-form-item label="所属软件" v-if="softwareId == undefined">
        <el-select v-model="tutorial.softwareId" placeholder="请选择">
          <el-option :label="item.name" :value="item.id" v-for="(item,index) in softList" :key="index"/>
        </el-select>
      </el-form-item>
      
      <el-form-item style="width:500px">
        <el-upload
          class="upload-demo"
          action="http://localhost:9000/soft/soft/uploadFile"
          multiple
          :limit="1"
          :before-upload="beforeUpload"
          :file-list="fileList"
          :on-success="handleSuccessFile"
        >
          <el-button size="small" type="primary">上传视频教程</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="教程文本内容"> 
        <quill-editor 
            v-model="tutorial.content" 
            ref="myQuillEditor" 
            :options="editorOption" 
            >
        </quill-editor>
      </el-form-item>
      
      <el-form-item>
        <el-button plain @click="doCommit()">保存</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
import tutorialApi from "@/api/tutorial"
import softApi from "@/api/soft"
export default {
  data() {
    return { 
      editorOption: {
        theme:'snow'
      },
      fileList: [],
      tutorial: {
        id:"",
        softName:""
      },
      softwareId:"",
      softList:[]
    };
  },
  computed: {
        editor() {
            return this.$refs.myQuillEditor.quill;
        },
    },
  created(){
    this.tutorial.id = this.$route.query.id;
    this.softwareId = this.$route.query.softwareId;
    //加载所属软件
    if(this.softwareId == undefined || this.softwareId == ""){
       softApi.findNoTutorial().then(res=>{
         if(res.data.success){
           this.softList = res.data.data
           console.log(this.softList)
         }
       })
    }else{
      //根据软件id查询软件
      softApi.findById(this.softwareId).then(res=>{
        this.tutorial.softwareId = res.data.data.id
        this.tutorial.softName = res.data.data.name
        console.log(this.tutorial.softName)
      })
    }

    if(this.tutorial.id != undefined){
      tutorialApi.findById(this.tutorial.id).then(res=>{
       
        this.tutorial = res.data.data
        console.log(res.data)
        
      })
    }

  },
  methods: {
    beforeUpload(file){
      //上传之前判断 -是否为MP4
      console.log("前"+file)
    },
    handleSuccessFile(response, file, fileList){
      this.tutorial.video = response.data.url
    },
    doCommit(){
      console.log(this.tutorial)
      tutorialApi.add(this.tutorial).then(res=>{
        console.log(res.data)
        if(res.data.success){
          this.$message({
            type:"info",
            message:"保存成功"
          })
           this.tutorial={};
        }else{
          this.$message({
            type:"error",
            message:res.data.message
          })
        }
      })
      
      console.log(this.tutorial)  
    }
  }
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

