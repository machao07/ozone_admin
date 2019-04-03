<template>
  <section style="max-width:1200px;width:100%;margin:0 auto;padding-bottom:100px;">
    <div class="title">
      <p class="mTitle animated fadeInUpBig" style="animation-duration: 1s;">检测结果</p>
      <div class="line animated fadeInUpBig" style="animation-delay: 0.3s;"></div>
    </div>

    <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">
        <div style="height:568px;border: 1px solid #fff;">
          <ul class="layui-tab-title">
              <li class="layui-this">
                <div>
                  <p>security/enforce-explicit-visibility</p>
                  <p class="text-warning">warning</p>
                </div>
                <div>
                  <p>No visibility specified explicitly for totalSupply function</p>
                  <p class="text-warning">line:19</p>
                </div>
              </li>
              <li>
                <div>
                  <p>security/enforce-explicit-visibility</p>
                  <p class="text-warning">warning</p>
                </div>
                <div>
                  <p>No visibility specified explicitly for totalSupply function</p>
                  <p class="text-warning">line:19</p>
                </div>
              </li>
              <li>
                <div>
                  <p>security/enforce-explicit-visibility</p>
                  <p class="text-warning">warning</p>
                </div>
                <div>
                  <p>No visibility specified explicitly for totalSupply function</p>
                  <p class="text-warning">line:19</p>
                </div>
              </li>
              <li>
                <div>
                  <p>security/enforce-explicit-visibility</p>
                  <p class="text-warning">warning</p>
                </div>
                <div>
                  <p>No visibility specified explicitly for totalSupply function</p>
                  <p class="text-warning">line:19</p>
                </div>
              </li>

          </ul>
          <div class="layui-tab-content" style="height: 100px;">
              <div class="layui-tab-item layui-show">内容不一样是要有，因为你可以监听tab事件（阅读下文档就是了）</div>
              <div class="layui-tab-item">内容2</div>
              <div class="layui-tab-item">内容3</div>
              <div class="layui-tab-item">内容4</div>
              <div class="layui-tab-item">内容5</div>
          </div>
        </div>
    </div>

  </section>

</template>

<script>
  export default {
    data() {
      return {
        tabPosition: 'left'
      }
    },
    mounted() {

    },
    methods: {

    }
}
</script>

<style>
  .layui-tab{
    margin: 40px 0 30px 0;
  }
  .layui-tab-title li{
      display: block;
  }
  .layui-tab-title{
      float: left;
      width: 26%;
      height: auto;
      border-right: 1px solid #fff;
  }
  .layui-tab-content{
      float: left;
      width: 72%;
  }
.layui-tab-title{white-space: normal;}
.layui-tab-title li{
  text-align:left;line-height:1.8;padding: 8px 15px;
}
.layui-tab-title li p{word-wrap:break-word!important;}
.layui-tab-title li + li{  border-top: 1px solid #fff;}
.layui-tab-title .layui-this{color: #fff;background: #2E90D2;}
.layui-tab-brief>.layui-tab-more li.layui-this:after, .layui-tab-brief>.layui-tab-title .layui-this:after{
  display: none;
}
.layui-tab-title .layui-this:after{border: none;}
.text-warning{color:#ffc107;}
</style>