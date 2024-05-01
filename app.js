#! /usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
let toDo = [];
let condition = true;
console.log(chalk.yellow.bold(`\n
          ================================
          <==== ${chalk.underline.blue("ToDo-ListApplication")} ====>
          ================================\n`));
let main = async () => {
    while (condition) {
        let option = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select Option",
                choices: ["Add Task", "Delete Task", "Update Task", "View Todo-List", "Exit"]
            }
        ]);
        if (option.choice === "Add Task") {
            await addTask();
        }
        else if (option.choice === "Delete Task") {
            await deleteTask();
        }
        else if (option.choice === "Update Task") {
            await updateTask();
        }
        else if (option.choice === "View Todo-List") {
            await viewTask();
        }
        else if (option.choice === "Exit") {
            condition = false;
        }
    }
};
//Add New Task
let addTask = async () => {
    let newTask = await inquirer.prompt([
        {
            name: "task",
            type: "input",
            message: chalk.yellow("Enter Your New Task:")
        }
    ]);
    toDo.push(newTask.task);
    console.log(`${chalk.green(newTask.task)}:Task Added Sucessfully!\n`);
};
//Add New Task End
let viewTask = () => {
    console.log("\n View ToDo List");
    toDo.forEach((task, index) => {
        console.log(`  ${chalk.blue(index + 1)}: ${chalk.yellow(task)}`);
    });
};
let deleteTask = async () => {
    await viewTask();
    let indexTask = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: "Enter Your Index No. Do You Want To Delete:"
        }
    ]);
    let deleteTask = toDo.splice(indexTask.index - 1, 1);
    console.log(`\n ${chalk.red(deleteTask)}:This task Deleted From Todo-List Sucessfully!\n`);
};
// update Task 
let updateTask = async () => {
    await viewTask();
    let updatedTask = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: "Select Your Index no.' Do You Want to update:"
        },
        {
            name: "new_task",
            type: "input",
            message: "Enter new task name:"
        }
    ]);
    toDo[updatedTask.index - 1] = updatedTask.new_task;
    console.log(`\n Task No.${updatedTask.index} updated successfully!`);
};
main();
