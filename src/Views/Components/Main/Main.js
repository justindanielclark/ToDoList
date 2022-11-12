import ProjectsDisplay from './ProjectsDisplay/ProjectsDisplay.js';
import ToDoDisplay from './ToDoDisplay/ToDoDisplay.js';
const Main = (root, controller) => {
  //*CSS Tailwind Declarations
  const _classes = {
    base: {
      self: 'bg-slate-800 flex flex-row flex-grow overflow-hidden'
    }
  }
  //*DOM Element Creation
  const _self = document.createElement('main');
    _self.className = _classes.base.self
  const _projectsDisplay = ProjectsDisplay(_self)
    _projectsDisplay.create();
  const _toDoDisplay = ToDoDisplay(_self);
    _toDoDisplay.create();

  root.append(_self);
}

export default Main;