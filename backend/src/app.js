// para variaveis ambiente
import "dotenv/config";
// Express
import express from "express";
// Acesso a configurações de pastas
import path from "path";
// Restringe acesso as rotas
import cors from "cors";
// trata melhor as informações de erro
import Youch from "youch";
// verificação de erros do app
import * as Sentry from "@sentry/node";
// ajuda a verificar os erros quando usamos async
import "express-async-errors";
// Rotas
import routes from "./routes";
// Vigiar erros e bugs
import sentryConfig from "./config/sentry";
// Acesso as configurações da base de dados
import "./database";

class App {
	constructor() {
		this.server = express();
		// verificação de erros do Sentry
		Sentry.init(sentryConfig);
    // Aqui chamamos todos os nossos midlewares
    this.middlewares();
    // Chamamos as rotas
		this.routes();
		// fazendo tratamento de exceção e mostrando o erro q deu ou oq não está dando certo
		this.exceptionHandler();
	}

  middlewares() {
    // Vigiando erros e bugs
    this.server.use(Sentry.Handlers.requestHandler());
    // Restringindo acesso a API
    this.server.use(cors());
    // Fazer nossas requisições receberem os dados no formato de JSON
		this.server.use(express.json());

		// servir arquivos estaticos para ser acessado diretamente pelo navegador
		this.server.use(
			"/files",
			express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
		);
	}

  routes() {
    // Importando rotas
		this.server.use(routes);
		// verificação de erros do Sentry
		this.server.use(Sentry.Handlers.errorHandler());
	}

	// fazendo tratamento de exceção e mostrando o erro q deu ou oq não está dando certo
	exceptionHandler() {
		// quando recebe 4 parametros o Express ja sabe q é um tratamento de exceção
		this.server.use(async (err, req, res, next) => {
			// mostra o erro apenas se for ambiente de desenvolvimento
			if (process.env.NODE_ENV === "development") {
				const errors = await new Youch(err, req).toJSON();

				return res.status(500).json(errors);
			}

			return res.status(500).json({ error: "Internal server error" });
		});
	}
}

export default new App().server;
