export default {
	// MailTrap

	// smtp.mailtrap.io
	host: process.env.MAIL_HOST,
	// 2525
	port: process.env.MAIL_PORT,
	// segurança desativada, padrão
	secure: false,
	auth: {
		// usuario
		user: process.env.MAIL_USER,
		// senha
		pass: process.env.MAIL_PASS
	},
	default: {
		// De. Nome e email
		from: "Equipe GoBarber <noreply@gobarber.com>"
	}
};

// Serviços:
// Mailtrap (apenas para ambientes de desenvolvimento. mailtrap.io)
// Amazon SES
// MailGun
// Sparkpost
