const request = require('supertest');
const app = require('../../app.js');
const {v4 : uuid} = require("uuid")
const knexfile = require('../../db/knexfile.js');
const db = require ("knex")(knexfile.development);


const postStudent = {
    name:"test",
    age: Math.floor(Math.random()*99),
    classgroup: "DEV V",
    grade: Math.floor(Math.random()*20),

}

describe('POST /students/:id', () => {
    beforeAll(async () =>{
        await db.raw("BEGIN");
    });

    afterAll(async() =>{
        await db.destroy();
    });

  test('should return the correct student record', async () => {
    const response = await request(app)
    .post(`/students`)
    .send(postStudent);

    const studentResponse = response.body.id;

    expect(response.body).toBe(200);

    const dbRecord = await db('students').select("*").where("id", studentResponse.id)
    expect(dbRecord[0]).toHaveProperty('id', studentResponse.id);
    expect(dbRecord[0]).toHaveProperty('UUID', postStudent.UUID);
    expect(dbRecord[0]).toHaveProperty('name', postStudent.name);
    expect(dbRecord[0]).toHaveProperty('age', postStudent.age);
    expect(dbRecord[0]).toHaveProperty('classgroup', postStudent.classgroup);
    expect(dbRecord[0]).toHaveProperty('grade', postStudent.grade);
  });


  test('should return 401, wrong student record', async () => {
    const response = await request(app)
    .post(`/students`)
    .send({
        ...postStudent,
        name:null
    });

    expect(response.body).toBe(401);
    const studentResponse = response.body;
    const dbRecord = await db('students').select("*").where("name", null.id)
  });
});
