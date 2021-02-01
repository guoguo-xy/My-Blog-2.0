<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="文章标题">
        <el-input v-model="blogTitle" />
      </el-form-item>
      <el-form-item label="文章内容">
        <el-input v-model="blogContent" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      blogTitle: "",
      blogContent: "",
    }
  },
  methods: {
    onSubmit() {
      this.axios
        .post("http://localhost:3000/blog/addBlog", {
          blogTitle: this.blogTitle,
          blogContent: this.blogContent,
        })
        .then((res) => {
          console.log(res);
          this.$message('submit!')
        });
      
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

