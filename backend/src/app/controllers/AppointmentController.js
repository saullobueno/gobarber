import * as Yup from "yup";
// biblioteca q trabalha com datas
import { startOfHour, parseISO, isBefore, format, subHours } from "date-fns";
import pt from "date-fns/locale/pt";
import User from "../models/User";
import File from "../models/File";
import Appointment from "../models/Appointment";
import Notification from "../schemas/Notification";

import CancellationMail from "../jobs/CancellationMail";
import Queue from "../../lib/Queue";

class AppointmentController {
	// metodo de listagem de todos os registros
	async index(req, res) {
		const { page = 1 } = req.query;

		const appointments = await Appointment.findAll({
			// condição
			where: { user_id: req.userId, canceled_at: null },
			// ordenação
			order: ["date"],
			attributes: ["id", "date", "past", "cancelable"],
			// limite de registros por página
			limit: 20,
			// quantos registros eu quero pular, no caso, o valor "pages - 1 * 20"
			offset: (page - 1) * 20,
			// inclusão dos dados do prestador de serviços
			include: [
				{
					model: User,
					as: "provider",
					attributes: ["id", "name"],
					// outro include para incluir o avatar dele
					include: [
						{
							model: File,
							as: "avatar",
							attributes: ["id", "path", "url"]
						}
					]
				}
			]
		});

		return res.json(appointments);
	}

	async store(req, res) {
		const schema = Yup.object().shape({
			provider_id: Yup.number().required(),
			date: Yup.date().required()
		});

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: "Validation fails" });
		}

		const { provider_id, date } = req.body;

		/**
		 * Check if provider_id is a provider
		 */
		const checkIsProvider = await User.findOne({
			where: { id: provider_id, provider: true }
		});

		if (!checkIsProvider) {
			return res
				.status(401)
				.json({ error: "You can only create appointments with providers" });
		}

		/**
		 * Check for past dates
		 */
		// zera os minutos do horário repassado
		const hourStart = startOfHour(parseISO(date));

		// verifica se está antes da data atual
		if (isBefore(hourStart, new Date())) {
			return res.status(400).json({ error: "Past dates are not permitted" });
		}

		/**
		 * Check date availability
		 */
		// verifica se já existe um agendamento na data atual, hourStart = sem os minutos
		const checkAvailability = await Appointment.findOne({
			where: {
				provider_id,
				canceled_at: null,
				date: hourStart
			}
		});
		// se ja existe, não deixa criar o agendamento
		if (checkAvailability) {
			return res
				.status(400)
				.json({ error: "Appointment date is not available" });
		}

		const appointment = await Appointment.create({
			user_id: req.userId,
			provider_id,
			date: hourStart
		});

		/**
		 * Notify appointment provider
		 */
		// pegando o id do usuario. userId vem do model User
		const user = await User.findByPk(req.userId);
		// formatando a data como queremos
		const formattedDate = format(
			hourStart,
			// entre aspas simples fica a string
			"'dia' dd 'de' MMMM', às' H:mm'h'",
			{ locale: pt }
		);

		// criando as notificações para este agendamento
		await Notification.create({
			content: `Novo agendamento de ${user.name} para ${formattedDate}`,
			user: provider_id
		});

		return res.json(appointment);
	}

	async delete(req, res) {
		const appointment = await Appointment.findByPk(req.params.id, {
			include: [
				{
					model: User,
					as: "provider",
					attributes: ["name", "email"]
				},
				{
					model: User,
					as: "user",
					attributes: ["name"]
				}
			]
		});

		if (appointment.user_id !== req.userId) {
			return res.status(401).json({
				error: "You don't have permission to cancel this appointment."
			});
		}

		// diminuindo 2 horas na data atual
		const dateWithSub = subHours(appointment.date, 2);

		// Verifica se o dateWithSub é menor que agora, se não for, erro, ou seja, so pode cancelar menos de 2 horas antes do agendamento
		if (isBefore(dateWithSub, new Date())) {
			return res.status(401).json({
				error: "You can only cancel appointments 2 hours in advance."
			});
		}
		// se der ok, registra a data do cancelamento com a data atual.
		appointment.canceled_at = new Date();

		await appointment.save();

		/*
    Enviando o email:

      await Mail.sendMail({
      to: `${appointment.provider.name} <${appointment.provider.email}>`,
      subject: 'Agendamento cancelado',

      Sem template:
      text: 'Você tem um novo cancelamento',

      Com template:
      template: 'cancellation',
      context: {
      provider: appointment.provider.name,
      user: appointment.user.name,
      date: format(appointment.date, "'dia' dd 'de' MMMM', às' H:mm'h'", {
        locale: pt,
      }),
      },
      });
    */
		await Queue.add(CancellationMail.key, {
			appointment
		});

		return res.json(appointment);
	}
}

export default new AppointmentController();
