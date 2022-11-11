'use strict';
import './Styles/index.css';
import tailwindColors from 'tailwindcss/colors';
import ProjectsCollection from './Models/ProjectsCollection.js';
import newProjectModal from './Views/NewProjectModal.js';
import newToDoModal from './Views/NewToDoModal.js';
import editProjectModal from './Views/EditProjectModal';
import IconMap from './Assets/IconMap.js';

import edit from './Assets/SVGs/UI/edit.svg';
import plus from './Assets/SVGs/UI/plus.svg';
import minus from './Assets/SVGs/UI/minus.svg';
import trashcan from './Assets/SVGs/UI/trash.svg';

const App = (()=>{
  const State = (() => {
    const Projects = ProjectsCollection;
    function createToDo(projectID, title, dueDate, priority, notes = []){
      const project = Projects.getProject(projectID);
      const toDo = project.addToDo(title, dueDate, priority, notes);
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
  State.createProject('Backpacking', IconMap.backpack, 'green');
  State.createProject('Business Trip', IconMap.bag, 'amber');
  State.createProject('Sunday Party', IconMap.beer, 'rose');

  const View = (()=>{
    const header = document.querySelector('header');
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
          asideUL.className = 'p-4'
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
            LI.className = 'flex flex-col items-center mb-4';

            const viewButton = document.createElement('button');
            viewButton.className= 'viewButton flex flex-row justify-start w-full items-center';
            const viewButtonTitle = document.createElement('p');
            viewButtonTitle.className = 'viewButtonTitle pl-4 grow text-left'

            const viewButtonLeftContainer = document.createElement('div');
            viewButtonLeftContainer.className = 'viewButtonContainer relative';
            const expandButton = document.createElement('button');
            expandButton.className = 'absolute text-xl font-bold w-6 h-6 flex flex-row justify-center items-center bg-slate-900 text-neutral-100 rounded-full bottom-0 right-0 translate-y-1/4 translate-x-1/3' ;
            expandButton.innerText = '+';
            expandButton.addEventListener('click', handleClick_expandButton);
            const noticeHighPrio = document.createElement('p');
            noticeHighPrio.className = 'noticeHighPrio text-sm w-4 h-4 flex flex-row justify-center items-center absolute bg-red-600 text-neutral-100 rounded-full top-0 left-1/3 -translate-y-1/2 -translate-x-1/2 z-30 hidden';
            const noticeMedPrio = document.createElement('p');
            noticeMedPrio.className = 'noticeMedPrio text-sm w-4 h-4 flex flex-row justify-center items-center absolute bg-yellow-600 text-neutral-100 rounded-full top-0 left-0 z-30 hidden';
            const noticeLowPrio = document.createElement('p');
            noticeLowPrio.className = 'noticeLowPrio text-sm w-4 h-4 flex flex-row justify-center items-center absolute bg-green-600 text-neutral-100 rounded-full top-1/3 left-0 -translate-y-1/2 -translate-x-1/2 z-30 hidden';
            const viewButtonIMG = document.createElement('img');
            viewButtonIMG.className = `viewButtonImg w-14 h-14 p-2 rounded-full border border-slate-600`
          
            viewButtonLeftContainer.append(viewButtonIMG, expandButton, noticeLowPrio, noticeMedPrio, noticeHighPrio)
            
            
            viewButton.append(viewButtonLeftContainer, viewButtonTitle);

            const optionsGroup = document.createElement('div');
            optionsGroup.className = 'flex flex-col w-full justify-start items-start max-h-0 mt-2 overflow-hidden gap-2'
            optionsGroup.addEventListener('animationend', handleAnimationEnd_OptionsGroup);

            const editOption = document.createElement('button');
            editOption.className = 'flex flex-row items-center justify-start w-full';
            const editImg = document.createElement('img');
            editImg.className = 'w-7 h-7 p-1 rounded-lg ml-6';
            editImg.src = edit;
            editImg.alt = 'edit icon';
            const editSpan = document.createElement('span');
            editSpan.className = 'px-2';
            editSpan.innerText = 'Edit Project';
            editOption.addEventListener('click', handleClick_editProjectButton.bind(editOption));
            editOption.append(editImg, editSpan);


            const deleteOption = document.createElement('button');
            deleteOption.className = 'flex flex-row items-center justify-start w-full';
            const deleteImg = document.createElement('img');
            deleteImg.className = 'w-7 h-7 p-1 rounded-lg ml-6';
            deleteImg.src = trashcan;
            deleteImg.alt = 'delete icon';
            const deleteSpan = document.createElement('span');
            deleteSpan.className = 'px-2'
            deleteSpan.innerText = 'Delete Project';
            deleteOption.addEventListener('click', handleClick_deleteProjectButton.bind(deleteOption));
            deleteOption.append(deleteImg, deleteSpan);

            optionsGroup.append(editOption, deleteOption);
            
            LI.append(viewButton, optionsGroup);

            asideUL.append(LI);
            
            function handleClick_editProjectButton(arg){
              document.body.prepend(editProjectModal());
            }
            function handleClick_deleteProjectButton(event){
              console.log('delete button clicked');
              console.log(this);
            }
            function handleClick_expandButton(event){
              if(optionsGroup.classList.contains('max-h-0')){
                expandButton.innerText = '-';
                optionsGroup.classList.remove('max-h-0');
                optionsGroup.classList.add('animate-heightExpand');
              } 
              if(optionsGroup.classList.contains('h-auto')){
                expandButton.innerText = '+';
                optionsGroup.classList.remove('h-auto');
                optionsGroup.classList.add('animate-heightContract');
              }
            }
            function handleAnimationEnd_OptionsGroup(event){
              if(event.animationName === 'heightExpand'){
                this.classList.remove('animate-heightExpand');
                this.classList.add('h-auto')
              }
              if(event.animationName === 'heightContract'){
                this.classList.remove('animate-heightContract');
                this.classList.add('max-h-0');
              }
            }
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
          const viewButton = li.querySelector('.viewButton');
          const viewImg = viewButton.querySelector('.viewButtonImg');
            viewImg.style = `background-color: ${tailwindColors[projects[i].getColor()]['300']}`;
            viewImg.src = projects[i].getIconPath();
            viewImg.alt = `${projects[i].getName()} Project Icon`
          const viewTitle = viewButton.querySelector('.viewButtonTitle');
            viewTitle.innerText = projects[i].getName();
          
          const viewButtonContainer = viewButton.querySelector('.viewButtonContainer');

          const noticeLowPrio = viewButtonContainer.querySelector('.noticeLowPrio');
          const noticeMedPrio = viewButtonContainer.querySelector('.noticeMedPrio');
          const noticeHighPrio = viewButtonContainer.querySelector('.noticeHighPrio');
          const prios = projects[i].getNumPrios();
          if(prios.high > 0){
            noticeHighPrio.classList.remove('hidden');
            noticeHighPrio.innerText = prios.high;
          }
          else {
            noticeHighPrio.classList.add('hidden');
            noticeHighPrio.innerText = prios.high;
          }
          if(prios.med > 0){
            noticeMedPrio.classList.remove('hidden');
            noticeMedPrio.innerText = prios.med;
          }
          else {
            noticeMedPrio.classList.add('hidden');
            noticeMedPrio.innerText = prios.med;
          }
          if(prios.low > 0){
            noticeLowPrio.classList.remove('hidden');
            noticeLowPrio.innerText = prios.low;
          }
          else {
            noticeLowPrio.classList.add('hidden');
            noticeLowPrio.innerText = prios.low;
          }
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
    document.body.prepend(
      newProjectModal({
        createProject: State.createProject,
        updateAside: View.updateAside,
        updateHeader: View.updateHeader,
      })
    );
  }
  function handleClick_NewToDo(event){
    document.body.prepend(
      newToDoModal({
        projects: State.getProjects(),
        createToDo: State.createToDo,
        updateAside: View.updateAside,
        updateSection: View.updateSection,
      })
    );
  }
  return {State, View}
})()

window.App = App;