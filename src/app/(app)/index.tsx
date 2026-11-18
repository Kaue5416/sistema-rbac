import { StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../../auth/AuthContext';

export default function Inicio() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Bem-vindo!</Text>
      <Text>Olá, {user?.nome}.</Text>
      <Text>Seu papel: {user?.role}</Text>
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
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
  },
});
