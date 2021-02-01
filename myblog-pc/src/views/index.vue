<template>
<div id="bg">
  <common-header/>
  <div class="container">
    <div class="blog-list">
      <div class="blog" v-for="item in blogList" :key="item.blog_id">
        <p class="right">🌙</p>
        <h3 class="blog-title">
          <router-link :to="{ path: '/blog/detail/'+item.blog_id}">{{
            item.title
          }}</router-link>
        </h3>
        <span class="post-time">{{ item.post_time }}</span>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
import CommonHeader from '../components/CommonHeader.vue';
export default {
  components: { CommonHeader },
  data() {
    return {
      blogList: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$http
        .get("/blog/list")
        .then((res) => {
          let { state } = res.data;
          if (state == "auth-fail") {
            alert("请求未授权！");
          } else if (state == "success") {
            let { blogs } = res.data;
            this.blogList = blogs;
          }
        })
    },
    doAddBlog(){
       this.$router.push('/blog/addBlog');
    },
    doSerBlog(){
       this.$router.push('/blog/serBlog');
    }  
  },
};
</script>

<style scoped>
#bg{
  background-image: url(../assets/index.jpg);
  background-size:100%;
  background-attachment:fixed

}
.blog-list {
  width: 815px;
  margin: 20px auto;
}
.blog {
  background: rgba(254, 255, 216, 0.8);
  padding: 20px;
  margin: 20px 0;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.blog-title,
.blog-content,
.username,
.post-time {
  margin: 20px 0;
}

.right{
  float: right;
}


</style>