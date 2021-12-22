const request = require('supertest');
const app = require('../src/app');

/* eslint-disable no-undef */
describe('GET /', () => {
  it('responds with a hello world json message', (done) => {
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(
        200,
        {
          message: 'Hello World! 👋🌍',
        },
        done,
      );
  });

  it('responds with a 404 error', (done) => {
    request(app)
      .get('/undefined-route')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });
});
