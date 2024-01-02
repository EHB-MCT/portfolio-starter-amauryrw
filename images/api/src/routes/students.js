const { checkStudentName, isValidStudentAge } = require("../helpers/endpointHelpers");

/**
 * @param id (integer): Unique identifier for the student.
 * @param name (string): Name of the student.
 * @param age (integer): Age of the student.
 * @param classgroup (string): Class group information for the student.
 * @param grade (double): Grade information for the student.
 * @param created_at (string): Timestamp of when the student record was created.
 * @param updated_at (string): Timestamp of when the student record was updated.
 */

function initEndpoints(app, db) {
  /**
   * POST /students
   * @param (object) req - The HTTP request object.
   * @param (Student) req.body - the HTTP request body contains the student
   * @param (object) res - The HTTP response object.
   * @returns (object) JSON response with either the newly created student or an error message.
   */
  app.post("/students", async (req, res) => {
    const student = req.body;
    if (checkStudentName(student.name)&& isValidStudentAge(student.age) && checkClassGroup(student.classgroup)) {
      db("students")
        .insert(student)
        .returning("*")
        .then((insertedStudent) => {
          res.status(201).json(insertedStudent[0]);
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        });
    } else {
      res.status(401).send({ message: "name or age not correct or formatted correctly" });
    }
  });

  /**
   * GET /students
   * This route retrieves a list of all students from the database.
   * It returns a JSON array containing student records if successful.
   */
  app.get("/students", async (req, res) => {
    db("students")
      .join("classes", "classes.class", "students.classgroup")
      .then((students) => {
        res.json(students);
      })
      .catch((err) => {
        console.error(err);
        res
          .status(500)
          .json({ error: "An error occurred while fetching students." });
      });
  });

  /**
   * GET /students/:id
   * This route retrieves a specific student's information from the database based on the provided ID.
   * It expects the student's ID as a parameter in the URL.
   * If the student is found, it returns the student's information as JSON.
   * If the student is not found, it returns a 404 Not Found error.
   */
  app.get("/students/:id", async (req, res) => {
    const studentId = req.params.id;
    db("students")
      .where({ id: studentId })
      .first()
      .then((student) => {
        if (student) {
          res.json(student);
        } else {
          res.status(404).json({ message: "Student not found" });
        }
      })  
      .catch((err) => {
        console.error(err);
        res
          .status(500)
          .json({ error: "An error occurred while fetching student." });
      });
  });
}

module.exports = initEndpoints;
