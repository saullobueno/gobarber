import Sequelize, { Model } from "sequelize";
import { isBefore, subHours } from "date-fns";

class Appointment extends Model {
	static init(sequelize) {
		super.init(
			{
				date: Sequelize.DATE,
				canceled_at: Sequelize.DATE,
				// campos a mais para ver a data se passaram e se sao cancelaveis, virtuais, nao precisam de inclusão na database
				past: {
					type: Sequelize.VIRTUAL,
					get() {
						return isBefore(this.date, new Date());
					}
				},
				cancelable: {
					type: Sequelize.VIRTUAL,
					get() {
						return isBefore(new Date(), subHours(this.date, 2));
					}
				}
			},
			{
				sequelize
			}
		);

		return this;
	}

	// associações com outras colunas d eoutras tabelas
	static associate(models) {
		// quando existem duas associações para a mesma tabela, o codinome "as" é obrigatório.
		this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
		this.belongsTo(models.User, { foreignKey: "provider_id", as: "provider" });
	}
}

export default Appointment;
