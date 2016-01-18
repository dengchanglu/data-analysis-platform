/**
 * Created by perfection on 16-1-11.
 */
var getParamJson = function (reqUrl) {
    var reqDataString = reqUrl.split("?")[1];
    var reqDataArray = reqDataString.split("&");
    var jsonKey_value = "";
    for (var i = 0; i < reqDataArray.length; i++) {
        if (reqDataArray[i].split("=")[0] == "time") {
            var times = reqDataArray[i].split("=")[1].split(",");
            var time = "";
            for (var j = 0; j < times.length; j++) {
                if (times[j].length != 10) {
                    time += times[j].split("-")[0];
                    if (times[j].split("-")[1].length != 2) {
                        time += "-0" + times[j].split("-")[1];
                    } else {
                        time += "-" + times[j].split("-")[1];
                    }
                    if (times[j].split("-")[2].length != 2) {
                        time += "-0" + times[j].split("-")[2];
                    } else {
                        time += "-" + times[j].split("-")[2];
                    }
                }
                time += ","
            }
            jsonKey_value += '"' + "time" + '":"' + time.substring(0, time.length - 1) + '",';
            continue;
        }
        jsonKey_value += '"' + reqDataArray[i].split("=")[0] + '":"' + reqDataArray[i].split("=")[1] + '",';
    }
    var jsonData = '{'
        + jsonKey_value.substring(0, (jsonKey_value.length - 1))
        + '}';
    return eval("(" + jsonData + ")");
};
exports.getParamJson = getParamJson;