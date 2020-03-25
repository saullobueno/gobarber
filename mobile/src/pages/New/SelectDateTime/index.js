import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Background from '~/components/Background';
import DateInput from '~/components/DateInput';

import { Container, HourList, Hour, Title } from './styles';

// passamos como parametro o navigation
export default function SelectDateTime({ navigation }) {
  // Passando a data atual para o estado date
  const [date, setDate] = useState(new Date());
  const [hours, setHours] = useState([]);

  // pelo navigation passado como parametro, passamos para a variavel o provider através do getParam
  const provider = navigation.getParam('provider');

  useEffect(() => {
    async function loadAvailable() {
      const response = await api.get(`providers/${provider.id}/available`, {
        // passando por parametro, o date nor formato timestamp
        params: {
          date: date.getTime(),
        },
      });
      setHours(response.data);
    }
    loadAvailable();
    // dependencias para este useEffect
  }, [date, provider.id]);

  // Selecionando o horario recebido no parametro
  function handleSelectHour(time) {
    // navega para a tela Confirm
    navigation.navigate('Confirm', {
      // com os dados do provider da const la em cima recebido como parametro
      provider,
      // passamos o time recebido
      time,
    });
  }

  return (
    <Background>
      <Container>
        {/* setando o date com o onChange */}
        <DateInput date={date} onChange={setDate} />
        <HourList
          data={hours}
          extraData={date}
          // passando a key
          keyExtractor={item => item.time}
          // renderizando a hora
          renderItem={({ item }) => (
            <Hour
              onPress={() => handleSelectHour(item.value)}
              enabled={item.available}
            >
              <Title>{item.time}</Title>
            </Hour>
          )}
        />
      </Container>
    </Background>
  );
}

SelectDateTime.navigationOptions = ({ navigation }) => ({
  title: 'Selecione o horário',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        // para voltar para a pagina anterior
        navigation.goBack();
      }}
    >
      <Icon name="chevron-left" size={20} color="#FFF" />
    </TouchableOpacity>
  ),
});
