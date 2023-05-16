import fs from "fs"; //ES6
import { v4 as uuidv4 } from 'uuid';

// const fs = require("fs");
const DB_FILE_PATH = "./core/db";

console.log("[CRUD]");

interface Todo {
  id: string;
  date: string;
  content: string;
  done: boolean;
}

function create(content: string): Todo {

  const todo: Todo = {
    id: uuidv4(),
    date: new Date().toISOString(),
    content: content,
    done: false,
  };

  const todos: Array<Todo> = [
    ...read(),
    todo,
  ];

  //Salvar no sistema
  fs.writeFileSync(DB_FILE_PATH, JSON.stringify({
    todos,
    dogs: [],
  }, null, 2));
  return todo;
}

function read(): Array<Todo> {
  const dbString = fs.readFileSync(DB_FILE_PATH, "utf-8");
  const db = JSON.parse(dbString || "{}");
  if (!db.todos) {
    return [];
  }

  return db.todos;

}


//Update
function update(id: string, partialTodo: Partial<Todo>): Todo {
  let updatedTodo;
  const todos = read();
  todos.forEach((currentTodo => {
    const isToUpdate = currentTodo.id === id;
    if (isToUpdate) {
      updatedTodo = Object.assign(currentTodo, partialTodo);
    }
  }));

  fs.writeFileSync(DB_FILE_PATH, JSON.stringify({
    todos,
  }, null, 2));

  if (!updatedTodo) {
    throw new Error("Please, provider another ID")
  }

  return updatedTodo;
}

function updateContentById(id: string, content: string): Todo {
  return update(id, {
    content,
  });
}

function clearDb() {
  fs.writeFileSync(DB_FILE_PATH, "")
}

//Simulation
clearDb();
create("Primeira TODO");
create("Primeira TODO");
const terceiraTodo = create("Segunda TODO");
// update(terceiraTodo.id, {
//   content: "Atualizada",
//   done: true,
// });
updateContentById(terceiraTodo.id, "Atualizada!!")
console.log(read());