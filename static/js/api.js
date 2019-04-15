var apiurl = "https://ozone.mozi.one/api";
$(function() {
    getLoginUser();
    // if (location.href.indexOf("login") == -1 && location.href.indexOf("register") == -1) {
    //     getLoginUser();
    // }
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
            sessionStorage.setItem("data", result.data);
            console.log(sessionStorage.getItem("data"));
            if (result.code == 0) {
                // console.log(result.data.username);
                $("#username").html(result.data.username);
            } else {
                console.log(result);
                // location.href = "/login";
            }
        },
        error: function(result) {}
    });
}

function getParameter(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}