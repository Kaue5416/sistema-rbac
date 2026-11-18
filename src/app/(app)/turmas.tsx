import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../../auth/AuthContext';

export default function Turmas() {
    const { can } = useAuth();
  function excluirTurma() {
    Alert.alert('Turmas', 'Ação de exclusão executada!');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Turmas</Text>

      <Text>Aqui ficam as informações das turmas.</Text>

      {can('turma.excluir') && (
        <View style={styles.botao}>
            <Button
            title="Excluir turma"
            onPress={excluirTurma}
            />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  botao: {
    marginTop: 20,
  },
});
