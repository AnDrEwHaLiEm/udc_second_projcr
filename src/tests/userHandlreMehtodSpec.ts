import bcrypt from 'bcryptjs';
import supertest from 'supertest';
import app from '..';

const request = supertest(app);

describe('user Tests EndPoint', () => {
  it('create new user', async () => {
    const userData = {
      user_name: 'Andrew',
      admin_authority: 'client',
      user_email: 'andrew@gmail.com',
      user_password: '123456',
    };
    const response = await request.post('/user/signup').send(userData);
    const result = response.body;
    expect(response.status).toEqual(200);
    expect(result.user_name).toEqual('Andrew');
    expect(result.user_email).toEqual('andrew@gmail.com');
    expect(await bcrypt.compare('123456', result.user_password)).toBeTrue();
    expect(result.admin_authority).toEqual('client');
  });

  it('create exist user', async () => {
    const userData = {
      user_name: 'Andrew',
      admin_authority: 'client',
      user_email: 'an.roooof@gmail.com',
      user_password: '987654',
    };
    const response = await request.post('/user/signup').send(userData);
    expect(response.status).toEqual(409);
    expect(response.body).toBe('unable to Create User');
  });
});
