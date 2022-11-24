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
  static compare(toDo_A, toDo_B){
    const toDo_A_Prio = toDo_A.getPriority();
    const toDo_B_Prio = toDo_B.getPriority();
    if(toDo_A_Prio === toDo_B_Prio){
      const toDo_A_Date = toDo_A.getDueDate();
      const toDo_B_Date = toDo_B.getDueDate();
      if(toDo_A_Date < toDo_B_Date){
        return -1;
      }
      else if(toDo_A_Date > toDo_B_Date){
        return 1
      }
      return 0;
    }
    else if(toDo_A_Prio === 'high' && (toDo_B_Prio === 'med' || toDo_B_Prio === 'low')){
      return -1;
    } 
    else if(toDo_A_Prio === 'med' && toDo_B_Prio === 'low'){
      return -1;
    }
    return 1;
  }
  addNote(note){
    this.#notes.push(note);
    return this.#notes;
  }
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
  stringify(){
    return JSON.stringify({
      type: 'ToDo',
      title: this.#title,
      dueDate: `${this.#dueDate.getUTCFullYear()}-${this.#dueDate.getUTCMonth()+1}-${this.#dueDate.getUTCDate()}`,
      priority: this.#priority,
      notes: this.#notes,
      projectID: this.#projectID,
    })
  }
}
export default ToDo;