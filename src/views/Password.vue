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
          <h2><font size="5">{{$t('change.title')}}</font></h2>
          <el-form :model="changeForm" :rules="changeFormRules" ref="changeForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
              <!-- <el-form-item prop="oldpassword">
                  <el-input type="password" name="oldpassword" v-model="changeForm.oldpassword" auto-complete="off" :placeholder="$t('change.oldpassholder')"></el-input>
              </el-form-item> -->
              <el-form-item prop="password">
                  <el-input type="password" name="password" v-model="changeForm.password" auto-complete="off" :placeholder="$t('change.passholder')"></el-input>
              </el-form-item>
              <el-form-item prop="repassword">
                  <el-input type="password" name="repassword" v-model="changeForm.repassword" auto-complete="off" :placeholder="$t('change.repassholder')"></el-input>
              </el-form-item>
              <!-- <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox> -->
              <el-form-item>
                <el-button type="primary" style="width:100%;" @click.native.prevent="change()" :loading="changing">{{$t('change.btn')}}</el-button>
              </el-form-item>

          </el-form>
          <div class="footer-wrapper">
              M<span>o</span>ac | <router-link :to="{name: 'Home'}" @click.native="refresh" title="Go Home">Ozone</router-link>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import Language from '@/components/Language'
import qs from 'qs'
import { setTimeout } from 'timers';

export default {
    components:{
      'Language': Language
    },
    data(){
        let validatePass = (rule, value, callback) => {
            if (value === "") {
                callback(this.$alert("请输入密码"));
            } else {
                if (this.changeForm.repassword !== "") {
                    this.$refs.changeForm.validateField("repassword");
                }
                callback();
            }
        };

        let validatePass2 = (rule, value, callback) => {
           if (value === "") {
            callback(this.$alert("请再次输入密码"));
          } else if (value !== this.changeForm.password) {
           callback(this.$alert("两次输入密码不一致!"));
            } else {
            callback();
          }
        }
        return{
        changing: false,
        changeForm: {
        //   oldpassword: '', 
          password: '' ,
          repassword: ''
        },
        changeFormRules: {
            // oldpassword: [
            //     { required: true, message: '请输入当前密码', trigger: 'blur' },
            // ],
            password: [
                { required: true, message: '请输入新密码', trigger: 'blur' },
                { validator: validatePass, trigger: 'blur' }
            ],
            repassword: [
                { required: true, message: '请再次输入新密码', trigger: 'blur' },
                { validator: validatePass2, trigger: 'blur' }
            ]
        },
        checked: true
        };
    },
    mounted(){

    },
    methods:{
        //修改密码
        change(){
            this.changing = true;
            var obj = {
                // username: this.username,
                // oldpwd: this.changeForm.oldpassword,
                password: this.changeForm.password
            };
            console.log(obj);
            let objdata = qs.stringify(obj);
            this.axios.post(apiurl + "/admin/user/updatepwd", objdata)
            .then(res => {
                if (res.data.code == 0) {
                    this.changing = false;
                    this.$message({
                        message: "保存成功,即将跳转重新登录",
                        type: "success"
                    });
                    setTimeout(() => {
                        this.$router.push("/login");
                    },1800)
                } else {
                    this.changing = false;
                    this.$message({
                        message: "修改失败" + res.data.message,
                        type: "error"
                    });
                }
            })
            .catch(res => {
                console.log(res.message)
            })
        },
        refresh(){
            this.$router.go(0); 
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
