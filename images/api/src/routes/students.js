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

}

module.exports = initEndpoints;
