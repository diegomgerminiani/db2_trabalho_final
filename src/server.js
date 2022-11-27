/**
 * @file Server http
 * @author Diego Machado Germiniani.
 * @version 1.0.0
 */

 //Versão do server:
const project = require('../package.json');
const http = require('http');
const app = require("./app").app;

server()

async function server(){
    const port = 3000;
    app.set('port', port);
    const server = http.createServer(app);
    server.listen(port, () => {
        console.clear();
        console.log(`\n=============================================`);
        console.log(`Projeto: ${project.name}`);
        console.log(`Versão: ${project.version}`);
        console.log(`Porta: ${port}`);
        console.log(`=============================================\n`);
    });
}