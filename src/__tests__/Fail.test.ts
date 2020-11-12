import Student  from "../";

const student = new Student("1841012416", "1245");
test("login", async (done) => {
    let { error } = await student.init();
    expect(error).toBeDefined();
    expect(error).toContain("incorrect");
    done();
});

test("Attendace", async (done) => {
    const { attendance, error } = await student.getAttendance();
    expect(attendance).toBeUndefined();
    expect(error).toBe("Initialization error");
    done();
});
