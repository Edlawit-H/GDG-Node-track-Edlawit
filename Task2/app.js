import express from 'express';
const app=express();
const port=3000;

const students = [
    { id: 1, name: "Edlawit", department: "Software Engineering" },
    { id: 2, name: "Layla", department: "Mathematics" },
    { id: 3, name: "Elleni", department: "Physics" }
];

app.get("/home",(req,res)=>{
    res.status(200).type("text/html").send("<h1 style=color:green>Welcome!</h1>");
});

app.get("/about",(req,res)=>{
    res.status(200).send("This is About Page.");
});

app.get("/students/:studentId", (req, res) => {
    const studentId = parseInt(req.params.studentId);
    const department = req.query.department;
    const student = students.find(s => s.id === studentId);
    if (!student) {
        return res.status(404).json({ error: "Student not found" });
    }
    if (department) {
        return res.json({
            ...student,
            departmentQuery: department,
            isInDepartment: student.department === department
        });
    }
    res.json(student);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log("Try: http://localhost:3000/home");
    console.log("Try: http://localhost:3000/about");
    console.log("Try: http://localhost:3000/students/1");
    console.log("Try: http://localhost:3000/students/1?department=Software Engineering");
});