<template>
    <el-row :span="24" class="header">
        <el-col :span="4" class="logo"><img src="../assets/images/ozone_logo.png" width="110" alt=""></el-col>
        <el-col :span="14" :offset="6">
          <el-col :span="12">
            <el-menu class="el-menu-demo" mode="horizontal" background-color="transparent" text-color="#fff" active-text-color="#ffd04b">
              <el-menu-item index="1" default-active>{{$t('menu.home')}}</el-menu-item>
              <el-menu-item index="2"><router-link :to="{name: 'Test'}">{{$t('menu.testing')}}</router-link></el-menu-item>
              <el-menu-item index="3">{{$t('menu.monitor')}}</el-menu-item>
              <el-menu-item index="4">{{$t('menu.track')}}</el-menu-item>
              <el-menu-item index="5">{{$t('menu.reportTube')}}</el-menu-item>
            </el-menu>
          </el-col>


          <el-col :span="4">
              <el-button size="small">
                <router-link :to="{name: 'Login'}">{{$t('login.btn')}}</router-link>
              </el-button>
              <el-button size="small">
                <router-link :to="{name: 'Register'}">{{$t('register.btn')}}</router-link>
                </el-button>
          </el-col>

          <el-col :span="4" class="language">

            <el-dropdown trigger="click" class='international' @command="handleSetLanguage">
              <div>
                <span class="el-dropdown-link">{{language}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="cn">中文</el-dropdown-item>
                <el-dropdown-item command="en">English</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
              <!-- <span class="line">中文</span>
              <span class="verticalLine"></span>
              <span>English</span> -->
          </el-col>

        </el-col>
    </el-row>
</template>

<script>
    export default{
      data(){
        return{
          language: '中文'
        }
      },
      mouted(){
        const _lang = localStorage.lang || 'cn'
        this.getLanguage(_lang)
      },
      methods:{
        handleSetLanguage (lang) {
          this.$i18n.locale = lang
          localStorage.setItem('lang', lang)
          this.getLanguage(lang)
        },
        getLanguage (val) {
          if (val === 'cn') {
            this.language = '中文'
          }
          if (val === 'en') {
            this.language = 'English'
          }
        }
      }
    }
</script>

<style>
  .header{
    width:100%;
    height: 60px;
    line-height: 60px;
    background: #081027;
    position:fixed;
    top: 0;
    z-index:2;
  }
  .logo{margin-top:10px;}
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

  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .language span{
    cursor:pointer;
  }
  .language span:hover{
    color: #15a8ff;
  }

  .language .verticalLine{
      border-left: 2px solid #fff;
      margin: 0 8px;
  }
</style>