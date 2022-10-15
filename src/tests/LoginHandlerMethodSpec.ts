import supertest from 'supertest';
import app from '..';
import { UserModel } from '../utilities/model/userModel';
const request = supertest(app);

let AdminToken = '123=';
let clientToken = '123=';

describe('login Tests EndPint', () => {
  it('login with main admin', async () => {
    const req: UserModel = {
      user_email: 'admin@admin.com',
      user_password: 'admin',
    };
    const response = await request.post('/login').send(req);
    expect(response.status).toEqual(200);
    AdminToken += response.body.token;
    expect(response.body.token).toBeTruthy();
  });
  it('login with new user', async () => {
    const req: UserModel = {
      user_email: 'an.roooof@gmail.com',
      user_password: 'admin',
    };
    const response = await request.post('/login').send(req);
    clientToken += response.body.token;
    expect(response.status).toEqual(200);
    expect(response.body.token).toBeTruthy();
  });

  it('login with wrong password', async () => {
    const req: UserModel = {
      user_email: 'an.roooof@gmail.com',
      user_password: '012456',
    };
    const response = await request.post('/login').send(req);
    expect(response.status).toEqual(400);
    expect(response.body).toEqual('Email or password is uncorrect');
  });
});

export { AdminToken, clientToken };
