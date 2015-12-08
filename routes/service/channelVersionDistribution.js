/**
 * Created by perfection on 15-12-8.
 */
var channelVersionDistribution = {
    search:function(es,data,callback){
        var requestJson = {

        };
        es.client.search(requestJson).then(function(response){
            callback(response);
        });
    }
};
exports.analysis_es = channelVersionDistribution;