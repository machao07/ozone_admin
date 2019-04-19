<template>
  <div>
    <Header></Header>
    <section class="container" style="margin: 80px auto 40px auto;">
      <div class="title">
        <p class="mTitle animated fadeInUpBig" style="animation-duration: 1s;">{{$t('testresult.title')}}</p>
        <div class="line animated fadeInUpBig" style="animation-delay: 0.3s;"></div>
      </div>
      <!-- 统计 -->
      <el-row :span="24" class="total">
          <el-col :span="24" id="resultHtml"></el-col>
      </el-row>

      <!-- class="layui-this" -->
      <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">
        <ul class="layui-tab-title" :oyente="oyente">
            <li v-for="item in oyente.data" @click="select(item.x)"> 
              <div>
                <p>{{ item.type }}</p>
                <p :class="item.level=='warning'?'text_warning':item.level=='error'?'text_danger':''">{{ item.level }}</p>
              </div>
              <div>
                <p>{{ item.msg }}</p>
                <p class="text_warning">line:  {{ item.x }}</p>
              </div>
            </li>
        </ul>
        <div class="layui-tab-content">
            <div class="layui-tab-item layui-show">
              <div style="position:relative;z-index: 3;" class="codeContent">
                  <textarea ref="mycode" id="code" name="code">

                  </textarea>
              </div>
            </div>
        </div>
      </div>
    </section>
    <Footer></Footer>
  </div>
</template>
<script>
    var oyenteResult;
    var showmsgflag = false;
    var myerrors = new Map();
    var editor;

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
  require("codemirror/keymap/sublime");
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
        oyente:{
            nowselect:-1,
            data:[]
        },
        oyenteerror: [],        
        tabPosition: 'left',
      }
    },
    mounted() {
      this.checkoutList();
      // this.codeMirror();
    },
    methods: {
      //检测结果选项卡
      checkoutList(){
        var id = getParameter('id');
        // console.log(id);
        this.axios({
          url: apiurl + "/admin/file/getoyente/" + id,
          dataType: "json",
          method: "get",
          headers: {
            "Content-Type":"application/json;charset=utf-8"
          },
          withCredentials : true,
          params:{
            id: this.id
          }
        }).then(res => {
              // console.log(res.data);
              if(res.data.code == 0 && res.data.data != null){
                // console.log(res.data);
                oyenteResult = res.data;
                console.log(oyenteResult);
                this.codeMirror();
              // this.tableData.splice(index, 1);
              // getContracts(this.contracts.nowPages);
              }else{
                this.$message.info("没有查到该合约的检测结果。");
              }
          }).catch(()=>{})

        layui.use('element', function(){
          var element = layui.element;
        });
      },
      //代码在线编辑
      codeMirror(){
        var resulthtml = "";
        $('#code').empty();
        var status = oyenteResult.data.status;
        if(status == 1){
          var codecontent = oyenteResult.data.code;
          // console.log(codecontent);
          let theme = 'ambiance';
          editor = CodeMirror.fromTextArea(this.$refs.mycode, {
            mode: 'javascript',
            indentWithTabs: true,
            smartIndent: true,
            lineNumbers: true,
            styleActiveLine: true, // 当前行背景高亮
            scrollbarStyle: 'null',
            matchBrackets: true,
            theme: theme,
            keyMap: "sublime",
            // autofocus: true,
            extraKeys: {'Ctrl': 'autocomplete'},//自定义快捷键
            hintOptions: {//自定义提示选项
              tables: {
                users: ['name', 'score', 'birthDate'],
                countries: ['name', 'population', 'size']
              }
            }
          });
          editor.setValue(codecontent);
          editor.setSize('100%','550px');
          //代码自动提示功能
          // editor.on('cursorActivity', function () {
          //   editor.showHint()
          // })
          var results = oyenteResult.data.results;
          for (var j = 0; j < results.length; j++) {
              // console.log(results);
              var w = results[j];
              // console.log(w);
              for(var i = 0; i < w.errors.length;i++){
                  var error = w.errors[i];
                  console.log(error);
                  var num = myerrors.get(error.level);
                  // console.log(num);
                  myerrors.set(error.level, num > 0 ? num + 1 : 1);

                  var arr = {};
                  arr.x = w.x;
                  arr.level = error.level;
                  arr.msg = error.msg;
                  arr.type = error.type;
                  // console.log(arr);
                  this.oyenteerror.push(arr);
                  // console.log(this.oyenteerror);
                  editor.addLineClass(w.x-1,"class",error.level);
              }
              // showErrormsg(w);
          }

          this.oyente.data = this.oyenteerror;
          // console.log(this.oyente.data);
          // this.select(linenum);
        }else if(status == 2) {
            $("#code").css({"display":"none"});
            this.$alert("检测失败,点击确认返回检测列表",'提示', {
              callback: action => {
                location.href="/Test";
              }
            });
            resulthtml += "检测失败<br>";
            resulthtml += oyenteResult.msg;
        }

        for (var [key, value] of myerrors) {
            resulthtml += key + "：共" + value + "个<br>"
        }
        $("#resultHtml").html(resulthtml)
      },
      //定位指定wraning行
      select(linenum){
        // console.log(111);
        this.oyente.nowselect = linenum;
        editor.scrollIntoView(linenum-1);
        // console.log(this.oyente.nowselect);
        // console.log(editor.scrollIntoView(linenum-1));
      }
    }
}
</script>

<style>
  .total{margin-top: 40px;color:#00FFFF;font-size: 16px;line-height: 1.8;}
  .layui-tab{height:568px;margin: 20px 0 30px 0;border: 1px solid #fff;}
  .layui-tab-title li{display: block;}
  .layui-tab-title{float: left;width: 26%;min-height: 568px;overflow-y: auto;}
  .layui-tab-content{float: left;width: 72%;}
  .layui-tab-title{white-space: normal;}
  .layui-tab-title li{
    text-align:left;line-height:1.8;padding: 8px 15px;border-right: 1px solid #fff;
  }
  .layui-tab-title li p{word-wrap:break-word!important;}
  .layui-tab-title li + li{  border-top: 1px solid #fff;}
  .layui-tab-title li:last-child{border-bottom: 1px solid #fff;}
  .layui-tab-title .layui-this{color: #fff;background: #2E90D2;}
  .layui-tab-brief>.layui-tab-title .layui-this{color: #fff;}
  .layui-tab-brief>.layui-tab-more li.layui-this:after, .layui-tab-brief>.layui-tab-title .layui-this:after{
    display: none;
  }
  .layui-tab-title .layui-this:after{border: none;}

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
.error{background: #800080;}
.warning{background: #8B4513;}
textarea#code{background-color: transparent!important;border: none!important;}
.cm-s-ambiance.CodeMirror{background: rgba(52,60,79,.3);box-shadow:none;}
.cm-s-ambiance .CodeMirror-gutters { background: rgba(52,60,79,.3);}
.cm-s-ambiance .CodeMirror-linenumber{color:#d0d0d0;}

</style>