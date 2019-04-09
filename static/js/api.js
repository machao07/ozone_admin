function hasLogin() {
    this.axios.get(apiuri + "/admin/usermsg")
        .then(function(data) {
            if (data.daapita.code == 0) { //首页
                location.href = "/";
            }
        }).catch(function(error) {});
}

//登出
function logout() {
    this.axios.get(apiuri + "/user/logout")
        .then(result => {
            location.href = "/";
            return;
        }).catch(error => {
            location.href = "/login";
            return;
        })

    // $.ajax({
    //     type: "GET",
    //     dataType: "json",
    //     url: apiuri + "/user/logout",
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
}

function goErrorPage(code) {
    if (code == 1001) { //没有登录
        // location.href = "/login";
    } else if (code == 1002) { //无权限
        // location.href = "/auth.html";
    } else if (code == -2) { //系统错误
        location.href = "/404";
    }
    return code;
}