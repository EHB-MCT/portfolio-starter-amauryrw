const { checkStudentName, isValidStudentAge , checkStudentGrade, checkClassGroup} = require("../helpers/endpointHelpers");


/**
 * @param {integer} id - Unique identifier for the student.
 * @param {string} name - Name of the student.
 * @param {integer} age - Age of the student.
 * @param {string} classgroup - Class group information for the student.
 * @param {double} grade - Grade information for the student.
 * @param {string} created_at - Timestamp of when the student record was created.
 * @param {string} updated_at - Timestamp of when the student record was updated.
 */

function initEndpoints(app, db) {
  /**
   * POST /students
   * Description: Creates a new student record.
   * @param {object} req - The HTTP request object.
   * @param {Student} req.body - The HTTP request body contains the student.
   * @param {object} res - The HTTP response object.
   * @returns {object} JSON response with either the newly created student or an error message.
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
 * Endpoint: GET /students
 * Description: Fetches a list of students along with their associated class information.
 * 
 * @param (Object) req - Express request object (not used in this endpoint).
 * @param (Object) res - Express response object.
 * @returns (Object)   - JSON response containing an array of student objects.
 *                     - Each student object includes information about the student and the associated class.
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
   * Description: Fetches a specific student by ID.
   * @param {object} req - The HTTP request object.
   * @param {object} res - The HTTP response object.
   * @returns {object} JSON response containing the student with the specified ID or an error message.
   */
  app.get("/students/:id", async (req, res) => {
    const id = req.params.id;
    if(id>=0 && typeof(id) == 'number' && id < 88888){
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
    }else{
      res.status(401).json({error : "negative id is provided"})
    }
  });


  /**
   * DELETE /students/:id
   * Description: Deletes a specific student by ID.
   * @param (object) req - The HTTP request object.
   * @param (object) res - The HTTP response object.
   * @returns (object) JSON response indicating success or failure.
   */
  app.delete("/students/:id", async (req, res) => {
    const studentId = req.params.id;
    const existingStudent = await db("students").select("*").where("id", studentId).first();
    if (!existingStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    await db("students").where("id", studentId).del();
    res.status(200).json({ message: "Student deleted successfully" });
  });


  /**
   * DELETE /classrooms/:class
   * Description: Deletes a specific classroom and associated students by class name.
   * @param (object) req - The HTTP request object.
   * @param (object) res - The HTTP response object.
   * @returns (object) JSON response indicating success or failure.
   */
  app.delete("/classrooms/:class", async (req, res) => {
    const classroom = req.params.class;
    const existingClassroom = await db("classes").select("*").where("class", classroom).first();
    if (!existingClassroom) {
      return res.status(404).json({ message: "Classroom not found" });
    }
    await db("classes").where("class", classroom).del();
    await db("students").where("classgroup", classroom).del();

    res.status(200).json({ message: "Classroom and associated students deleted successfully" });
  });


  /**
     * POST /students/:id/grade
     * Description: Adds or updates the grade for a specific student by ID.
     * @param {object} req - The HTTP request object.
     * @param {number} req.body.grade - The new grade for the student.
     * @param {object} res - The HTTP response object.
     * @returns {object} JSON response with either the updated student or an error message.
     */
  app.post("/students/:id/grade", async (req, res) => {
    const studentId = req.params.id;
    const newGrade = req.body.grade;

    if (!checkStudentGrade(newGrade)) {
      return res.status(401).json({ message: "Invalid grade provided" });
    }

    const existingStudent = await db("students").select("*").where("id", studentId).first();
    if (!existingStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    await db("students").where("id", studentId).update({ grade: newGrade, updated_at: new Date() });
    const updatedStudent = await db("students").where("id", studentId).first();
    res.status(200).json(updatedStudent);
  });


  /**
   * GET /students/:id/grade
   * Description: Fetches the grade for a specific student by ID.
   * @param {object} req - The HTTP request object.
   * @param {object} res - The HTTP response object.
   * @returns {object} JSON response containing the grade of the student or an error message.
   */
  app.get("/students/:id/grade", async (req, res) => {
    const studentId = req.params.id;

    const existingStudent = await db("students").select("*").where("id", studentId).first();
    if (!existingStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ grade: existingStudent.grade });
  });
  
}

module.exports = initEndpoints;
