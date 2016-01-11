/**
 * Created by perfection on 16-1-11.
 */
var getParamJson = function (reqUrl) {
    var reqDataString = reqUrl.split("?")[1];
    var reqDataArray = reqDataString.split("&");
    var jsonKey_value = "";
    for (var i = 0; i < reqDataArray.length; i++) {
        jsonKey_value += '"' + reqDataArray[i].split("=")[0] + '":"' + reqDataArray[i].split("=")[1] + '",';
    }
    var jsonData = '{'
        + jsonKey_value.substring(0, (jsonKey_value.length - 1))
        + '}';
    return eval("(" + jsonData + ")");
};
exports.getParamJson = getParamJson;