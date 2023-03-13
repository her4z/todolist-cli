import { existsSync, readFileSync, writeFileSync } from "fs";

const path = "./db/data.json";

const saveTasks = (tasks) => {
  writeFileSync(path, JSON.stringify(tasks));
};

const getTasks = () => {
  if (!existsSync(path)) {
    return [];
  }
  const data = readFileSync(path);
  return JSON.parse(data);
};

export { saveTasks, getTasks };
