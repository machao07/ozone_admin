<template>
  <div id="register">
    <el-row :gutter="20" class="header">
        <el-col :span="6" :offset="6" class="logo"><img src="../assets/images/ozone_logo.png" width="110" alt=""></el-col>
        <el-col :span="6">
            <Language></Language>
        </el-col>
    </el-row>
    <div class="wrapper-login">
        <div class="from-wrapper">
            <h2><font size="5">{{$t('register.title')}}</font></h2>
            <el-form :model="form" status-icon :rules="registerRules" ref="form" class="demo-ruleForm">
                <el-form-item prop="account">
                    <el-input id="account" v-model="form.account" auto-complete="off" :placeholder="$t('register.accountholder')"></el-input>
                </el-form-item>

                <el-form-item prop="username">
                    <el-input id="username" v-model="form.username" auto-complete="off" :placeholder="$t('register.nameholder')"></el-input>
                </el-form-item>
                <!-- <el-form-item prop="smscode" class="code">
                    <el-col :span="16">
                        <el-input v-model="ruleForm2.smscode" placeholder="验证码"></el-input>
                    </el-col>
                    <el-col :span="4" :offset="1">
                        <el-button type="primary" :disabled='isDisabled' @click="sendCode">{{buttonText}}</el-button>
                    </el-col>
                </el-form-item> -->
                <el-form-item prop="password">
                    <el-input id="password" type="password" v-model="form.password" auto-complete="off" :placeholder="$t('register.passholder')"></el-input>
                </el-form-item>
                <el-form-item prop="repassword">
                    <el-input id="repassword" type="password" v-model="form.repassword" auto-complete="off" :placeholder="$t('register.passconfirm')"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="register" :loading="registing" style="width:100%;">{{$t('register.btn')}}</el-button>
                </el-form-item>
                <el-form-item>
                    <p class="login">{{$t('register.subtitle1')}}<router-link :to="{path: '/login'}"><font color="#1E95FE">{{$t('register.subtitle2')}}</font></router-link></p>
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
import md5 from 'js-md5'

export default {
  name: "register",
  components:{
    'Language': Language
  },
  data() {
    return {
        registing: false,
        form:{
            account: '', 
            username:'',
            password:''
        },
        registerRules: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
          ],
          username: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
          repassword: [
            { required: true, message: '请再次输入密码', trigger: 'blur' },
          ]
        },
        checked: true
    }
  },
  methods: {
    // <!--提交注册-->
    register() {
      var account =  $.trim($("#account").val());
      var username = $.trim($("#username").val());
      var password = $.trim($("#password").val());
      var repassword = $.trim($("#repassword").val());

      if(account.endsWith("@mozi.one")){
          this.$alert("禁止使用以 @mozi.one 结尾的账号 ",'info', {
            confirmButtonText: 'ok'
          });
          return;
      }

      var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
      if(reg.test(account)){
          this.$alert("账号禁止使用中文！", '提示', {
            confirmButtonText: '确定'
          });
          return;
      }

      if(password!=repassword){
          this.$alert("两次密码输入不一致", '提示', {
            confirmButtonText: '确定'
          })
          return;
      }

      this.registing = true;
      let form = qs.stringify(this.form);
      this.axios.post(apiurl + "/user/register",form)
      .then(res => {
        console.log(res);
        if(res.status == 200){
            this.registing = false;
            this.$alert("恭喜您，注册成功，请点击确定进行登录！",'提示',{
              confirmButtonText: '确定',
              callback: action => {
                this.$router.push('/login');
              }
            });
            return;
        }else{
            this.$alert(res.message)
        }
      })
    }
  }
};
</script>


<style>

    .from-wrapper{
        width: 26%;
        margin-top: 6rem;
        /* background: #282B34; */
        background: rgba(40,43,52,.7);
        border-radius: 8px;
        padding: 2rem 3rem 0rem 3rem;
    }
</style>