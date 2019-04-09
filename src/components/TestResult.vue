<template>
  <div>
    <Header></Header>
    <section class="container" style="margin: 80px auto 40px auto;">
      <div class="title">
        <p class="mTitle animated fadeInUpBig" style="animation-duration: 1s;">{{$t('testresult.title')}}</p>
        <div class="line animated fadeInUpBig" style="animation-delay: 0.3s;"></div>
      </div>

      <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">
            <ul class="layui-tab-title">
                <li class="layui-this">
                  <div>
                    <p>1 security/enforce-explicit-visibility</p>
                    <p class="text-warning">warning</p>
                  </div>
                  <div>
                    <p>No visibility specified explicitly for totalSupply function</p>
                    <p class="text-warning">line:19</p>
                  </div>
                </li>
                <li>
                  <div>
                    <p>2 security/enforce-explicit-visibility</p>
                    <p class="text-warning">warning</p>
                  </div>
                  <div>
                    <p>No visibility specified explicitly for totalSupply function</p>
                    <p class="text-warning">line:19</p>
                  </div>
                </li>
                <li>
                  <div>
                    <p>3 security/enforce-explicit-visibility</p>
                    <p class="text-warning">warning</p>
                  </div>
                  <div>
                    <p>No visibility specified explicitly for totalSupply function</p>
                    <p class="text-warning">line:19</p>
                  </div>
                </li>
                <li>
                  <div>
                    <p>4 security/enforce-explicit-visibility</p>
                    <p class="text-warning">warning</p>
                  </div>
                  <div>
                    <p>No visibility specified explicitly for totalSupply function</p>
                    <p class="text-warning">line:19</p>
                  </div>
                </li>
                <li>
                  <div>
                    <p>5 security/enforce-explicit-visibility</p>
                    <p class="text-warning">warning</p>
                  </div>
                  <div>
                    <p>No visibility specified explicitly for totalSupply function</p>
                    <p class="text-warning">line:19</p>
                  </div>
                </li>
            </ul>
            <div class="layui-tab-content">
                <div class="layui-tab-item layui-show">
                  <div style="position:relative;z-index: 3;">
                        <textarea ref="mycode" id="code" name="code">
                          pragma solidity ^0.4.18;

                          /**
                          * Math operations with safety checks
                          */
                          contract SafeMath {
                            function safeMul(uint256 a, uint256 b) internal pure returns (uint256) {
                              if (a == 0) {
                                return 0;
                              }
                              uint256 c = a * b;
                              assert(c / a == b);
                              return c;
                            }

                            function safeDiv(uint256 a, uint256 b) internal pure returns (uint256) {
                              assert(b > 0);
                              uint256 c = a / b;
                              assert(a == b * c + a % b);
                              return c;
                            }

                            function safeSub(uint256 a, uint256 b) internal pure returns (uint256) {
                              assert(b <= a);
                              return a - b;
                            }

                            function safeAdd(uint256 a, uint256 b) internal pure returns (uint256) {
                              uint256 c = a + b;
                              assert(c>=a && c>=b);
                              return c;
                            }
                          }

                          contract Token is SafeMath{

                              function balanceOf(address _owner) public constant returns (uint256 balance);

                              function transfer(address _to, uint256 _value) public returns (bool success);

                              function transferFrom(address _from, address _to, uint256 _value) public returns (bool success);

                              function approve(address _spender, uint256 _value) public returns (bool success);

                              function allowance(address _owner, address _spender) public constant returns (uint256 remaining);

                              event Transfer(address indexed _from, address indexed _to, uint256 _value);

                              event Approval(address indexed _owner, address indexed _spender, uint256 _value);
                          }

                          function balanceOf(address _owner) public constant returns (uint256 balance) {
                              return balances[_owner];
                          }

                          /* Allow another contract to spend some tokens in your behalf */
                          //允许_spender多次取用帐户，最高达_value金额
                          function approve(address _spender, uint256 _value) public returns (bool success)
                          {
                              allowed[msg.sender][_spender] = _value;
                              Approval(msg.sender, _spender, _value);
                              return true;
                          }

                          function allowance(address _owner, address _spender) public constant returns (uint256 remaining) {
                              return allowed[_owner][_spender];       //查询并返回_spender仍然被允许从_owner提取的金额，即授权余额
                          }

                          </textarea>
                  </div>
                </div>
                <div class="layui-tab-item">内容2</div>
                <div class="layui-tab-item">内容3</div>
                <div class="layui-tab-item">内容4</div>
                <div class="layui-tab-item">内容5</div>
            </div>
      </div>
    </section>
    <Footer></Footer>
  </div>
</template>
<script>
  import "codemirror/theme/ambiance.css";
  import "codemirror/lib/codemirror.css";
  import "codemirror/addon/hint/show-hint.css";
  import Header from '@/components/Header'
  import Footer from '@/components/Footer'
  import $ from 'jquery'
  
  let CodeMirror = require("codemirror/lib/codemirror");
  require("codemirror/mode/javascript/javascript");
  require("codemirror/addon/edit/matchbrackets");
  require("codemirror/addon/selection/active-line");
  require("codemirror/addon/hint/javascript-hint");
  // require("codemirror/addon/hint/show-hint");
  // require("codemirror/mode/sql/sql");
  // require("codemirror/addon/hint/sql-hint");

  export default {
    components:{
    'Header': Header,
    'Footer': Footer
    },
    data() {
      return {
        tabPosition: 'left'
      }
    },
    mounted() {
      this.checkoutList();
      this.codeMirror();
    },
    methods: {
      //检测结果选项卡
      checkoutList(){
        layui.use('element', function(){
          var element = layui.element;
          $.ajax({
            type: "get",
            url: "url",
            dataType: "json",
            success: function (res) {
              var resData = res.data;
              $.each(resData, function (index, item) { 
                 
              });
            }
          });
        });
      },
      //代码在线编辑
      codeMirror(){
        let theme = 'ambiance';
        let editor = CodeMirror.fromTextArea(this.$refs.mycode, {
          mode: 'javascript',
          indentWithTabs: true,
          smartIndent: true,
          lineNumbers: true,
          scrollbarStyle: 'null',
          matchBrackets: true,
          theme: theme,
          // autofocus: true,
          extraKeys: {'Ctrl': 'autocomplete'},//自定义快捷键
          hintOptions: {//自定义提示选项
            tables: {
              users: ['name', 'score', 'birthDate'],
              countries: ['name', 'population', 'size']
            }
          }
        });
        editor.setSize('100%','550px');
        //代码自动提示功能
        editor.on('cursorActivity', function () {
          editor.showHint()
        })
      }
    }
}
</script>

<style>
  .layui-tab{
    height:568px;
    margin: 40px 0 30px 0;
    border: 1px solid #fff;
  }
  .layui-tab-title li{
      display: block;
  }
  .layui-tab-title{
      float: left;
      width: 26%;
      min-height: 568px;
      overflow-y: auto;
  }
  .layui-tab-content{
      float: left;
      width: 72%;
  }
.layui-tab-title{white-space: normal;}
.layui-tab-title li{
  text-align:left;line-height:1.8;padding: 8px 15px;border-right: 1px solid #fff;
}
.layui-tab-title li p{word-wrap:break-word!important;}
.layui-tab-title li + li{  border-top: 1px solid #fff;}
.layui-tab-title .layui-this{color: #fff;background: #2E90D2;}
.layui-tab-brief>.layui-tab-title .layui-this{color: #fff;}
.layui-tab-brief>.layui-tab-more li.layui-this:after, .layui-tab-brief>.layui-tab-title .layui-this:after{
  display: none;
}
.layui-tab-title .layui-this:after{border: none;}
.text-warning{color:#ffc107;}
.text-success {color: #3bb001;}
.text-danger {color: #dc3545;}

/*滚动条样式*/
.layui-tab-title::-webkit-scrollbar {/*滚动条整体样式*/
    width: 8px;
    height: 1px;
}
.layui-tab-title::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 8px rgba(0,0,0,.4);
    background: rgba(0,0,0,.4);
}
.layui-tab-title::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 8px rgba(255,255,255,.3);
    border-radius: 10px;
    background: rgba(255,255,255,.3);
}

/* code */
.cm-s-ambiance.CodeMirror{background: rgba(52,60,79,.3);box-shadow:none;}
.cm-s-ambiance .CodeMirror-gutters { background: rgba(52,60,79,.3);}
.cm-s-ambiance .CodeMirror-linenumber{color:#d0d0d0;}

</style>