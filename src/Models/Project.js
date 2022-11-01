'use strict';
import ToDo from "./ToDo.js";

class Project {
  #projectName;
  #ToDos;
  constructor(projectName){
    this.#projectName = projectName;
    this.#ToDos = new Map();
  }
  addToDo(title, description, dueDate, priority, notes=[]){
    const newToDo = new ToDo(title, description, dueDate, priority, notes);
    this.#ToDos.set(newToDo.getID(), newToDo);
    return newToDo;
  }
  deleteToDo(){
    const toDo = this.#ToDos.get(id);
    this.#ToDos.delete(id);
    return toDo;
  }
  getAllToDos(){
    return Array.from(this.#ToDos.values());
  }
  getToDo(id){
    return this.#ToDos.get(id);
  }
  getName(){
    return this.#projectName;
  }
  setName(value){
    this.#projectName = value;
    return this.#projectName;
  }
}

export default Project;