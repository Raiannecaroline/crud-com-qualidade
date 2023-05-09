const fs = require("fs");
const DB_FILE_PATH = "./core/db";

console.log("[CRUD]");

function create(content) {
  //Salvar no sistema
  fs.writeFileSync(DB_FILE_PATH, content);
  return content;
}

//Simulation
console.log(create("Hoje eu preciso assistir as aulas!!"));