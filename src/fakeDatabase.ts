import { Effect } from 'effect';

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
};

export interface DatabaseService {
  readonly getUser: (id: string) => Effect.Effect<User | null, Error>;
  readonly saveUser: (user: User) => Effect.Effect<User, Error>;
  readonly deleteUser: (id: string) => Effect.Effect<void, Error>;
  readonly getAllUsers: () => Effect.Effect<User[], Error>;
}

export const makeDatabaseService = (initialData: User[] = []) => {
  const users = new Map<string, User>(
    initialData.map((user) => [user.id, user])
  );

  return {
    getUser: (id: string) =>
      Effect.try({
        try: () => users.get(id) ?? null,
        catch: () => new Error(`Failed to get user ${id}`),
      }),

    saveUser: (user: User) =>
      Effect.try({
        try: () => {
          users.set(user.id, user);
          return user;
        },
        catch: () => new Error('Failed to save user'),
      }),

    deleteUser: (id: string) =>
      Effect.try({
        try: () => {
          users.delete(id);
        },
        catch: () => new Error(`Failed to delete user ${id}`),
      }),

    getAllUsers: () =>
      Effect.try({
        try: () => Array.from(users.values()),
        catch: () => new Error('Failed to get all users'),
      }),
  };
};
