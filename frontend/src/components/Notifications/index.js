import React, { useState, useEffect, useMemo } from 'react';
// Lib de icones
import { MdNotifications } from 'react-icons/md';
// Lib de datas. ParseISO faz converções de formatos e formatDistance converte em quanto tempo faz determinada data
import { parseISO, formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';

import {
  Container,
  Badge,
  NotificationList,
  Scroll,
  Notification,
} from './styles';

export default function Notifications() {
  // Estados
  const [visible, setVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // Bolinha mostrando q tem alguma notificação não lida.
  // !!notifications.find retorna true ou false caso haja alguma notificação com read=false
  const hasUnread = useMemo(
    () => !!notifications.find(notification => notification.read === false),
    // Array de dependencias. Depende das alterações na seguinte variavel
    [notifications]
  );

  useEffect(() => {
    async function loadNotifications() {
      const response = await api.get('notifications');

      // Dando map e inserindo nova propriedade com data formatada às notificações
      const data = response.data.map(notification => ({
        ...notification,
        // criando nova propriedade com data formatada
        timeDistance: formatDistance(
          parseISO(notification.createdAt),
          new Date(),
          // addSuffix adiciona "Hà" na frase "dias atrás"
          { addSuffix: true, locale: pt }
        ),
      }));
      // Setando com novo conteudo
      setNotifications(data);
    }

    loadNotifications();
  }, []);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  // Marcando notificação como lida
  async function handleMarkAsRead(id) {
    await api.put(`notifications/${id}`);

    setNotifications(
      notifications.map(notification =>
        notification._id === id ? { ...notification, read: true } : notification
      )
    );
  }

  return (
    <Container>
      <Badge onClick={handleToggleVisible} hasUnread={hasUnread}>
        <MdNotifications color="#7159c1" size={20} />
      </Badge>

      <NotificationList visible={visible}>
        {/* Scroll do react-perfect-scroll para colocar scroll em uma div */}
        <Scroll>
          {notifications.map(notification => (
            <Notification key={notification._id} unread={!notification.read}>
              <p>{notification.content}</p>
              <time>{notification.timeDistance}</time>
              {!notification.read && (
                <button
                  type="button"
                  onClick={() => handleMarkAsRead(notification._id)}
                >
                  Marcar como lida
                </button>
              )}
            </Notification>
          ))}
        </Scroll>
      </NotificationList>
    </Container>
  );
}
