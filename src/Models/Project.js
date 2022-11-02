'use strict';
import ToDo from "./ToDo.js";
import { v4 } from "uuid";

class Project {
  #projectName;
  #iconPath;
  #ToDos;
  #id;

  constructor(projectName, iconPath){
    this.#projectName = projectName;
    this.#ToDos = new Map();
    this.#iconPath = iconPath;
    this.#id = v4();
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
  getIconPath(){
    return this.#iconPath;
  }
  getID(){
    return this.#id;
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