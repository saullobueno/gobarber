import React, { useRef, useState } from 'react';
import { Image } from 'react-native';
// hooks do redux
import { useDispatch, useSelector } from 'react-redux';

import logo from '~/assets/logo.png';

import Background from '~/components/Background';
import { signInRequest } from '~/store/modules/auth/actions';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
} from './styles';

// com a propriedade navigation, posso usa-la para criar navegação nos links em onPress
export default function SignIn({ navigation }) {
  const dispatch = useDispatch();
  // passando referencia para input password
  const passwordRef = useRef();
  // estados
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // pegando state do loading com useSelector
  const loading = useSelector(state => state.auth.loading);
  // disparando ação para form
  function handleSubmit() {
    dispatch(signInRequest(email, password));
  }

  return (
    <Background>
      <Container>
        <Image source={logo} />

        <Form>
          <FormInput
            // icone a ser usado
            icon="mail-outline"
            // tipo de teclado. Aqui ele coloca o @ e o .com automaticamente
            keyboardType="email-address"
            // Não deixa a autocorreção
            autoCorrect={false}
            // Não deixa colocar a primeira letra automaticamente
            autoCapitalize="none"
            // texto de indicação
            placeholder="Digite seu e-mail"
            // habilita botao next no teclado
            returnKeyType="next"
            // fala pra onde o next deve enviar focus
            onSubmitEditing={() => passwordRef.current.focus()}
            value={email}
            onChangeText={setEmail}
          />

          <FormInput
            icon="lock-outline"
            // Deixa os pontinhos no lugar da senha
            secureTextEntry
            placeholder="Sua senha secreta"
            ref={passwordRef}
            // por ser o ultimo botao, habilitamos o botao send no teclado
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={password}
            onChangeText={setPassword}
          />

          <SubmitButton loading={loading} onPress={handleSubmit}>
            Acessar
          </SubmitButton>
        </Form>

        <SignLink onPress={() => navigation.navigate('SignUp')}>
          <SignLinkText>Criar conta gratuita</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
}
