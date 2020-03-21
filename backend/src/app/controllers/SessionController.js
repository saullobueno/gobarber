import jwt from 'jsonwebtoken';
// Lib para validação de dados pela Schema
import * as Yup from 'yup';

// Models
import User from '../models/User';
import File from '../models/File';
import authConfig from '../../config/auth';

class SessionController {

  // Criando uma Sessão
  async store(req, res) {

    // Validando dados pela Schema
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    // Se não for valido, retorna erro
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, password } = req.body;

    // Encontrando usuario na tabela
    const user = await User.findOne({
      where: { email },
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    // Se usuario não existe, retorna erro
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // Verificando se as senhas não estão batendo
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    // Se deu tudo certo ate aqui, pegamos os dados encontrados do usuario
    const { id, name, avatar, provider } = user;

    return res.json({
      user: {
        id,
        name,
        email,
        provider,
        avatar,
      },
      // Gerando o JWT (Payload, frase secreta e quando expira )
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
