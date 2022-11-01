import './Styles/index.scss';
import Project from './Models/Project';

(()=>{
  const Projects = new Map();
  let newProject = new Project('Home');
  newProject.addToDo('Clean Bathroom', 'Put away contacts, wipe down counters', new Date(), 0);
  newProject.addToDo('Buy Groceries', 'Pickles, Hamburgers', new Date(), 0);
  Projects.set(newProject.getName(), newProject);

  console.log(Projects);
})()