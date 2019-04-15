<template>
    <el-row :span="24" class="header">
        <el-col :span="4" class="logo"><img src="../assets/images/ozone_logo.png" width="110" alt=""></el-col>
        <el-col :span="16" :offset="4">
          <el-col :span="12">
            <el-menu :default-active="$route.path" router class="el-menu-demo" mode="horizontal" background-color="transparent" text-color="#fff" active-text-color="#ffd04b">
              <el-menu-item index="/" default-active>{{$t('menu.home')}}</el-menu-item>
              <el-menu-item index="/Test">{{$t('menu.testing')}}</el-menu-item>
              <el-menu-item index="/404">{{$t('menu.monitor')}}</el-menu-item>
              <el-menu-item index="/404">{{$t('menu.track')}}</el-menu-item>
              <el-menu-item index="/404">{{$t('menu.reportTube')}}</el-menu-item>
            </el-menu>
          </el-col>

          <!-- 未登录 -->
          <el-col :span="4" v-show="account == null || data == null">
              <el-button size="small">
                <router-link :to="{name: 'Login'}">{{$t('login.btn')}}</router-link>
              </el-button>
              <el-button size="small">
                <router-link :to="{name: 'Register'}">{{$t('register.btn')}}</router-link>
                </el-button>
          </el-col>

          <!-- 登录后 -->
          <el-col :span="4" class="userinfo" v-show="account != null && data != null">
            <el-dropdown trigger="hover">
              <span class="el-dropdown-link userinfo-inner">
                <img src="../assets/images/default.jpg" />
                <span id="username"></span>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>我的消息</el-dropdown-item>
                <el-dropdown-item divided @click.native="changePassword">修改密码</el-dropdown-item>
                <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>

          <el-col :span="4" class="language">
              <Language></Language>
          </el-col>

        </el-col>
    </el-row>
</template>

<script>
    import Language from '@/components/Language'
    export default{
      components:{
        'Language': Language,
      },
      data(){
        return{
          account: localStorage.getItem('account'),
          data: sessionStorage.getItem('data')
        }
      },
      mouted(){
        
      },
      created(){

      },
      methods: {
        //退出登录
        logout() {
          var _this = this;
          this.$confirm('确认退出吗?', '提示', {
            //type: 'warning'
          }).then(() => {
              $.ajax({
                type: "GET",
                dataType: "json",
                url: apiurl +"/user/logout",
                xhrFields: {withCredentials: true},
                crossDomain: true,
                success: function (result) {
                  localStorage.removeItem('account');
                  console.log(result);
                  if(result.code == 0){
                    location.href = "/";
                    // localStorage.removeItem('account');
                    return;
                  }
                },
                error: function (result) {
                    location.href = "/";
                    return;
                }
            });
            // sessionStorage.removeItem('code');
            // location.href = "/";
            // _this.$router.push('/');
          }).catch(() => {
            this.$message.info("已取消退出");
          });
        },
        changePassword(){
          this.$router.push('/Password');
        }
      }
    }
</script>

<style>
  .el-menu.el-menu--horizontal{
    border-bottom: none;
  }
  .el-menu--horizontal{
    border-bottom: none;
  }

  .el-menu--horizontal .el-menu-item:focus, .el-menu--horizontal .el-menu-item:hover{
    background-color: transparent!important;
  }
  .el-menu--horizontal .el-menu-item:hover{
    color: #888!important;
    border-bottom-color: rgb(255, 208, 75)!important;
  }

</style>