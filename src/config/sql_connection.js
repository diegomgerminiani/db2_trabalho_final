const { Sequelize } = require('sequelize');


exports.sequelize = new Sequelize(
    'formula_one', 
    'postgres', 
    'admin', 
    {
        host: 'localhost',
        dialect: 'postgres'
    }
);

exports.testConnection = () => {
    try {
		this.sequelize.authenticate();
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:\n', error);
	}
}