<template>
    <div id="app">
        <el-container>
            <Header></Header>
            <el-main>
                <router-view></router-view>
            </el-main>
            <div class="bg"></div>
            <Footer></Footer>
        </el-container>
    </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  components:{
    'Header': Header,
    'Footer': Footer
  },
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
    overflow:auto;
}
.el-main{margin:80px 0 40px 0;}

.bg{
    width: 100%;
    height:200px;
    background: url(../assets/images/top_bg.png) no-repeat;
    background-size: 100% 100%;
    position: absolute;
    bottom: 150px;
    z-index: -1;
}

</style>
