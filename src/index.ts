import { Effect } from 'effect';
import { makeDatabaseService } from './fakeDatabase';
import { UserService } from './user.service';

const db = makeDatabaseService();
const userService = UserService(db);

const runExample = async () => {
  const createResult = await Effect.runPromise(
    userService.createUser('Lucas Barbosa', 'lucasb@github.com')
  );
  console.log('Create User:', createResult);

  const allUsers = await Effect.runPromise(userService.getAllUsers());
  console.log('Users: ', allUsers);

  const userId = allUsers[0].id;
  const user = await Effect.runPromise(userService.getUser(userId));
  console.log('Get a user: ', user);

  const deleteResult = await Effect.runPromise(userService.deleteUser(userId));
  console.log('Delete a User: ', deleteResult);

  const allUsersAfterDelete = await Effect.runPromise(
    userService.getAllUsers()
  );
  console.log('Updated User List: ', allUsersAfterDelete);
};

runExample().catch(console.error);
