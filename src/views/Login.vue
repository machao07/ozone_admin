<template>
  <div id="login">
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
                  <el-input type="text" id="account" v-model="loginForm.account" auto-complete="off" :placeholder="$t('login.nameholder')"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                  <el-input type="password" id="password" v-model="loginForm.password" auto-complete="off" :placeholder="$t('login.passholder')"></el-input>
              </el-form-item>
              <!-- <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox> -->
              <el-form-item>
                <!-- <el-button type="primary" style="width:48%;" @click.native.prevent="reset">重 置</el-button> -->
                <el-button type="primary" style="width:100%;" @click.native.prevent="login" :loading="logining">{{$t('login.btn')}}</el-button>
              </el-form-item>
              <el-form-item>
                <p class="login" @click="login">{{$t('login.subtitle1')}}<router-link :to="{name: 'Register'}"><font color="#1E95FE">{{$t('login.subtitle2')}}</font></router-link></p>
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
          account: '', 
          password: '' 
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
    created(){
      // this.haslogin();
    },
    methods: {
      login() {
        var account = $("#account").val();
        var pwd = $("#password").val();
        if(!account.endsWith("@mozi.one")){
            pwd = hex_md5(pwd);
        }
        this.loading = true;
        // this.$router.push('/')  // 登录成功，跳转到主页
        $.ajax({
            type: "POST",
            dataType: "json",
            url: apiurl +"/user/login",
            data:{
                account: account,
                password: pwd
            },
            success: function (result) {
                this.loading = false;
                console.log(result.code);
                if(result.code == 0){
                    // this.$router.push('/')
                    location.href = "/";
                }else{
                    alert(result.message);
                }
            }
        });
      },
      // haslogin(){
      //     this.axios.get(apiurl + "/admin/usermsg",{
      //         "account": this.account, 
      //         "password": this.password
      //         })
      //         .then(res => {
      //           console.log(res.data);
      //           // console.log(res.data.code);
      //           localStorage.setItem("code", res.data.code);
      //           // console.log(localStorage.getItem("code", res.data.code));
      //           console.log(res);
      //         })
      // }
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