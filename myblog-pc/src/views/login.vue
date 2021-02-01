<template>
  <div class="container">
    <div class="login-form">
      <h3>用户登录</h3>
      <div class="line">
       <h4 class="title">用户名：<el-input class="right" v-model="username" placeholder="请输入用户名"></el-input></h4> 
      </div>
      <div class="line">
        <h4 class="title">密码：<el-input class="right" v-model="password" placeholder="请输入密码"></el-input></h4> 
      </div>
      <p>
        <el-button class="btn" @click="doLogin" type="primary">登录</el-button>
      </p>
      <router-link :to="{ path: '/regist'}">没有账号？点击注册</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    doLogin() {
      this.$http
        .post("/user/login", {
          username: this.username,
          password: this.password,
        })
        .then((res) => {
          let{state, token, loginUser}=res.data;
          // console.log(loginUser);
          if(state=='success'){
            this.$store.dispatch('setToken',token);
            this.$store.commit('setUser',loginUser);
            this.$router.push('/');
          }else{
              alert('用户名或密码不正确！');
          }
        });
    },
  },
};
</script>

<style scoped>
.login-form {
  width: 650px;
  height: 320px;
  background: #cccccc;
  margin: 40px auto;
  padding: 20px 0;
  text-align: center;
  background: url(../assets/桃子.jpg);

  background-size: 100% ;

}
.login-form p {
  padding: 20px 0;
}

.btn {
  width: 70px;
}
.right{
  width: 400px;
}
/* .title{
  width: 100px;
} */
.line{
  padding: 30px;
}
</style>