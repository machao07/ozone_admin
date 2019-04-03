<template>
  <section class="container">
    <div class="title">
      <p class="mTitle animated fadeInUpBig">智能合约检测</p>
      <div class="line animated fadeInUpBig" style="animation-delay: 0.1s;"></div>
      <p class="sTitle animated fadeInUpBig" style="animation-delay: 0.2s; animation-duration: 1.2s;">添加智能合约地址，上传智能合约代码文件。</p>
    </div>

    <!--工具条-->
      <el-form :inline="true">
        <el-row :span="24">
          <el-col :span="12" class="animated bounceInLeft" style="text-align:left">
            <el-form-item>
                <el-button type="" icon="el-icon-upload">{{$t('testing.from.upLoad')}}</el-button>
            </el-form-item>

            <el-form-item>
              <el-button type="" @click="" icon="el-icon-circle-plus">添加合约</el-button>
            </el-form-item>
          </el-col>

          <el-col :span="12" class="animated bounceInRight" style="text-align:right">
            <el-form-item>
              <el-input placeholder="搜素" style="width:300px;"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="" v-on:click="" icon="el-icon-search">查询</el-button>
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
            <el-table-column prop="name" label="合约/文件名称" show-overflow-tooltip width="400">
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column prop="time" label="添加时间" width="200">
              <template slot-scope="scope">{{ scope.row.time }}</template>
            </el-table-column>
            <el-table-column prop="statue" label="检测状态" width="150">
              <template slot-scope="scope">{{ scope.row.statue }}</template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini" icon="el-icon-view"
                  @click="handleSee(scope.$index, scope.row)">查看</el-button>
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
          <el-button type="danger" @click="" :disabled="this.sels.length===0" style="text-align:left">批量删除</el-button>
        </el-col>
        <el-col :span="12" style="text-align:left;">
          <el-pagination :span="12"  background layout="prev, pager, next" @current-change="" :page-size="7" :total="50" style="float:right;" >
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
    mounted() {
      this.loadList();
      // pageinit();
      // getContracts();
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

      loadList(){
        this.$ajax({
          method: 'get',
          dataType: 'json',
          url: 'https://ozone.mozi.one/api/admin/system/file/getall?page=1&pageSize=10'
        }).then(res => {
            console.log(res.data)
        })
      },
      //分页
      getContracts(page){
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "https://ozone.mozi.one/api/admin/system/file/getall?page=1&pageSize=10",
            xhrFields: {withCredentials: true},
            crossDomain: true,
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (result) {
                var contract = result.data.content;
                if(result.code==0){
                    app.contracts.data = result.data;
                    app.contracts.nowPages = page;
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
      //查看
      handleSee(id) {
        this.$router.push('TestResult')
        // this.editFormVisible = true;
        // this.editForm = Object.assign({}, row);
      },
      delUserFile(id){
        if(id>-1){
            delid = id;
            $('#delmodel').modal('show')
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
</style>