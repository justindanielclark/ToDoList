'use strict';
import { v4 } from "uuid";

class Project {
  #projectName;
  #iconName;
  #id;
  #color;
  #numPrios;
  #showing;
  constructor(projectName, iconName, color){
    this.#projectName = projectName;
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
  raisePriority(priority){
    this.#numPrios[priority]++;
  }
  lowerPriority(priority){
    this.#numPrios[priority]--;
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
}

export default Project;