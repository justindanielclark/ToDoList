const Header = (root, controller) => {
  //CSS Tailwind Classes
  const _classes = {
    base: {
      self: 'bg-stone-700 p-3 sticky top-0 flex flex-row justify-end items-center',
      button: 'bg-emerald-600 hover:bg-emerald-800 transition-colors text-neutral-100 text-lg px-2 py-1 rounded-lg shadow-md shadow-emerald-900',
    },
    mixins: {

    }
  }
  //Utility Variables
  let isShowing_newToDoButton = false;
  //DOM Element Creation
  const _self = document.createElement('header');
    _self.className = _classes.base.self;
  const _newProjectButton = document.createElement('button');
    _newProjectButton.className = _classes.base.button;
    _newProjectButton.id = 'newProjectButton';
    _newProjectButton.innerText = 'New Project';
    _newProjectButton.addEventListener('click', _handleClick_NewProject);
  const _newToDoButton = document.createElement('button');
    _newToDoButton.className = _classes.base.button;
    _newToDoButton.id = 'newToDoButton';
    _newToDoButton.innerText = 'New To Do';
    _newToDoButton.addEventListener('click', _handleClick_NewToDo);
  _self.append(_newProjectButton)
  root.append(_self);

  //*Closure Functions
  function _handleClick_NewProject(event){
    //todo Implement Modal Creation
  }
  function _handleClick_NewToDo(event){
    //todo Implement Modal Creation
  }
  function _update(projects){
    if(projects.size > 0 && !isShowing_newToDoButton){
      isShowing_newToDoButton = true;
      _self.prepend(_newToDoButton);
    }
    if(projects.size === 0 && isShowing_newToDoButton){
      isShowing_newToDoButton = false;
      _self.removeChild(_newToDoButton);
    }
  }
}

export default Header;