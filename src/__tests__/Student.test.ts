import Student from "..";

const student = new Student("1841012416", "12345");
test("login", async (done) => {
  await student.init();
  expect(student).toHaveProperty("name");
  expect(student).toHaveProperty("cookies");
  done();
});

test("Attendace", async (done) => {
  const {attendance, error} = await student.getAttendance();
  expect(attendance).toBeDefined();
  expect(error).toBeUndefined();
  done();
});

test("Result", async (done) => {
  const {result, error} = await student.getResult();
  expect(result).toBeDefined();
  expect(error).toBeUndefined();
  expect(result![0]).toHaveProperty("Semesterdesc");
  done();
});

test("Detail Result", async (done) => {
  const {result, error} = await student.getDetailResult(1);
  expect(result).toBeDefined();
  expect(error).toBeUndefined();
  expect(result![0]).toHaveProperty("stynumber");
  done();
});

test("My Info", async (done) => {
  const {myinfo, error} = await student.myInfo();
  expect(myinfo).toBeDefined();
  expect(error).toBeUndefined();
  expect(myinfo).toHaveProperty("detail");
  expect(myinfo).toHaveProperty("griddata");
  done();
});
