
module.exports = function(text){

    var kafka = require('kafka-node');
    var HighLevelProducer = kafka.HighLevelProducer;
    var KeyedMessage      = kafka.KeyedMessage;
    var Client            = kafka.Client;

    var client = new Client('10.3.6.22:2181', 'my-client-id', {
        sessionTimeout: 300,
        spinDelay: 100,
        retries: 2
    });

    client.on('error', (error) => {
        console.error(error);
    });

    var producer = new HighLevelProducer(client);

    producer.on('ready', () => {
        var payload = [{
            topic: 'meutopico',
            messages: '{"texto": "' + text + '"}',
            attributes: 1 }];
 
        producer.send(payload, (error, result) => {
            console.info('Sent payload to Kafka: ', payload);

            if (error) {
                console.error(error);
            } else {
                var formattedResult = result[0];
                console.log('result: ', result);
            };
        });
    });

    producer.on('error', (error) => {
        console.log(error);
    });

};
