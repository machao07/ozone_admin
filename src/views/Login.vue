<template>
  <div>
    <el-row :gutter="20" class="header">
        <el-col :span="6" :offset="6" class="logo"><img src="../assets/images/ozone_logo.png" width="110" alt=""></el-col>
        <el-col :span="6">
            <Language></Language>
        </el-col>
    </el-row>
    <div class="wrapper-login">
      <div class="from-wrapper">
          <h2><font size="5">{{$t('login.title')}}</font></h2>
          <el-form :model="loginForm" :rules="fieldRules" ref="loginForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
              <el-form-item prop="account">
                  <el-input type="text" v-model="loginForm.account" auto-complete="off" :placeholder="$t('login.nameholder')"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                  <el-input type="password" v-model="loginForm.password" auto-complete="off" :placeholder="$t('login.passholder')"></el-input>
              </el-form-item>
              <!-- <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox> -->
              <el-form-item>
                <!-- <el-button type="primary" style="width:48%;" @click.native.prevent="reset">重 置</el-button> -->
                <el-button type="primary" style="width:100%;" @click.native.prevent="login" :loading="logining">{{$t('login.btn')}}</el-button>
              </el-form-item>
              <el-form-item>
                <p class="login" @click="">{{$t('login.subtitle1')}}<router-link :to="{name: 'Register'}"><font color="#1E95FE">{{$t('login.subtitle2')}}</font></router-link></p>
              </el-form-item>
          </el-form>
          <div class="footer-wrapper">
              M<span>o</span>ac | Ozone
          </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Language from '@/components/Language'
  export default {
    name: 'Login',
    components:{
      'Language': Language
    },
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
        margin-top: 10rem;
        /* background: #282B34; */
        background: rgba(40,43,52,.7);
        border-radius: 8px;
        padding: 2rem 3rem 0rem 3rem;
    }

</style>