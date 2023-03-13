import chalk from "chalk";
import Task from "./task.js";

export default class Tasks {
  _list = {};

  constructor() {
    this._list = {};
  }

  get list() {
    let tasksList = [];
    Object.keys(this._list).forEach((key) => tasksList.push(this._list[key]));
    return tasksList;
  }

  createTask(description = "") {
    const task = new Task(description);
    this._list[task.id] = task;

    return task;
  }

  deleteTask(id) {
    if (this._list[id]) {
      delete this._list[id];
    }
  }

  loadTasks(tasks = []) {
    tasks.forEach((task) => {
      this._list[task.id] = task;
    });
  }

  beautyList(list = this.list) {
    let listString = "";

    list.forEach((task, i) => {
      listString += `\n${chalk.green(`${i + 1}.`)}${task.description} :: ${
        task.completedDate
          ? `${chalk.green("Completed")} \n${chalk.grey(
              `(${new Date(task.completedDate).toLocaleString("en-GB")})`
            )}`
          : chalk.grey("Pending")
      }`;
    });

    if (listString) {
      return listString;
    } else {
      return chalk.red("No tasks found!");
    }
  }

  beautyListByStatus(status = "completed") {
    const filteredList = this.list.filter((task) =>
      status === "completed"
        ? !!task.completedDate
        : status === "pending"
        ? !task.completedDate
        : null
    );

    const listString = this.beautyList(filteredList);

    return listString;
  }

  toggleTasksStatus(ids = []) {
    if (ids) {
      // Iterate the ids of the tasks to be set as completed
      ids.forEach((id) => {
        const task = this._list[id];

        // Set completed date for tasks that were not completed before
        if (!task.completedDate) {
          task.completedDate = new Date().toISOString();
        }
      });
    }
    this.list.forEach((task) => {
      if (!ids.includes(task.id)) {
        this._list[task.id].completedDate = null;
      }
    });
  }
}
