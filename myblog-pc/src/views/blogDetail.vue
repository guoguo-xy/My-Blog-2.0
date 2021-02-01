<template>
<div class="bg">
  <common-header />
    <div class="container">
    <div class="blog">
      <div class="blog-title">
        <h3>{{ blog.title }}</h3>
        <span>{{ blog.post_time }}</span>
      </div>
      <article class="blog-content">{{ blog.content }}</article>
      <div class="comments">
         <el-divider></el-divider>
        <h3>评论📃:</h3>
        <el-timeline>
            <div class="comment"
          v-for="item in blog.comments"
          :key="item.comm_id">
              <el-timeline-item placement="top">
                <el-card>
                  <div class="comment-content">{{ item.comm_content }}</div>
                  <div class="comment-info">
                    <span class="userinfo">{{ item.username }}</span>
                    <span class="post-time">{{ item.comm_post_time }}</span>
                  </div>
                </el-card>
              </el-timeline-item>
            </div>
          </el-timeline>
         <el-divider></el-divider>
        <div class="add-comment">
          <el-input class="add-info" placeholder="请输入内容" v-model="inpVal" clearable></el-input>
          <el-button class="add-btn" @click="addComm()" type="primary" plain>添加评论</el-button>
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
      blog: "",
      inpVal: "",
    };
  },
  created() {
    this.getBlogDetail();
    console.log(this.$store.state.loginUser);
  },
  methods: {
    getBlogDetail() {
      let blogId = this.$route.params.blogId;
      this.$http
        .get("/blog/detail/", {
          params: {
            blogId: blogId,
          },
        })
        .then((res) => {
          let { state, blog } = res.data;
          if (state == "success") {
            this.blog = blog;
          }
        });
    },
    addComm() {
      console.log(this.blog);
      this.$http
        .post("/blog/addComm", {
          inpVal: this.inpVal,
          blogId: this.blog.blog_id,
          userId: JSON.parse(localStorage.getItem("user")).user_id
        })
        .then((res) => {
          let {state}=res.data
          if(state=='success'){
            this.getBlogDetail()
          }
        });
    },
  },
};
</script>

<style scoped>
.bg{
  background-image: url(../assets/index.jpg);
  background-size:100%;
  background-attachment:fixed
}
.blog {
  width: 1000px;
  margin: 20px auto;
  padding: 20px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-radius: 5px;
}

.blog-title {
  padding: 10px;
  text-align: center;
  /* border-bottom: 1px solid #000; */
}

.blog-content {
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

.comment-title {
  padding: 10px;
  margin-bottom: 5px;
  position: relative;
}

.comment {
  padding: 20px;
  margin-bottom: 5px;
}

.comment-info {
  float: right;
}

.userinfo {
  padding-right: 5px;
}
.add-comment {
  padding: 10px;
}
.add-info {
  border-radius: 2px;
  width: 850px;
  height: 30px;
  line-height: 30px;
}
.add-btn {
  margin:  0 15px;
}
</style>
