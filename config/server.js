
module.exports = function(){

    const port  = (process.env.SERVICE_PORT) ? process.env.SERVICE_PORT : 8888;

    var express = require('express');
    var app     = express();
    var routes  = require('../routes/web');
    
    routes(app);

    app.listen(port, function(){
        console.log("localhost:"+port.toString());
    });
};
