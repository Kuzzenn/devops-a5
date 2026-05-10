// backend/tests/api.test.js
const request = require('supertest');

jest.mock('../models/Student', () => {
  const mockStudent = jest.fn().mockImplementation(() => ({
    save: jest.fn().mockRejectedValue(new Error('Validation failed'))
  }));

  mockStudent.find = jest.fn(() => ({
    sort: jest.fn().mockResolvedValue([])
  }));

  mockStudent.findByIdAndDelete = jest.fn().mockResolvedValue({});

  return mockStudent;
});

const app = require('../server');

describe('Student Records API', () => {
  test('GET /health returns status ok', async () => {
    const res = await request(app).get('/health');

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  test('GET /api/students returns an array', async () => {
    const res = await request(app).get('/api/students');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /api/students with missing fields returns 400', async () => {
    const res = await request(app)
      .post('/api/students')
      .send({ course: 'CS316' });

    expect(res.statusCode).toBe(400);
  });
});
