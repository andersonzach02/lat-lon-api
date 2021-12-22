const request = require('supertest');
const app = require('../src/app');

/* eslint-disable no-undef */
describe('GET /api/v1/', () => {
  it('should respond with a json welcome message', (done) => {
    request(app)
      .get('/api/v1/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(
        200,
        {
          message: 'API Home Route 🏡',
        },
        done,
      );
  });
});
