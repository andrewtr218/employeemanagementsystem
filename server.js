var mysql = require("mysql");
var inquirer = require("inquirer");

var cont=true

var departments = [("Big Boss"),
("Middle People"),
("Small Worthless Scum"),
("Slaves")];
var employees = ["Clark Sad", "Blart Trog", "Cleag Land", "Borm Barm"];
var roles = ["Big Ones", "Middle", "Worker", "Slave"];
var employeeJSON = [];


// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Destroyer?",
  database: "manage_db"
});


connection.connect(function(err) {
  if (err) throw err;
//   console.log("connected as id " + connection.threadId + "\n");
});


async function question1(){
    const { Select } = await inquirer.prompt([{
            type: "list",
            name: "Select",
            prompt: "select an option",
            choices: ["Add", "View", "Update", "Quit\n"]
        }])
        console.log(Select)
        switch(Select){
            case "Add":
                console.log("Adding");
                addAll();
                break;
            case "View":
                console.log("Viewing");
                viewAll();
                break;
            case "Update":
                console.log("Updating");
                updateEmployee();
                break;
            case "Quit":
                console.log("Quiting");
                process.exit(2)
                break;
        }
};

//functions for further quesitons prompts

async function updateEmployee(){
    const { Select } = await inquirer.prompt([{
        type: "list",
        name: "Select",
        prompt: "select an employee",
        choices: employees
    }])
    updateRole(Select);
}

async function updateRole(employeeName){
    const { Select } = await inquirer.prompt([{
        type: "list",
        name: "Select",
        prompt: "select a role",
        choices: roles
    }])
    connection.query("Update employees set ? where ?", [{role: Select},{full_name: employeeName}], function(err,res){
        console.log("Role Added!");
    })
    let employeeFull = {};
    employeeFull.name = employeeName;
    employeeFull.role = Select;
    employeeJSON.push(employeeFull);
    // console.log(employeeJSON);
    question1();    
}

async function addAll(){
    const { Select } = await inquirer.prompt([{
        type: "list",
        name: "Select",
        prompt: "select an option",
        choices: [`add a department`, `add an employee`, `add a role`, `go back`, `quit\n`]
    }])
    switch(Select){
        case `add a department`:
            // console.log(`Adding a Department`)
            addDepartment();
            break;
        case `add an employee`:
            // console.log(`Adding an Employee`)
            addEmployee();
            break;
        case `add a role`:
            // console.log(`Adding a Role`)
            addRole();
            break;
        case `go back`:
            console.log(`Go Back`)
            question1();
            break;
        case `quit\n`:
            console.log(`Quitting`)
            process.exit(2);
            break;
    }
}

async function addDepartment(){
    const { Select } = await inquirer.prompt([{
        type: "input",
        name: "Select",
        message: "What is the name of the department you want to add?",
    }])
    departments.push(Select);
    connection.query("Insert Into departments set ?", {department: Select}, function(err,res){
        console.log("Department Added!");
    })
    question1();
}

async function addEmployee(){
    const { Select } = await inquirer.prompt([{
        type: "input",
        name: "Select",
        message: "What is the name of the employee you want to add?",
    }])
    employees.push(Select);
    connection.query("Insert Into employees set ?", {full_name: Select}, function(err,res){
        console.log("Employee Added!");
    });
    question1();
}

async function addRole(){
    const { Select } = await inquirer.prompt([{
        type: "input",
        name: "Select",
        message: "What is the name of the role you want to add?",
    }])
    roles.push(Select);
    connection.query("Insert Into roles set ?", {role: Select}, function(err,res){
        console.log("Role Added!");
    })
    question1();
}

async function viewAll(){
    const { Select } = await inquirer.prompt([{
        type: "list",
        name: "Select",
        prompt: "select an option",
        choices: [`view a department`, `view an employee`, `view a role`, `go back`, `quit\n`]
    }])
    switch(Select){
        case `view a department`:
            console.log(`Viewing a Department`)
            viewDepartment();
            break;
        case `view an employee`:
            console.log(`Viewing an Employee`)
            viewEmployee();
            break;
        case `view a role`:
            console.log(`Viewing a Role`)
            viewRole();
            break;
        case `go back`:
            console.log(`Go Back`)
            addAll();
            break;
        case `quit\n`:
            console.log(`Quitting`)
            process.exit(2);
            break;
    }
}

async function viewDepartment(){
    connection.query("Select * From departments", function(err, res) {
        if (err) throw err;
        console.table(res);
        question1();
    })
}

async function viewEmployee(){
    connection.query("Select * From employees", function(err, res) {
        if (err) throw err;
        console.table(res);
        question1();
    })
};

async function viewRole(){
    connection.query("Select * From roles", function(err, res) {
        if (err) throw err;
        console.table(res);
        question1();
    })
    
}

question1();
    
   

