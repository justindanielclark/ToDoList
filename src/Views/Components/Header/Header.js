import NewProjectModal from '../Modals/NewProjectModal.js';
import newToDoModal from '../Modals/NewToDoModal.js';

const Header = (root, controller) => {
  const HeaderSubscriber = controller.subscriberWrapper({});
  const Subscription = controller.Subscription;

  HeaderSubscriber.subscribe(
    new Subscription('projectCreated', _update),
    new Subscription('projectDeleted', _update)
  );

  //CSS Tailwind Classes
  const _classes = {
    base: {
      self: 'bg-stone-700 p-3 sticky top-0 flex flex-row justify-between items-center px-4 overflow-hidden grow-0 shrink-0 basis-auto',
      buttonControls: 'flex flex-row grow basis-full shrink gap-4 items-center justify-end',
      button: 'bg-emerald-600 hover:bg-emerald-800 transition-colors text-neutral-100 text-lg px-2 py-1 rounded-lg shadow-md shadow-emerald-900',
      hamburger: 'space-y-1.5 bg-stone-700 hover:bg-stone-600 active:b-stone-500 rounded-lg p-2 visible lg:hidden grow-0 shrink-0',
      hamburgerLine: 'w-6 h-0.5 bg-stone-100',
    },
    animations: {
      appearFromBelow: 'animate-appearFromBelow',
      disappearBelow: 'animate-disappearBelow',
    }
  }
  //Utility Variables
  let isShowing_newToDoButton = false;
  //DOM Element Creation
  const _self = document.createElement('header');
    _self.className = _classes.base.self;
  const _hamburger = document.createElement('button');
    _hamburger.className = _classes.base.hamburger;
    _hamburger.addEventListener('click', _handleClick_Hamburger);
    const _hamburger_topLine = document.createElement('div');
    _hamburger_topLine.className = _classes.base.hamburgerLine;
    const _hamburger_middleLine = document.createElement('div');
    _hamburger_middleLine.className = _classes.base.hamburgerLine;
    const _hamburger_bottomLine = document.createElement('div');
    _hamburger_bottomLine.className = _classes.base.hamburgerLine;
  _hamburger.append(_hamburger_topLine,_hamburger_middleLine,_hamburger_bottomLine);
  const _buttonControls = document.createElement('div');
  _buttonControls.className = _classes.base.buttonControls;
    const _newProjectButton = document.createElement('button');
      _newProjectButton.className = [_classes.base.button, _classes.animations.appearFromBelow].join(' ');
      _newProjectButton.id = 'newProjectButton';
      _newProjectButton.innerText = 'New Project';
      _newProjectButton.addEventListener('animationend', _handleAnimationEnd_NewProjectButton);
    const _newToDoButton = document.createElement('button');
      _newToDoButton.className = _classes.base.button;
      _newToDoButton.id = 'newToDoButton';
      _newToDoButton.innerText = 'New To Do';
      _newToDoButton.addEventListener('animationend', _handleAnimationEnd_NewToDoButton)
  _buttonControls.append(_newProjectButton);
  _self.append(_hamburger, _buttonControls)
  root.append(_self);

  //*Closure Functions
  function _handleAnimationEnd_NewToDoButton(event){
    const {animationName} = event;
    if(animationName === 'appearFromBelow'){
      this.addEventListener('click', _handleClick_NewToDo);
      this.classList.remove(_classes.animations.appearFromBelow);
    }
    if(animationName === 'disappearBelow'){
      this.classList.remove(_classes.animations.disappearBelow);
      this.removeEventListener('click', _handleClick_NewToDo);
      _buttonControls.removeChild(this);
    }
  }
  function _handleAnimationEnd_NewProjectButton(event){
    const {animationName} = event;
    if(animationName === 'appearFromBelow'){
      this.addEventListener('click', _handleClick_NewProject);
      this.classList.remove(_classes.animations.appearFromBelow);
    }
  }
  function _handleClick_NewProject(){
    NewProjectModal(root, controller);
  }
  function _handleClick_NewToDo(){
    newToDoModal(root, controller);
  }
  function _handleClick_Hamburger(){
    controller.publish('projectListToggled', {});
  }
  function _update(args){
    const {projects} = args;
    if(projects.size > 0 && !isShowing_newToDoButton){
      isShowing_newToDoButton = true;
      _newToDoButton.classList.add(_classes.animations.appearFromBelow);
      _buttonControls.prepend(_newToDoButton);
    }
    if(projects.size === 0 && isShowing_newToDoButton){
      isShowing_newToDoButton = false;
      _newToDoButton.classList.add(_classes.animations.disappearBelow);
    }
  }
}

export default Header;