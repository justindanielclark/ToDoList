'use strict';
import { v4 } from "uuid";

class Project {
  #projectName;
  #iconName;
  #id;
  #color;
  #numPrios;
  #showing;
  #order;
  constructor(projectName, iconName, color, order){
    this.#projectName = projectName;
    this.#iconName = iconName;
    this.#id = v4();
    this.#color = color;
    this.#showing = true;
    this.#order = order;
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
  decrementOrder(){
    this.#order--;
    return this.#order;
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
  getName(){
    return this.#projectName;
  }
  getNumPrios(){
    return this.#numPrios;
  }
  getOrder(){
    return this.#order;
  }
  getShowing(){
    return this.#showing;
  }
  incrementOrder(){
    this.#order++;
    return this.#order;
  }
  lowerPriority(priority){
    this.#numPrios[priority]--;
  }
  raisePriority(priority){
    this.#numPrios[priority]++;
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
  stringify(){
    return JSON.stringify({
      type: 'Project',
      projectName: this.#projectName,
      iconName: this.#iconName,
      color: this.#color,
      numPrios: this.#numPrios,
      showing: this.#showing,
      order: this.#order,
    })
  }
}

export default Project;