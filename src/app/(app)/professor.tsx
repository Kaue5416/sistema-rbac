import { StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../../auth/AuthContext';

export default function Professor() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Área do Professor</Text>

      <Text>Bem-vindo, {user?.nome}!</Text>

      <Text>
        Esta área é exclusiva para professores e administradores.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
});