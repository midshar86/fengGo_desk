<template>
  <!-- 使用tinyMCE富文本编辑器插件 -->
  <Editor
    api-key="iekxgwtsr4sdc55fhsqvynvhc950fqs6n92whakvy40cg5h5"
    ref="editor"
    v-model="inputValue"
    :init="{
      plugins: 'lists link image table code  wordcount',
      language: 'zh_CN',
      plugins: `preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media code codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount autosave`,
      toolbar: `fullscreen undo redo restoredraft cut copy paste pastetext  forecolor backcolor bold italic underline strikethrough link anchor  alignleft aligncenter alignright alignjustify outdent indent  
                styleselect formatselect fontselect fontsizeselect  bullist numlist  blockquote subscript superscript removeformat 
                table image media charmap hr pagebreak insertdatetime print preview  code selectall searchreplace visualblocks  indent2em lineheight formatpainter axupimgs`,
      paste_data_images: true,
      height: '80vh',
      placeholder: '在这里输入文本内容...'
    }"
  />
  <el-button type="primary" @click="getInput">点击获取文本</el-button>
</template>

<script>
import { ElMessage } from 'element-plus'
import Editor from '@tinymce/tinymce-vue'
export default {
  data() {
    return {
      inputValue: ''
    }
  },
  components: {
    Editor
  },
  methods: {
    // 通过tinyMCE实例上的方法获取输入的纯文本
    getInput() {
      const inputContent = this.$refs.editor.getEditor().getContent({ format: 'text' })
      ElMessage.info(`你输入的文本:` + inputContent)
      console.log(inputContent)
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  #sample {
    display: flex;
    flex-direction: column;
    place-items: center;
    width: 1000px;
  }
}
.el-button {
  margin-top: 15px;
}
</style>
