// upload de arquivos
import multer from "multer";
// lib do Node para gerar caracteres aleatorios e outras coisas
import crypto from "crypto";
// lib do Node para pastas e arquivos. Extname retorna a extensão do arquivo. Resolve percorre um caminho dentro do app
import { extname, resolve } from "path";

export default {
	// Como o multer vai armazenar os arquivos, nesse caso dentro do app. Outra opção é o Amazon S3
	storage: multer.diskStorage({
		// destino dos arquivos. Contando a partir do diretorio deste arquivo
		destination: resolve(__dirname, "..", "..", "tmp", "uploads"),

		// Como formatar o nome do arquivo
		filename: (req, file, cb) => {
			// gerando o nome do arquivo, RandomBytes gera caracteres aleatorios, 16 é o nomero de bytes
			crypto.randomBytes(16, (err, res) => {
				// se tiver erro, retorna o erro
				if (err) return cb(err);
				// se der ok, retorna o callBack. O 1º parametro é null pois é o erro
				// Depois é a resposta q gera o nome do arquivo com os caracteres gerados com 16 bytes em formato de letras e numeros (Hex)
				// Se eu quisesse apenas nome original seria apenas o file.originalname, colocaremos apenas a extensão dele (extname)
				return cb(null, res.toString("hex") + extname(file.originalname));
			});
		}
	})
};
