'use strict';
import './Styles/index.css';
import ProjectsCollection from './Models/ProjectsCollection.js';
import Header from './Views/Components/Header/Header';
import Main from './Views/Components/Main/Main';
import Footer from './Views/Components/Footer/Footer';
import SubscriberPublisherController from './Utilities/SubscriberPublisherController.js';
import IconMap from './Assets/IconMap.js';

const App = (()=>{
  const Controller = SubscriberPublisherController();
  const Subscription = Controller.Subscription;

  const State = (() => {
    const StateSubscriber = Controller.subscriberWrapper({});
    const {createProject, deleteProject, getProject, getProjects} = ProjectsCollection;
    function createToDo(projectID, title, dueDate, priority, notes = []){
      const project = getProject(projectID);
      const toDo = project.addToDo(title, dueDate, priority, notes);
      return toDo;
    }
    function deleteToDo(id){
      const projects = getProjects();
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
        toDo = getProject(projectName).getToDo(id);
      } else {
        const projects = getProjects();
        for(const project of projects){
          toDo = project.getToDo(id);
          if(toDo !== undefined){
            break;
          }
        }
      }
      if(toDo === undefined){
        toDo = null;
      }
      return toDo;
    }
    StateSubscriber.subscribe(
      new Subscription('createToDo', createToDo),
      new Subscription('deleteToDo', deleteToDo),
      new Subscription('editToDo', ()=>{}), //todo
      new Subscription('getToDo', getToDo),
      new Subscription('createProject', createProject),
      new Subscription('deleteProject', deleteProject),
      new Subscription('editProject', ()=>{}), //todo
      new Subscription('getProject', getProject),
      new Subscription('getProjects', getProjects),
    )
  })()
  const View = (()=>{
    const root = document.body;
    Header(root, Controller);
    Main(root, Controller);
    Footer(root);
  })()
})()

window.App = App;