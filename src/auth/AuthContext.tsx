import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react';

import * as SecureStore from 'expo-secure-store';
import { Role, User } from './type';

interface AuthContextData {
  user: User | null;
  isLoading: boolean;
  login: (email: string, senha: string) => Promise<boolean>;
  logout: () => Promise<void>;
  can: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

function obterPermissoes(role: Role): string[] {
  switch (role) {
    case 'aluno':
      return ['turma.visualizar'];

    case 'monitor':
      return ['turma.visualizar'];

    case 'professor':
      return ['turma.visualizar', 'turma.excluir'];

    case 'admin':
      return [
        'turma.visualizar',
        'turma.excluir',
        'usuario.gerenciar',
      ];

    default:
      return [];
  }
}

// Simula a consulta de um usuário na API
async function me(token: string): Promise<User | null> {
  const usuarios: User[] = [
    {
      id: 1,
      nome: 'Aluno',
      email: 'aluno@aula.dev',
      role: 'aluno',
      permissions: obterPermissoes('aluno'),
    },
    {
      id: 2,
      nome: 'Professor',
      email: 'professor@aula.dev',
      role: 'professor',
      permissions: obterPermissoes('professor'),
    },
    {
      id: 3,
      nome: 'Administrador',
      email: 'admin@aula.dev',
      role: 'admin',
      permissions: obterPermissoes('admin'),
    },
    {
      id: 4,
      nome: 'Monitor',
      email: 'monitor@aula.dev',
      role: 'monitor',
      permissions: obterPermissoes('monitor'),
    },
  ];

  return usuarios.find(
    (usuario) => token === `token-${usuario.id}`
  ) ?? null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Recupera a sessão quando o aplicativo abre
  useEffect(() => {
    async function restoreSession() {
      try {
        const token = await SecureStore.getItemAsync('userToken');

        if (token) {
          const usuario = await me(token);
          setUser(usuario);

          if (!usuario) {
            await SecureStore.deleteItemAsync('userToken');
          }
        }
      } catch (error) {
        console.log('Erro ao recuperar sessão:', error);
      } finally {
        setIsLoading(false);
      }
    }

    restoreSession();
  }, []);

  async function login(email: string, senha: string) {
    if (senha !== '123456') {
      return false;
    }

    const usuarios: User[] = [
      {
        id: 1,
        nome: 'Aluno',
        email: 'aluno@aula.dev',
        role: 'aluno',
        permissions: obterPermissoes('aluno'),
      },
      {
        id: 2,
        nome: 'Professor',
        email: 'professor@aula.dev',
        role: 'professor',
        permissions: obterPermissoes('professor'),
      },
      {
        id: 3,
        nome: 'Administrador',
        email: 'admin@aula.dev',
        role: 'admin',
        permissions: obterPermissoes('admin'),
      },
      {
        id: 4,
        nome: 'Monitor',
        email: 'monitor@aula.dev',
        role: 'monitor',
        permissions: obterPermissoes('monitor'),
      },
    ];

    const usuario = usuarios.find(
      (item) => item.email === email
    );

    if (!usuario) {
      return false;
    }

    const token = `token-${usuario.id}`;

    await SecureStore.setItemAsync('userToken', token);

    setUser(usuario);

    return true;
  }

  async function logout() {
    await SecureStore.deleteItemAsync('userToken');
    setUser(null);
  }

  function can(permission: string): boolean {
    return user?.permissions.includes(permission) ?? false;
  }

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, logout, can }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
