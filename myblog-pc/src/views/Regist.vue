<template>
  <div class="container">
    <div class="regist-form">
      <h3>用户注册</h3>
      <div class="line">
       <h4 class="title">用户名：<el-input class="right" v-model="username" name="username" placeholder="请输入用户名"></el-input><span id="info">{{ info }}</span></h4> 
      </div>
      <div class="line">
        <h4 class="title">密码：<el-input class="right" v-model="password" placeholder="请输入密码"></el-input></h4> 
      </div>
      <div class="line">
        <h4 class="title">昵称：<el-input class="right" v-model="nickname" placeholder="请输入昵称"></el-input></h4>
      </div>
        <el-button id="btn-regist" @click="doRegist" type="primary">注册</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      inpVal: "",
      username: "",
      password: "",
      nickname: "",
      info: "",
    };
  },
  watch:{
    username: function onChange() {
      this.$http.get("/user/checkUser", {
        params: {
          inpVal:this.username
        },
      }).then((res) => {
        let { state } = res.data;
        console.log(res.data);
        if (state == "success") {
          this.info = "ok";
        } else if(state=='fail') {
          this.info = "用户名已存在";
        }
      });
    },
  },
  methods: {
    doRegist() {
      if(this.info=='ok'){
        this.$http
        .post("/user/regist", {
          username: this.username,
          password: this.password,
          nickname: this.nickname,
        })
        .then((res) => {
          let { state } = res.data;
          if (state == "success") {
            alert("注册成功！");
            this.$router.push("/login");
          } else {
            alert("注册失败");
          }
        });
      }else{
        alert('用户名已存在，请重新输入')
      } 
    },
  },
};
</script>

<style scoped>
.regist-form {
    background: url(../assets/向日葵.jpg);
border-radius: 5px;
  background-size: 100%;
  width: 650px;
  margin: 40px auto;
  padding: 20px 0;
  text-align: center;
}

#btn-regist {
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
