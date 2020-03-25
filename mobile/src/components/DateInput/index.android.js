import React, { useMemo } from 'react';
// componente de datas para android
import { DatePickerAndroid } from 'react-native';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, DateButton, DateText } from './styles';

export default function DateInput({ date, onChange }) {

  // memorizando data formatada
  const dateFormatted = useMemo(
    () => format(date, "dd 'de' MMMM 'de' yyyy", { locale: pt }),
    [date]
  );


  async function handleOpenPicker() {
    // pegando o componente de data do Android e setando algumas opções
    const { action, year, month, day } = await DatePickerAndroid.open({
      // escolhemos o modo spinner, mas pode ser outros formatados tambem
      mode: 'spinner',
      // setando a data inicial q estamos recebendo como parametro
      date,
    });

    // quando ele selecionar a data
    if (action === DatePickerAndroid.dateSetAction) {
      // passamos para a variavel selectedDate, o new date com a data selecionada
      const selectedDate = new Date(year, month, day);
      // passamos para o metodo onChange no parametro, a data selecionada
      onChange(selectedDate);
    }
  }

  return (
    <Container>
      <DateButton onPress={handleOpenPicker}>
        <Icon name="event" color="#FFF" size={20} />
        <DateText>{dateFormatted}</DateText>
      </DateButton>
    </Container>
  );
}
