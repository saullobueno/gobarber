// Lib para validação de dados pela Schema
import * as Yup from 'yup';
// Models
import User from '../models/User';
import File from '../models/File';

class UserController {

  // Criação de usuário
  async store(req, res) {

    //  Criando schema de validação
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6), // minimo de 6 digitos
    });

    // Verificando se a requisição é valida. Se não, retorna erro.
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // Verificando se o usuario já existe
    const userExists = await User.findOne({ where: { email: req.body.email } });

    // Se o usuario ja éxiste, retorna um erro
    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    // Criando usuario. Desestruturando apenas oq queremos retornar no frontend
    const { id, name, email, provider } = await User.create(req.body);

    // Retornando o usuario criado
    return res.json({
      id,
      name,
      email,
      provider,
    });
  }

  // Alteração de usuário,
  // acessivel apenas para usuariops logados
  async update(req, res) {

    // Schema de vlaidação
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        // validação condicionada a outro campo
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
      ),
      // validação para confirmação da senha digitada
      confirmPassword: Yup.string().when('password', (password, field) =>
        // para verificar se são iguais, usamos o oneOf e depois o ref
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    // Verificando a validação
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // Pegando dados da requisição
    const { email, oldPassword } = req.body;

    // Metodo para buscar usuario pela Primary Key
    const user = await User.findByPk(req.userId);

    // Verificando se o email da requisição é diferente da base de dados
    if (email !== user.email) {
      // Pegando o email
      const userExists = await User.findOne({ where: { email } });
      // Se existe o email, retorna erro
      if (userExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }

    // Verificando se ele quer alterar a senha e se a digitada bate com a senha do banco de dados
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    // nova query para alterar o avatar
    await user.update(req.body);

    const { id, name, avatar } = await User.findByPk(req.userId, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json({
      id,
      name,
      email,
      avatar,
    });
  }
}

export default new UserController();
