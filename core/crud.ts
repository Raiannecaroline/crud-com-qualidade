import fs from "fs"; //ES6

// const fs = require("fs");
const DB_FILE_PATH = "./core/db";

console.log("[CRUD]");

function create(content: string) {
  //Salvar no sistema
  fs.writeFileSync(DB_FILE_PATH, content);
  return content;
}

//Simulation
console.log(create("Tenho que assistir as aulas e estudar!!"));