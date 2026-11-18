
import { Tabs } from 'expo-router';
import { useAuth } from '../../auth/AuthContext';

export default function AppLayout() {
  const { user } = useAuth();

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{ title: 'Início' }}
      />

      <Tabs.Screen
        name="turmas"
        options={{ title: 'Turmas' }}
      />

      <Tabs.Protected
        guard={
          user?.role === 'professor' ||
          user?.role === 'admin'
        }
      >
        <Tabs.Screen
          name="professor"
          options={{
            title: 'Professor',
          }}
        />
      </Tabs.Protected>

      <Tabs.Protected guard={user?.role === 'admin'}>
        <Tabs.Screen
          name="admin"
          options={{
            title: 'Admin',
          }}
        />
      </Tabs.Protected>

      <Tabs.Screen
        name="perfil"
        options={{ title: 'Perfil' }}
      />
    </Tabs>
  );
}
