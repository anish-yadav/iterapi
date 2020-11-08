import { Student } from "..";

const student = new Student("1841012416", "12345");
test("login", async (done) => {
    await student.init();
    expect(student).toHaveProperty("name");
    expect(student).toHaveProperty("cookies");
    done();
});

test("Attendace", async (done) => {
    const attendance = await student.getAttendance();
    expect(attendance).not.toBeUndefined();
    done();
});

test("Result", async (done) => {
    const result = await student.getResult();
    expect(result).toBeDefined;
    expect(result![0]).toHaveProperty("Semesterdesc");
    done();
});

test("Detail Result", async (done) => {
    const detailResult = await student.getDetailResult(1);
    expect(detailResult).toBeDefined;
    expect(detailResult![0]).toHaveProperty("stynumber");
    done();
});

test("My Info", async (done) => {
    const myInfo = await student.myInfo();
    expect(myInfo).toHaveProperty("detail");
    expect(myInfo).toHaveProperty("griddata");
    done();
});
