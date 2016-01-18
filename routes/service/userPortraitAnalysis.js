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
                            "field": "sex"
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
                            "field": "ar"
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
                            "field": "city"
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
                            "field": "ind"
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
                            "field": "edu"
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
            queryBody = {
                "bool": {
                    "must": [{
                        "term": {
                            "cm": queryData.cm
                        }
                    }],
                    "should": []

                }
            };
        }
        var avs = queryData.av.split(",");
        for (var j = 0; j < avs.length; j++) {
            queryBody.bool.should.push({
                "term": {
                    "av": avs[j]
                }
            });
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
                            "field": "av"
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
        };

        es.search(requestJson).then(function (response) {
            var data = [];
            if (response != null && response.aggregations != null && response.aggregations.data.buckets != []) {
                var res = response.aggregations.data.buckets;
                console.log(res)
                for (var i = 0; i < res.length; i++) {
                    data.push(
                        {
                            "key": res[i].key,
                            "active_user": res[i].active_user.value,
                            "start_count": res[i].start_count.doc_count,
                            "register_user": res[i].register_user.doc_count
                        }
                    );
                }
            }
            callback(data);
        });
    }
};
exports.upAnalysis = upAnalysis;