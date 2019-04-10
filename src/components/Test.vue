<template>
  <section class="container" style="margin: 0 auto 40px auto;">
    <div class="title">
      <p class="mTitle animated fadeInUpBig">{{$t('testing.title')}}</p>
      <div class="line animated fadeInUpBig" style="animation-delay: 0.1s;"></div>
      <p class="sTitle animated fadeInUpBig" style="animation-delay: 0.2s; animation-duration: 1.2s;">{{$t('testing.subTitle')}}</p>
    </div>

    <!--工具条-->
      <el-form :inline="true">
        <el-row :span="24">
          <el-col :span="12" class="animated bounceInLeft" style="text-align:left">
            <el-form-item>
                <el-button type="" @click="uploadDialog = true" icon="el-icon-upload">{{$t('testing.from.upLoad')}}</el-button>
            </el-form-item>

            <el-form-item>
              <el-button type="" @click="addressDialog = true" icon="el-icon-circle-plus">{{$t('testing.from.addContract')}}</el-button>
            </el-form-item>
          </el-col>

          <el-col :span="12" class="animated bounceInRight" style="text-align:right">
            <el-form-item>
              <el-input :placeholder="$t('testing.from.searchholder')" style="width:300px;"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="" @click="" icon="el-icon-search">{{$t('testing.from.searchBtn')}}</el-button>
            </el-form-item>
          </el-col>

        </el-row>
      </el-form>

      <!-- 上传文件dialog -->
      <el-dialog title="请上传智能合约代码文件" :visible.sync="uploadDialog" width="30%" :append-to-body='true' style="text-align:center;">
        <div class="uploadDialog-content">
          <el-upload ref="upload" 
            :limit="1"
            :auto-upload="false"  
            drag
            :file-list="fileList"
            :http-request="uploadFile" 
            :on-exceed="handleExceed"
            accept=''
            action="string">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="uploadDialog = false">取 消</el-button>
          <el-button type="primary" @click="submitUpload">确定</el-button>
        </span>
      </el-dialog>

      <!-- 添加合约地址dialog -->
      <el-dialog title="添加合约地址" :visible.sync="addressDialog" width="26%" :append-to-body='true' style="text-align:center;">
        <el-input type="textarea" placeholder="请输入合约地址" v-model="form.desc"></el-input>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addressDialog = false">取 消</el-button>
          <el-button type="primary" @click="submitAddAddress">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 删除dialog -->
      <el-dialog title="提示" :visible.sync="delDialog" width="26%" :append-to-body='true' style="text-align:center;">
        <p>确认删除该智能合约的检测信息？</p>
        <div slot="footer" class="dialog-footer">
          <el-button @click="delDialog = false">取 消</el-button>
          <el-button type="primary" @click="submitDel">确 定</el-button>
        </div>
      </el-dialog>

      <!--列表-->
      <div class="tableLine">
        <el-table ref="multipleTable" v-loading="listLoading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.6)"
        :data="tableData" tooltip-effect="dark" align="left"
        @selection-change="selsChange">
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column :label="$t('testing.List.num')" width="80">
              <template slot-scope="scope">{{ scope.row.id }}</template>
            </el-table-column>
            <el-table-column prop="name" :label="$t('testing.List.contractName')" show-overflow-tooltip width="380">
              <template slot-scope="scope">{{ scope.row.filename }}</template>
            </el-table-column>
            <el-table-column prop="time" :label="$t('testing.List.addTime')" width="170">
              <template slot-scope="scope">{{ scope.row.loaddate }}</template>
            </el-table-column>
            <el-table-column prop="statue" :label="$t('testing.List.statues')" width="140">
              <template slot-scope="scope" :class="scope.row.analysisstatus==1?'align-middle text-success':scope.row.analysisstatus==2?'align-middle text-danger':'align-middle text-waring'" >{{ scope.row.analysisstatus==1?'检测成功':scope.row.analysisstatus==2?'检测失败':'待检测' }}</template>
            </el-table-column>
            <el-table-column :label="$t('testing.List.operations')">
              <template slot-scope="scope">
                <el-button
                  size="mini" icon="el-icon-view"
                  @click="handleSee(scope.$index, scope.row)">{{$t('testing.List.operationsBtn.see')}}</el-button>
                <el-button
                  size="mini" icon="el-icon-delete"
                  @click="delDialog = true">{{$t('testing.List.operationsBtn.del')}}</el-button>
                <el-button
                  size="mini" icon="el-icon-download"
                  @click="handleDownload(scope.$index, scope.row)">{{$t('testing.List.operationsBtn.download')}}</el-button>
              </template>
            </el-table-column>
        </el-table>
      </div>
      <!--工具条-->
      <el-row :span="24" style="padding: 20px 0;">
        <el-col :span="12" class="toolbar" style="text-align:left;">
          <el-button @click="batchRemove" :disabled="this.sels.length===0" style="text-align:left">{{$t('testing.from.allDel')}}</el-button>
        </el-col>
        <el-col :span="12" style="text-align:left;">
          <el-pagination :span="12"  background layout="prev, pager, next" @current-change="" :page-size="7" :total="50" style="float:right;" >
          </el-pagination>
        </el-col>
      </el-row>
  </section>

</template>

<script>
  var pageSize = 10;
  var nowPage = 0;
  var delid = 0;

  import $ from 'jquery'
  export default {
    data() {
      return {
        contracts: {
            nowPages: nowPage,
            data: {content:[]}
        },
        user: {
            username: "",
            userhead: ""
        },
        form: {
          desc: ''
        },
        filters: {
          name: ''
        },
        total: 0,
        page: 1,
        listLoading: false,
        sels: [],//列表选中列
        addFormVisible: false,//新增界面是否显示
        addLoading: false,
        addFormRules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ]
        },
        fileList: [],
        tableData: [],
        multipleSelection: [],
        listLoading: false,
        uploadDialog: false,
        addressDialog: false,
        delDialog: false
      }
    },
    mounted() {
      this.loadList();
      // pageinit();
      this.getContracts();
    },
    methods: {
      //取消全选
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      selsChange(sels) {
        this.sels = sels;
      },
      //批量删除
      batchRemove() {
        var ids = this.sels.map(item => item.id).toString();
        this.$confirm('确认删除选中记录吗？', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = { ids: ids };
          batchRemoveUser(para).then((res) => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getUsers();
          });
        }).catch(() => {

        });
      },
      //查看
      handleSee(id) {
        let routeUrl = this.$router.resolve({
             path: "/TestResult",
             // query: {id:96}
        });
        window.open(routeUrl .href, '_blank');
        // this.$router.push('/TestResult');
        // this.editFormVisible = true;
        // this.editForm = Object.assign({}, row);
      },
      //删除
      submitDel(){
        if(delid>0){
            $.ajax({
                type: "POST",
                dataType: "json",
                url: apiuri +"/admin/file/delfile",
                xhrFields: {withCredentials: true},
                crossDomain: true,
                data:{
                    id: delid
                },
                success: function (result) {
                    if (result.code == 0) {
                        this.$message.success("删除成功");
                    } else {
                        this.$message.error("删除失败");
                        goErrorPage(result.code);
                    }
                    // getContracts(app.contracts.nowPages);
                },
                error: function (result) {
                    console.log(result);
                }
            });
        }
      },
      handleDownload(id){
          location.href = apiurl+"/file/downword/"+id;
      },
      //列表加载
      loadList(){
        // console.log("列表加载");
        this.axios.get(apiurl+"/admin/system/file/getall?page=1&pageSize=10", {
              headers: {
                "Content-Type":"application/json;charset=utf-8"
              },
              withCredentials : true
            })
            .then(res => {
              // console.log(res.data);
              console.log(res.data.data.content);
                this.tableData = res.data.data.content;
            })
            .catch(error => {})
      },
      //分页
      getContracts(page){
        // console.log("分页");
        $.ajax({
            type: "GET",
            dataType: "json",
            url: apiurl+"/admin/system/file/getall?page=1&pageSize=10",
            xhrFields: {withCredentials: true},
            crossDomain: true,
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (result) {
                // var contract = result.data.content;
                if(result.code==0){
                    // app.contracts.data = result.data;
                    // contracts.nowPages = page;
                }else{
                    // alert(result.message)
                    goErrorPage(result.code);
                }
            },
            error: function (result) {
                console.log(result)
            }
        });
      },
      //上传文件
      submitUpload() {
        let list = $('.el-upload-list__item.is-ready');
        console.log(list);
        
        if(list.length == 0){
          this.$message({
            type:'warning',
            message:"请选择智能合约代码文件"
          })
          return;
        }
        this.$refs.upload.submit();
      },
      uploadFile(param){
        var fileObj = param.file;
        // FormData 对象
        var form = new FormData();
        // 文件对象
        form.append("file", fileObj);
        form.append("userId", this.userId);
        form.append("userName", this.userName);
        this.axios.get('url',form).then(res => {
          if(res.data.success == true){
            this.$message({
              type:'success',
              message:res.data.msg
            })
            this.fileList =[]
          } else {
            this.$message({
              type:'success',
              message:res.data.msg
            })
              this.fileList =[]
          }
        })
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      // 添加合约
      submitAddAddress(){
        var address = $(".el-textarea__inner").val();

        if (address != null && address != "" && address.length > 0) {
            var addressarray = address.split("\n")
            var alladdress = "";
            for(var i=0;i<addressarray.length;i++){
                alladdress += addressarray[i];
                if(alladdress.length>0){
                    alladdress +="&";
                }
            }
            $.ajax({
                type: "POST",
                dataType: "json",
                url: apiurl + "/admin/system/etherescan/addcontracts",
                xhrFields: {withCredentials: true},
                crossDomain: true,
                data: {
                    address: alladdress
                },
                success: function (result) {
                    console.log(result)
                    if (result.code == 0) {
                        this.$message({
                          type:'success',
                          message: '添加成功'
                        })
                    } else {
                        this.$message({
                          type:'error',
                          message: '添加失败，请检查合约地址是否正确'
                        })
                        $(".el-textarea__inner").val("")

                    }
                    getContracts(contracts.nowPages);
                },
                error: function (result) {
                    $(".el-textarea__inner").val("")
                }
            });
        } else {
            this.$message.error("请输入合约地址");
        }
      }
    }
  }
</script>

<style>
  .title .sTitle{
    font-size:14px;
  }
  .el-form{margin-top: 5rem;}
  .tableLine{border: 1px solid #fff;border-radius:5px;padding: 10px 15px;margin:0 auto;max-width:1170px;width:100%;}
  .el-table{background-color: transparent;color: #b5bbc1;}
  .el-table::before{display: none;}
  .el-table thead{color: #fff;}
  .el-table th, .el-table tr{background-color: transparent;}
  .el-table td, .el-table th.is-leaf{border: none;}
  .el-table tr:hover{background: none;}
  .el-table--enable-row-hover .el-table__body tr:hover>td {
      background: none;
  }
  .el-table_1_column_2 {text-align:center!important;}
  .el-dialog__footer{text-align: center;}
</style>