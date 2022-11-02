'use strict';
// import './Styles/index.scss';
import './Styles/index.css';
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
    const section = document.querySelector('section');
    const aside = document.querySelector('aside');

    //Write Out Each Project in Aside
    const asideH1 = document.createElement('h1');
      asideH1.classList.add('text-3xl', 'text-white', 'p-4');
      asideH1.innerText = 'Projects';
    const asideUL = document.createElement('ul');
    State.getProjects().forEach(project=>{
      const projectLI = document.createElement('li');
        projectLI.classList.add('flex', 'flex-row', 'items-center', 'px-2')
      const projectTitle = document.createElement('p');
      projectTitle.innerText = project.getName();
      const projectSVG = document.createElement('img');
      projectSVG.classList.add('w-10', 'h-10', 'mx-2')
      projectSVG.src = project.getIconPath();
      projectLI.append(projectSVG, projectTitle)
      asideUL.append(projectLI);
    })
    aside.append(asideH1, asideUL);

    //Write Out Each Project In Section
    State.getProjects().forEach(project=>{
      const projectContainer = document.createElement('article')
      const h1 = document.createElement('h1');
      h1.classList.add('bg-red-700', 'text-white', 'text-2xl', 'font-bold')
      h1.innerText = project.getName();
      const ul = document.createElement('ul');
      // ul.classList.add('');
      project.getAllToDos().forEach(toDo=>{
        ul.append(ToDo_View.render(toDo))
      })
      projectContainer.append(h1, ul);
      section.append(projectContainer);
    })
  })()

  window.State = State;
  return {
    State,
  }
})()