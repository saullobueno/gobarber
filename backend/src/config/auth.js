// Configurações para serem usadas no JWT da autenticação do usuario
export default {
  secret: process.env.APP_SECRET,
  expiresIn: '7d',
};
