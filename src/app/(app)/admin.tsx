import { StyleSheet, Text, View } from 'react-native';

export default function Admin() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Administração</Text>
      <Text>Área exclusiva do administrador.</Text>
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
});
