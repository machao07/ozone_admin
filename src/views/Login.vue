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
          <el-form :model="loginForm" :rules="loginFormRules" ref="loginForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
              <el-form-item prop="account">
                  <el-input type="text" id="account" v-model="loginForm.account" auto-complete="off" :placeholder="$t('login.nameholder')"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                  <el-input type="password" id="password" v-model="loginForm.password" auto-complete="off" :placeholder="$t('login.passholder')"></el-input>
              </el-form-item>
              <!-- <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox> -->
              <el-form-item>
                <!-- <el-button type="primary" style="width:48%;" @click.native.prevent="reset">重 置</el-button> -->
                <el-button type="primary" style="width:100%;" @click.native.prevent="login()" :loading="logining">{{$t('login.btn')}}</el-button>
              </el-form-item>
              <el-form-item>
                <p class="register" >{{$t('login.subtitle1')}}<router-link :to="{name: 'Register'}"><font color="#1E95FE">{{$t('login.subtitle2')}}</font></router-link></p>
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
  import qs from 'qs'

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
        loginFormRules: {
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
    mounted(){
      // this.$nextTick(() => {
      //   this.getLoginUser();
      // })
    },
    created(){
      
    },
    methods: {
      login() {
        this.$refs.loginForm.validate((valid) => {
            if(valid){
                this.logining = true;
                let logindata = qs.stringify(this.loginForm);
                localStorage.setItem('account',this.loginForm.account);
                localStorage.setItem('user',logindata);
                console.log(localStorage.getItem('account'));
                console.log(logindata);
                
                this.axios.post(apiurl + "/user/login",logindata)
                    .then((res) => {
                        console.log(res);
                        // return;
                        if (res.data.code == 0) {
                            // this.$router.push('/')
                            location.href = "/";
                        } else {
                            // alert(res.message);
                            this.logining = false;
                            console.log(res.data.message);
                            this.$alert(res.data.message, 'info', {
                                confirmButtonText: 'ok'
                            })
                        }                           
                    })
            }else{
                console.log('error submit!');
                return false;
            }
        })
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