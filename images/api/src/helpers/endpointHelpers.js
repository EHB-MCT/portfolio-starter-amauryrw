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

module.exports = {
  checkStudentName,
};
