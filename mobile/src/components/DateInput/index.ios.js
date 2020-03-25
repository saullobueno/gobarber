import React, { useState, useMemo } from 'react';
// importando o componente de data do IOS
import { DatePickerIOS } from 'react-native';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, DateButton, DateText, Picker } from './styles';

export default function DateInput({ date, onChange }) {
  // Estados
  const [opened, setOpened] = useState(false);

  // memorizando no dateFormatted toda vez q a variavel date repassada nos parametros mudar
  const dateFormatted = useMemo(
    () => format(date, "dd 'de' MMMM 'de' yyyy", { locale: pt }),
    [date]
  );

  return (
    <Container>
      {/* No onPress fazemos um setOpened para mudar o atual estado de opened */}
      <DateButton onPress={() => setOpened(!opened)}>
        <Icon name="event" color="#FFF" size={20} />
        {/* passando a data formatada */}
        <DateText>{dateFormatted}</DateText>
      </DateButton>

      {/* condicional para abrir o datepicker */}
      {opened && (
        <Picker>
          <DatePickerIOS
            // de onde vem os dados
            date={date}
            // metodo repassado pelos parametros
            onDateChange={onChange}
            // data minima, na pode ser anterior a data atual
            minimumDate={new Date()}
            // intervalo de 60 minutos
            minuteInterval={60}
            locale="pt"
            // o modo, q pode ser date ou datetime
            mode="date"
          />
        </Picker>
      )}
    </Container>
  );
}
