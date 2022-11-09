'use strict';
import { v4 } from "uuid";

class ToDo {
  #title;
  #description;
  #dueDate;
  #priority;
  #notes;
  #id;
  #projectID;
  constructor(title, description, dueDate, priority, projectID, notes = []){
    this.#title = title;
    this.#description = description;
    this.#dueDate = dueDate;
    this.#priority = priority;
    this.#notes = notes;
    this.#projectID = this.#projectID;
    this.#id = v4();
  }
  addNote(note){
    this.#notes.push(note);
    return this.#notes;
  };
  getDescription(){
    return this.#description;
  }
  getDueDate(){
    return this.#dueDate;
  }
  getID(){
    return this.#id;
  }
  getNotes(){
    return this.#notes;
  }
  getPriority(){
    return this.#priority;
  }
  getProjectID(){
    return this.#projectID;
  }
  getTitle(){
    return this.#title;
  }
  removeNote(index){
    this.#notes.splice(index, 1);
    return this.#notes;
  }
  toString(){
    return `
    {\n
      \tid: ${this.#id};\n
      \ttitle: ${this.#title};\n
      \tdescription: ${this.#description};\n
      \tdueDate: ${this.#dueDate};\n
      \tpriority: ${this.#priority};\n
    }`
  }
}
export default ToDo;