import { Button, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../../auth/AuthContext';

export default function Perfil() {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Meu Perfil</Text>
      <Text>Nome: {user?.nome}</Text>
      <Text>E-mail: {user?.email}</Text>
      <Text>Papel: {user?.role}</Text>

      <View style={styles.botao}>
        <Button title="Sair" onPress={logout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 25,
  },
  titulo: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  botao: {
    marginTop: 25,
  },
});
