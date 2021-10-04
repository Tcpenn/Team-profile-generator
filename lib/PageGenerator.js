//Dependencies
const fs = require('fs');
const inquirer = require('inquirer');

// Employee classes 
const Manager = require('./Manager');
const Engineer = require('./Engineer');
const Intern = require("./Intern");

//HTML template
const HTMLTemplate = require('../src/HTMLtemplate.js');

//generate page class
class PageGenerator {
    constructor() {
        //properties to store employee data
        this.employeeDataArr;
        this.managerData;
        this.engineerDataArr = [];
        this.internDataArr = [];
    }

    launchGenerator () {
        console.log("Welcome to the Team Profile Generator!");
        this.getManagerData();
    }

    getManagerData () {
        inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: "What is the name of your teams Manager",
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } else {
                        console.log("Please enter the name of your manager!")
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'id',
                messgae: "Please input your employee id number. (Required)",
                validate: idInput => {
                    if (idInput) {
                        return true;
                    } else {
                        console.log("Please enter a vaild employee ID number")
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'email',
                message:"Please provide a valid email address. (Required)",
                validate: (emailInput) => {
                    if (emailInput) {
                        return true;
                    } else {
                        console.log("Please enter a vaild email address!")
                        return false;
                    }
                } 
            },
            {
                type: 'input',
                name: 'officeNumber',
                message: "Please enter your manager's office number! (Optional)"
            },
        ]).then(managerData => {
            //deconstructs the managerData object
            const {name, id, email, officeNumber} = managerData;
            //stors the manager data
            this.managerData = new Manager(name, id, email, officeNumber);
            this.promptAddMember();
        })
    }

    //runs after every new employee entry
    promptAddMember() {
        inquirer.prompt ({
            type: 'list',
            name: "addMember",
            message: "What would you like to do next?",
            choices: ['Add an Engineer', 'Add an Intern', 'Generate your new webpage']
        }).then(({addMember}) => {
            if (addMember === 'Add an Engineer') {
                this.getEngineerData();
            } else if (addMember === 'Add an Intern') {
                this.getInternData();
            } else {
                this.generatePage(this.managerData, this.engineerDataArr, this.getInternData);
            }
        });
    }

    getEngineerData() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message:"What is your engineers name?",
                validate: nameInput => {
                    if (nameInput){
                        return true;
                    } else {
                        console.log("Please input your engineer's name!")
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'id',
                message: "Please provide your engineer's employee id.",
                validate: idInput => {
                    if (idInput) {
                        return true;
                    } else {
                        console.log('PLease provide your employee id!')
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'email',
                message: "Please provide your engineer's email",
                validate: emailInput => {
                    if (emailInput) {
                        return true;
                    } else {
                        console.log ("Please provide a valide email!");
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'github',
                message: "Please provide your GitHub username.",
                validate: githubInput => {
                    if (githubInput) {
                        return true;
                    } else {
                        console.log("Please provide the engineer github username!");
                        return false;
                    }
                }
            }
        ]).then(engineerData => {
            //deconstruct the engineer answer objects
            const {name, id, email, github} = engineerData;
            //push engineer to the engineer array
            this.engineerDataArr.push(new Engineer(name, id, email, github));
            this.promptAddMember();
        })
    }

    getInternData() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is the name your intern',
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } else {
                        console.log ("please provide the name of your intern!");
                        return false;
                    }
                }
            },
            {
                type:'input',
                name: 'id',
                message: "What is your intern's employee id number?",
                validate: idInput => {
                    if (idInput) {
                        return true;
                    } else {
                        console.log ('Please provide your interns employee id numvber!');
                        return false;
                    }
                }
            },
            {
                type:'input',
                name: 'email',
                message: "What is your intern's email?",
                validate: emailInput => {
                    if (emailInput) {
                        return true;
                    } else {
                        console.log("Please provide a valid email address for your intern!");
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'school',
                messgae: "What school does your intern attend",
                validate: schoolInput => {
                    if (schoolInput) {
                        return true;
                    } else {
                        console.log('Please provide a valid school name');
                        return false;
                    }
                }
            }
        ]).then(internData => {
            // deconstruct answer object
            const {name, id, email, school} = internData;
            // push intern to intern array
            this.internDataArr.push(new Intern(name, id, email, school));
            this.promptAddMember();
        });
    }
    
    generatePage() {
        //set employeeDataArr to contain each Employee object
        this.employeeDataArr = [this.managerData].concat(this.engineerDataArr, this.internDataArr);
        //instatiate html template object
        const htmlObj = new HTMLTemplate;
        //write html and copy css into the dist folder
        this.writeHTML(htmlObj.generateHTML(this.employeeDataArr))
        .then(htmlResponse => {
            console.log(htmlResponse);
            return this.copyCSS();
        })
        .then(cssResponse => {
            console.log(cssResponse);
        })
        .catch(err => {
            console.log(err)
        });
    }

    writeHTML(html) {
        return new Promise ((resolve, reject) => {
            fs.writeFile('./dist/index.html', html, err => {
                if (err) {
                    reject (err);
                    console.log(err)
                    return;
                }
                resolve ({
                    ok: true,
                    message: 'HTML created!'
                });
            });
        });
    }

    copyCSS() {
        return new Promise ((resolve, reject) => {
            fs.copyFile('./src/style.css', './dist/style.css', err => {
                if(err) {
                    console.log(err);
                    return;
                }

                resolve({
                    ok: true,
                    message: 'CSS copied'
                });
            });
        });
    }
}

module.exports = PageGenerator;