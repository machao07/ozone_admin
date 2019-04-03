<template>
    <div class="wrapper-login">
        <div class="from-wrapper">
            <h2><font size="5">系统注册</font></h2>
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" class="demo-ruleForm">
                <el-form-item prop="tel">
                    <el-input v-model="ruleForm2.tel" auto-complete="off" placeholder="请输入邮箱"></el-input>
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
                    <el-input type="password" v-model="ruleForm2.pass" auto-complete="off" placeholder="输入密码"></el-input>
                </el-form-item>
                <el-form-item prop="checkPass">
                    <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="确认密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm2')" style="width:100%;">注册</el-button>
                    <p class="login" @click="gotoLogin">已有账号？<router-link :to="{name: 'Login'}">立即登录</router-link></p>
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
  name: "Register",
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
    //  <!--验证码是否为空-->
    let checkSmscode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机验证码'))
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
        smscode: ""
      },
      rules2: {
        pass: [{ validator: validatePass, trigger: 'change' }],
        checkPass: [{ validator: validatePass2, trigger: 'change' }],
        tel: [{ validator: checkTel, trigger: 'change' }],
        smscode: [{ validator: checkSmscode, trigger: 'change' }],
      },
      buttonText: '发送验证码',
      isDisabled: false, // 是否禁止点击发送验证码按钮
      flag: true
    }
  },
  methods: {
    // <!--发送验证码-->
    sendCode () {
      let tel = this.ruleForm2.tel
      if (this.checkMobile(tel)) {
        console.log(tel)
        let time = 60
        this.buttonText = '已发送'
        this.isDisabled = true
        if (this.flag) {
          this.flag = false;
          let timer = setInterval(() => {
            time--;
            this.buttonText = time + ' 秒'
            if (time === 0) {
              clearInterval(timer);
              this.buttonText = '重新获取'
              this.isDisabled = false
              this.flag = true;
            }
          }, 1000)
        }
      }
    },
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
    },
    // 验证手机号
    checkMobile(str) {
      let re = /^1\d{10}$/
      if (re.test(str)) {
        return true;
      } else {
        return false;
      }
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