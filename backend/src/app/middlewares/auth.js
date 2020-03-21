// Lib para autenticação de usuario
import jwt from 'jsonwebtoken';
// Lib q converte um callback no formato async await
import { promisify } from 'util';
// Configurações da autenticação
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  // Pegando a autorização no header
  const authHeader = req.headers.authorization;

  // Se o autorization não existir, retorna erro
  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  // Pegando apenas o token, q fica depois do bearer depois do espaço em branco
  // Como a segunda poisção deste array nos interessa, colocamos a vírgula antes. Não precisa preencher o primeiro
  const [, token] = authHeader.split(' ');

  try {
    // Verificando e decodificando o token
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    // Passando o token decodificado, no caso o ID, para a variavel userId
    req.userId = decoded.id;
    // Dando sequencia
    return next();
    // Se não passar retorna erro
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
