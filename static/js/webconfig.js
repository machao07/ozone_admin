var apiurl = "https://ozone.mozi.one/api";
// $(function() {
//     if (location.href.indexOf("Login") == -1 && location.href.indexOf("Register") == -1) {
//         getLoginUser();
//     }
// });

function getLoginUser() {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: apiurl + "/admin/usermsg",
        xhrFields: { withCredentials: true },
        crossDomain: true,
        success: function(result) {
            if (result.code == 0) {
                $("#username").html(result.data.username);
            } else {
                location.href = "/login";
            }
        },
        error: function(result) {
            location.href = "/login";
            return;
        }
    });
}


function logout() {
    this.axios.get(apiurl + "/user/logout")
        .then(result => {
            location.href = "/login";
            return;
        }).catch(error => {
            location.href = "/login";
            return;
        })
}

function getParameter(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}