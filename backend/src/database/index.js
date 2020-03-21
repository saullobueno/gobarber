import Sequelize from "sequelize";
import mongoose from "mongoose";

// tabelas da base de dados
import User from "../app/models/User";
import File from "../app/models/File";
import Appointment from "../app/models/Appointment";

// Buscando as configurações da DataBase
import databaseConfig from "../config/database";

// Pegando os models
const models = [User, File, Appointment];

class Database {
	constructor() {
		this.init();
		this.mongo();
	}

	init() {
    // Conexão com a base de dados
		this.connection = new Sequelize(databaseConfig);

    // Passando a conexão para cada model
		models
			.map(model => model.init(this.connection))
			// chamando o metodo associate (referencias de chave estrangeira), caso ele exista.
			.map(model => model.associate && model.associate(this.connection.models));
	}

	mongo() {
		this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
			// habilitando o novo tipo de url do mongo
			useNewUrlParser: true,
			// configurando o formato de encontrar e modificar dados do mongo
			useFindAndModify: true
		});
	}
}

export default new Database();
