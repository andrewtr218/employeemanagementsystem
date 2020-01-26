var mysql = require("mysql");
var inquirer = require("inquirer");

var cont=true

var departments = [];
var employees = [];
var roles = [];
var employeeRole [];
var employeeObj = [{}];


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

async function connection(){
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
})
};

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
    employeeObj.name = employeeName;
    employeeObj.role = Select;
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
            console.log(`Adding a Department`)
            addDepartment();
            break;
        case `add an employee`:
            console.log(`Adding an Employee`)
            addEmployee();
            break;
        case `add a role`:
            console.log(`Adding a Role`)
            addRole();
            break;
        case `go back`:
            console.log(`Go Back`)
            question1();
            break;
        case `quit`:
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
    console.log("Department Added!");
    question1();
}

async function addEmployee(){
    const { Select } = await inquirer.prompt([{
        type: "input",
        name: "Select",
        message: "What is the name of the employee you want to add?",
    }])
    employees.push(Select);
    console.log("Employee Added!");
    question1();
}

async function addRole(){
    const { Select } = await inquirer.prompt([{
        type: "input",
        name: "Select",
        message: "What is the name of the role you want to add?",
    }])
    roles.push(Select);
    console.log("Role Added!");
    question1();
}

async function viewAll(){
    const { Select } = await inquirer.prompt([{
        type: "list",
        name: "Select",
        prompt: "select an option",
        choices: [`view a department`, `view an employee`, `view a role`, `go back`, `quit`]
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
        case `quit`:
            console.log(`Quitting`)
            process.exit(2);
            break;
    }
}

async function viewDepartment(){
    const { Select } = await inquirer.prompt([{
        type: "list",
        name: "Select",
        prompt: "select an option",
        choices: departments
    }])
    console.log(Select)
    question1();
}

async function viewEmployee(){
    const { Select } = await inquirer.prompt([{
        type: "list",
        name: "Select",
        prompt: "select an option",
        choices: employees
    }])
    console.log(Select)
    question1();
}

async function viewRole(){
    const { Select } = await inquirer.prompt([{
        type: "list",
        name: "Select",
        prompt: "select an option",
        choices: roles
    }])
    console.log(Select)
    question1();
}

question1();
    
   

