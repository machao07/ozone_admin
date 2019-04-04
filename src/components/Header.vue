<template>
    <el-row :span="24" class="header">
        <el-col :span="4" class="logo"><img src="../assets/images/ozone_logo.png" width="110" alt=""></el-col>
        <el-col :span="14" :offset="6">
          <el-col :span="12">
            <el-menu :default-active="$route.path" router class="el-menu-demo" mode="horizontal" background-color="transparent" text-color="#fff" active-text-color="#ffd04b">
              <el-menu-item index="/" default-active>{{$t('menu.home')}}</el-menu-item>
              <el-menu-item index="/Test">{{$t('menu.testing')}}</el-menu-item>
              <el-menu-item index="/404">{{$t('menu.monitor')}}</el-menu-item>
              <el-menu-item index="/404">{{$t('menu.track')}}</el-menu-item>
              <el-menu-item index="/404">{{$t('menu.reportTube')}}</el-menu-item>
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
              <Language></Language>
          </el-col>

        </el-col>
    </el-row>
</template>

<script>
    import Language from '@/components/Language'
    export default{
      components:{
        'Language': Language
      },
      data(){
        return{

        }
      },
      mouted(){

      },
      watch: {

      },
      methods:{

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