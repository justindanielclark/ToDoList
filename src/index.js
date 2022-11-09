'use strict';
import './Styles/index.css';
import ProjectsCollection from './Models/ProjectsCollection.js';
import newProjectModal from './Views/NewProjectModal.js';

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
  
  // const WorkID = State.createProject('Work', IconMap.bag);
  // State.createToDo(WorkID, 'Prepare Fiscal Report', 'Q1 Earnings', new Date(), Priorities[2])

  // const GamingID = State.createProject('Gaming', IconMap.beer);
  // State.createToDo(GamingID, 'Beat Crypt of the NecroDancer', 'Q1 Earnings', new Date(), Priorities[2])

  const View = (()=>{
    const body = document.body;
    const header = document.querySelector('header');
    const main = document.querySelector('main');
    const aside = document.querySelector('aside');
    const section = document.querySelector('section');

    updateAside();
    updateHeader();
    updateSection();

    function updateAside(){
      let asideH1 = aside.querySelector('#asideTitle');
      let asideUL = aside.querySelector('#asideProjectList');
      let notice = aside.querySelector('#AsideNoProjectsNotice');
      const projects = State.getProjects();
      //If Never Initialized, Ensure Aside Has Its Header and Project List
      if(!asideH1){
        asideH1 = document.createElement('h1');
          asideH1.className = 'text-3xl p-4 text-neutral-100';
          asideH1.id = 'asideTitle';
          asideH1.innerText = 'Projects:';
        aside.append(asideH1);
      }
      if(!asideUL){
        asideUL = document.createElement('ul');
          asideUL.id = 'asideProjectListing';
        aside.append(asideUL);
      }
      //No Active Projects
      if(projects.length === 0){
        const notice = document.createElement('li');
          notice.innerText = '< No Existing Projects >'
          notice.id = '#AsideNoProjectsNotice'
          asideUL.append(notice);
      }
      //Active Projects 
      else {
        if(notice){
          aside.removeChild(notice);
        }
        projects.forEach(project=>{
          const LI = document.createElement('li');
          const button = document.createElement('button');
            button.className= 'flex flex-row items-center px-6 py-2';
          const buttonTitle = document.createElement('p');
            buttonTitle.innerText = project.getName();
          const buttonIMG = document.createElement('img');
            buttonIMG.className = 'w-10 h-10 mx-2 p-1 rounded-full bg-slate-300'
            buttonIMG.src = project.getIconPath();
          button.append(buttonIMG, buttonTitle);
          LI.append(button)
          asideUL.append(LI);
        })
      }
    }
    function updateHeader(){
      const isProjects = State.getProjects().length > 0;
      const projectButton = header.querySelector('#newProjectButton');
      const toDoButton = header.querySelector('#newToDoButton');

      //If Never Initialized, Ensure Header has the Add New Project Button
      if(!projectButton){
        const newProjectButton = document.createElement('button');
          newProjectButton.className = 'bg-emerald-600 hover:bg-emerald-800 transition-colors text-neutral-100 text-lg px-2 py-1 ml-1 mr-5 rounded-lg shadow-md shadow-emerald-900';
          newProjectButton.id = 'newProjectButton';
          newProjectButton.innerText = 'New Project';
          newProjectButton.addEventListener('click', handleClick_NewProject);
        header.append(newProjectButton);
      }
      //If Header Has NewToDoButton, But No Active Projects, Remove Button
      if(toDoButton && !isProjects){
        header.removeChild(toDoButton);
      } //If Header Has No NewToDoButton, And Active Projects, Add Button
      else if (isProjects){ 
        const newToDoButton = document.createElement('button');
          newToDoButton.className = 'bg-emerald-600 hover:bg-emerald-800 transition-colors text-neutral-100 text-lg px-2 py-1 mx-1 rounded-lg shadow-md shadow-emerald-900';
          newToDoButton.id = 'newToDoButton';
          newToDoButton.innerText = 'New To Do';
        header.append(newToDoButton);
      }
    }
    function updateSection(){
      State.getProjects().forEach(project=>{
        const ToDos = project.getAllToDos();
        if(ToDos.length > 0){
          const projectContainer = document.createElement('article')
          const h1 = document.createElement('h1');
            h1.classList.add('bg-red-700', 'text-white', 'text-2xl', 'font-bold')
            h1.innerText = project.getName();
          const ul = document.createElement('ul');
          ul.classList.add('flex', 'flex-col', 'space-y-2');
          // project.getAllToDos().forEach(toDo=>{
          //   ul.append(ToDo_View.render(toDo, {delete: handleClick_DeleteToDo, favorite: handleClick_FavoriteToDo}))
          // })
          projectContainer.append(h1, ul);
          section.append(projectContainer);
        }
      })
    }
  })()
  
  function handleClick_NewProject(event){
    document.body.prepend(newProjectModal.create());
  }
})()