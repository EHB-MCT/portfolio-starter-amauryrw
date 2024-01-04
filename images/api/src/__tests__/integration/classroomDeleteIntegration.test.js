const request = require('supertest');
const app = require('../../app.js');
const { v4: uuid } = require('uuid');
const knexfile = require('../../db/knexfile.js');
const db = require('knex')(knexfile.development);

describe('DELETE /classrooms/:class', () => {
    beforeAll(async () => {
        const sampleClassroom = {
            class: 'TEST101',
        };

        const insertedClassroom = await db('classes').insert(sampleClassroom).returning('*');
        sampleClassroom.id = insertedClassroom[0].id; 

        const sampleStudent = {
            name: 'StudentToDelete',
            age: 21,
            classgroup: sampleClassroom.class,
            grade: 15,
        };

        await db('students').insert(sampleStudent);
    });

    afterAll(async () => {
        await db.destroy();
    });

    test('delete the specified classroom and related records', async () => {
        const classroomToDelete = sampleClassroom.class;
        const deleteResponse = await request(app).delete(`/classrooms/${classroomToDelete}`);
        expect(deleteResponse.status).toBe(200);
        const deletedClassroom = await db('classes').select('*').where('class', classroomToDelete);
        expect(deletedClassroom.length).toBe(0);
        const deletedStudents = await db('students').select('*').where('classgroup', classroomToDelete);
        expect(deletedStudents.length).toBe(0);
    });

    test('return 404 for non-existing classroom', async () => {
        const nonExistingClassroom = 'non-existing-class';
        const deleteResponse = await request(app).delete(`/classrooms/${nonExistingClassroom}`);
        expect(deleteResponse.status).toBe(404);
    });
});
