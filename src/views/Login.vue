<template>
    <div class="wrapper-login">
      <div class="from-wrapper">
          <h2><font size="5">系统登录</font></h2>
          <el-form :model="loginForm" :rules="fieldRules" ref="loginForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
              <el-form-item prop="account">
                  <el-input type="text" v-model="loginForm.account" auto-complete="off" placeholder="账号"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                  <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
              </el-form-item>
              <!-- <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox> -->
              <el-form-item style="width:100%;">
                <el-button type="primary" style="width:48%;" @click.native.prevent="reset">重 置</el-button>
                <el-button type="primary" style="width:48%;" @click.native.prevent="login" :loading="logining">登 录</el-button>
                <p class="login" @click="gotoLogin">还没有账号？<router-link :to="{name: 'Register'}">立即注册</router-link></p>
              </el-form-item>
          </el-form>
          <div class="footer-wrapper">
              M<span>o</span>ac | Ozone
          </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'Login',
    data() {
      return {
        logining: false,
        loginForm: {
          account: '', //admin
          password: '' //123456
        },
        fieldRules: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ]
        },
        checked: true
      };
    },
    methods: {
      login() {
        this.$router.push('/')  // 登录成功，跳转到主页

        // let userInfo = {account:this.loginForm.account, password:this.loginForm.password}
        // this.$api.login(JSON.stringify(userInfo)).then((res) => {
        //     Cookies.set('token', res.data.token) // 放置token到Cookie
        //     sessionStorage.setItem('user', userInfo.account) // 保存用户到本地会话
        //     this.$router.push('/')  // 登录成功，跳转到主页
        //   }).catch(function(res) {
        //     alert(res);
        //   });
      },
      reset() {
        this.$refs.loginForm.resetFields();
      }
    }
  }
</script>

<style>
    .from-wrapper{
        width: 26%;
        margin-top: 8rem;
        /* background: #282B34; */
        background: rgba(40,43,52,.7);
        border-radius: 8px;
        padding: 2rem 3rem 0rem 3rem;
    }

</style>