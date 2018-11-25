module.exports = () => {
    // Busca os parâmetros de acesso ao banco de dados das variáveis de ambiente
    const conn_hos = (process.env.HOST) ? process.env.HOST : "localhost";
    const conn_usr = (process.env.USER) ? process.env.USER : "root";
    const conn_pwd = (process.env.PSWD) ? process.env.PSWD : "root";
    const conn_dbn = (process.env.DB)   ? process.env.DB   : "dbtest";
    // ---
    
    // Prepara as variáveis de conexão ao banco de dados
    var mysql    = require('mysql');
    var bResult  = false;
    var sMessage = "";

    var conn     = mysql.createConnection({
        host: conn_hos,
        user: conn_usr,
        password: conn_pwd,
        database: conn_dbn
    });
    // ---

    // Loop nas 5 tentativas de conexão com a base
    for (let iX; iX < 5; iX++) {

        try {

            conn.connect( (err) => {
                if (err) {
                    throw new Error(err.message);
                }
            });

            bResult = true;
            break;

        }
        catch (err) {
            bResult  = false;
            sMessage = err.message;
        }

    };
    // --- (Fim do Loop nas 5 tentativas de conexão com a base)

    // Retorna os dados de conexão
    return [bResult, sMessage, conn];
};
