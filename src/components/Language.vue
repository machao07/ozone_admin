<template>
    <el-dropdown trigger="click" class='international' @command="handleSetLanguage">
      <div>
        <span class="el-dropdown-link">{{language}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="cn">中文</el-dropdown-item>
        <el-dropdown-item command="en">English</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
    export default{
      data(){
        return{
          language: '中文'
        }
      },
      mouted(){
        const _lang = localStorage.lang || 'cn';
        this.getLanguage(_lang);
        let href  =window.location.href;
        this.defaultUrl = href.split('')[1];
      },
      watch: {

      },
      methods:{
        // 切换中英文
        handleSetLanguage (lang) {
          this.$i18n.locale = lang
          localStorage.setItem('lang', lang)
          this.getLanguage(lang)
        },
        getLanguage (val) {
          if (val === 'cn') {
            this.language = '中文'
          }
          if (val === 'en') {
            this.language = 'English'
          }
        },
      }
    }
</script>

<style>
    .el-dropdown-link {
      cursor: pointer;
      color: #fff;
    }
</style>