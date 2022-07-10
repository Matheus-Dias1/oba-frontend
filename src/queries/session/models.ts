export type SessionResponseT = {
  token?: string;
  error?: 'USER_DOESNT_EXIST' | 'INSUFFICIENT_PERMISSIONS' | 'WRONG_PASSWORD';
};

export const SESSION_ERRORS = {
  USER_DOESNT_EXIST: 'Usuário não encontrado',
  INSUFFICIENT_PERMISSIONS: 'Usuário sem permissão',
  WRONG_PASSWORD: 'Senha incorreta',
};
