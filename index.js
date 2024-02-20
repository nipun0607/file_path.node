const fs = require('fs');
const path = require('path');//.promises
const readline = require('readline');

const dataFilePath = path.join(__dirname, 'tasks.txt');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function addTask(task) {
  fs.appendFile(dataFilePath, task + '\n', (err) => {
    if (err) throw err;
    console.log('Task added successfully.');
  });
}

function viewTasks() {
  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        console.log('No tasks found.');
        return;
      }
      throw err;
    }
    const tasks = data.split('\n').filter(task => task.trim() !== '');
    console.log('Tasks:');
    tasks.forEach((task, index) => {
      console.log(`${index + 1}. ${task}`);
    });
  });
}

function markTaskComplete(taskIndex) {
  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        console.log('No tasks found.');
        return;
      }
      throw err;
    }
    const tasks = data.split('\n').filter(task => task.trim() !== '');
    if (taskIndex >= 1 && taskIndex <= tasks.length) {
      tasks[taskIndex - 1] += ' (Complete)';
      fs.writeFile(dataFilePath, tasks.join('\n'), (err) => {
        if (err) throw err;
        console.log('Task marked as complete.');
      });
    } else {
      console.log('Invalid task index.');
    }
  });
}

function removeTask(taskIndex) {
  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        console.log('No tasks found.');
        return;
      }
      throw err;
    }
    let tasks = data.split('\n').filter(task => task.trim() !== '');
    if (taskIndex >= 1 && taskIndex <= tasks.length) {
      tasks.splice(taskIndex - 1, 1);
      fs.writeFile(dataFilePath, tasks.join('\n'), (err) => {
        if (err) throw err;
        console.log('Task removed successfully.');
      });
    } else {
      console.log('Invalid task index.');
    }
  });
}

function mainMenu() {
  console.log('\nTask Manager');
  console.log('1. Add a new task');
  console.log('2. View tasks');
  console.log('3. Mark a task as complete');
  console.log('4. Remove a task');
  console.log('5. Exit');
 
  rl.question('Enter your choice: ', (choice) => {
    switch (choice) {
      case '1':
        rl.question('Enter task description: ', (task) => {
          addTask(task);
          mainMenu();
        });
        break;
      case '2':
        viewTasks();
        mainMenu();
        break;
      case '3':
        rl.question('Enter task index to mark as complete: ', (index) => {
          markTaskComplete(parseInt(index));
          mainMenu();
        });
        break;
      case '4':
        rl.question('Enter task index to remove: ', (index) => {
          removeTask(parseInt(index));
          mainMenu();
        });
        break;
      case '5':
        rl.close();
        break;
      default:
        console.log('Invalid choice. Please enter a number between 1 and 5.');
        mainMenu();
        break;
    }
  });
}

mainMenu();
