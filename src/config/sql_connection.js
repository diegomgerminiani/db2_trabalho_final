const { Sequelize } = require('sequelize');

const database = 'formula_one'
const username = 'postgres'
const password = 'admin'
const host = 'localhost'
const dialect = 'postgres'


exports.sequelize = new Sequelize(
    database, 
    username, 
    password, 
    {
        host,
        dialect
    }
);

exports.testConnection = () => {
    try {
		this.sequelize.authenticate();
		console.log('\nConexão com o banco estabelecida com sucesso!');
		console.log(`Database: ${host}/${database}`);
	} catch (error) {
		console.error('Unable to connect to the database:\n', error);
	}
}