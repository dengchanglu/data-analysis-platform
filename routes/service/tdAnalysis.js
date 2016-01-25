/**
 * Created by perfection on 15-12-8.
 */
var tdAnalysis = {
    search: function (es, queryData, callback) {
        var queryBody = {};
        if (queryData.key == "version") {
            if (queryData.version == "all") {
                queryBody = {
                    "match_all": {}
                }
            } else {
                queryBody = {
                    "bool": {
                        "must": [
                            {
                                "term": {
                                    "version": "android " + queryData.version
                                }
                            }
                        ]
                    }
                }
            }
        } else if (queryData.key == "sr") {
            if (queryData.sr == "all") {
                queryBody = {
                    "match_all": {}
                }
            } else {
                queryBody = {
                    "bool": {
                        "must": [
                            {
                                "term": {
                                    "sr": queryData.sr
                                }
                            }
                        ]
                    }
                }
            }
        }else if(queryData.key=="ne"){
            if (queryData.ne == "all") {
                queryBody = {
                    "match_all": {}
                }
            } else {
                queryBody = {
                    "bool": {
                        "must": [
                            {
                                "term": {
                                    "ne": queryData.ne
                                }
                            }
                        ]
                    }
                }
            }
        }else if(queryData.key=="co"){
            if (queryData.co == "all") {
                queryBody = {
                    "match_all": {}
                }
            } else {
                queryBody = {
                    "bool": {
                        "must": [
                            {
                                "term": {
                                    "co": queryData.co
                                }
                            }
                        ]
                    }
                }
            }
        }else if(queryData.key=="phoneType"){
            if (queryData.phoneType == "all") {
                queryBody = {
                    "match_all": {}
                }
            } else {
                queryBody = {
                    "bool": {
                        "must": [
                            {
                                "term": {
                                    "phoneType": queryData.phoneType
                                }
                            }
                        ]
                    }
                }
            }
        }

        var requestJson = {
            "index": "app-" + queryData.time,
            "type": "appLog",
            "body": {
                "size": 0,
                "query": queryBody,
                "aggs": {
                    "data": {
                        "terms": {
                            "field": queryData.key,
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
                            "active_user": {
                                "cardinality": {
                                    "field": "ip"
                                }
                            },
                            "start_count": {
                                "filter": {
                                    "term": {
                                        "is": 1
                                    }
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
exports.tdAnalysis = tdAnalysis;