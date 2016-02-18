/**
 * Created by perfection on 16-2-16.
 */
var convertText = function (text) {
    switch (text) {
        case "page_login":
            return "登录页面";
        case "page_buy":
            return "购买页面";
        case "page_personalInfo":
            return "个人中心页面";
        case "page_register":
            return "注册页面";
        default :
            return "";
    }
};
exports.convertText = convertText;