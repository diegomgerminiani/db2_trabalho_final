/**
 * @file Aplicação
 * @author Diego Machado Germiniani.
 * @version 1.0.0
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { testConnection } = require("./config/sql_connection")

class AppController {
    constructor() {
        this.express = express();
        
        this.express.use(express.json());
        this.express.use(express.urlencoded({extended: true}));
        this.express.use(cors({origin: '*'}));
        this.express.use(routes);
        testConnection()
    }
}

exports.app = new AppController().express;

