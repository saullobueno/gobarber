module.exports = {
	up: (queryInterface, Sequelize) => {
		// query para add nova coluna. Escolho o nome da tabela e qual coluna nova quero add
		return queryInterface.addColumn("users", "avatar_id", {
			type: Sequelize.INTEGER,
			// Aqui colocamos a chave estrangeira da coluna. Colocamos a tabela e a coluna que queremos referenciar.
			// Ou seja, todo avatar_id da tabela users vai ser tbm um id da tabela files
			references: { model: "files", key: "id" },
			// oq vai acontecer o user q tiver esse avatar_id caso ele tenha a mesma alteração
			onUpdate: "CASCADE",
			// oq vai acontecer o user q tiver esse avatar_id caso ele seja deletado
			onDelete: "SET NULL",
			// dizemos aqui q ele pode ser nulo
			allowNull: true
		});
	},

	down: queryInterface => {
		return queryInterface.removeColumn("users", "avatar_id");
	}
};
