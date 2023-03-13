import chalk from "chalk";
import {
  menu,
  pause,
  input,
  deleteTasksMenu,
  confirmation,
  completeTasksMenu,
} from "./helpers/inquirer.js";
import { saveTasks, getTasks } from "./helpers/dbconnection.js";
import Tasks from "./models/tasks.js";

const main = async () => {
  let option;

  const tasks = new Tasks();

  const tasksList = getTasks();

  if (tasksList) tasks.loadTasks(tasksList);

  do {
    option = await menu();

    console.clear();
    switch (option) {
      case 0:
        return;
        break;
      case 1:
        const description = await input("Task's description:");
        tasks.createTask(description);
        break;
      case 2:
        console.log(tasks.beautyList());
        break;
      case 3:
        console.log(tasks.beautyListByStatus("completed"));
        break;
      case 4:
        console.log(tasks.beautyListByStatus("pending"));
        break;
      // Complete tasks
      case 5:
        if (tasks.list.length > 0) {
          const tasksIds = await completeTasksMenu(tasks.list);
          tasks.toggleTasksStatus(tasksIds);
        } else {
          console.log(chalk.red("No tasks found!"));
        }
        break;
      case 6:
        if (tasks.list.length > 0) {
          const taskId = await deleteTasksMenu(tasks.list);
          if (taskId !== 0) {
            const deleteOK = await confirmation("Are you sure?");
            if (deleteOK) tasks.deleteTask(taskId);
          }
        } else {
          console.log(chalk.red("No tasks found!"));
        }

        break;
    }
    saveTasks(tasks.list);

    await pause();
  } while (option !== 0);

  console.clear();
};

main();
