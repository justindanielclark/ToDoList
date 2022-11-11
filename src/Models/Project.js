'use strict';
import ToDo from "./ToDo.js";
import { v4 } from "uuid";

class Project {
  #projectName;
  #iconPath;
  #ToDos;
  #id;
  #color;
  #numPrios;
  constructor(projectName, iconPath, color){
    this.#projectName = projectName;
    this.#ToDos = new Map();
    this.#iconPath = iconPath;
    this.#id = v4();
    this.#color = color;
    this.#numPrios = {
      low: 0,
      med: 0,
      high: 0,
    }
  }
  addToDo(title, dueDate, priority, notes=[]){
    this.#numPrios[priority]++;
    const newToDo = new ToDo(title, dueDate, priority, this.#id, notes);
    this.#ToDos.set(newToDo.getID(), newToDo);
    return newToDo;
  }
  deleteToDo(id){
    const toDo = this.#ToDos.get(id);
    this.#numPrios[toDo.getPriority()]--;
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
  getNumPrios(){
    return this.#numPrios;
  }
  setName(value){
    this.#projectName = value;
    return this.#projectName;
  }
  toString(){
    const message = `projectName: ${this.#projectName},\n
    iconPath: ${this.#iconPath},\n
    ToDos: ${this.#ToDos},\n
    id: ${this.#id},\n
    color: ${this.#color},\n`
    return message;
  }
}

export default Project;