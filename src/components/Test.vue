<template>
  <section style="max-width:1200px;width:100%;margin:0 auto;padding-bottom:100px;">
    <div class="title">
      <p class="mTitle animated fadeInUpBig" style="animation-duration: 1s;">智能合约检测</p>
      <div class="line animated fadeInUpBig" style="animation-delay: 0.3s;"></div>
      <p class="sTitle animated fadeInUpBig" style="animation-delay: 0.5s; animation-duration: 1.2s;">添加智能合约地址，上传智能合约代码文件。</p>
    </div>

    <!--工具条-->
      <el-form :inline="true" :model="filters">
        <el-row :span="24">
          <el-col :span="12" style="text-align:left">
            <el-form-item>
              <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="1"
              :on-exceed="handleExceed"
              :file-list="fileList">
                <el-button type="" icon="el-icon-upload">上传文件</el-button>
              </el-upload>
            </el-form-item>

            <el-form-item>
              <el-button type="" @click="handleAdd" icon="el-icon-circle-plus">添加合约</el-button>
            </el-form-item>
          </el-col>

          <el-col :span="12" style="text-align:right">
            <el-form-item>
              <el-input v-model="filters.name" placeholder="搜素" style="width:300px;"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="" v-on:click="getUsers" icon="el-icon-search">查询</el-button>
            </el-form-item>
          </el-col>

        </el-row>
      </el-form>

      <!--列表-->
      <div class="tableLine">
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" align="left" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="45"></el-table-column>
            <el-table-column label="编号" width="55">
              <template slot-scope="scope">{{ scope.row.num }}</template>
            </el-table-column>
            <el-table-column prop="name" label="合约/文件名称" show-overflow-tooltip width="400"></el-table-column>
            <el-table-column prop="time" label="添加时间" width="200"></el-table-column>
            <el-table-column prop="statue" label="检测状态" width="150"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini" icon="el-icon-view"
                  @click="handleEdit(scope.$index, scope.row)">查看</el-button>
                <el-button
                  size="mini" icon="el-icon-delete"
                  @click="handleDel(scope.$index, scope.row)">删除</el-button>
                <el-button
                  size="mini" icon="el-icon-download"
                  @click="handleEdit(scope.$index, scope.row)">下载报告</el-button>
              </template>
            </el-table-column>
        </el-table>
      </div>
      <!--工具条-->
      <el-row :span="24" style="padding: 20px 0;">
        <el-col :span="12" class="toolbar" style="text-align:left;">
          <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0" style="text-align:left">批量删除</el-button>
        </el-col>
        <el-col :span="12" style="text-align:left;">
          <el-pagination :span="12"  background layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="7" :total="50" style="float:right;" >
          </el-pagination>
        </el-col>
      </el-row>
  </section>

</template>

<script>
  export default {
    data() {
      return {
        filters: {
          name: ''
        },
        users: [],
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
        //新增界面数据
        addForm: {
          name: '',
          sex: -1,
          age: 0,
          birth: '',
          addr: ''
        },
        fileList: [{}],
        tableData: [{
          num: '22',
          name: 'test_erc20_open_new_20190326.sol',
          time: '2019-03-28 14:33:02',
          statue: '检测成功'
        }, {
          num: '13',
          name: '0xA5fccc3F1A4e56fDA5A86F0fe8B7558881B67523.sol',
          time: '2019-03-28 14:33:02',
          statue: '检测成功'
        }, {
          num: '12',
          name: 'test_erc20_open_new_20190326.sol',
          time: '2019-03-28 14:33:02',
          statue: '检测成功'
        }, {
          num: '11',
          name: '0xA5fccc3F1A4e56fDA5A86F0fe8B7558881B67523.sol',
          time: '2019-03-28 14:33:02',
          statue: '检测成功'
        }, {
          num: '8',
          name: 'test_erc20_open_new_20190326.sol',
          time: '2019-03-28 14:33:02',
          statue: '检测成功'
        }, {
          num: '7',
          name: '0xA5fccc3F1A4e56fDA5A86F0fe8B7558881B67523.sol',
          time: '2019-03-28 14:33:02',
          statue: '检测成功'
        }, {
          num: '6',
          name: 'test_erc20_open_new_20190326.sol',
          time: '2019-03-28 14:33:02',
          statue: '检测成功'
        }],
        multipleSelection: []
      }
    },
    methods: {
      // 上传文件
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
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
      },

      //
      handleCurrentChange(val) {
        this.page = val;
        this.getUsers();
      },
      //获取用户列表
      getUsers() {
        let para = {
          page: this.page,
          name: this.filters.name
        };
        this.listLoading = true;
        // NProgress.start();
        getUserListPage(para).then((res) => {
          this.total = res.data.total;
          this.users = res.data.users;
          this.listLoading = false;
          //NProgress.done();
        });
      },
      //删除
      handleDel: function (index, row) {
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = { id: row.id };
          removeUser(para).then((res) => {
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
      //显示新增界面
      handleAdd: function () {
        this.addFormVisible = true;
        this.addForm = {
          name: '',
          sex: -1,
          age: 0,
          birth: '',
          addr: ''
        };
      },
      //新增
      addSubmit: function () {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.addLoading = true;
              //NProgress.start();
              let para = Object.assign({}, this.addForm);
              para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
              addUser(para).then((res) => {
                this.addLoading = false;
                //NProgress.done();
                this.$message({
                  message: '提交成功',
                  type: 'success'
                });
                this.$refs['addForm'].resetFields();
                this.addFormVisible = false;
                this.getUsers();
              });
            });
          }
        });
      },
      selsChange: function (sels) {
        this.sels = sels;
      },
      //批量删除
      batchRemove: function () {
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
      }
    },
    mounted() {
      this.getUsers();
    }
}
</script>

<style>
  .title .sTitle{
    font-size:14px;
  }
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
</style>