<template>
    <div>
      <router-view></router-view>
    </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  name: 'App'
}
</script>

<style>
body{font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;
    color: #333;
    font-size: .28em;
    line-height: 1;padding:0;margin:0;background: #081027;
}
a{color:#fff;text-decoration:none;}
#app {
    width: 100vw;
    height: 100vh;
    text-align: center;
    color: #fff;
    position: relative;
    z-index: 1;
    overflow-x:hidden;
}

</style>
