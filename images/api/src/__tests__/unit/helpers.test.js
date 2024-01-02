const { checkStudentName } = require("../../helpers/endpointHelpers");

test("check name", () => {
  expect(checkStudentName("")).toBe(false);
  expect(checkStudentName(null)).toBe(false);
  expect(checkStudentName("i")).toBe(false);
  expect(checkStudentName(1)).toBe(false);
  expect(checkStudentName(null)).toBe(false);
  expect(checkStudentName("amaury")).toBe(true);
  expect(checkStudentName("amaury rauw")).toBe(true);
  expect(checkStudentName("toolongstudentnameforvalidation")).toBe(false); 

});
