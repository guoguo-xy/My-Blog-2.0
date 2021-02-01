<template>
  <div class="header">
    <div class="header-info">
      <div class="title" @click="drawer = true">🎐GXYBlogs</div>
      <el-drawer
  title="作者介绍"
  :visible.sync="drawer"
  :direction="direction">
  <div class="admin-info">郭郭呀！</div>
  <div class="admin-info">哈尔滨理工大学</div>
  <div class="admin-info">hahahahahaha</div>
  <div class="img">
  </div>
</el-drawer>

      <a href="/">🏡首页</a>
      <a href="/blog/serBlog">🔎查询文章</a>
      <div class="login-box">
        <a v-if="this.user.nickname" href="/userInfo"
          >{{ this.user.nickname }}</a
        >
        <div v-else>
          <a  href="/login">登录</a> | <a href="/regist">注册</a>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
       drawer: false,
      direction: 'ltr',
      imgUrl:require("../assets/admin.gif")
    };
  },
  created() {
    let user = JSON.parse(localStorage.getItem("user"));
    this.user = user;
  },
  methods: {},
};
</script>

<style  scoped>
.header {
  height: 50px;
  width: 100%;
  background: rgba(255, 255, 255, 0.9);
  border-bottom: 1px solid rgb(112, 152, 238);
  min-width: 1060px;
}
.header-info {
  height: 50px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.fun{
  text-align: center;
  margin: 50px auto;
}
.admin-info{
  text-align: center;
  margin: 20px;
}
.img{
  background: url(../assets/admin.gif);
  background-size: 100%;
  height: 200px;
  width: 100%;
  text-align: center;
  margin-top: 100px;
}
</style>