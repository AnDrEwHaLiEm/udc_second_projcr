import bcrypt from 'bcryptjs';
import user from '../utilities/Model Method/user';
import { UserModel } from '../utilities/model/userModel';

describe('user Tests Model', () => {
  it('create new user', async () => {
    const userData: UserModel = {
      user_name: 'Andrew',
      admin_authority: 'client',
      user_email: 'andrew2@gmail.com',
      user_password: '123456',
    };

    const response = await user.createNewUser(userData);
    expect(response.user_name).toEqual('Andrew');
    expect(response.user_email).toEqual('andrew2@gmail.com');
    expect(await bcrypt.compare('123456', response.user_password)).toBeTrue();
    expect(response.admin_authority).toEqual('client');
  });

  it('create exist user', async () => {
    const userData: UserModel = {
      user_name: 'Andrew',
      admin_authority: 'client',
      user_email: 'an.roooof@gmail.com',
      user_password: '987654',
    };
    await expectAsync(user.createNewUser(userData)).toBeRejectedWith(
      'unable to Create User'
    );
  });
});
