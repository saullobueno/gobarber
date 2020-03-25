import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
// componente para verificar se a tela voltada foi visitada novamente para assim atualizar os dados dela
import { withNavigationFocus } from 'react-navigation';

import api from '~/services/api';

import Background from '~/components/Background';
import Appointment from '~/components/Appointment';

import { Container, Title, List } from './styles';

// isFocused é o parâmetro que da focus para a tela
function Dashboard({ isFocused }) {
  // Estados
  const [appointments, setAppointments] = useState([]);

  // Buscando os agendamentos
  // Fazemos este apenas através de função, pois passamos o useEffect apenas quando esta tela indicar q recebeu focus, para assim atualizar os dados
  async function loadAppointments() {
    const response = await api.get('appointments');
    setAppointments(response.data);
  }

  // Passamos para o useEffect abaixo o loadAppointments para quando o isFocused for true
  useEffect(() => {
    if (isFocused) {
      loadAppointments();
    }
  }, [isFocused]);

  // Função para cancelar
  async function handleCancel(id) {
    const response = await api.delete(`appointments/${id}`);

    setAppointments(
      appointments.map(appointment =>
        appointment.id === id
          ? {
              ...appointment,
              canceled_at: response.data.canceled_at,
            }
          : appointment
      )
    );
  }

  return (
    <Background>
      <Container>
        <Title>Agendamentos</Title>

        <List
          data={appointments}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Appointment onCancel={() => handleCancel(item.id)} data={item} />
          )}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  // Setando titulo da página na aba
  tabBarLabel: 'Agendamentos',
  // colocando icone e criando função para pegar o tintcolor de forma automatica
  tabBarIcon: ({ tintColor }) => (
    <Icon name="event" size={20} color={tintColor} />
  ),
};

// aqui passamos o componente de focus de tela
export default withNavigationFocus(Dashboard);
