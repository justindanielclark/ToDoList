import ToDo from "./ToDo.js";
const Project = (()=>{
  function Project(projectName){
    this._projectName = projectName;
    this._toDos = [];
  }
  Project.prototype = {
    addToDo: function(){
      this._toDos.push(new ToDo(title, description, dueDate, priority, notes));
    }
  }
})();

export default Project;