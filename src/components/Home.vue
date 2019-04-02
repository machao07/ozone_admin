<template>
    <!-- <div class="app"> -->
    <el-container>
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

        <el-main>
            <div class="title">

                <p class="mTitle animated fadeInUpBig" style="animation-delay:0;animation-duration: 1s;">区块链智能合约安全检测平台</p>
                <p class="sTitle animated fadeInUpBig" style="animation-delay:.5s;animation-duration: 1.2s;">Blockchain Smart Contract Security Checking System</p>
            </div>
        </el-main>
        <div class="bg">

        </div>
        <el-footer>© Copyright 2018 青岛墨一客区块链有限公司</el-footer>
    </el-container>
    <!-- </div> -->
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>

<style>
body{font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;
    color: #333;
    font-size: .28em;
    line-height: 1;padding:0;margin:0;background: #081027;
}
#app {
    width: 100vw;
    height: 100vh;
    text-align: center;
    color: #fff;
    position: relative;
    z-index: 1;
    overflow:hidden;
}
.el-container{

}
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

.el-main{margin:80px 0 40px 0;}


.bg{
    width: 100%;
    height:200px;
    background: url(../assets/images/top_bg.png) no-repeat;
    background-size: 100% 100%;
    position: absolute;
    bottom: 150px;
}
.el-footer{  width:100%;position:fixed;
  bottom: 0;line-height:60px;border-top: 1px solid #888;color:#888;font-size: 14px}
</style>
