import ProjectsDisplay from './ProjectsDisplay/ProjectsDisplay.js';
import ToDosDisplay from './ToDosDisplay/ToDosDisplay.js';
const Main = (root, controller) => {
  //*CSS Tailwind Declarations
  const _classes = {
    base: {
      self: 'bg-slate-800 flex flex-row grow shrink-0 basis-0 overflow-hidden items-stretch relative'
    }
  }
  //*DOM Element Creation
  const _self = document.createElement('main');
    _self.className = _classes.base.self
  ProjectsDisplay(_self, controller)
  ToDosDisplay(_self, controller);

  root.append(_self);
}

export default Main;