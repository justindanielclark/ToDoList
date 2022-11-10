'use strict';
import ToDo from "./ToDo.js";
import { v4 } from "uuid";

class Project {
  #projectName;
  #iconPath;
  #ToDos;
  #id;
  #color;
  constructor(projectName, iconPath, color){
    this.#projectName = projectName;
    this.#ToDos = new Map();
    this.#iconPath = iconPath;
    this.#id = v4();
    this.#color = color;
  }
  addToDo(title, description, dueDate, priority, notes=[]){
    const newToDo = new ToDo(title, description, dueDate, priority, this.#id, notes);
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
  getColor(){
    return this.#color;
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
  toString(){
    return {
      projectName: `${this.#projectName}`,
      iconPath: `${this.#iconPath}`,
      ToDos: `${this.#ToDos}`,
      id: `${this.#id}`,
      color: `${this.#color}`
    }
  }
}

export default Project;