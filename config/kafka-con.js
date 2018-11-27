module.exports = () => {

    var kafka = require('kafka-node');
    var HighLevelConsumer = kafka.HighLevelConsumer;
    var Client = kafka.Client;
    
    //var client = new Client('localhost:2181');
    var client = new Client('10.3.6.22:2181', 'my-client-id', {
        sessionTimeout: 300,
        spinDelay: 100,
        retries: 2
    });

    var topics = [{
        topic: 'meutopico'
    }];
  
    var options = {
        autoCommit: true,
        fetchMaxWaitMs: 1000,
        fetchMaxBytes: 1024 * 1024
    };

    var consumer = new HighLevelConsumer(client, topics, options);
      
    consumer.on('message', function(message) {
        console.log(message);
        return message;
    });
      
    consumer.on('error', function(err) {
        console.log('error', err);
        return '{"error", "' + err + '"}';
    });
      
    process.on('SIGINT', function() {
        consumer.close(true, function() {
            process.exit();
        });
    });

};