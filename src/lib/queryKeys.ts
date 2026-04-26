export const queryKeys = {
  auth: {
    user: ['auth', 'user'] as const,
  },

  users: {
    all: ['users'] as const,
    detail: (id: string) => ['users', id] as const,
  },

  loans: {
    all: ['loans'] as const,
  },

}