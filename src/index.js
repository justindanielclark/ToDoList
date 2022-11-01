'use strict';
import './Styles/index.scss';
import ProjectsCollection from './Models/ProjectsCollection.js';

const App = (()=>{
  const Priorities = ['low', 'med', 'high'];
  const State = (() => {
    const Projects = ProjectsCollection;
    let currentProjectView;

    function changeProjectName(oldProjectName, newProjectName){
      //TODO
    }
    function createToDo(projectName, title, description, dueDate, priority, notes = []){
      const project = Projects.getProject(projectName);
      const toDo = project.addToDo(title, description, dueDate, priority, notes = []);
      return toDo;
    }
    function deleteToDo(id){
      const projects = Projects.getProjects();
      let toDo;
      for(const project of projects){
        toDo = project.getToDo(id);
        if(toDo){
          project.deleteToDo(id);
          break;
        }
      }
      return toDo;      
    }
    function getToDo(id, projectName = null){
      let toDo = null;
      if(projectName){
        toDo = Projects.getProject(projectName).getToDo(id);
      } else {
        const projects = Projects.getProjects();
        for(const project of projects){
          toDo = project.getToDo(id);
          if(toDo !== undefined){
            break;
          }
        }
      }
      return toDo;
    }
    return {
      createProject: Projects.createProject,
      createToDo,
      deleteProject: Projects.deleteProject,
      deleteToDo,
      getProjects: Projects.getProjects,
      getToDo,
      
    }
  })()
  State.createProject('Work');
    State.createToDo('Work', 'Prepare Fiscal Report', 'Q1 Earnings', new Date().setDate(4), Priorities[2])
    State.createToDo('Work', 'Repair Fax Machine', 'Janice\'s Office', new Date().setDate(30), Priorities[0])
    State.createToDo('Work', 'Study Competitor', 'Cheveron', new Date().setDate(15), Priorities[2])
    State.createToDo('Work', 'Study Competitor', 'Exxon Mobil', new Date().setDate(11), Priorities[1])
  State.createProject('Home');
    State.createToDo('Home', 'Vacuum', 'Office', new Date(), Priorities[1], ['This room is filthy']);
    State.createToDo('Home', 'Vacuum', 'Bedroom', new Date(), Priorities[0], ['This room is less filthy']);
    State.createToDo('Home', 'Take Out the Trash', 'Kitchen', new Date().setDate(2), Priorities[0]);
    State.createToDo('Home', 'Take Out the Trash', 'Bathroom', new Date().setDate(2), Priorities[0]);
    State.createToDo('Home', 'Pay Bills', 'Rent', new Date(), Priorities[2]);
    State.createToDo('Home', 'Pay Bills', 'Electricity', new Date(), Priorities[2]);
    State.createToDo('Home', 'Pay Bills', 'Internet', new Date(), Priorities[2]);
  State.createProject('School');
    State.createToDo('School', 'Finish ToDo App', 'This thing really needs to get done', new Date(), Priorities[1]);

  window.State = State;
  return {
    State,
  }
})()