import authintication from '../utilities/Model Method/authintication';
import { UserModel } from '../utilities/model/userModel';

describe('login Tests Methods', () => {
  it('login with main admin', async () => {
    const req: UserModel = {
      user_email: 'admin@admin.com',
      user_password: 'admin',
    };
    const token = await authintication.logIn(req);
    expect(token).toBeTruthy();
  });
  it('login with new user', async () => {
    const req: UserModel = {
      user_email: 'an.roooof@gmail.com',
      user_password: 'admin',
    };
    const response = await authintication.logIn(req);
    expect(response).toBeTruthy();
  });

  it('login with wrong password', async () => {
    const req: UserModel = {
      user_email: 'an.roooof@gmail.com',
      user_password: '012456',
    };
    await expectAsync(authintication.logIn(req)).toBeRejectedWith(
      'Email or password is uncorrect'
    );
  });
});
