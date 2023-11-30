const { checkStudentName } = require("./../helpers/endpointHelpers.js");

// table.uuid("UUID");
//     table.string("name");
//     table.integer("age");
//     table.string("classgroup"); // Class group information
//     table.double("grade"); // Student's grade information

test("check name", () => {
  expect(checkStudentName("")).toBe(false);
  expect(checkStudentName(null)).toBe(false);
  expect(checkStudentName("i")).toBe(false);
  expect(checkStudentName(1)).toBe(false);
  expect(checkStudentName(null)).toBe(false);
});
