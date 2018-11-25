
module.exports = (app) => {
    
    app.get('/', (req,res) => {
        res.send({"service":"home"});
    });

    app.get('/mensagem/:texto', (req, res) => {

        var kfk = require('../config/kafka-prd');

        kfk(req.params.texto);
    
        res.send({"mensagem":req.params.texto});
    });

    app.get('/ler', (req,res) => {

        var kfk = require('../config/kafka-con');
        kfk();

        res.send({"service":"leitura"});
    });
        
};
