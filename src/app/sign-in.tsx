
import { useState } from 'react';
import {
    Alert,
    Button,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { useAuth } from '../auth/AuthContext';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const { login } = useAuth();

  async function entrar() {
  const sucesso = await login(
    email.trim().toLowerCase(),
    senha
  );

  if (!sucesso) {
    Alert.alert('Erro', 'E-mail ou senha incorretos.');
  }
}

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Sistema RBAC</Text>
      <Text style={styles.subtitulo}>Faça seu login</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <Button title="Entrar" onPress={entrar} />

      <Text style={styles.info}>
        Senha de teste: 123456
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 25,
    backgroundColor: '#f4f4f4',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 17,
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 14,
    marginBottom: 15,
  },
  info: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
});
