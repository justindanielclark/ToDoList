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
  //View
  const root = document.body;
  Header(root, Controller);
  Main(root, Controller);
  Footer(root);

  const LocalStorage = window.localStorage;
  loadLocalStorage();

  //*LocalStorage Functions
  function loadLocalStorage(){
    const projectsToLoad = [];
    const toDosToLoad = new Map();
    Object.keys(LocalStorage).forEach(function(key){
      const retrievedItem = JSON.parse(localStorage.getItem(key));
      if(retrievedItem.type === 'ToDo'){
        const {projectID} = retrievedItem;
        if(toDosToLoad.get(projectID)){
          toDosToLoad.get(projectID).push(retrievedItem)
        } else {
          toDosToLoad.set(projectID, [retrievedItem])
        }
      }
      else if(retrievedItem.type === 'Project'){
        projectsToLoad.push(retrievedItem);
      }
    });
    LocalStorage.clear();
    projectsToLoad.sort(function(a,b){return a.order-b.order});
    projectsToLoad.forEach(project=>{
      const p = createProject({projectName: project.projectName, iconName: project.iconName, color: project.color});
      const toDosArray = toDosToLoad.get(project.projectID);
      if(toDosArray){
        toDosArray.sort(sortToDos);
        toDosArray.forEach(toDo=>{
          createToDo({projectID: p.getID(), toDoName: toDo.title, dueDate: toDo.dueDate, priority: toDo.priority, notes: toDo.notes, wasProgramatic: true});
        })
      }
    })
    function sortToDos(toDo_A, toDo_B){
      if(toDo_A.priority === toDo_B.priority){
        const toDo_A_Date = new Date(toDo_A.dueDate);
        const toDo_B_Date = new Date(toDo_B.dueDate);
        if(toDo_A_Date < toDo_B_Date){
          return -1;
        }
        else if(toDo_A_Date > toDo_B_Date){
          return 1
        }
        return 0;
      }
      else if(toDo_A.priority === 'high' && (toDo_B.priority === 'med' || toDo_B.priority === 'low')){
        return -1;
      } 
      else if(toDo_A.priority === 'med' && toDo_B.priority === 'low'){
        return -1;
      }
      return 1;
    }
  }
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
    new Subscription('reorderToDos', reorderToDos),
  )
  function createProject(args){
    const {projectName, iconName, color} = args;
    const projects = State.getProjects();
    const project = State.createProject(projectName, iconName, color, projects.size);
    //Subscribers: Header.js, ProjectsDisplay.js
    Controller.publish('projectCreated', {project, projects});
    LocalStorage.setItem(project.getID(), project.stringify());
    return project;
  }
  function createToDo(args){
    const {projectID, toDoName, dueDate, priority, notes, wasProgramatic} = args;
    const project = State.getProject(projectID);
    const toDo = State.createToDo(projectID, toDoName, new Date(dueDate), priority, notes);
    //Subscribers: <Main>ToDoDisplay.js
    Controller.publish('toDoCreated', {project, toDo, wasProgramatic});
    //Subscribers: ProjectListItem.js
    Controller.publish(`projectEdited_updatePrioNotices_${projectID}`, {project})
    LocalStorage.setItem(toDo.getID(), toDo.stringify());
    return toDo;
  }
  function deleteProject(args){
    const {id} = args;
    const project = State.deleteProject(id);
    const projects = State.getProjects();
    const toDos = State.getToDos();
    const toDosToDelete = [];
    //Subscribers: Header.js, ProjectDisplay.js
    Controller.publish('projectDeleted', {project, projects})
    LocalStorage.removeItem(id);
    for(let toDo of toDos.values()){
      if(toDo.getProjectID() === id){
        toDos.delete(toDo.getID());
        LocalStorage.removeItem(toDo.getID());
        toDosToDelete.push(toDo);
        //Subscriber: toDoView.js
        Controller.publish(`toDoDisabled_${toDo.getID()}`);
      }
    }
    const interval = setInterval(function(){
      if(toDosToDelete.length > 0){
        const toDo = toDosToDelete.pop();
        Controller.publish(`toDoDeleted_${toDo.getID()}`)
      } else {
        clearInterval(interval);
      }
    }, 75);
  }
  function deleteToDo(args){
    const {toDoID, projectID} = args;
    const project = State.getProject(projectID)
    State.deleteToDo(toDoID, projectID);
    //Subscribers: ToDoView.js
    Controller.publish(`toDoDeleted_${toDoID}`, {})
    //Subscribers: ProjectListItem.js
    Controller.publish(`projectEdited_updatePrioNotices_${projectID}`, {project})
    LocalStorage.removeItem(toDoID);
  }
  function editProject(args){
    const {projectID, projectName, iconName, color} = args;
    const project = State.getProject(projectID);
    project.setName(projectName);
    project.setIconName(iconName);
    project.setColor(color);
    //Subscribers: ProjectListItem.js, ToDoView.js
    Controller.publish(`projectEdited_${projectID}`, {project});
    LocalStorage.setItem(projectID, project.stringify());
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
    LocalStorage.setItem(toDo.getID(), toDo.stringify());
    reorderToDos();
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
    LocalStorage.setItem(raisedOrderProjectID, raisedProject.stringify());
    loweredProject.decrementOrder();
    LocalStorage.setItem(loweredOrderProjectID, loweredProject.stringify());
    reorderToDos();
  }
  function reorderToDos(){
    const toDos = State.getToDos();
    const toDoArray = [];
    for(let td of toDos){
      toDoArray.push(td[1]);
    }
    toDoArray.sort(compareToDos);
    toDoArray.forEach(td=>{
      Controller.publish(`appendToDoView_${td.getID()}`, {})
    })
    function compareToDos(toDo_A, toDo_B){
      const toDo_A_project_order = State.getProject(toDo_A.getProjectID()).getOrder();
      const toDo_B_project_order = State.getProject(toDo_B.getProjectID()).getOrder();
      if(toDo_A_project_order < toDo_B_project_order){
        return -1;
      } else if(toDo_A_project_order > toDo_B_project_order) {
        return 1;
      }
      return ToDo.compare(toDo_A, toDo_B);
    }
  }
  function showProject(args){
    const {projectID} = args;
    const project = State.getProject(projectID);
    project.setShowing(true);
    //Subscribers: ToDoView.js
    Controller.publish(`projectShown_${projectID}`, null)
  }
  //Initializing Some Data

  // {
  //   let Backpacking = createProject({projectName: 'Backpacking', iconName: 'backpack', color: 'green'})
  //   createToDo({
  //     projectID: Backpacking.getID(),
  //     toDoName: 'Buy Pack',
  //     dueDate: '2022-11-25',
  //     priority: 'high',
  //     notes: ['REI Sale on 11-25-22', 'Santa Ana']
  //   })
  //   createToDo({
  //     projectID: Backpacking.getID(),
  //     toDoName: 'Buy Foodstuffs',
  //     dueDate: '2022-11-17',
  //     priority: 'high',
  //     notes: ['REI Sale on 11-25-22', 'Santa Ana']
  //   })
  //   createToDo({
  //     projectID: Backpacking.getID(),
  //     toDoName: 'Train',
  //     dueDate: '2022-04-17',
  //     priority: 'med',
  //     notes: ['Go for a run at Saddleback Park', 'Min 2 Miles']
  //   })
  //   createToDo({
  //     projectID: Backpacking.getID(),
  //     toDoName: 'Train',
  //     dueDate: '2022-09-17',
  //     priority: 'med',
  //     notes: ['Go for a hike at Ridgepeak', 'Min 6 Miles','Go for a hike at Ridgepeak',]
  //   })
  //   createToDo({
  //     projectID: Backpacking.getID(),
  //     toDoName: 'Train',
  //     dueDate: '2022-01-05',
  //     priority: 'med',
  //     notes: ['Hike Mt. Wilson', 'Min 10 Miles']
  //   })
  //   let Business = createProject({projectName: 'Business', iconName: 'bag', color: 'blue'})
  //   createToDo({
  //     projectID: Business.getID(),
  //     toDoName: 'Buy Tickets to Denver',
  //     dueDate: '2023-01-07',
  //     priority: 'high',
  //     notes: ['American Airlines', 'Arrival by 9AM', 'Flight 11/28']
  //   })
  //   createToDo({
  //     projectID: Business.getID(),
  //     toDoName: 'Call Sheryl in AR',
  //     dueDate: '2022-11-18',
  //     priority: 'low',
  //     notes: ['Johnson Account']
  //   })
  //   let Housekeeping = createProject({projectName: 'Housekeeping', iconName: 'bulb', color: 'orange'})
  //   createToDo({
  //     projectID: Housekeeping.getID(),
  //     toDoName: 'Mop',
  //     dueDate: '2022-12-01',
  //     priority: 'med',
  //     notes: ['Kitchen']
  //   })
  //   createToDo({
  //     projectID: Housekeeping.getID(),
  //     toDoName: 'Mop',
  //     dueDate: '2022-12-01',
  //     priority: 'med',
  //     notes: ['Living Room']
  //   })
  //   createToDo({
  //     projectID: Housekeeping.getID(),
  //     toDoName: 'Mop',
  //     dueDate: '2022-12-01',
  //     priority: 'med',
  //     notes: ['Bathroom']
  //   })
  //   createToDo({
  //     projectID: Housekeeping.getID(),
  //     toDoName: 'Do Dishes',
  //     dueDate: '2022-12-01',
  //     priority: 'high',
  //   })
  //   let Groceries = createProject({projectName: 'Groceries', iconName: 'cart', color: 'red'})
  //   createToDo({
  //     projectID: Groceries.getID(),
  //     toDoName: 'Make Chana Masala',
  //     dueDate: '2022-12-01',
  //     priority: 'high',
  //     notes: ['Jalapeno', 'Garam Masala', 'Coriander', 'Red Pepper']
  //   })
  //   createToDo({
  //     projectID: Groceries.getID(),
  //     toDoName: 'Japanese Curry',
  //     dueDate: '2022-11-25',
  //     priority: 'low',
  //     notes: ['Med Spicy', 'x2']
  //   })
  //   let Valentines = createProject({projectName: 'Valentines Day', iconName: 'heart', color: 'pink'})
  //   createToDo({
  //     projectID: Valentines.getID(),
  //     toDoName: 'Buy Flowers',
  //     dueDate: '2023-02-14',
  //     priority: 'low',
  //     notes: ['Peonies']
  //   })
  //   createToDo({
  //     projectID: Valentines.getID(),
  //     toDoName: 'Buy Chocolates',
  //     dueDate: '2023-02-14',
  //     priority: 'low',
  //   })
  //   createToDo({
  //     projectID: Valentines.getID(),
  //     toDoName: 'Get Suit Dry Cleaned',
  //     dueDate: '2023-02-14',
  //     priority: 'low',
  //   })
  //   createToDo({
  //     projectID: Valentines.getID(),
  //     toDoName: 'Get Reservations',
  //     dueDate: '2023-02-14',
  //     priority: 'high',
  //     notes: ['Seabird Cafe']
  //   })
  //   let Thanksgiving = createProject({projectName: 'Thanksgiving', iconName: 'chicken', color: 'amber'})
  //   createToDo({
  //     projectID: Thanksgiving.getID(),
  //     toDoName: 'Cook Turkey',
  //     dueDate: '2022-11-24',
  //     priority: 'high',
  //     notes: ['6 lbs.']
  //   })
  //   createToDo({
  //     projectID: Thanksgiving.getID(),
  //     toDoName: 'Make Cranberry Sauce',
  //     dueDate: '2022-11-24',
  //     priority: 'high',
  //     notes: ['Low Sugar']
  //   })
  //   let ChristmasShopping = createProject({projectName: 'Christmas Shopping', iconName: 'forest', color: 'cyan'})
  //   createToDo({
  //     projectID: ChristmasShopping.getID(),
  //     toDoName: 'Gifts for Natasha',
  //     dueDate: '2022-12-25',
  //     priority: 'med',
  //     notes: ['$100k', 'A 5 story home', '25 diamond rings']
  //   })
  //   createToDo({
  //     projectID: ChristmasShopping.getID(),
  //     toDoName: 'Gifts for Mom',
  //     dueDate: '2022-12-25',
  //     priority: 'med',
  //     notes: ['Cutting Board', 'Muffin Tins']
  //   })
  //   createToDo({
  //     projectID: ChristmasShopping.getID(),
  //     toDoName: 'Gifts for Dad',
  //     dueDate: '2022-12-25',
  //     priority: 'med',
  //     notes: ['Drill Bits', 'Hammer']
  //   })
  //   let SuperBowlParty = createProject({projectName: 'Super Bowl Party', iconName: 'pizza', color: 'stone'});
  //   createToDo({
  //     projectID: SuperBowlParty.getID(),
  //     toDoName: 'Order Pizza',
  //     dueDate: '2023-02-14',
  //     priority: 'low',
  //     notes: ['Pepperoni']
  //   })
  // }
})()

window.App = App;