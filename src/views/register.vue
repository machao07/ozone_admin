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
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" class="demo-ruleForm">
                <el-form-item prop="account">
                    <el-input v-model="ruleForm2.account" auto-complete="off" :placeholder="$t('register.accountholder')"></el-input>
                </el-form-item>

                <el-form-item prop="name">
                    <el-input v-model="ruleForm2.name" auto-complete="off" :placeholder="$t('register.nameholder')"></el-input>
                </el-form-item>
                <!-- <el-form-item prop="smscode" class="code">
                    <el-col :span="16">
                        <el-input v-model="ruleForm2.smscode" placeholder="验证码"></el-input>
                    </el-col>
                    <el-col :span="4" :offset="1">
                        <el-button type="primary" :disabled='isDisabled' @click="sendCode">{{buttonText}}</el-button>
                    </el-col>
                </el-form-item> -->
                <el-form-item prop="pass">
                    <el-input type="password" v-model="ruleForm2.pass" auto-complete="off" :placeholder="$t('register.passholder')"></el-input>
                </el-form-item>
                <el-form-item prop="checkPass">
                    <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" :placeholder="$t('register.passconfirm')"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm2')" style="width:100%;">{{$t('register.btn')}}</el-button>
                </el-form-item>
                <el-form-item>
                    <p class="login" @click="gotoLogin">{{$t('register.subtitle1')}}<router-link :to="{name: 'Login'}"><font color="#1E95FE">{{$t('register.subtitle2')}}</font></router-link></p>
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
  name: "register",
  components:{
    'Language': Language
  },
  data() {
    // <!--验证手机号是否合法-->
    let checkTel = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号码'))
      } else if (!this.checkMobile(value)) {
        callback(new Error('手机号码不合法'))
      } else {
        callback()
      }
    }

    // <!--验证密码-->
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"))
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback()
      }
    }
    // <!--二次验证密码-->
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm2: {
        pass: "",
        checkPass: "",
        tel: "",
      },
      rules2: {
        pass: [{ validator: validatePass, trigger: 'change' }],
        checkPass: [{ validator: validatePass2, trigger: 'change' }],
        tel: [{ validator: checkTel, trigger: 'change' }],
      },
      buttonText: '发送验证码',
      isDisabled: false, // 是否禁止点击发送验证码按钮
      flag: true
    }
  },
  methods: {
    // <!--提交注册-->
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          setTimeout(() => {
            alert('注册成功')
          }, 400);
        } else {
          console.log("error submit!!");
          return false;
        }
      })
    },
    // <!--进入登录页-->
    gotoLogin() {
      this.$router.push({
        path: "/login"
      });
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