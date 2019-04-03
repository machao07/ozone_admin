<template>
    <el-row :span="24" class="header">
        <el-col :span="4" class="logo"><img src="../assets/images/ozone_logo.png" width="110" alt=""></el-col>
        <el-col :span="14" :offset="6">
          <el-col :span="12">
            <el-menu class="el-menu-demo" mode="horizontal" background-color="transparent" text-color="#fff" active-text-color="#ffd04b">
              <el-menu-item index="1" default-active>首页</el-menu-item>
              <el-menu-item index="2"><router-link :to="{name: 'Test'}">检测</router-link></el-menu-item>
              <el-menu-item index="3">监测</el-menu-item>
              <el-menu-item index="4">追踪</el-menu-item>
              <el-menu-item index="5">报管</el-menu-item>
            </el-menu>
          </el-col>


          <el-col :span="4">
              <el-button size="small">
                <router-link :to="{name: 'Login'}">登录</router-link>
              </el-button>
              <el-button size="small">
                <router-link :to="{name: 'Register'}">注册</router-link>
                </el-button>
          </el-col>

          <el-col :span="4" class="language">
              <span class="line">中文</span>
              <span class="verticalLine"></span>
              <span>English</span>
          </el-col>

        </el-col>
    </el-row>
</template>

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