import supertest from 'supertest';
import app from '..';
const request = supertest(app);


describe('user Tests', () => {
    it('create new user', async () => {
        const userData = {
            user_name: 'Andrew',
            admin_authority: 'client',
            user_email: 'andrew@gmail.com',
            user_password: '123456',
        };

        const response = await request.post('/user/signup').send(userData);
        expect(response.status).toEqual(200);
        expect(response.text).toEqual('Success');
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
        expect(response.text).toEqual('User is Exist');
    });


});