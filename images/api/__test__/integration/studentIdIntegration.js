
const request = require('supertest');
const app = require('./../../src/app.js'); 
const knexfile = require('./../../src/database/knexfile.js')
const db = require ("knex")(knexfile.development);

describe('GET /students/:id', () => {
beforeAll(async () => {
await db.raw('BEGIN'); 
});

afterAll(async () => {
     await db.destroy();
});

test('should return the correct student record', async () => { 
const studentId = 11;
const response = await request(app).get(`/students/${studentId}`);
expect(response.status).toBe (200);
expect(response.body).toHaveProperty('id', studentId);

});

test('should return 404 for non-existent student', async () => {
 const nonExistentStudentId = 999;
const response = await request(app).get(`/students/${nonExistentStudentId}`);

expect(response.status).toBe(404);
});
});