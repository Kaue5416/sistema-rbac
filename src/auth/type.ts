export type Role = 'aluno' | 'professor' | 'admin' | 'monitor';

export interface User {
  id: number;
  nome: string;
  email: string;
  role: Role;
  permissions: string[];
}