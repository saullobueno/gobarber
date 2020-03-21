import Sequelize, { Model } from "sequelize";
import bcrypt from "bcryptjs";

class User extends Model {
	static init(sequelize) {
		super.init(
			{
				name: Sequelize.STRING,
        email: Sequelize.STRING,
        // Campo virtual nunca existe na base de dados. è apenas para manipular algum dado.
				password: Sequelize.VIRTUAL,
				password_hash: Sequelize.STRING,
				provider: Sequelize.BOOLEAN
			},
			{
				sequelize
			}
		);

    // Hook para ser executado antes de salvar os dados
		this.addHook("beforeSave", async user => {
      // Se tiver preenchido o password, faça-se a encriptação dele com peso 8
			if (user.password) {
				user.password_hash = await bcrypt.hash(user.password, 8);
			}
		});

		return this;
	}

	// metodo estatico para associar, recebe todos os models da aplicação
	static associate(models) {
		// em seguida colocamos belongsTo (pertence a)
		// depois escolhemos qual o outro model a qual a coluna de users pertence, ou seja, o avatar_id pertence ao id de File.
		// o "as: 'avatar'" fica sendo o codinome para ser usado em outros controllers
		this.belongsTo(models.File, { foreignKey: "avatar_id", as: "avatar" });
		// o metodo hasOne seria par ao id de usuario pertencer a outra tabela
		// hasMany seria para o id de usuario pertencer a varias outras tabelas
	}

  // Método do BCrypt para comparar as senhas
	checkPassword(password) {
		return bcrypt.compare(password, this.password_hash);
	}
}

export default User;
