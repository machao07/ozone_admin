<template>
    <!-- <div id="app"> -->
    <el-container id="home">
        <Header></Header>
        <el-main>
            <HomeContent v-show="$route.meta.showHomecontent"></HomeContent>
            <router-view></router-view>
        </el-main>
        <div class="bg"></div>
        <Footer></Footer>
    </el-container>
    <!-- </div> -->
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HomeContent from '@/components/HomeContent'

export default {
  name: 'login',
  components:{
    'Header': Header,
    'Footer': Footer,
    'HomeContent': HomeContent
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
