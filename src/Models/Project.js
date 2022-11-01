import ToDo from "./ToDo.js";

const Project = (()=>{
  function Project(projectName){
    this._projectName = projectName;
    this._toDos = new Map();
  }
  Project.prototype = {
    getName: function(){
      return this._projectName;
    },
    addToDo: function(title, description, dueDate, priority, notes = new Array()){
      const newToDo = new ToDo(title, description, dueDate, priority, notes);
      this._toDos.set(newToDo.getID(), newToDo);
      return newToDo;
    },
    getToDo: function(id){
      return this._toDos.get(id);
    }
  }
  return Project;
})();

export default Project;