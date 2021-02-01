<template>
  <div>
    <common-header />
    <div class="container">
      <div class="body">
        <div class="inp-body">
          <h3 class="inp-title">查询文章</h3>
          <el-input class="inp-info" placeholder="请输入内容" v-model="inpVal" clearable></el-input>
          <el-button type="primary" @click="doSerach" icon="el-icon-search">查询</el-button>
        </div>
        <h4>查询结果：</h4>
        <div class="blog-list">
          <div class="blog" v-for="item in blogList" :key="item.blog_id">
            <p class="right">🌙</p>
            <h3 class="blog-title">
              <router-link :to="{ path: '/blog/detail/' + item.blog_id }">{{
                item.title
              }}</router-link>
            </h3>
            <span class="post-time">{{ item.post_time }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CommonHeader from "../components/CommonHeader.vue";
export default {
  components: { CommonHeader },
  data() {
    return {
      inpVal: "",
      blogList: [],
    };
  },
  methods: {
    doSerach() {
      console.log(this.inpVal);
      this.$http
        .post("/blog/serBlogs", {
          inpVal: this.inpVal,
        })
        .then((res) => {
          let { state, blogs } = res.data;
          console.log(state);
          if (state == "success") {
            this.blogList = blogs;
          } else if (state == "fail") {
            alert("没有符合条件的文章！");
          }
        });
    },
  },
};
</script>
<style scoped>
.body {
  /* text-align: center; */
  margin: 30px auto;
  padding: 20px;
}
.inp-body {
  margin-bottom: 10px;
}
.inp-title {
  text-align: center;
  margin-bottom: 20px;
}
.inp-info{
  width: 1050px;
  margin-right: 20px;
}
.blog-list {
  width: 815px;
  margin: 20px auto;
}
.blog {
  background: rgba(254, 255, 216, 0.9);
  padding: 20px;
  margin: 20px 0;
}
.blog-title,
.blog-content,
.username,
.post-time {
  margin: 20px 0;
}
.right {
  float: right;
}
</style>