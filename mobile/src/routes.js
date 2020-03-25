import React from 'react';
import {
  createAppContainer,
  // nao possui efeito visual na navegação
  createSwitchNavigator,
  // navegação em abas
  createBottomTabNavigator,
  // navegação em pilhas
  createStackNavigator,
} from 'react-navigation';

// icones
import Icon from 'react-native-vector-icons/MaterialIcons';

// pages iniciais
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import SelectProvider from './pages/New/SelectProvider';
import SelectDateTime from './pages/New/SelectDateTime';
import Confirm from './pages/New/Confirm';

// pages internas
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

// isSigned verifica se está logado, que por padrao é false
export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        // Grupo das páginas iniciais
        Sign: createSwitchNavigator({
          SignIn,
          SignUp,
        }),
        // Grupo das páginas internar do app
        App: createBottomTabNavigator(
          {
            Dashboard,
            New: {
              // Para esta página faremos uma navegação de pilha para as páginas secundárias
              // colocamos as páginas secundárias em um objeto screen pára depois setar as opções de navegação
              screen: createStackNavigator(
                {
                  SelectProvider,
                  SelectDateTime,
                  Confirm,
                },
                // setando opções default para estas páginas
                {
                  defaultNavigationOptions: {
                    headerTransparent: true,
                    headerTintColor: '#FFF',
                    // botao de voltar
                    headerLeftContainerStyle: {
                      marginLeft: 20,
                    },
                  },
                }
              ),
              navigationOptions: {
                // com esta opção conseguimos sumir as outras opções do menu principal e voltar apenas com o botao de voltar
                tabBarVisible: false,
                // titulo
                tabBarLabel: 'Agendar',
                tabBarIcon: (
                  // icone
                  <Icon
                    name="add-circle-outline"
                    size={20}
                    // aqui na usamos o tintcolor pois a barra inferior é outra
                    color="rgba(255, 255, 255, 0.6)"
                  />
                ),
              },
            },
            Profile,
          },
          {
            // toda vez q sairmos de rota ela vai resetar e quando entrar nela novamente ela entra na primeira tela como se fosse a primeira vez
            resetOnBlur: true,
            // Opções da tabbar
            tabBarOptions: {
              // teclado acima da tabbar
              keyboardHidesTabBar: true,
              // cor de tinta ativa
              activeTintColor: '#FFF',
              // cor de tinta inativa
              inactiveTintColor: 'rgba(255, 255, 255, 0.6)',
              // cor de fundo da aba
              style: {
                backgroundColor: '#8d41a8',
              },
            },
          }
        ),
      },
      {
        // Verifica se está logado. Se estiver manda para o grupo de rotas 'App', se não manda para 'Sign'
        initialRouteName: isSigned ? 'App' : 'Sign',
      }
    )
  );
