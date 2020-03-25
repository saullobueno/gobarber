<h1 align="center">
  GoBarber mobile
</h1>

<p align="center">Projeto full stack para barbeiros receberem agendamentos na web de clientes cadastrados pelo aplicativo. Desenvolvido em Node.js, ReactJS e React Native. 🎓</p>

<p align="center">
  <a href="#-instalacao-e-execução">Instalação e execução</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-como-contribuir">Como contribuir</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">Licença</a>
</p>

## 🚀 Instalação e execução

BACKEND:

1. Faça um clone desse repositório;
2. Entre na pasta rodando `cd backend`;
3. Rode `yarn` para instalar as dependências;
4. Crie um banco de dados no `postgres` com o nome de `gobarber`;
5. Renomeie o arquivo `.env.example` para `.env`;
6. Coloque as suas credenciais dentro do `.env`;
7. Rode `yarn sequelize db:migrate` para executar as migrations;
8. Rode `yarn dev` para iniciar o servidor.

FRONTEND:

1. Faça um clone desse repositório;
2. Entre na pasta rodando `cd frontend`;
3. Rode `yarn` para instalar as dependências;
4. Rode `yarn start` para iniciar o client.

MOBILE:

1. Faça um clone desse repositório;
2. Entre na pasta rodando `cd mobile`;
3. Rode `yarn` para instalar as dependências;
4. Rode `yarn react-native run-ios` ou `yarn react-native run-android` dependendo do SO.

## 🤔 Como contribuir

- Faça um fork desse repositório;
- Cria uma branch com a sua feature: `git checkout -b minha-feature`;
- Faça commit das suas alterações: `git commit -m 'feat: Minha nova feature'`;
- Faça push para a sua branch: `git push origin minha-feature`.

Depois que o merge da sua pull request for feito, você pode deletar a sua branch.

## :memo: Licença

Esse projeto está sob a licença MIT.
