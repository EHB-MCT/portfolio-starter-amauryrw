const { checkStudentName, isValidStudentAge, checkClassGroup, checkStudentGrade  } = require("../../helpers/endpointHelpers");

test("check name", () => {
  expect(checkStudentName("")).toBe(false);
  expect(checkStudentName(null)).toBe(false);
  expect(checkStudentName("i")).toBe(false);
  expect(checkStudentName(1)).toBe(false);
  expect(checkStudentName("amaury")).toBe(true);
  expect(checkStudentName("amaury rauw")).toBe(true);
  expect(checkStudentName("toolongstudentnameforvalidation")).toBe(false); 

});


test("check age", () =>{
  expect(isValidStudentAge(17)).toBe(true);
  expect(isValidStudentAge(18)).toBe(true);
  expect(isValidStudentAge(25)).toBe(true);
  expect(isValidStudentAge("notanumber")).toBe(false);
  expect(isValidStudentAge(null)).toBe(false);
});

test("check class group", () => {
  expect(checkClassGroup("")).toBe(false);
  expect(checkClassGroup(null)).toBe(false);
  expect(checkClassGroup(901)).toBe(false);
  expect(checkClassGroup("B")).toBe(false);
  expect(checkClassGroup("b101")).toBe(true);
  expect(checkClassGroup("d101")).toBe(false);
  expect(checkClassGroup("e101")).toBe(false);
  expect(checkClassGroup("LongClassNameThatExceedsMaxLength")).toBe(false);
});

test("check grade", () => {
  expect(checkStudentGrade(15)).toBe(true);
  expect(checkStudentGrade(0)).toBe(true);
  expect(checkStudentGrade(20)).toBe(true);
  expect(checkStudentGrade(21)).toBe(false); 
  expect(checkStudentGrade(-5)).toBe(false); 
  expect(checkStudentGrade("notanumber")).toBe(false);
  expect(checkStudentGrade(null)).toBe(false);
});