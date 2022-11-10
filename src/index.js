'use strict';
import './Styles/index.css';
import tailwindColors from 'tailwindcss/colors';
import ProjectsCollection from './Models/ProjectsCollection.js';
import newProjectModal from './Views/NewProjectModal.js';
import newToDoModal from './Views/NewToDoModal.js';

const App = (()=>{
  const Priorities = ['low', 'med', 'high'];
  const State = (() => {
    const Projects = ProjectsCollection;
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
      let notice = asideUL ? asideUL.querySelector('#asideNoProjectsNotice') : null;
      const projects = State.getProjects();
      console.log(projects);

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
          asideUL.id = 'asideProjectList';
        aside.append(asideUL);
      }
      //No Active Projects
      if(projects.length === 0){
        const notice = document.createElement('li');
          notice.innerText = '< No Existing Projects >';
          notice.id = 'asideNoProjectsNotice';
          notice.className = 'px-2 text-center'
          asideUL.append(notice);
      }
      //Active Projects 
      else {
        if(notice){
          asideUL.removeChild(notice);
        }
        //If We Have More Projects Than Displayed Ones, Create LI's & Append Until We Are Equal
        if(projects.length > asideUL.children.length){
          const diff = projects.length - asideUL.children.length;
          for(let i = 0; i < diff; i++){
            const LI = document.createElement('li');
            const button = document.createElement('button');
              button.className= 'flex flex-row items-center px-6 py-2';
            const buttonTitle = document.createElement('p');
            const buttonIMG = document.createElement('img');
              buttonIMG.className = `w-10 h-10 mx-2 p-1 rounded-full`
            button.append(buttonIMG, buttonTitle);
            LI.append(button)
            asideUL.append(LI);
          }
        //If We Have Less Proects Than Displayed Ones, Remove LI's Until We Are Equal
        } else if(projects.length < asideUL.children.length) {
          const diff = projects.length - asideUL.children.length;
          for(let i = 0; i < diff; i++){
            asideUL.remove(asideUL.lastChild);
          }
        }
        //Loop through all projects/li's in parrallel and assign project data -> li display data
        for(let i = 0; i < projects.length; i++){
          const li = asideUL.children[i];
            li.dataset.id = projects[i].getID();
          const button = li.querySelector('button');
          const img = button.querySelector('img');
            console.log(tailwindColors);
            img.style = `background-color: ${tailwindColors[projects[i].getColor()]['300']}`;
            img.src = projects[i].getIconPath();
          const p = button.querySelector('p');
            p.innerText = projects[i].getName();
        }
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
      if(isProjects){
        if(!toDoButton){
          const newToDoButton = document.createElement('button');
          newToDoButton.className = 'bg-emerald-600 hover:bg-emerald-800 transition-colors text-neutral-100 text-lg px-2 py-1 mx-1 rounded-lg shadow-md shadow-emerald-900';
          newToDoButton.id = 'newToDoButton';
          newToDoButton.innerText = 'New To Do';
          newToDoButton.addEventListener('click', handleClick_NewToDo);
          header.append(newToDoButton);
        }
      } else {
        if(toDoButton){
          header.removeChild(toDoButton);
        }
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
    return {
      updateAside,
      updateHeader,
      updateSection,
    }
  })()
  function handleClick_NewProject(event){
    body.prepend(
      newProjectModal({
        createProject: State.createProject,
        updateAside: View.updateAside,
        updateHeader: View.updateHeader
      })
    );
  }
  function handleClick_NewToDo(event){
    body.prepend(
      newProjectModal({})
    );
  }
  return {State, View}
})()

window.App = App;