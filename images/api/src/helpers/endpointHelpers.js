/**
 * check name of user on post
 * @params student name
 * @returns false if non match true if right type
 *
 *
 */

function checkStudentName(name) {
  if (
    name == null ||
    name.length <= 1 ||
    typeof name != "string" ||
    name.length > 20
  ) {
    return false;
  }
  return true;
}

function isValidStudentAge(age){
  if (typeof age === "number" && age >= 17 && age <= 99) {
    return true;
  }
  return false;
}

function checkClassGroup(classGroup) {
  if (
    typeof classGroup !== "string" ||
    !/^[AaBbCc][0-9]{3}$/.test(classGroup)
  ) {
    return false;
  }
  return true;
}


function checkStudentGrade(grade) {
  if (typeof grade === "number" && grade >= 0 && grade <= 20) {
    return true;
  }
  return false;
}

module.exports = {
  checkStudentName,isValidStudentAge,checkClassGroup,checkStudentGrade

};
