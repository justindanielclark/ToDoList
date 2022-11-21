'use strict';
import './Styles/index.css';
import ToDo from './Models/ToDo';
import Project from './Models/Project';
import Header from './Views/Components/Header/Header';
import Main from './Views/Components/Main/Main';
import Footer from './Views/Components/Footer/Footer';
import SubscriberPublisherController from './Utilities/SubscriberPublisherController.js';

const App = (()=>{
  const Controller = SubscriberPublisherController();
  const Subscription = Controller.Subscription;
  const Subscriber = Controller.subscriberWrapper({});

  const State = (() => {
    const _toDos = new Map();
    const _projects = new Map();
    function createProject(projectName, iconPath, color, order){
      const P = new Project(projectName, iconPath, color, order);
      const id = P.getID();
      _projects.set(id, P);
      return P;
    }
    function deleteProject(id){
      const P = _projects.get(id);
      _projects.delete(id);
      return P;
    }
    function getProject(id){
      return _projects.get(id);
    }
    function getProjects(){
      return _projects;
    }
    function createToDo(projectID, title, dueDate, priority, notes = []){ //Suspect
      const p = getProject(projectID);
      const td = new ToDo(title, dueDate, priority, projectID, notes);
      _toDos.set(td.getID(), td);
      p.raisePriority(priority);
      return td;
    }
    function deleteToDo(id, projectID){
      const p = getProject(projectID);
      const td = getToDo(id);
      _toDos.delete(id);
      p.lowerPriority(td.getPriority())
      return td;
    }
    function getToDo(id){
      const td = _toDos.get(id);
      return td;
    }
    function getToDos(){
      return _toDos;
    }
    return {
      createProject,
      deleteProject,
      getProject,
      getProjects,
      createToDo,
      deleteToDo,
      getToDo,
      getToDos,
    }
  })()
  const View = (()=>{
    const root = document.body;
    Header(root, Controller);
    Main(root, Controller);
    Footer(root);
  })()

  //*Subscriber Functions
  Subscriber.subscribe(
    new Subscription('createToDo', createToDo),
    new Subscription('deleteToDo', deleteToDo),
    new Subscription('editToDo', editToDo),
    new Subscription('createProject', createProject),
    new Subscription('deleteProject', deleteProject),
    new Subscription('editProject', editProject),
    new Subscription('getProject', getProject),
    new Subscription('getProjects', getProjects),
    new Subscription('hideProject', hideProject),
    new Subscription('showProject', showProject),
    new Subscription('reorderProjects', reorderProjects),
  )
  function createProject(args){
    const {projectName, iconName, color} = args;
    const projects = State.getProjects();
    const project = State.createProject(projectName, iconName, color, projects.size);
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
    Controller.publish(`projectEdited_updatePrioNotices_${projectID}`, {project})
  }
  function deleteProject(args){
    const {id} = args;
    const project = State.deleteProject(id);
    const projects = State.getProjects();
    const toDos = State.getToDos();
    const toDosToDelete = [];
    //Subscribers: Header.js, ProjectDisplay.js
    Controller.publish('projectDeleted', {project, projects})
    for(let toDo of toDos.values()){
      if(toDo.getProjectID() === id){
        toDos.delete(toDo.getID());
        toDosToDelete.push(toDo);
        //Subscriber: toDoView.js
        Controller.publish(`toDoDisabled_${toDo.getID()}`);
      }
    }
    const interval = setInterval(function(){
      if(toDosToDelete.length > 0){
        const toDo = toDosToDelete.pop();
        console.log(toDo);
        Controller.publish(`toDoDeleted_${toDo.getID()}`)
      } else {
        clearInterval(interval);
      }
    }, 150);
  }
  function deleteToDo(args){
    const {toDoID, projectID} = args;
    const project = State.getProject(projectID)
    State.deleteToDo(toDoID, projectID);
    //Subscribers: ToDoView.js
    Controller.publish(`toDoDeleted_${toDoID}`, {})
    //Subscribers: ProjectListItem.js
    Controller.publish(`projectEdited_updatePrioNotices_${projectID}`, {project})
  }
  function editProject(args){
    const {projectID, projectName, iconName, color} = args;
    const project = State.getProject(projectID);
    project.setName(projectName);
    project.setIconName(iconName);
    project.setColor(color);
    //Subscribers: ProjectListItem.js, ToDoView.js
    Controller.publish(`projectEdited_${projectID}`, {project});
  }
  function editToDo(args){
    const {projectID, toDo, toDoName, dueDate, priority, notes} = args;
    let project = State.getProject(projectID);
    if(projectID !== toDo.getProjectID()){
      const oldProject = State.getProject(toDo.getProjectID())
      const newProject = State.getProject(projectID);
      oldProject.lowerPriority(toDo.getPriority());
      updateToDoValues();
      newProject.raisePriority(toDo.getPriority());
      //Subscribers: ProjectListItem.js
      Controller.publish(`projectEdited_updatePrioNotices_${toDo.getProjectID()}`, {project: oldProject});
      Controller.publish(`projectEdited_updatePrioNotices_${projectID}`, {project: newProject});
      toDo.setProjectID(project.getID());
    } else {
      if(priority !== toDo.getPriority()){
        project.adjustPriorities(toDo.getPriority(), priority);
        //Subscribers: ProjectListItem.js
        Controller.publish(`projectEdited_updatePrioNotices_${toDo.getProjectID()}`, {project})
      }
      updateToDoValues();
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
    const {projectID} = args;
    const project = State.getProject(projectID);
    project.setShowing(false);
    //Subscribers: ToDoView.js
    Controller.publish(`projectHidden_${projectID}`, null)
  }
  function reorderProjects(args){
    const {loweredOrderProjectID, raisedOrderProjectID} = args;
    const raisedProject = State.getProject(raisedOrderProjectID);
    const loweredProject = State.getProject(loweredOrderProjectID);
    raisedProject.incrementOrder();
    loweredProject.decrementOrder();
  }
  function showProject(args){
    const {projectID} = args;
    const project = State.getProject(projectID);
    project.setShowing(true);
    //Subscribers: ToDoView.js
    Controller.publish(`projectShown_${projectID}`, null)
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
    let Housekeeping = createProject({projectName: 'Housekeeping', iconName: 'bulb', color: 'orange'})
    createToDo({
      projectID: Housekeeping.getID(),
      toDoName: 'Mop',
      dueDate: '2022-12-01',
      priority: 'med',
      notes: ['Kitchen']
    })
    createToDo({
      projectID: Housekeeping.getID(),
      toDoName: 'Mop',
      dueDate: '2022-12-01',
      priority: 'med',
      notes: ['Living Room']
    })
    createToDo({
      projectID: Housekeeping.getID(),
      toDoName: 'Mop',
      dueDate: '2022-12-01',
      priority: 'med',
      notes: ['Bathroom']
    })
    createToDo({
      projectID: Housekeeping.getID(),
      toDoName: 'Do Dishes',
      dueDate: '2022-12-01',
      priority: 'high',
    })
    let Groceries = createProject({projectName: 'Groceries', iconName: 'cart', color: 'red'})
    createToDo({
      projectID: Groceries.getID(),
      toDoName: 'Chana Masala Ingredients',
      dueDate: '2022-12-01',
      priority: 'high',
      notes: ['Jalapeno', 'Garam Masala', 'Coriander', 'Red Pepper']
    })
    createToDo({
      projectID: Groceries.getID(),
      toDoName: 'Japanese Curry',
      dueDate: '2022-11-25',
      priority: 'low',
      notes: ['Med Spicy', 'x2']
    })
    let Valentines = createProject({projectName: 'Valentines Day', iconName: 'heart', color: 'pink'})
    createToDo({
      projectID: Valentines.getID(),
      toDoName: 'Buy Flowers',
      dueDate: '2023-2-14',
      priority: 'low',
      notes: ['Peonies']
    })
    createToDo({
      projectID: Valentines.getID(),
      toDoName: 'Buy Chocolates',
      dueDate: '2023-2-14',
      priority: 'low',
    })
    createToDo({
      projectID: Valentines.getID(),
      toDoName: 'Get Suit Dry Cleaned',
      dueDate: '2023-2-14',
      priority: 'low',
    })
    createToDo({
      projectID: Valentines.getID(),
      toDoName: 'Get Reservations',
      dueDate: '2023-2-14',
      priority: 'high',
      notes: ['Seabird Cafe']
    })
  }
  return {
    State,
    View,
    Subscriber,
    Controller
  }
})()

window.App = App;