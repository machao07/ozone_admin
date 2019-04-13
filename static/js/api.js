var apiurl = "https://ozone.mozi.one/api";
$(function() {
    if (location.href.indexOf("login") == -1 && location.href.indexOf("register") == -1) {
        getLoginUser();
    }
});

function getLoginUser() {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: apiurl + "/admin/usermsg",
        xhrFields: { withCredentials: true },
        crossDomain: true,
        success: function(result) {
            // console.log(result);
            sessionStorage.setItem("code", result.code);
            console.log(sessionStorage.getItem("code"));
            if (result.code == 0) {
                // console.log(result.data.username);
                $("#username").html(result.data.username);
            } else {
                location.href = "/login";
            }
        },
        error: function(result) {}
    });
  }

function hasLogin() {
    this.axios.get(apiurl + "/admin/usermsg")
        .then(function(data) {
            if (data.code == 0) { //首页
                location.href = "/";
            }
        }).catch(function(error) {});
}


//登出
function logout() {
    this.axios.get(apiurl + "/user/logout")
        .then(result => {
            location.href = "/";
            return;
        }).catch(error => {
            location.href = "/login";
            return;
        })
}
// $.ajax({
//     type: "GET",
//     dataType: "json",
//     url: apiurl + "/user/logout",
//     xhrFields: { withCredentials: true },
//     crossDomain: true,
//     success: function(result) {
//         location.href = "/";
//         return;
//     },
//     error: function(result) {
//         location.href = "/login";
//         return;
//     }
// });


function goErrorPage(code) {
    if (code == 1001) { //没有登录
        location.href = "/login";
    } else if (code == 1002) { //无权限
        location.href = "/login";
    } else if (code == -2) { //系统错误
        location.href = "/404";
    }
    console.log(code);
}


function getParameter(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
