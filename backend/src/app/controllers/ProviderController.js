import User from "../models/User";
import File from "../models/File";

class ProviderController {
	// index é usado para exibir todas os registros
	async index(req, res) {
		const providers = await User.findAll({
			// condição para exibição, no caso, quando o campo provider da tabela for true
			where: { provider: true },
			// selecionando apenas os campos q quero retornar para o front
			attributes: ["id", "name", "email", "avatar_id"],
			// poderia ser apenas include: [File], mas podemos personalizar como:
			include: [
				{
					// nome do model
					model: File,
					// nome do codinome
					as: "avatar",
					// selecionando apenas os campos q quero retornar
					attributes: ["name", "path", "url"]
				}
			]
		});

		return res.json(providers);
	}
}

export default new ProviderController();
