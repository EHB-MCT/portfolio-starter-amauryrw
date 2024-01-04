const request = require('supertest');
const app = require('../../app.js');
const knexfile = require('../../db/knexfile.js');
const db = require ("knex")(knexfile.development);

describe('GET /students/:id', () => {


    beforeAll(async () =>{
        await db.raw("BEGIN");
    });

    afterAll(async() =>{
        await db.destroy();
    });


  test('should return the correct student record', async () => {
    const studentId = 11;
    const response = await request(app).get(`/students/${studentId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', studentId);

    const dbRecord = await db('students').select("*").where("id", studentId)
    expect(dbRecord.length).toBeGreatThan(0)
    expect(dbRecord[0]).toHaveProperty('id', studentId);
  });

  test('should return 404 for non-existing student', async ()=>{
    const nonExistingStudentId = 999;
    const response = await request(app).get(`/students/${nonExistingStudentId}`)
    expect(response.status).toBe(404);
    
    const dbRecord = await db('students').select("*").where("id", nonExistingStudentId)
    expect(dbRecord.length).toBe(0)
  });

  test('should return 401 for negative studentID', async ()=>{
    const nonExistingStudentId = -15;
    const response = await request (app).get(`/students/${nonExistingStudentId}`)
    expect(response.status).toBe(401);
  });

  test('should return 401 for to large studentID', async ()=>{
    const nonExistingStudentId = 88888;
    const response = await request (app).get(`/students/${nonExistingStudentId}`)
    expect(response.status).toBe(401);
  });

});
