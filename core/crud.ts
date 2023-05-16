import fs from "fs"; //ES6
import { v4 as uuidv4 } from 'uuid';

// const fs = require("fs");
const DB_FILE_PATH = "./core/db";

console.log("[CRUD]");

//interface
interface Todo {
  id: string;
  date: string;
  content: string;
  done: boolean;
}

//Create
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

//Ler
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

//Update do id
function updateContentById(id: string, content: string): Todo {
  return update(id, {
    content,
  });
}

function deleteById(id: string) {
  const todos = read();

  const todosWithoutOne = todos.filter((todo) => {
    if (id === todo.id) {
      return false;
    }
    return true;
  });

  fs.writeFileSync(DB_FILE_PATH, JSON.stringify({
    todos: todosWithoutOne,
  }, null, 2));

}

//Limpar do sistema
function clearDb() {
  fs.writeFileSync(DB_FILE_PATH, "")
}

//Simulation
clearDb();
create("Primeira TODO");
const secondTodo = create("Segunda TODO");
deleteById(secondTodo.id)
const thirdTodo = create("Terceira TODO");
// update(thirdTodo.id, {
//   content: "Atualizada",
//   done: true,
// });
updateContentById(thirdTodo.id, "Atualizada!!")
const todos = read();
console.log(todos);
console.log(todos.length);