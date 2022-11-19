'use strict';
import { v4 } from "uuid";

class ToDo {
  #title;
  #dueDate;
  #priority;
  #notes;
  #id;
  #projectID;
  constructor(title, dueDate, priority, projectID, notes = []){
    this.#title = title;
    this.#dueDate = dueDate;
    this.#priority = priority;
    this.#notes = notes;
    this.#projectID = projectID;
    this.#id = v4();
  }
  addNote(note){
    this.#notes.push(note);
    return this.#notes;
  };
  getDueDate(){
    return this.#dueDate;
  }
  setDueDate(value){
    this.#dueDate = value;
    return this.#dueDate
  }
  getID(){
    return this.#id;
  }
  getNotes(){
    return this.#notes;
  }
  setNotes(value){
    this.#notes = value;
    return this.#notes;
  }
  getPriority(){
    return this.#priority;
  }
  setPriority(value){
    this.#priority = value;
    return this.#priority;
  }
  getProjectID(){
    return this.#projectID;
  }
  setProjectID(id){
    this.#projectID = id;
    return this.#projectID;
  }
  getTitle(){
    return this.#title;
  }
  setTitle(value){
    this.#title = value;
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
      \tdueDate: ${this.#dueDate};\n
      \tpriority: ${this.#priority};\n
    }`
  }
}
export default ToDo;