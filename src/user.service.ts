import { Effect, pipe } from 'effect';
import { DatabaseService } from './fakeDatabase';

export const UserService = (db: DatabaseService) => ({
  createUser: (name: string, email: string) =>
    pipe(
      Effect.succeed({
        id: crypto.randomUUID(),
        name,
        email,
        createdAt: new Date(),
      }),
      Effect.flatMap((user) => db.saveUser(user)),
      Effect.map((user) => ({
        message: 'User created successfully',
        user,
      }))
    ),

  getUser: (id: string) =>
    pipe(
      db.getUser(id),
      Effect.flatMap((user) =>
        user ? Effect.succeed(user) : Effect.fail(new Error('User not found'))
      )
    ),

  getAllUsers: () => db.getAllUsers(),

  deleteUser: (id: string) =>
    pipe(
      db.deleteUser(id),
      Effect.map(() => ({ message: 'User deleted successfully' }))
    ),
});
