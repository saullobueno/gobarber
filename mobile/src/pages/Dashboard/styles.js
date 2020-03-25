import styled from 'styled-components/native';

// SafeAreaView faz ignorar o espaço do statusbar superior e contar apenas dele pra baixo
export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  align-self: center;
  margin-top: 30px;
`;

export const List = styled.FlatList.attrs({
  // para nao mostrar o scroll
  showsVerticalScrollIndicator: false,
  // relacionado ao conteudo do item
  contentContainerStyle: { padding: 30 },
})``;
