const express = require("express");
const bodyParser = require("body-parser");
const port= 3000;
const employees = [
    {
        employeeId: "1",
        employeeName: "Jatin Chauhan",
        employeePost: "Assitant Manager",
        employeeSalary: "43000",
        },
        {
        employeeId: "2",
        employeeName: "Sachin Chauhan",
        employeePost: "Manager",
        employeeSalary: "45000",
        },
        {
         employeeId: "3",
         employeeName: "Aanchal Sharma",
         employeePost: "Associate Director",
         employeeSalary: "50000"
        },
];
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.get("/", function (req, res) {
  res.render("home", {
    data: employees,
  });
});
app.post("/", (req, res) => {
  const inputEmployeeId = employees.length + 1;
  const inputEmployeeName = req.body.employeeName;
  const inputEmployeePost = req.body.employeePost;
  const inputEmployeeSalary = req.body.employeeSalary;
  employees.push({
    employeeId: inputEmployeeId,
    employeeName: inputEmployeeName,
    employeePost: inputEmployeePost,
    employeeSalary: inputEmployeeSalary,
  });
  res.render("home", {
    data: employees,
  });
});
app.post("/delete", (req, res) => {
  var requestedEmployeeId = req.body.employeeId;
  var j = 0;
  employees.forEach((employee) => {
    j = j + 1;
    if (employee.employeeId === requestedEmployeeId) {
      employees.splice(j - 1, 1);
    }
  });
  res.render("home", {
    data: employees,
  });
});
app.post("/update", (req, res) => {
  const requestedEmployeeId = req.body.employeeId;
  const inputEmployeeName = req.body.employeeName;
  const inputEmployeePost = req.body.employeePost;
  const inputEmployeeSalary = req.body.employeeSalary;
  var j = 0;
  employees.forEach((employee) => {
    j = j + 1;
    if (employee.employeeId == requestedEmployeeId) {
      (employee.employeeName = inputEmployeeName),
        (employee.employeePost = inputEmployeePost),
        (employee.employeeSalary = inputEmployeeSalary);
    }
  });
  res.render("home", {
    data: employees,
  });
});
app.listen(port, (req, res) => {
  console.log("App is running on port 3000");
});
