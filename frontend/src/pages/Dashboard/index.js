import React, { useState, useMemo, useEffect } from 'react';
import {
  format,
  subDays,
  addDays,
  setHours,
  setMinutes,
  setSeconds,
  isBefore,
  isEqual,
  parseISO,
} from 'date-fns';
// Para trabalhar com timezones na data
import { utcToZonedTime } from 'date-fns-tz';
import pt from 'date-fns/locale/pt';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import api from '~/services/api';

import { Container, Time } from './styles';

// colocando manualmente os horarios que quero disponibilizar os agendamentos
const range = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

export default function Dashboard() {
  const [schedule, setSchedule] = useState([]);
  const [date, setDate] = useState(new Date());

  // formatando a data
  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  useEffect(() => {
    // buscando agendamentos
    async function loadSchedule() {
      const response = await api.get('schedule', {
        params: { date },
      });
      // pegando a formatação do timezone do navegador do usuario
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      // mapeando o range
      const data = range.map(hour => {
        // pegando os horarios do range e zerando minutos e segundos de acordo com o timezone
        const checkDate = setSeconds(setMinutes(setHours(date, hour), 0), 0);
        // pega o date e formata para o timezone local
        const compareDate = utcToZonedTime(checkDate, timezone);
        // retornando o horario, o passado e o agendamento
        return {
          // passando a hora do range
          time: `${hour}:00h`,
          // verificando se compareDate é antes da data atual
          past: isBefore(compareDate, new Date()),
          // verificando se o date é igual ao comparedate
          appointment: response.data.find(a =>
            isEqual(parseISO(a.date), compareDate)
          ),
        };
      });
      setSchedule(data);
    }
    loadSchedule();
  }, [date]);

  // botão dia anterior
  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  // botão dia posterior
  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  return (
    <Container>
      <header>
        <button type="button" onClick={handlePrevDay}>
          <MdChevronLeft size={36} color="#FFF" />
        </button>
        <strong>{dateFormatted}</strong>
        <button type="button" onClick={handleNextDay}>
          <MdChevronRight size={36} color="#FFF" />
        </button>
      </header>

      <ul>
        {schedule.map(time => (
          <Time key={time.time} past={time.past} available={!time.appointment}>
            <strong>{time.time}</strong>
            <span>
              {time.appointment ? time.appointment.user.name : 'Em aberto'}
            </span>
          </Time>
        ))}
      </ul>
    </Container>
  );
}
