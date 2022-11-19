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
  const Subscriber = Controller.subscriberWrapper({});

  const State = (() => {
    const {createProject, deleteProject, getProject, getProjects} = ProjectsCollection;
    function createToDo(projectID, title, dueDate, priority, notes = []){
      const project = getProject(projectID);
      const toDo = project.addToDo(title, dueDate, priority, notes);
      return toDo;
    }
    function deleteToDo(id, projectID = null){
      if(projectID){
        console.log('hit');
        const project = getProject(projectID);
        return project.deleteToDo(id);
      }
      else {
        const projects = getProjects();
        const projectsArray = Array.from(Object.values(projects));
        let toDo;
        for(let i = 0; i < projectsArray.length; i++){
          toDo = projectsArray[i].getToDo(id);
          if(toDo){
            projectsArray[i].deleteToDo(id);
            break
          }
        }
        return toDo; 
      }
    }
    function getToDo(id, projectID = null){
      let toDo = null;
      if(projectID){
        toDo = getProject(projectID).getToDo(id);
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
    return {
      createProject,
      deleteProject,
      getProject,
      getProjects,
      createToDo,
      deleteToDo,
      getToDo,
    }
  })()
  const View = (()=>{
    const root = document.body;
    Header(root, Controller);
    Main(root, Controller);
    Footer(root);
  })()

  Subscriber.subscribe(
    new Subscription('createToDo', createToDo),
    new Subscription('deleteToDo', deleteToDo),
    new Subscription('editToDo', editToDo),
    new Subscription('createProject', createProject),
    new Subscription('deleteProject', deleteProject),
    new Subscription('editProject', editProject),
    new Subscription('getProject', getProject),
    new Subscription('getProjects', getProjects),
    new Subscription('hideProject', hideProject)
  )
  function createProject(args){
    const {projectName, iconName, color} = args;
    const project = State.createProject(projectName, iconName, color);
    const projects = State.getProjects();
    //Subscribers: Header.js, ProjectsDisplay.js
    Controller.publish('projectCreated', {project, projects}); 
    return project;
  }
  function createToDo(args){
    const {projectID, toDoName, dueDate, priority, notes} = args;
    const project = State.getProject(projectID);
    const toDo = State.createToDo(projectID, toDoName, new Date(dueDate), priority, notes);
    //Subscribers: <Main>ToDoDisplay.js
    Controller.publish('toDoCreated', {project, toDo});
    //Subscribers: ProjectListItem.js
    Controller.publish(`toDoCreated_${projectID}`, {toDo, project}); 
    return toDo;
  }
  function deleteProject(args){
    const {id} = args;
    const project = State.deleteProject(id);
    const projects = State.getProjects();
    //Subscribers: Header.js, ProjectDisplay.js
    Controller.publish('projectDeleted', {project, projects}) 
    return project;
  }
  function deleteToDo(args){
    const {toDoID, projectID} = args;
    const project = State.getProject(projectID)
    State.deleteToDo(toDoID, projectID)
    //Subscribers: ProjectListItem
    Controller.publish(`toDoDeleted_${projectID}`, {project})
  }
  function editProject(args){
    const {projectID, projectName, iconName, color} = args;
    const project = State.getProject(projectID);
    project.setName(projectName);
    project.setIconName(iconName);
    project.setColor(color);
    //Subscribers: ProjectListItem.js
    Controller.publish(`projectEdited_${projectID}`, {project});
  }
  function editToDo(args){
    const {projectID, toDo, toDoName, dueDate, priority, notes} = args;
    let project = State.getProject(projectID);
    if(projectID !== toDo.getProjectID()){
      const oldProject = State.getProject(toDo.getProjectID())
      const newProject = State.getProject(projectID);
      oldProject.deleteToDo(toDo.getID());
      updateToDoValues();
      newProject.transferToDo(toDo);
      //Subscribers: ProjectListItem.js
      Controller.publish(`projectEdited_${toDo.getProjectID()}`, {project: oldProject});
      Controller.publish(`projectEdited_${projectID}`, {project: newProject});
      toDo.setProjectID(project.getID());
    } else {
      if(priority !== toDo.getPriority()){
        project.adjustPriorities(toDo.getPriority(), priority);
      }
      updateToDoValues();
      //Subscribers: ProjectListItem.js
      Controller.publish(`projectEdited_${toDo.getProjectID()}`, {project})
    }

    //Subscribers: ToDoView.js
    Controller.publish(`toDoEdited_${toDo.getID()}`, {toDo, project});

    function updateToDoValues(){
      toDo.setTitle(toDoName);
      toDo.setDueDate(new Date(dueDate));
      toDo.setPriority(priority);
      toDo.setNotes(notes);
    }
  }
  function getProject(args){
    const {subscription, id} = args;
    const project = State.getProject(id);
    Controller.publish(subscription, project);
  }
  function getProjects(args){
    const {subscription} = args;
    const projects = State.getProjects();
    Controller.publish(subscription, projects); //Subscriber: <Modal>NewToDoModal.js
    return projects;
  }
  function hideProject(args){
    
  }
  //Initializing Some Data
  {
    let Backpacking = createProject({projectName: 'Backpacking', iconName: 'backpack', color: 'green'})
    createToDo({
      projectID: Backpacking.getID(),
      toDoName: 'Buy Pack',
      dueDate: '2022-11-25',
      priority: 'high',
      notes: ['REI Sale on 11-25-22', 'Santa Ana']
    })
    createToDo({
      projectID: Backpacking.getID(),
      toDoName: 'Buy Foodstuffs',
      dueDate: '2022-11-17',
      priority: 'high',
      notes: ['REI Sale on 11-25-22', 'Santa Ana']
    })
    createToDo({
      projectID: Backpacking.getID(),
      toDoName: 'Train',
      dueDate: '2022-4-17',
      priority: 'med',
      notes: ['Go for a run at Saddleback Park', 'Min 2 Miles']
    })
    createToDo({
      projectID: Backpacking.getID(),
      toDoName: 'Train',
      dueDate: '2022-9-17',
      priority: 'med',
      notes: ['Go for a hike at Ridgepeak', 'Min 6 Miles','Go for a hike at Ridgepeak',]
    })
    createToDo({
      projectID: Backpacking.getID(),
      toDoName: 'Train',
      dueDate: '2022-1-5',
      priority: 'med',
      notes: ['Hike Mt. Wilson', 'Min 10 Miles']
    })

    let Business = createProject({projectName: 'Business', iconName: 'bag', color: 'blue'})
    createToDo({
      projectID: Business.getID(),
      toDoName: 'Buy Tickets to Denver',
      dueDate: '2023-1-7',
      priority: 'high',
      notes: ['American Airlines', 'Arrival by 9AM', 'Flight 11/28']
    })
    createToDo({
      projectID: Business.getID(),
      toDoName: 'Call Sheryl in AR',
      dueDate: '2022-11-18',
      priority: 'low',
      notes: ['Johnson Account']
    })
    // let Housekeeping = createProject({projectName: 'Housekeeping', iconName: 'bulb', color: 'blue'})
    // let Groceries = createProject({projectName: 'Groceries', iconName: 'pizza', color: 'purple'})
    // let Valentines = createProject({projectName: 'Valentines Day', iconName: 'heart', color: 'pink'})
  }
  return {
    State,
    View,
    Subscriber,
    Controller
  }
})()

window.App = App;