const request = require('supertest');
const app = require('../../app.js');
const { v4: uuid } = require('uuid');
const knexfile = require('../../db/knexfile.js');
const db = require('knex')(knexfile.development);

describe('DELETE /students/:id', () => {
    beforeAll(async () => {
        const sampleStudent = {
            name: 'ToDelete',
            age: 22,
            classgroup: 'DEV V',
            grade: 16,
        };

        const insertedStudent = await db('students').insert(sampleStudent).returning('*');
        sampleStudent.id = insertedStudent[0].id; 
    });

    afterAll(async () => {
        await db.destroy();
    });

    test(' delete the specified student and related records', async () => {
        const studentToDeleteId = sampleStudent.id;
        const deleteResponse = await request(app).delete(`/students/${studentToDeleteId}`);
        expect(deleteResponse.status).toBe(200);
        const deletedStudent = await db('students').select('*').where('id', studentToDeleteId);
        expect(deletedStudent.length).toBe(0);
        const classroomAssociation = await db('classes_students').select('*').where('student_id', studentToDeleteId);
        expect(classroomAssociation.length).toBe(0);
    });

    test(' return 404 for non-existing student', async () => {
        const nonExistingStudentId = 'non-existing-id';
        const deleteResponse = await request(app).delete(`/students/${nonExistingStudentId}`);
        expect(deleteResponse.status).toBe(404);
    });
});
