'use strict';
import ToDo from "./ToDo.js";
import { v4 } from "uuid";

class Project {
  #projectName;
  #iconName;
  #ToDos;
  #id;
  #color;
  #numPrios;
  #showing;
  constructor(projectName, iconName, color){
    this.#projectName = projectName;
    this.#ToDos = new Map();
    this.#iconName = iconName;
    this.#id = v4();
    this.#color = color;
    this.#showing = true;
    this.#numPrios = {
      low: 0,
      med: 0,
      high: 0,
    }
  }
  adjustPriorities(lowered, raised){
    this.#numPrios[lowered]--;
    this.#numPrios[raised]++;
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
  getIconName(){
    return this.#iconName;
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
  getShowing(){
    return this.#showing;
  }
  setColor(value){
    this.#color = value;
    return this.#color;
  }
  setIconName(value){
    this.#iconName = value;
    return this.#iconName;
  }
  setName(value){
    this.#projectName = value;
    return this.#projectName;
  }
  setShowing(value){
    this.#showing = value;
    return this.#showing;
  }
  toString(){
    const message = `projectName: ${this.#projectName},\n
    iconName: ${this.#iconName},\n
    ToDos: ${this.#ToDos},\n
    id: ${this.#id},\n
    color: ${this.#color},\n
    showing: ${this.#showing},\n`
    return message;
  }
  transferToDo(toDo){
    this.#numPrios[toDo.getPriority()]++;
    this.#ToDos.set(toDo.getID(), toDo);
    return toDo;
  }
}

export default Project;