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
          <!-- 上传文件、添加合约 -->
          <el-col :span="24" class="animated bounceInLeft" style="text-align:left">
            <el-form-item>
                <el-button type="" @click="uploadDialog = true" icon="el-icon-upload">{{$t('testing.from.upLoad')}}</el-button>
            </el-form-item>

            <el-form-item>
              <el-button type="" @click="addressDialog = true" icon="el-icon-circle-plus">{{$t('testing.from.addContract')}}</el-button>
            </el-form-item>
          </el-col>

          <!-- 搜索框 -->
          <!-- <el-col :span="12" class="animated bounceInRight" style="text-align:right">
            <el-form-item>
              <el-input type="search" v-model="search" :placeholder="$t('testing.from.searchholder')" style="width:300px;"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="" @click="" icon="el-icon-search">{{$t('testing.from.searchBtn')}}</el-button>
            </el-form-item>
          </el-col> -->

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
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            accept=''
            action=""
            multiple>
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
        <el-input type="input" placeholder="请输入合约地址" v-model="form.desc">{{ form.desc }}</el-input>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addressDialog = false">取 消</el-button>
          <el-button type="primary" @click="submitAddAddress">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 删除dialog -->
      <!-- <el-dialog title="提示" :visible.sync="delDialog" width="26%" :append-to-body='true' style="text-align:center;">
        <p>确认删除该智能合约的检测信息？</p>
        <div slot="footer" class="dialog-footer">
          <el-button @click="delDialog = false">取 消</el-button>
          <el-button type="primary" @click="submitDel">确 定</el-button>
        </div>
      </el-dialog> -->

      <!--列表-->
      <div class="tableLine">
        <el-table ref="multipleTable" v-loading="listLoading"
        empty-text=" "
        element-loading-text="加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.6)"
        :data="tableData" tooltip-effect="dark" align="left"
        @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column :label="$t('testing.List.num')" width="80">
              <template slot-scope="scope">{{ scope.row.id }}</template>
            </el-table-column>
            <el-table-column prop="tableName" :label="$t('testing.List.contractName')" show-overflow-tooltip width="380">
              <template slot-scope="scope">{{ scope.row.filename }}</template>
            </el-table-column>
            <el-table-column prop="tableTime" :label="$t('testing.List.addTime')" width="170">
              <template slot-scope="scope">{{ scope.row.loaddate }}</template>
            </el-table-column>
            <el-table-column prop="tableStatue" :label="$t('testing.List.statues')" width="140">
              <template slot-scope="scope">
                <span class="text_success" v-if="scope.row.analysisstatus == 1">检测成功</span>
                <span class="text_danger" v-else-if="scope.row.analysisstatus == 2">检测失败</span>
                <span class="text_wraning" v-else>待检测</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('testing.List.operations')">
              <template slot-scope="scope">
                <el-button
                  size="mini" icon="el-icon-view"
                  @click="handleSee(scope.$index, scope.row)">{{$t('testing.List.operationsBtn.see')}}</el-button>
                <el-button
                  size="mini" icon="el-icon-delete"
                  @click="handleDelete(scope.$index, scope.row)">{{$t('testing.List.operationsBtn.del')}}</el-button>
                <el-button v-if="scope.row.wordStatus==0 && scope.row.analysisstatus==1"
                  size="mini" icon="el-icon-document" 
                  @click="produceword(scope.$index, scope.row)">生成报告</el-button>
                <el-button v-if="scope.row.wordStatus==1 && scope.row.analysisstatus==1"
                  size="mini" icon="el-icon-download"
                  @click="handleDownload(scope.$index, scope.row)">{{$t('testing.List.operationsBtn.download')}}</el-button>
              </template>
            </el-table-column>
        </el-table>
      </div>
      <!--工具条-->
      <el-row :span="24" style="padding: 20px 0;">
        <el-col :span="12" class="toolbar" style="text-align:left;">
          <el-button @click="batchRemove()" :disabled="this.multipleSelection.length===0" style="text-align:left">{{$t('testing.from.allDel')}}</el-button>
        </el-col>
        <el-col :span="12" style="text-align:left;">
          <el-pagination :span="12"  background 
          layout="total, prev, pager, next"
          :current-page="currentPage" 
          :page-size="pageSize"
          :total="total"
          @current-change="handleCurrentChange" 
          @size-change="handleSizeChange"
          style="float:right;" >
          </el-pagination>
        </el-col>
      </el-row>
  </section>

</template>

<script>
  // var pageSize = 10;
  // var nowPage = 0;
  // var delid = 0;

  import $ from 'jquery'
  import qs from 'qs';

  export default {
    data() {
      return {
        user: {
            username: "",
            userhead: ""
        },
        form: {
          desc: ''
        },
        search: '',
        // page: 1,
        currentPage: 1,
        pageSize: 10,
        total: 0,
        id: 0,
        listLoading: false,
        tableData: [],
        multipleSelection: [],
        ids: [], //批量删除id
        sels: [],//列表选中列
        fileList: [],
        uploadDialog: false,
        addressDialog: false,
        delDialog: false
      }
    },
    mounted() {
      this.getListData(1);
    },
    created(){
      // this.getListData(1);
      // this.handleSizeChange()
    },
    computed: {
      //模糊搜索
      // tables() {                
      //     const search = this.search               
      //     if (search) {                    
      //         return this.tableData.filter(dataNews => {                        
      //             return Object.keys(dataNews).some(key => {                            
      //                 return String(dataNews[key]).toLowerCase().indexOf(search) > -1                        
      //             })                    
      //         })                
      //     }                
      //     return this.tableData; 
      //                
      // }
    },
    methods: {
      //切换数据
      handleSizeChange(val) {
          this.pageSize = val;
          this.currentPage = 1;
          this.getListData(1, val);
          // console.log(`每页: ${val}条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getListData(val, this.pageSize);
        // console.log(`当前页: ${val}`);
      },
      //获取列表
      getListData(page) {
        this.listLoading = true;
        this.axios.get(apiurl + "/admin/system/file/getall", {
              params:{
                  page: page,
                  pageSize: this.pageSize
              }
          }).then(res => {
                this.tableData = res.data.data.content;
                this.total = res.data.data.totalElements;
                this.listLoading = false;
                // console.log(this.tableData);
                // this.contracts.data = res.data.data;
                // console.log(this.contracts.data);
                // this.contracts.nowPages = page;
                // console.log(res.data);

          }).catch(error => {})
      },
      // 单行删除
      handleDelete(index){
          let _this = this;
          _this.id = this.tableData[index].id;
          // console.log(_this.id);
          _this.$confirm(
          "确认删除该智能合约的检测信息？", {
              confirmButtonText: "确定",
              cancelbuttonText: "取消",
              type: "warning"
          })
          .then(() => {
              this.axios({
                  url: apiurl + "/admin/file/delfile",
                  dataType: "json",
                  method: "post",
                  headers: {
                    "Content-Type":"application/json;charset=utf-8"
                  },
                  withCredentials : true,
                  params:{
                    id: _this.id
                  }
                }).then(res => {
                      // console.log(res.data);
                      if(res.data.code == 0 ){
                        this.$message({
                          type: "success",
                          message: "删除成功"
                        })
                        this.getListData(this.currentPage);
                      // this.tableData.splice(index, 1);
                      // getContracts(this.contracts.nowPages);
                      }
                  })
          })
          .catch(() => {
              this.$message({
                  type: "info",
                  message: "已取消删除"
              })
          })
      },
      //批量删除
      batchRemove() {
          var _this = this;
          let selData = _this.multipleSelection;
          selData.forEach( element => {
            _this.ids.push(element.id)
          })
          console.log(_this.ids);
          var data = qs.stringify({id : _this.ids});

          _this.$confirm('确认删除所选中项?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
              _this.axios.post(apiurl + "/admin/file/delfile",data,{
                headers:{'Content-Type':'application/x-www-form-urlencoded'}
              }).then(res => {
                  // console.log(res.data);
                  if(res.data.code == 0 ){
                    this.$message.success("删除成功");
                    this.getListData(this.currentPage);
                  // this.tableData.splice(index, 1);
                  // getContracts(this.contracts.nowPages);
                  }else{
                    this.$message.error("删除失败");
                  }
              }).catch( err => {
                console.log(err);
              })
          }).catch((err) => {
                _this.$message.info("已取消删除");
            })
      },
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
        console.log(this.multipleSelection);
        if (this.multipleSelection.length == 0) {   
          this.multipleSelectionFlag = false;
        }
      },
      selsChange(sels) {
        this.sels = sels;
      },
      //查看
      handleSee(index) {
        var id = this.tableData[index].id;
        location.href = "/TestResult?id="+id;
      },
      //生成报告
      produceword(index) {
        var id = this.tableData[index].id;
        this.axios({
          url: apiurl + "/admin/file/getword/" + id,
          dataType: "json",
          method: "get",
          headers: {
            "Content-Type":"application/json;charset=utf-8"
          },
          withCredentials : true,
        }).then(res => {
              // console.log(res.data);
                this.$message({
                  type: "success",
                  message: "已生成报告"
                })
                this.getListData(this.currentPage);
                // this.listLoading = false;
                // this.tableData.splice(index, 1);
        }).catch(()=>{})
      },
      //下载报告
      handleDownload(index){
          var id = this.tableData[index].id
          location.href = apiurl+"/file/downword/"+id;
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
      //上传文件接口
      uploadFile(param){
        var fileObj = param.file;
        console.log(fileObj);
        var form = new FormData();
        form.append("uploadfile", fileObj);
        this.axios.post(apiurl + '/admin/file/upload', form)
          .then(res => {
            if(res.data.code == 0){
              this.uploadDialog = false;
              this.$message.success("文件上传成功");
              this.getListData(this.currentPage);
              this.fileList = [];
            } else {
              this.$message.error("文件上传失败,错误信息：" + data.message);
              this.getListData(this.currentPage);
              this.fileList = [];
            }
          })
          .catch( res => {
            this.fileList = [];
            // this.$message.info("已取消上传");
          })
      },
      handleRemove(file, fileList) {
        return this.$confirm.success("移除成功");
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      // 添加合约
      submitAddAddress(){
        var address = this.form.desc;
        // console.log(this.form.desc);
        if (address != null && address != "" && address.length > 0) {
            var data = qs.stringify({address : this.form.desc});
            this.axios.post(apiurl + "/admin/system/etherescan/addcontracts", data, 
            {
              headers:{'Content-Type':'application/x-www-form-urlencoded'}
            }).then(res => {
                  if (res.data.code == 0) {
                    this.addressDialog = false;
                    this.$message.success("添加成功");
                  } else {
                    this.$message.error("添加失败，请检查合约地址是否正确");
                    this.form.desc = '';
                  }
                  this.getListData(this.currentPage);
            }).catch((res)=>{
              this.form.desc = '';
              // this.$message.info("已取消添加");
            })
            
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