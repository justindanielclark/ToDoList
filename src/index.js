'use strict';
// import './Styles/index.scss';
import ProjectsCollection from './Models/ProjectsCollection.js';
import ToDo_View from './Views/ToDo_View.js';
import IconMap from './Assets/SVGs/IconMap.js'

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

  State.createProject('Work', IconMap.bag);
    State.createToDo('Work', 'Prepare Fiscal Report', 'Q1 Earnings', new Date(), Priorities[2])
    State.createToDo('Work', 'Repair Fax Machine', 'Janice\'s Office', new Date(), Priorities[0])
    State.createToDo('Work', 'Study Competitor', 'Cheveron', new Date(), Priorities[2])
    State.createToDo('Work', 'Study Competitor', 'Exxon Mobil', new Date(), Priorities[1])
  State.createProject('Home', IconMap.beachSign);
    State.createToDo('Home', 'Vacuum', 'Office', new Date(), Priorities[1], ['This room is filthy']);
    State.createToDo('Home', 'Vacuum', 'Bedroom', new Date(), Priorities[0], ['This room is less filthy']);
    State.createToDo('Home', 'Take Out the Trash', 'Kitchen', new Date(), Priorities[0]);
    State.createToDo('Home', 'Take Out the Trash', 'Bathroom', new Date(), Priorities[0]);
    State.createToDo('Home', 'Pay Bills', 'Rent', new Date(), Priorities[2]);
    State.createToDo('Home', 'Pay Bills', 'Electricity', new Date(), Priorities[2]);
    State.createToDo('Home', 'Pay Bills', 'Internet', new Date(), Priorities[2]);
  State.createProject('School', IconMap.camera);
    State.createToDo('School', 'Finish ToDo App', 'This thing really needs to get done', new Date(), Priorities[1], ['Fix Bugs', 'Add UI']);


  const View = (()=>{
    const main = document.querySelector('main');
    const aside = document.querySelector('aside');
    //Write Out Each Project in Aside
    const asideUL = document.createElement('ul');
    State.getProjects().forEach(project=>{
      const projectLI = document.createElement('li');
      const projectTitle = document.createElement('p');
      projectTitle.innerText = project.getName();
      const projectSVG = document.createElement('img');
      projectSVG.src = project.getIconPath();
      projectLI.append(projectSVG, projectTitle)
      asideUL.append(projectLI);
    })
    aside.append(asideUL);
    //Write Out Each Project In Main
    State.getProjects().forEach(project=>{
      const h1 = document.createElement('h1');
      h1.classList.add('projectTitle')
      h1.innerText = project.getName();
      const ul = document.createElement('ul');
      ul.classList.add('projectList');
      project.getAllToDos().forEach(toDo=>{
        ul.append(ToDo_View.render(toDo))
      })
      main.append(h1, ul);
    })
  })()

  window.State = State;
  return {
    State,
  }
})()