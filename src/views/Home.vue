<template>
    <!-- <div class="app"> -->
    <el-container>
        <Header></Header>
        <el-main>
            <div class="title">
                <p class="mTitle animated fadeInUpBig" style="animation-delay:0;animation-duration: 1s;">{{$t('homeMsg.title')}}</p>
                <p class="sTitle animated fadeInUpBig" style="animation-delay:.5s;animation-duration: 1.2s;">{{$t('homeMsg.subTitle')}}</p>
            </div>
            <router-view></router-view>
        </el-main>
        <div class="bg">
        </div>
        <Footer></Footer>
    </el-container>
    <!-- </div> -->
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  name: 'Home',
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
    overflow:hidden;
}
.el-container{

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

</style>
