const http = require('http');
//PART 1 (PORT 3000)
const server3000 = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        res.end("Welcome to the Home Page");
    }
    else if (req.method === 'GET' && req.url === '/info') {
        res.end("This is the information page");
    }
    else if (req.method === 'POST' && req.url === '/submit') {
        let body = "";
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
            res.setHeader("Content-Type", "application/json");
            res.end(body); 
        });
    }
    else {
        res.end("Page Not Found");
    }
});
server3000.listen(3000, () => {
    console.log("Server 1 running on port 3000");
});


//PART 2 (PORT 4000)
let students =[ { id: 1, name: "Edlawit" }];
let nextId = 1;
const server4000 = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/students') {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(students));
    }
    else if (req.method === 'POST' && req.url === '/students') {
        let body = "";
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
            const data = JSON.parse(body);
            const student = { id: nextId++, name: data.name };
            students.push(student);
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(student));
        });
    }
    else if (req.url.startsWith('/students/')) {
        const parts = req.url.split('/');
        const id = parseInt(parts[2]);
        const index = students.findIndex(s => s.id === id);
        if (index === -1) {
            res.end("Student not found");
            return;
        }
        if (req.method === 'PUT') {
            let body = "";
            req.on('data', chunk => { body += chunk; });
            req.on('end', () => {
                const data = JSON.parse(body);
                students[index].name = data.name;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(students[index]));
            });
        }
        else if (req.method === 'DELETE') {
            students.splice(index, 1);
            res.end(`Student with id ${id} deleted`);
        }
    }
    else {
        res.end("Route Not Found");
    }
});
server4000.listen(4000, () => {
    console.log("Student API running on port 4000");
});
