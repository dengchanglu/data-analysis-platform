/**
 * Created by perfection on 16-1-11.
 */
var util = require('../util/convertToChinese');
var upAnalysis = {
    sexSearch: function (es, queryData, callback) {
        var index = [];
        var time = queryData.time.split(",");
        for (var i = 0; i < time.length; i++) {
            index.push("app-" + time[i]);
        }
        var requestJson = {
            "index": index,
            "type": "appLog",
            "body": {
                "size": 0,
                "query": {
                    "match_all": {}
                },
                "aggs": {
                    "data": {
                        "terms": {
                            "field": "sex",
                            "size": "0"
                        },
                        "aggs": {
                            "sex_count": {
                                "cardinality": {
                                    "field": "ip"
                                }
                            }
                        }
                    }
                }
            }
        };

        es.search(requestJson).then(function (response) {
            var data = [];
            if (response != null && response.aggregations != null && response.aggregations.data.buckets != []) {
                var res = response.aggregations.data.buckets;
                for (var i = 0; i < res.length; i++) {
                    data.push(
                        {
                            "key": res[i].key,
                            "sex_count": res[i].sex_count.value
                        }
                    );
                }
            }
            callback(data);
        });
    },
    ageSearch: function (es, queryData, callback) {
        var index = [];
        var time = queryData.time.split(",");
        for (var i = 0; i < time.length; i++) {
            index.push("app-" + time[i]);
        }
        var requestJson = {
            "index": index,
            "type": "appLog",
            "body": {
                "size": 0,
                "query": {
                    "match_all": {}
                },
                "aggs": {
                    "data": {
                        "terms": {
                            "field": "ar",
                            "size": "0"
                        },
                        "aggs": {
                            "age_count": {
                                "cardinality": {
                                    "field": "ip"
                                }
                            }
                        }
                    }
                }
            }
        };

        es.search(requestJson).then(function (response) {
            var data = [];
            if (response != null && response.aggregations != null && response.aggregations.data.buckets != []) {
                var res = response.aggregations.data.buckets;
                for (var i = 0; i < res.length; i++) {
                    data.push(
                        {
                            "key": res[i].key,
                            "age_count": res[i].age_count.value
                        }
                    );
                }
            }
            callback(data);
        });
    },
    regionSearch: function (es, queryData, callback) {
        var index = [];
        var time = queryData.time.split(",");
        for (var i = 0; i < time.length; i++) {
            index.push("app-" + time[i]);
        }
        var requestJson = {
            "index": index,
            "type": "appLog",
            "body": {
                "size": 0,
                "query": {
                    "match_all": {}
                },
                "aggs": {
                    "data": {
                        "terms": {
                            "field": "city",
                            "size": "0"
                        },
                        "aggs": {
                            "region_count": {
                                "cardinality": {
                                    "field": "ip"
                                }
                            }
                        }
                    }
                }
            }
        };

        es.search(requestJson).then(function (response) {
            var data = [];
            if (response != null && response.aggregations != null && response.aggregations.data.buckets != []) {
                var res = response.aggregations.data.buckets;
                for (var i = 0; i < res.length; i++) {
                    data.push(
                        {
                            "key": res[i].key,
                            "region_count": res[i].region_count.value
                        }
                    );
                }
            }
            callback(data);
        });
    },
    professionSearch: function (es, queryData, callback) {
        var index = [];
        var time = queryData.time.split(",");
        for (var i = 0; i < time.length; i++) {
            index.push("app-" + time[i]);
        }
        var requestJson = {
            "index": index,
            "type": "appLog",
            "body": {
                "size": 0,
                "query": {
                    "match_all": {}
                },
                "aggs": {
                    "data": {
                        "terms": {
                            "field": "ind",
                            "size": "0"
                        },
                        "aggs": {
                            "pro_count": {
                                "cardinality": {
                                    "field": "ip"
                                }
                            }
                        }
                    }
                }
            }
        };

        es.search(requestJson).then(function (response) {
            var data = [];
            if (response != null && response.aggregations != null && response.aggregations.data.buckets != []) {
                var res = response.aggregations.data.buckets;
                for (var i = 0; i < res.length; i++) {
                    data.push(
                        {
                            "key": res[i].key,
                            "pro_count": res[i].pro_count.value
                        }
                    );
                }
            }
            callback(data);
        });
    },
    eduSearch: function (es, queryData, callback) {
        var index = [];
        var time = queryData.time.split(",");
        for (var i = 0; i < time.length; i++) {
            index.push("app-" + time[i]);
        }
        var requestJson = {
            "index": index,
            "type": "appLog",
            "body": {
                "size": 0,
                "query": {
                    "match_all": {}
                },
                "aggs": {
                    "data": {
                        "terms": {
                            "field": "edu",
                            "size": "0"
                        },
                        "aggs": {
                            "edu_count": {
                                "cardinality": {
                                    "field": "ip"
                                }
                            }
                        }
                    }
                }
            }
        };

        es.search(requestJson).then(function (response) {
            var data = [];
            if (response != null && response.aggregations != null && response.aggregations.data.buckets != []) {
                var res = response.aggregations.data.buckets;
                for (var i = 0; i < res.length; i++) {
                    data.push(
                        {
                            "key": res[i].key,
                            "edu_count": res[i].edu_count.value
                        }
                    );
                }
            }
            callback(data);
        });
    },
    versionSearch: function (es, queryData, callback) {
        var queryBody;
        if (queryData.cm == "all") {
            queryBody = {
                "bool": {
                    "should": []
                }
            };
        } else {
            if (queryData.cm == "unknown") {
                queryBody = {
                    "bool": {
                        "must": [{
                            "term": {
                                "cm": "未知"
                            }
                        }],
                        "should": [],
                        "minimum_should_match": 1

                    }
                };
            } else {
                queryBody = {
                    "bool": {
                        "must": [{
                            "term": {
                                "cm": queryData.cm
                            }
                        }],
                        "should": [],
                        "minimum_should_match": 1

                    }
                };
            }
        }
        var avs = queryData.av.split(",");
        for (var j = 0; j < avs.length; j++) {
            if (avs[j] == "unknown") {
                queryBody.bool.should.push({
                    "term": {
                        "av": "未知"
                    }
                });
            } else {
                queryBody.bool.should.push({
                    "term": {
                        "av": avs[j]
                    }
                });
            }
        }
        var index = [];
        var time = queryData.time.split(",");
        for (var i = 0; i < time.length; i++) {
            index.push("app-" + time[i]);
        }
        var requestJson = {
            "index": index,
            "type": "appLog",
            "body": {
                "size": 0,
                "query": queryBody,
                "aggs": {
                    "index": {
                        "terms": {
                            "field": "_index"
                        },
                        "aggs": {
                            "data": {
                                "terms": {
                                    "field": "av",
                                    "size": "0"
                                },
                                "aggs": {
                                    "register_user": {
                                        "filter": {
                                            "term": {
                                                "btn": "注册"
                                            }
                                        }
                                    },
                                    "start_count": {
                                        "filter": {
                                            "term": {
                                                "is": 1
                                            }
                                        }
                                    },
                                    "active_user": {
                                        "cardinality": {
                                            "field": "ip"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };
        var getData = function (data) {

            var dataTem = [];
            for (var j = 0; j < data.length; j++) {
                dataTem.push({
                    "key": data[j].key,
                    "active_user": data[j].active_user.value,
                    "start_count": data[j].start_count.doc_count,
                    "register_user": data[j].register_user.doc_count
                });
            }
            return dataTem;
        };
        es.search(requestJson).then(function (response) {
            var data = [];
            var dataSort = [];
            if (response != null && response.aggregations != null && response.aggregations.index.buckets != []) {
                var res = response.aggregations.index.buckets;

                var i = 0;
                for (i = 0; i < res.length; i++) {
                    data.push(
                        {
                            "index": res[i].key.substring(4, res[i].key.length),
                            "data": getData(res[i].data.buckets)
                        }
                    );
                }
                for (i = 0; i < time.length; i++) {
                    for (var j = 0; j < data.length; j++) {
                        if (time[i] == data[j].index) {
                            dataSort.push({
                                index: data[j].index,
                                data: data[j].data
                            });
                        }
                    }
                }
            }
            callback(dataSort);
        });
    },
    channelSearch: function (es, queryData, callback) {
        var queryBody;
        if (queryData.av == "all") {
            queryBody = {
                "bool": {
                    "should": []
                }
            };
        } else {
            if (queryData.av == "unknown") {
                queryBody = {
                    "bool": {
                        "must": [{
                            "term": {
                                "av": "未知"
                            }
                        }],
                        "should": [],
                        "minimum_should_match": 1

                    }
                };
            } else {
                queryBody = {
                    "bool": {
                        "must": [{
                            "term": {
                                "av": queryData.av
                            }
                        }],
                        "should": [],
                        "minimum_should_match": 1

                    }
                };
            }
        }
        var cms = queryData.cm.split(",");
        for (var j = 0; j < cms.length; j++) {
            if (cms[j] == "unknown") {
                queryBody.bool.should.push({
                    "term": {
                        "cm": "未知"
                    }
                });
            } else {
                queryBody.bool.should.push({
                    "term": {
                        "cm": cms[j]
                    }
                });
            }
        }
        var index = [];
        var time = queryData.time.split(",");
        for (var i = 0; i < time.length; i++) {
            index.push("app-" + time[i]);
        }
        var requestJson = {
            "index": index,
            "type": "appLog",
            "body": {
                "size": 0,
                "query": queryBody,
                "aggs": {
                    "index": {
                        "terms": {
                            "field": "_index"
                        },
                        "aggs": {
                            "data": {
                                "terms": {
                                    "field": "cm",
                                    "size": "0"
                                },
                                "aggs": {
                                    "register_user": {
                                        "filter": {
                                            "term": {
                                                "btn": "注册"
                                            }
                                        }
                                    },
                                    "start_count": {
                                        "filter": {
                                            "term": {
                                                "is": 1
                                            }
                                        }
                                    },
                                    "active_user": {
                                        "cardinality": {
                                            "field": "ip"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };
        var getData = function (data) {

            var dataTem = [];
            for (var j = 0; j < data.length; j++) {
                dataTem.push({
                    "key": data[j].key,
                    "active_user": data[j].active_user.value,
                    "start_count": data[j].start_count.doc_count,
                    "register_user": data[j].register_user.doc_count
                });
            }
            return dataTem;
        };
        es.search(requestJson).then(function (response) {
            var data = [];
            var dataSort = [];
            if (response != null && response.aggregations != null && response.aggregations.index.buckets != []) {
                var res = response.aggregations.index.buckets;

                var i = 0;
                for (i = 0; i < res.length; i++) {
                    data.push(
                        {
                            "index": res[i].key.substring(4, res[i].key.length),
                            "data": getData(res[i].data.buckets)
                        }
                    );
                }
                for (i = 0; i < time.length; i++) {
                    for (var j = 0; j < data.length; j++) {
                        if (time[i] == data[j].index) {
                            dataSort.push({
                                index: data[j].index,
                                data: data[j].data
                            });
                        }
                    }
                }
            }
            callback(dataSort);
        });
    },
    timeOfUsingSearch: function (es, queryData, callback) {
        var queryBody = {
            "bool": {
                "should": []
            }
        };
        var j = 0;
        if (queryData.av != "all") {
            var avs = queryData.av.split(",");
            for (j = 0; j < avs.length; j++) {
                if (avs[j] == "unknown") {
                    queryBody.bool.should.push({
                        "term": {
                            "av": "未知"
                        }
                    });
                } else {
                    queryBody.bool.should.push({
                        "term": {
                            "av": avs[j]
                        }
                    });
                }
            }
        }
        if (queryData.cm != "all") {
            var cms = queryData.cm.split(",");
            for (j = 0; j < cms.length; j++) {
                if (cms[j] == "unknown") {
                    queryBody.bool.should.push({
                        "term": {
                            "cm": "未知"
                        }
                    });
                } else {
                    queryBody.bool.should.push({
                        "term": {
                            "cm": cms[j]
                        }
                    });
                }
            }
        }
        var index = [];
        var time = queryData.time.split(",");
        for (var i = 0; i < time.length; i++) {
            index.push("app-" + time[i]);
        }
        var requestJson = {
            "index": index,
            "type": "appLog",
            "body": {
                "size": 0,
                "query": queryBody,
                "aggs": {
                    "index_term": {
                        "terms": {
                            "field": "_index"
                        },
                        "aggs": {
                            "DD_sr": {
                                "terms": {
                                    "field": "sr",
                                    "size": "0"
                                },
                                "aggs": {
                                    "DD_ne": {
                                        "terms": {
                                            "field": "ne",
                                            "size": "0"
                                        },
                                        "aggs": {
                                            "DD_co": {
                                                "terms": {
                                                    "field": "co",
                                                    "size": "0"
                                                },
                                                "aggs": {
                                                    "activeUserCount": {
                                                        "cardinality": {
                                                            "field": "ip"
                                                        }
                                                    },
                                                    "DD_IP_count": {
                                                        "terms": {
                                                            "field": "ip"
                                                        },
                                                        "aggs": {
                                                            "userCount": {
                                                                "filters": {
                                                                    "filters": {
                                                                        "hasAdd": {
                                                                            "term": {
                                                                                "btn": "注册"
                                                                            }
                                                                        },
                                                                        "all": {}
                                                                    }
                                                                },
                                                                "aggs": {
                                                                    "term_time": {
                                                                        "terms": {
                                                                            "field": "time"
                                                                        },
                                                                        "aggs": {
                                                                            "time_max": {
                                                                                "max": {
                                                                                    "field": "time"
                                                                                }
                                                                            },
                                                                            "time_min": {
                                                                                "min": {
                                                                                    "field": "time"
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };
        es.search(requestJson).then(function (response) {
            var data = {};
            if (response != null && response.aggregations != null && response.aggregations.index_term.buckets != []) {
                var index_term = response.aggregations.index_term.buckets;

                var dataForm = [];
                var dataTable = [];
                var i = 0;
                var s0_s4_newUser = 0;
                var s4_s10_newUser = 0;
                var s10_s30_newUser = 0;
                var s30_s60_newUser = 0;
                var m1_m3_newUser = 0;
                var m3_m10_newUser = 0;
                var m10_m30_newUser = 0;
                var m30_more_newUser = 0;
                var s0_s4_activeUser = 0;
                var s4_s10_activeUser = 0;
                var s10_s30_activeUser = 0;
                var s30_s60_activeUser = 0;
                var m1_m3_activeUser = 0;
                var m3_m10_activeUser = 0;
                var m10_m30_activeUser = 0;
                var m30_more_activeUser = 0;
                var active_all_sum = 0;
                var newUser_all_sum = 0;
                for (i = 0; i < index_term.length; i++) {
                    var time_sum = 0;
                    var active_user_sum = 0;
                    var DD_sr = index_term[i].DD_sr.buckets;
                    if (DD_sr.length == 0) {
                        continue;
                    }
                    for (var j = 0; j < DD_sr.length; j++) {
                        var DD_ne = DD_sr[j].DD_ne.buckets;

                        if (DD_ne.length == 0) {
                            continue;
                        }
                        for (var k = 0; k < DD_ne.length; k++) {
                            var DD_co = DD_ne[k].DD_co.buckets;

                            if (DD_co.length == 0) {
                                continue;
                            }
                            for (var l = 0; l < DD_co.length; l++) {
                                //active_user_sum += DD_co[l].activeUserCount.value;
                                var DD_IP = DD_co[l].DD_IP_count.buckets;

                                if (DD_IP.length == 0) {
                                    continue;
                                }
                                for (var p = 0; p < DD_IP.length; p++) {
                                    var activeUserCount = DD_IP[p].userCount.buckets.all.term_time.buckets;
                                    if (activeUserCount.length != 0) {
                                        time_sum += activeUserCount[0].time_max.value - activeUserCount[0].time_min.value;
                                        active_user_sum += 1;
                                        if (time_sum >= 0 && time_sum < (4 * 1000)) {
                                            s0_s4_activeUser += 1;
                                        } else if (time_sum >= (4 * 1000) && time_sum < (10 * 1000)) {
                                            s4_s10_activeUser += 1;
                                        } else if (time_sum >= (10 * 1000) && time_sum < (30 * 1000)) {
                                            s10_s30_activeUser += 1;
                                        } else if (time_sum >= (30 * 1000) && time_sum < (60 * 1000)) {
                                            s30_s60_activeUser += 1;
                                        } else if (time_sum >= (60 * 1000) && time_sum < (3 * 60 * 1000)) {
                                            m1_m3_activeUser += 1;
                                        } else if (time_sum >= (3 * 60 * 1000) && time_sum < (10 * 60 * 1000)) {
                                            m3_m10_activeUser += 1;
                                        } else if (time_sum >= (10 * 60 * 1000) && time_sum < (30 * 60 * 1000)) {
                                            m10_m30_activeUser += 1;
                                        } else {
                                            m30_more_activeUser += 1;
                                        }
                                    }
                                    var newUserCount = DD_IP[p].userCount.buckets.hasAdd.term_time.buckets;
                                    if (newUserCount.length != 0) {
                                        time_sum += newUserCount[0].time_max.value - newUserCount[0].time_min.value;
                                        newUser_all_sum += 1;
                                        if (time_sum >= 0 && time_sum < (4 * 1000)) {
                                            s0_s4_newUser += 1;
                                        } else if (time_sum >= (4 * 1000) && time_sum < (10 * 1000)) {
                                            s4_s10_newUser += 1;
                                        } else if (time_sum >= (10 * 1000) && time_sum < (30 * 1000)) {
                                            s10_s30_newUser += 1;
                                        } else if (time_sum >= (30 * 1000) && time_sum < (60 * 1000)) {
                                            s30_s60_newUser += 1;
                                        } else if (time_sum >= (60 * 1000) && time_sum < (3 * 60 * 1000)) {
                                            m1_m3_newUser += 1;
                                        } else if (time_sum >= (3 * 60 * 1000) && time_sum < (10 * 60 * 1000)) {
                                            m3_m10_newUser += 1;
                                        } else if (time_sum >= (10 * 60 * 1000) && time_sum < (30 * 60 * 1000)) {
                                            m10_m30_newUser += 1;
                                        } else {
                                            m30_more_newUser += 1;
                                        }

                                    }
                                }
                            }
                        }
                    }
                    dataForm.push({
                        day: index_term[i].key,
                        time_difference: (time_sum / active_user_sum).toFixed(0)
                    });
                    active_all_sum += active_user_sum;
                }
                dataTable.push({
                    key: "[0,4)秒",
                    activeUser: s0_s4_activeUser,
                    newUser: s0_s4_newUser,
                    activeUser_percentage: (function () {
                        if (active_all_sum == 0) {
                            return 0;
                        }
                        return Number((s0_s4_activeUser / active_all_sum * 100).toFixed(2));
                    }()),
                    newUser_percentage: (function () {
                        if (newUser_all_sum == 0) {
                            return 0;
                        }
                        return Number((s0_s4_newUser / newUser_all_sum * 100).toFixed(2));
                    }())
                });
                dataTable.push({
                    key: "[4,10)秒",
                    activeUser: s4_s10_activeUser,
                    newUser: s4_s10_newUser,
                    activeUser_percentage: (function () {
                        if (active_all_sum == 0) {
                            return 0;
                        }
                        return Number((s4_s10_activeUser / active_all_sum * 100).toFixed(2));
                    }()),
                    newUser_percentage: ( function () {
                        if (newUser_all_sum == 0) {
                            return 0;
                        }
                        return Number((s4_s10_newUser / newUser_all_sum * 100).toFixed(2));
                    }())
                });
                dataTable.push({
                    key: "[10,30)秒",
                    activeUser: s10_s30_activeUser,
                    newUser: s10_s30_newUser,
                    activeUser_percentage: (function () {
                        if (active_all_sum == 0) {
                            return 0;
                        }
                        return Number((s10_s30_activeUser / active_all_sum * 100).toFixed(2));
                    }()),
                    newUser_percentage: (function () {
                        if (newUser_all_sum == 0) {
                            return 0;
                        }
                        return Number((s10_s30_newUser / newUser_all_sum * 100).toFixed(2));
                    }())
                });
                dataTable.push({
                    key: "[30,60)秒",
                    activeUser: s30_s60_activeUser,
                    newUser: s30_s60_newUser,
                    activeUser_percentage: ( function () {
                        if (active_all_sum == 0) {
                            return 0;
                        }
                        return Number((s30_s60_activeUser / active_all_sum * 100).toFixed(2));
                    }()),
                    newUser_percentage: (function () {
                        if (newUser_all_sum == 0) {
                            return 0;
                        }
                        return Number((s30_s60_newUser / newUser_all_sum * 100).toFixed(2));
                    }())
                });
                dataTable.push({
                    key: "[1,3)分钟",
                    activeUser: m1_m3_activeUser,
                    newUser: m1_m3_newUser,
                    activeUser_percentage: (function () {
                        if (active_all_sum == 0) {
                            return 0;
                        }
                        return Number((m1_m3_activeUser / active_all_sum * 100).toFixed(2));
                    }()),
                    newUser_percentage: (function () {
                        if (newUser_all_sum == 0) {
                            return 0;
                        }
                        return Number((m1_m3_newUser / newUser_all_sum * 100).toFixed(2));
                    }())
                });
                dataTable.push({
                    key: "[3,10)分钟",
                    activeUser: m3_m10_activeUser,
                    newUser: m3_m10_newUser,
                    activeUser_percentage: (function () {
                        if (active_all_sum == 0) {
                            return 0;
                        }
                        return Number((m3_m10_activeUser / active_all_sum * 100).toFixed(2));
                    }()),
                    newUser_percentage: (function () {
                        if (newUser_all_sum == 0) {
                            return 0;
                        }
                        return Number((m3_m10_newUser / newUser_all_sum * 100).toFixed(2));
                    }())
                });
                dataTable.push({
                    key: "[10,30)分钟",
                    activeUser: m10_m30_activeUser,
                    newUser: m10_m30_newUser,
                    activeUser_percentage: (function () {
                        if (active_all_sum == 0) {
                            return 0;
                        }
                        return Number((m10_m30_activeUser / active_all_sum * 100).toFixed(2));
                    }()),
                    newUser_percentage: (function () {
                        if (newUser_all_sum == 0) {
                            return 0;
                        }
                        return Number((m10_m30_newUser / newUser_all_sum * 100).toFixed(2));
                    }())
                });
                dataTable.push({
                    key: "30分钟以上",
                    activeUser: m30_more_activeUser,
                    newUser: m30_more_newUser,
                    activeUser_percentage: (function () {
                        if (active_all_sum == 0) {
                            return 0;
                        }
                        return Number((m30_more_activeUser / active_all_sum * 100).toFixed(2));
                    }()),
                    newUser_percentage: (function () {
                        if (newUser_all_sum == 0) {
                            return 0;
                        }
                        return Number((m30_more_newUser / newUser_all_sum * 100).toFixed(2));
                    }())
                });
                data = {
                    dataForm: dataForm,
                    dataTable: dataTable
                };

            }
            callback(data);
        });
    },
    pageViewsSearch: function (es, queryData, callback) {
        var queryBody = {
            "bool": {
                "should": []
            }
        };
        var j = 0;
        if (queryData.av != "all") {
            var avs = queryData.av.split(",");
            for (j = 0; j < avs.length; j++) {
                if (avs[j] == "unknown") {
                    queryBody.bool.should.push({
                        "term": {
                            "av": "未知"
                        }
                    });
                } else {
                    queryBody.bool.should.push({
                        "term": {
                            "av": avs[j]
                        }
                    });
                }
            }
        }

        var index = [];
        var time = queryData.time.split(",");
        for (var i = 0; i < time.length; i++) {
            index.push("app-" + time[i]);
        }
        var requestJson = {
            "index": index,
            "type": "appLog",
            "body": {
                "size": 0,
                "query": queryBody,
                "aggs": {
                    "data": {
                        "terms": {
                            "field": "_index"
                        },
                        "aggs": {
                            "userCount": {
                                "cardinality": {
                                    "field": "ip"
                                }
                            },
                            "page_terms": {
                                "terms": {
                                    "field": "locPage"
                                },
                                "aggs": {
                                    "filter_page": {
                                        "filters": {
                                            "filters": {
                                                "isPage": {
                                                    "bool": {
                                                        "must_not": {
                                                            "term": {
                                                                "locPage": "-"
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        },
                                        "aggs": {
                                            "page_time": {
                                                "terms": {
                                                    "field": "ip"
                                                },
                                                "aggs": {
                                                    "page_max_time": {
                                                        "max": {
                                                            "field": "time"
                                                        }
                                                    },
                                                    "page_min_time": {
                                                        "min": {
                                                            "field": "time"
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "page_terms": {
                        "terms": {
                            "field": "locPage"
                        },
                        "aggs": {
                            "userCount": {
                                "cardinality": {
                                    "field": "ip"
                                }
                            },
                            "page_time": {
                                "terms": {
                                    "field": "ip"
                                },
                                "aggs": {
                                    "page_max_time": {
                                        "max": {
                                            "field": "time"
                                        }
                                    },
                                    "page_min_time": {
                                        "min": {
                                            "field": "time"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };

        es.search(requestJson).then(function (response) {
            var data = {};
            if (response != null && response.aggregations != null) {
                if (response.aggregations.data.buckets != []) {
                    var res = response.aggregations.data.buckets;
                    var page_terms_data = response.aggregations.page_terms.buckets;
                    var dataForm = [];
                    var dataTable = [];
                    var i = 0;
                    var userCount_sum = 0;
                    var pageViews_userCount_sum = 0;
                    var avg_time_userCount_sum = 0;
                    for (i = 0; i < page_terms_data.length; i++) {
                        userCount_sum += page_terms_data[i].userCount.value;
                        pageViews_userCount_sum += page_terms_data[i].doc_count;
                        var time_sum = 0;
                        for (var j = 0; j < page_terms_data[i].page_time.buckets.length; j++) {
                            var time_difference = page_terms_data[i].page_time.buckets[j];
                            time_sum += Number(time_difference.page_max_time.value) - Number(time_difference.page_min_time.value);
                        }
                        avg_time_userCount_sum += Number(((time_sum / 1000) / page_terms_data[i].userCount.value).toFixed(2));
                    }
                    for (i = 0; i < page_terms_data.length; i++) {
                        var userCount = page_terms_data[i].userCount.value;
                        dataTable.push({
                            page: page_terms_data[i].key,
                            userCount: page_terms_data[i].userCount.value,
                            userCount_pre: Number((page_terms_data[i].userCount.value / userCount_sum * 100).toFixed(2)),
                            pageViews_userCount: page_terms_data[i].doc_count,
                            pageViews_userCount_pre: Number((page_terms_data[i].doc_count / pageViews_userCount_sum * 100).toFixed(2)),
                            avg_time_userCount: (function () {
                                var time_sum = 0;
                                for (var j = 0; j < page_terms_data[i].page_time.buckets.length; j++) {
                                    var time_difference = page_terms_data[i].page_time.buckets[j];
                                    time_sum += Number(time_difference.page_max_time.value) - Number(time_difference.page_min_time.value);
                                }
                                if (userCount == 0) {
                                    return 0;
                                } else {
                                    return Number(((time_sum / 1000) / userCount).toFixed(2));
                                }
                            }()),
                            avg_time_userCount_pre: (function () {
                                var time_sum = 0;
                                for (var j = 0; j < page_terms_data[i].page_time.buckets.length; j++) {
                                    var time_difference = page_terms_data[i].page_time.buckets[j];
                                    time_sum += Number(time_difference.page_max_time.value) - Number(time_difference.page_min_time.value);
                                }
                                if (userCount == 0) {
                                    return 0;
                                } else if (avg_time_userCount_sum == 0) {
                                    return 0;
                                } else {
                                    return Number((Number(((time_sum / 1000) / userCount).toFixed(2)) / avg_time_userCount_sum * 100).toFixed(2));
                                }

                            }())
                        });
                    }
                    for (i = 0; i < res.length; i++) {
                        dataForm.push({
                            time: res[i].key,
                            avg_time_userCount: (function () {
                                var time_sum = 0;
                                var data_tem = res[i];
                                for (var j = 0; j < data_tem.page_terms.buckets.length; j++) {
                                    var page_time = data_tem.page_terms.buckets[j].filter_page.buckets.isPage;
                                    for (var k = 0; k < page_time.page_time.buckets.length; k++) {
                                        var time_difference = page_time.page_time.buckets[k];
                                        time_sum += time_difference.page_max_time.value - time_difference.page_min_time.value;
                                    }
                                }
                                if (data_tem.userCount.value == 0) {
                                    return 0;
                                } else {
                                    return Number((time_sum / 1000 / data_tem.userCount.value).toFixed(2));
                                }

                            }()),
                            avg_page_userCount: (function () {
                                var page_view_sum = 0;
                                var data_tem = res[i];
                                for (var j = 0; j < data_tem.page_terms.buckets.length; j++) {
                                    page_view_sum += data_tem.page_terms.buckets[j].filter_page.buckets.isPage.doc_count;
                                }
                                if (data_tem.userCount.value == 0) {
                                    return 0;
                                } else {
                                    return Number((page_view_sum / data_tem.userCount.value).toFixed(2));
                                }

                            }())
                        });
                    }
                    data = {
                        dataTable: dataTable,
                        dataForm: dataForm
                    };
                }
            }
            callback(data);
        });
    },
    sourceAnalysisSearch: function (es, queryData, callback) {
        var index = [];
        var must = [];
        if (queryData.av != "all") {
            must.push({
                "term": {
                    "bp": util.convertText(queryData.bp)
                }
            });
            must.push({
                term: {
                    "av": queryData.av
                }
            });
        } else {
            must.push({
                "term": {
                    "bp": util.convertText(queryData.bp)
                }
            });
        }
        var time = queryData.time.split(",");
        for (var i = 0; i < time.length; i++) {
            index.push("app-" + time[i]);
        }
        var requestJson = {
            "index": index,
            "type": "appLog",
            "body": {
                "size": 0,
                "query": {
                    "bool": {
                        "must": must
                    }
                },
                "aggs": {
                    "data": {
                        "terms": {
                            "field": "bp"
                        },
                        "aggs": {
                            "uv": {
                                "cardinality": {
                                    "field": "ip"
                                }
                            },
                            "localpage": {
                                "terms": {
                                    "field": "locPage"
                                },
                                "aggs": {
                                    "uv": {
                                        "cardinality": {
                                            "field": "ip"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };

        es.search(requestJson).then(function (response) {
            var data = {
                rootPage: {
                    key: "",
                    pv: "",
                    uv: "",
                    rootPageOut: ""
                },
                leavesPage: []
            };
            if (response != null && response.aggregations != null && response.aggregations.data.buckets != []) {
                var res = response.aggregations.data.buckets[0];

                data.rootPage.key = res.key;
                data.rootPage.pv = res.doc_count;
                data.rootPage.uv = res.uv.value;
                var rootPageOut = 0;
                var dataTem = null;
                var i = 0;
                for (i = 0; i < res.localpage.buckets.length; i++) {
                    dataTem = res.localpage.buckets[i];
                    rootPageOut += dataTem.doc_count;
                }
                for (i = 0; i < res.localpage.buckets.length; i++) {
                    dataTem = res.localpage.buckets[i];
                    data.leavesPage.push({
                        key: dataTem.key,
                        pv: dataTem.doc_count,
                        uv: dataTem.uv.value,
                        leavesPageOut: (dataTem.doc_count / rootPageOut * 100).toFixed(2) + "%"
                    });
                }
                data.rootPage.rootPageOut = ((1 - rootPageOut / res.doc_count) * 100).toFixed(2) + "%"
            }
            callback(data);
        });
    },
    appSurvey_user: function (es, queryData, callback) {
        var index = [];
        var time = queryData.time.split(",");
        for (var i = 0; i < time.length; i++) {
            index.push("app-" + time[i]);
        }
        var requestJson = {
            "index": index,
            "type": "appLog",
            "body": {
                "size": 0,
                "query": {
                    "match_all": {}
                },
                "aggs": {
                    "all_time": {
                        "terms": {
                            "field": "ip",
                            "size": 0
                        },
                        "aggs": {
                            "max_time": {
                                "max": {
                                    "field": "time"
                                }
                            },
                            "min_time": {
                                "min": {
                                    "field": "time"
                                }
                            }
                        }
                    },
                    "data": {
                        "filters": {
                            "filters": {
                                "is_start": {
                                    "bool": {
                                        "must": {
                                            "term": {
                                                "is": 1
                                            }
                                        }
                                    }
                                },
                                "not_start": {}
                            }
                        },
                        "aggs": {
                            "is_sum": {
                                "sum": {
                                    "field": "is"
                                }
                            },
                            "uv": {
                                "cardinality": {
                                    "field": "ip"
                                }
                            }
                        }
                    }
                }
            }
        };

        es.search(requestJson).then(function (response) {
            var data = [];
            if (response != null && response.aggregations != null && response.aggregations.data.buckets != []) {
                var res = response.aggregations.all_time.buckets;
                var other_data = response.aggregations.data.buckets;
                var time_data = 0;
                var i = 0;
                for (; i < res.length; i++) {
                    time_data += (res[i].max_time.value - res[i].min_time.value) / 1000;
                }
                for (i = 0; i < time.length; i++) {
                    data.push({
                        date: time[i],
                        start_count: other_data.is_start.is_sum.value,
                        start_user_count: other_data.is_start.uv.value,
                        uv: other_data.not_start.uv.value,
                        time_sum: time_data
                    });
                }
            }
            callback(data);
        });
    }
};
exports.upAnalysis = upAnalysis;