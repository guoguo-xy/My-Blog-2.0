<template>
  <div>
    <common-header />
    <el-container>
  <el-aside width="300px">
    <div class="user-info"> 
      <h3 class="">我的信息:</h3>
          <div class="username">用户名：<h4>{{ this.user.username }}</h4></div>
          <div class="user-id">用户ID：<h4>{{ this.user.user_id }}</h4></div>
          <div class="nickname">昵称：<h4>{{ this.user.nickname }}</h4></div>
        </div>
        <div>
          <el-button @click="logout" class="right" type="danger" plain
            >退出登陆</el-button
          >
        </div>
  </el-aside>
  <el-container>
    
    <el-header><h3 class="comm-title">我发表的评论</h3></el-header>
    <el-main>
      <div class="user-comms"> 
          <el-timeline>
            <div class="comment" v-for="item in commList" :key="item.comm_id">
              <el-timeline-item placement="top">
                <el-card>
                  <div class="comment-content">{{ item.content }}</div>
                  <div class="comment-info right">
                    <router-link :to="{ path: '/blog/detail/' + item.blog_id }"
                      >博客ID:{{ item.blog_id }}</router-link
                    >
                    <span class="post-time"
                      >发表时间：{{ item.post_time }}</span
                    >
                  </div>
                </el-card>
              </el-timeline-item>
            </div>
          </el-timeline>
        </div>
        </el-main>
     
  </el-container>
</el-container>
    <div class="container">
      <div class="user">
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
      user: {},
      commList: [],
    };
  },
  created() {
    let user = JSON.parse(localStorage.getItem("user"));
    this.user = user;
    this.getUserCommList();
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      alert("退出登录，即将返回登录页面...");
      this.$router.push("/login");
    },
    getUserCommList() {
      this.$http
        .get("/blog/getUserComms", {
          params: {
            userId: this.user.user_id,
          },
        })
        .then((res) => {
          let { state, comms } = res.data;
          console.log(state);
          if (state == "success") {
            this.commList = comms;
            console.log(this.commList);
          }
        });
    },
  },
};
</script>
<style scoped>
.user {
  width: 1000px;
  /* height: 400px; */

  padding: 20px 0;
  margin: 10px auto;
  font-size: 20px;
}

.user-comms{
  
  padding:10px;
  margin: 10px;
} 

.user-info {
  
  padding:10px;
  margin: 80px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
} 
.username,
.user-id,
.nickname {
  padding: 10px;
}
.blog-list {
  width: 815px;
  margin: 20px auto;
}
.blog-title,
.post-time {
  margin: 20px 0;
}
.right {
  float: right;
  margin: 10px;
}

.comment {
  margin: 5px;
}
.comment-info {
  margin: 5px auto;
}
.post-time {
  margin-left: 10px;
}
.comm-title{
  margin: 20px;
  
}
</style>