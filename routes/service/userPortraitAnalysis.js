/**
 * Created by perfection on 16-1-11.
 */
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
        console.log(queryData.time)
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
    }
};
exports.upAnalysis = upAnalysis;