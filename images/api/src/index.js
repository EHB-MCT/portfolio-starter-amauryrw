const { checkStudentName } = require("./../helpers/endpointHelpers.js");
/**
* @param id (integer): Unique identifier for the student.
* @param name (string): Name of the student.
* @param age (integer): Age of the student.
* @param classgroup (string): Class group information for the student.
* @param grade (double): Grade information for the student.
* @param created_at (string): Timestamp of when the student record was created.
* @param updated_at (string): Timestamp of when the student record 

 */

function initEndpoints(app, db) {
  /**
   * POST /students
   *
   * This route handles the creation of a new student record in the database.
   * It expects a JSON object containing student information in the request body.
   * Upon successful creation, it returns the newly created student's information.
   *
   * @param (object) req - The HTTP request object.
   * @param (Student) req.body- the HTTP request body contains the student
   * @param (object) res - The HTTP response object.
   * @returns (object) JSON response with either the newly created student or an error message.
   */
  app.post("/students", async (req, res) => {
    const student = req.body;
    if (checkStudentName(student.name)) {
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
      res.status(401).send({ message: "name not formatted correctly" });
    }
  });
}

/** 
  * GET /students
  * This route retrieves a list of all students from the database.
  * It returns a JSON array containing student records if successful.
  });
  *
  * @param (object) req - The HTTP request object.
  * @param (object) res - The HTTP response object.
  * @returns (object) JSON response with either an array of student records or an error me ge.

  */
app.get("/students", async (req, res) => {
  db("students")
    .join("classes", "classes.class", "students.classgroup")
    .then((students) => {
      res.json(students);
    })
    .catch((err) => {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while fetching students." });
    });
});

/**
 * GET /students/:id
 *
 * This route retrieves a specific student's information from the database based on the provided ID.
 * It expects the student's ID as a parameter in the URL.
 * If the student is found, it returns the student's information as JSON.
 * If the student is not found, it returns a 404 Not Found error.
 */

// const express = require("express");
// const app = express();
// const bodyParser = require("body-parser");

// app.use(bodyParser.json());

// app.get("/", (req, res) => {
//   res.send({ message: "Welcome to my API" });
// });

// app.get("/info", (req, res) => {
//   res.send({ message: "Information" });
//   console.log("Hello, world!");
// });

// // Route POST
// app.post("/create", (req, res) => {
//   const data = req.body;
//   res.send({ message: "Data has been created", data });
// });

// // Route DELETE
// app.delete("/delete/:id", (req, res) => {
//   const id = req.params.id;
//   res.send({ message: `Data with ID ${id} has been deleted` });
// });

// // Route PUT
// app.put("/update/:id", (req, res) => {
//   const id = req.params.id;
//   res.send({ message: `Data with ID ${id} has been updated`, data });
// });

// app.listen(3000, (err) => {
//   if (!err) {
//     console.log("Running on port 3000");
//   } else {
//     console.log(err);
//   }
// });
