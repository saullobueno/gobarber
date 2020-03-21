import nodemailer from "nodemailer";
import { resolve } from "path";
// template para envio de emails
import exphbs from "express-handlebars";
// template para envio de emails
import nodemailerhbs from "nodemailer-express-handlebars";
import mailConfig from "../config/mail";

class Mail {
	constructor() {
		const { host, port, secure, auth } = mailConfig;

		// Trasnsporter é como o nodemailer usa para configurações externas
		this.transporter = nodemailer.createTransport({
			host,
			port,
			secure,
			// alguns serviços nao tem user
			auth: auth.user ? auth : null
		});

		this.configureTemplates();
	}

	configureTemplates() {
		// configurando a pasta do template dos emails
		const viewPath = resolve(__dirname, "..", "app", "views", "emails");

		this.transporter.use(
			"compile",
			nodemailerhbs({
				viewEngine: exphbs.create({
					layoutsDir: resolve(viewPath, "layouts"),
					partialsDir: resolve(viewPath, "partials"),
					defaultLayout: "default",
					extname: ".hbs"
				}),
				viewPath,
				extName: ".hbs"
			})
		);
	}

	sendMail(message) {
		return this.transporter.sendMail({
			...mailConfig.default,
			...message
		});
	}
}

export default new Mail();
