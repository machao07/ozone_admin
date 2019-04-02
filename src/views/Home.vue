<template>
    <div id="app">
    <el-container>
        <el-row :span="24" class="header">
            <el-col :span="6">logo</el-col>
            <el-col :span="6" :offset="6">
              <el-menu class="el-menu-demo" mode="horizontal" background-color="transparent" text-color="#fff" active-text-color="#ffd04b">
                <el-menu-item index="1" default-active>首页</el-menu-item>
                <el-menu-item index="2">检测</el-menu-item>
                <el-menu-item index="3">监测</el-menu-item>
                <el-menu-item index="4">追踪</el-menu-item>
                <el-menu-item index="5">报管</el-menu-item>
              </el-menu>
            </el-col>
            <el-col :span="4">
                <el-button size="small">登录</el-button>
                <el-button size="small">注册</el-button>
            </el-col>

            <el-col :span="2" class="language">
                <span class="line">中文</span>
                <span class="verticalLine"></span>
                <span>English</span>
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
    </div>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<style>

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

.el-button{
  background: linear-gradient(-45deg, #3265FB 0%, #14ACFF 100%);
  color:#fff;
}

.el-button:focus, .el-button:hover{
    color:#ccc;
    background: transparent;
}

.el-main{margin:80px 0 40px 0;}

.el-main .title{color:#fff;overflow:hidden;}
.el-main .title .mTitle{font-size: 30px;}
.el-main .title .sTitle{font-size: 16px;color:#888;}

.bg{
    width: 100%;
    height:200px;
    background: url(https://www.lianantech.com/static/img/top_bg.0dcd917.png) no-repeat;
    background-size: 100% 100%;
    position: absolute;
    bottom: 150px;
}
.el-footer{  width:100%;position:fixed;
  bottom: 0;line-height:60px;border-top: 1px solid #888;color:#888;font-size: 14px}
</style>
