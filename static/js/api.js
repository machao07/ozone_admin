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
            sessionStorage.setItem("data", result.data);
            // sessionStorage.setItem("code", result.code);
            sessionStorage.setItem("islogin", result.code);
            console.log(sessionStorage.getItem("data"));
            if (result.code == 0) {
                sessionStorage.setItem("user", result.data.username);
                // console.log(result.data.username);
                $("#username").html(result.data.username);
            } else {
                console.log(result);
                // location.href = "#/login";
            }
        },
        error: function(result) {
            // location.href = "/login";
        }
    });
}