import supertest from 'supertest';
import app from '..';
const request = supertest(app);


let AdminToken = '123=';
let clientToken = '123=';

describe('log in EndPint', () => {
  
  it('login with main admin', async () => {
    const req = { user_email: 'admin@admin.com', password: 'admin' };
    const response = await request.post('/login').send(req);
    expect(response.status).toEqual(200);
    AdminToken += response.body.token;
    expect(response.body.token).toBeTruthy();
  });

  it('login with new user', async () => {
    const req = { user_email: 'an.roooof@gmail.com', password: 'admin' };
    const response = await request.post('/login').send(req);
    clientToken += response.body.token;
    expect(response.status).toEqual(200);
    expect(response.body.token).toBeTruthy();
  });

  it('login with wrong password', async () => {
    const req = { user_email: 'an.roooof@gmail.com', password: '012456' };
    const response = await request.post('/login').send(req);
    expect(response.status).toEqual(404);
    expect(response.text).toEqual('Email or password is uncorrect');
  });
});

export { AdminToken, clientToken };
