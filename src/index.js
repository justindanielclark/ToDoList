'use strict';
import './Styles/index.css';
import ProjectsCollection from './Models/ProjectsCollection.js';
import ToDo_View from './Views/ToDo_View.js';
import Aside_View from './Views/Aside_View';
import IconMap from './Assets/IconMap';
import AddNewToDo_View from './Views/AddNewToDo_View';

const App = (()=>{
  const Priorities = ['low', 'med', 'high'];
  const State = (() => {
    const Projects = ProjectsCollection;

    function changeProjectName(oldProjectName, newProjectName){
      //TODO
    }
    function createToDo(projectID, title, description, dueDate, priority, notes = []){
      const project = Projects.getProject(projectID);
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
  
  const WorkID = State.createProject('Work', IconMap.bag);
    State.createToDo(WorkID, 'Prepare Fiscal Report', 'Q1 Earnings', new Date(), Priorities[2])
    State.createToDo(WorkID, 'Repair Fax Machine', 'Janice\'s Office', new Date(), Priorities[0])
    State.createToDo(WorkID, 'Study Competitor', 'Cheveron', new Date(), Priorities[2])
    State.createToDo(WorkID, 'Study Competitor', 'Exxon Mobil', new Date(), Priorities[1])
  const HomeID = State.createProject('Home', IconMap.beachSign);
    State.createToDo(HomeID, 'Vacuum', 'Office', new Date(), Priorities[1], ['This room is filthy']);
    State.createToDo(HomeID, 'Vacuum', 'Bedroom', new Date(), Priorities[0], ['This room is less filthy']);
    State.createToDo(HomeID, 'Take Out the Trash', 'Kitchen', new Date(), Priorities[0]);
    State.createToDo(HomeID, 'Take Out the Trash', 'Bathroom', new Date(), Priorities[0]);
    State.createToDo(HomeID, 'Pay Bills', 'Rent', new Date(), Priorities[2]);
    State.createToDo(HomeID, 'Pay Bills', 'Electricity', new Date(), Priorities[2]);
    State.createToDo(HomeID, 'Pay Bills', 'Internet', new Date(), Priorities[2]);
  const SchoolID = State.createProject('School', IconMap.camera);
    State.createToDo(SchoolID, 'Finish ToDo App', 'This thing really needs to get done', new Date(), Priorities[1], ['Fix Bugs', 'Add UI']);
    State.createToDo(SchoolID, 'Finish ToDo App', 'This thing really needs to get done', new Date(), Priorities[1], ['Fix Bugs', 'Add UI']);
    State.createToDo(SchoolID, 'Finish ToDo App', 'This thing really needs to get done', new Date(), Priorities[1], ['Fix Bugs', 'Add UI']);
    State.createToDo(SchoolID, 'Finish ToDo App', 'This thing really needs to get done', new Date(), Priorities[1], ['Fix Bugs', 'Add UI']);
    State.createToDo(SchoolID, 'Finish ToDo App', 'This thing really needs to get done', new Date(), Priorities[1], ['Fix Bugs', 'Add UI']);
    State.createToDo(SchoolID, 'Finish ToDo App', 'This thing really needs to get done', new Date(), Priorities[1], ['Fix Bugs', 'Add UI']);
  const GamingID = State.createProject('Gaming', IconMap.beer);
    State.createToDo(GamingID, 'Beat Crypt of The NecroDancer', 'Low Percent Aria Run', new Date(), Priorities[2]);
    State.createToDo(GamingID, 'Beat Witcher 3', 'PC', new Date(), Priorities[0]);

  const View = (()=>{
    const viewedProjects = new Map();
    const body = document.body;
    //HEADER
    const newProjectButton = document.querySelector('#newProjectButton');
      newProjectButton.addEventListener('click', handleClick_NewProject);
    const newToDoButton = document.querySelector('#newToDoButton');
      newToDoButton.addEventListener('click', handleClick_NewToDo)
    //MAIN
    const aside = document.querySelector('aside');
      aside.classList.add('flex', 'flex-col')
    const section = document.querySelector('section');
    
    function init(){}
    function update(){}
    function handleClick_NewToDo(event){
      const modal = AddNewToDo_View(State.getProjects());
      body.prepend(modal);
    }

    aside.append(...Aside_View(State.getProjects(), {viewProject: handleClick_ViewProject}).render())

    //Write Out Each Project In Section
    State.getProjects().forEach(project=>{
      const ToDos = project.getAllToDos();
      if(ToDos.length > 0){
        const projectContainer = document.createElement('article')
        const h1 = document.createElement('h1');
          h1.classList.add('bg-red-700', 'text-white', 'text-2xl', 'font-bold')
          h1.innerText = project.getName();
        const ul = document.createElement('ul');
        ul.classList.add('flex', 'flex-col', 'space-y-2');
        project.getAllToDos().forEach(toDo=>{
          ul.append(ToDo_View.render(toDo, {delete: handleClick_DeleteToDo, favorite: handleClick_FavoriteToDo}))
        })
        projectContainer.append(h1, ul);
        section.append(projectContainer);
      }
    })
  })()

  function handleClick_DeleteToDo(event, id){
    console.log('Handle Delete ToDo')
    console.log(event);
    console.log(id);
  }
  function handleClick_FavoriteToDo(event, id){
    console.log('Handle Favorite ToDo')
    console.log(event);
    console.log(id);
  }
  function handleClick_NewProject(event){
    console.log('handleClick_NewProject')
    console.log(event);
  }
  function handleClick_ViewProject(event, id){
    console.log('handleClick_ViewProject')
    console.log(event);
    console.log(id);
  }
})()