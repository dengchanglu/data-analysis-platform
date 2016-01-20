/**
 * Created by perfection on 15-12-8.
 */
var elasticsearch = require('elasticsearch');

// 使用默认配置连接到 localhost:9200
//var client = new elasticsearch.Client();

// 连接两个节点，负载均衡使用round-robin算法
var client = elasticsearch.Client({
    hosts: [
        '192.168.1.11:9200'
    ],
    log: 'trace'
});
exports.client = client;