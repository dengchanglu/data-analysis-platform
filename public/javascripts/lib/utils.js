var changeRootPage;
var getPageInfo;
var closePageInfo;
var convert = function (text) {
    switch (text) {
        case "page_login":
            return "登录页面";
        case "page_buy":
            return "购买页面";
        case "page_personalInfo":
            return "个人中心页面";
        case "page_register":
            return "注册页面";
        case "登录页面":
            return "page_login";
        case "购买页面":
            return "page_buy";
        case "个人中心页面":
            return "page_personalInfo";
        case "注册页面":
            return "page_register";
        default :
            return "";
    }
};
var favorSource = function (id) {
    if (document.getElementById("child_" + id).style.display == 'none') {
        for (var i = 0; i < document.getElementsByClassName("custom-flow-view-downpages").length; i++) {
            document.getElementById("child_source_" + i).style.display = "none";
        }
        document.getElementById("child_" + id).style.display = "block";
    }
};
getPageInfo = function (id) {
    document.getElementById(id).style.display = "block";
};
closePageInfo = function(id){
    document.getElementById(id).style.display = "none";
};