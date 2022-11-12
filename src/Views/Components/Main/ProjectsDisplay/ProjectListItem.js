import edit from '../../../Assets/SVGs/UI/edit.svg';
import trashcan from '../../../Assets/SVGs/UI/trashcan.svg';

const ProjectListItem = (root, controller) => {
  //*Utility Var Declarations
  /** 
   * Set every update() cycle, undefined until first update
   * _id matches the project data given, assists Aside.js in knowing whether an update is required or not
   * Retrieved by this.getID()
   */
   let _id;
   let _isExpanded_bottomContainer = false;
   let _isContracted_bottomContainer = true;
   let _color;

  //*CSS Tailwind Style Declarations
  const _classes = {
    base: {
      bottomContainer: 'flex flex-col w-full justify-start items-start mt-2 overflow-hidden gap-2',
      bottomContainerButtonsIMG: 'w-7 h-7 p-1 rounded-lg ml-6',
      bottomContainerButtonsSpan: 'pl-2',
      topContainer: 'flex flex-row justify-start w-full items-center',
      topContainerLeft: 'relative',
      editProjectButton: 'flex flex-row items-center justify-start w-full',
      expandContractButton: 'absolute text-xl font-bold w-6 h-6 flex flex-row justify-center items-center bg-slate-900 text-neutral-100 rounded-full bottom-0 right-0 translate-y-1/4 translate-x-1/3',
      projectIMG: 'w-14 h-14 p-2 rounded-full border border-slate-600',
      notice: 'text-sm w-4 h-4 flex flex-row justify-center items-center absolute text-neutral-100 rounded-full z-30',
      self: 'flex flex-col items-center mb-4',
      title: 'pl-4 grow text-left',
    },
    mixins: {
      highPrioNotice: 'top-0 left-1/3 -translate-y-1/2 -translate-x-1/2 z-30 bg-red-600',
      medPrioNotice: 'top-0 left-0 bg-yellow-600',
      lowPrioNotice: 'top-1/3 left-0 -translate-y-1/2 -translate-x-1/2 bg-green-600',
      hidden: 'hidden',
      maxHeightAuto: 'h-auto',
      maxHeightZero: 'max-h-0',

    },
    animations: {
      heightExpand: 'animate-heightExpand',
      heightContract: 'animate-heightContract',
    }
  }

  //*Element Declarations & Style Application
  //self
  const _self = document.createElement('li');
    _self.className = _classes.base.self;
    //self -> topContainer
    const _topContainer = document.createElement('div');
      _container.className = _classes.base.topContainer;
      //self -> topContainer -> topContainerLeft
      const _topContainerLeft = document.createElement('div');
        _topContainerLeft.className = _classes.base.topContainerLeft;
        const _projectIMG = document.createElement('img');
          _projectIMG.className = _classes.base.projectIMG;
        const _expandContractButton = document.createElement('button');
          _expandContractButton.className = _classes.base.expandContractButton;
          _expandContractButton.innerText = '+';
          _expandContractButton.addEventListener('click', _click_expandContractButton)
        const _noticeHighPrio = document.createElement('p');
          _noticeHighPrio.className = [_classes.base.notice, _classes.mixins.highPrioNotice, _classes.mixins.hidden].join(' ');
        const _noticeMedPrio = document.createElement('p');
          _noticeMedPrio.className = [_classes.base.notice, _classes.mixins.medPrioNotice, _classes.mixins.hidden].join(' ');
        const _noticeLowPrio = document.createElement('p');
          _noticeLowPrio.className = [_classes.base.notice, _classes.mixins.lowPrioNotice, _classes.mixins.hidden].join(' ');
      _topContainerLeft.append(_projectIMG, _expandContractButton, _noticeHighPrio, _noticeMedPrio, _noticeLowPrio);
      //self -> topContainer -> title (right)
      const _title = document.createElement('h2');
        _title.className = _classes.base.title;
    _topContainer.append(_topContainerLeft, _title);
    //self -> bottomContainer
    const _bottomContainer = document.createElement('div');
      _bottomContainer.className = [_classes.base.bottomContainer, _classes.mixins.maxHeightZero].join(' ');
      _bottomContainer.addEventListener('animationend', _animationEnd_bottomContainer);
      //self -> bottomContainer -> editProjectButton
      const _editProjectButton = document.createElement('button');
        _editProjectButton.className = _classes.base.editProjectButton;
        const _editProjectButtonIMG = document.createElement('img');
          _editProjectButtonIMG.className = _classes.base.bottomContainerButtonsIMG;
          _editProjectButtonIMG.src = edit;
          _editProjectButtonIMG.alt = 'edit_pencil_icon';
        const _editProjectButtonSpan = document.createElement('span');
          _editProjectButtonSpan.className = _classes.base.bottomContainerButtonsSpan;
          _editProjectButtonSpan.innerText = 'Edit Project';
      _editProjectButton.append(_editProjectButtonIMG, _editProjectButtonSpan);
      //self -> bottomContainer -> deleteProjectButton
      const _deleteProjectButton = document.createElement('button');
        _editProjectButton.className = _classes.base.editProjectButton;
        const _deleteProjectButtonIMG = document.createElement('img');
          _editProjectButtonIMG.className = _classes.base.bottomContainerButtonsIMG;
          _editProjectButtonIMG.src = trashcan;
          _editProjectButtonIMG.alt = 'delete_trash_icon';
        const _deleteProjectButtonSpan = document.createElement('span');
          _editProjectButtonSpan.className = _classes.base.bottomContainerButtonsSpan;
          _editProjectButtonSpan.innerText = 'Delete Project';
      _deleteProjectButton.append(_deleteProjectButtonIMG, _deleteProjectButtonSpan);
    _bottomContainer.append(_editProjectButton, _deleteProjectButton);
  _self.append(_topContainer, _bottomContainer)

  //*Closure Functions
  function _animationEnd_bottomContainer(e){
    const {animationName} = e;
    if(animationName === 'heightExpand'){
      _isExpanded_bottomContainer = true;
      bottomContainer.classList.remove(_classes.animations.heightExpand);
    }
    if(animationName === 'heightContract'){
      _isContracted_bottomContainer = true;
      bottomContainer.classList.remove(_classes.animations.heightContract);
    }
  }
  function _click_editProject(e){
    console.log('edit button clicked');
    //todo editProjectModal Creation
  }
  function _click_expandContractButton(e){
    if(_isContracted_bottomContainer){
      _isContracted_bottomContainer = false;
      _expandContractButton.innerText = '-';
      bottomContainer.classList.remove(_classes.mixins.maxHeightZero);
      bottomContainer.classList.add(_classes.animations.heightExpand);
    }
    if(_isExpanded_bottomContainer){
      _isExpanded_bottomContainer = false;
      _expandContractButton.innerText = '+';
      bottomContainer.classList.remove(_classes.mixins.maxHeightAuto);
      bottomContainer.classList.add(_classes.animations.heightContract);
    }
  }
  function _click_deleteProject(e){
    console.log('delete button clicked');
    //todo deleteProjectModal Creation
  }

  //*Returned Functions
  /**
   * Adds a new list item to the aside UL, returns root of list item
   * @param {HTMLElement} root 
   * @returns {HTMLElement}
   */
  function create(root){
    root.appendChild(_self);
    return _self;
  }
  function destroy(){
    _expandContractButton.removeEventListener('click', _click_expandContractButton);
    _bottomContainer.removeEventListener('animationend', _animationEnd_bottomContainer);
    root.removeChild(_self);
  }
  function update(project){
    const projectID = project.getID();
    const projectName = project.getName();
    const projectIconPath = project.getIconPath();
    const projectColor = project.getColor();
    const projectNumPrios = project.getNumPrios();

    _id = projectID;

    if(_color){
      if(_color !== projectColor){
        _projectIMG.classList.remove(`bg-${_color}-300`);
        _projectIMG.classList.add(`bg-${projectColor}-300`);
      }
    } else {
      _color = projectColor;
    }
    
    //todo _projectIMG add/remove bg-color dependent on Project Color
    _projectIMG.src = projectIconPath;
    _projectIMG.alt = `${projectName} icon`;

    _title.innerText = projectName;

    if(projectNumPrios.high > 0){
      noticeHighPrio.classList.remove(_classes.mixins.hidden);
      noticeHighPrio.innerText = projectNumPrios.high;
    }
    else {
      noticeHighPrio.classList.add(_classes.mixins.hidden);
      noticeHighPrio.innerText = projectNumPrios.high;
    }
    if(projectNumPrios.med > 0){
      noticeMedPrio.classList.remove(_classes.mixins.hidden);
      noticeMedPrio.innerText = projectNumPrios.med;
    }
    else {
      noticeMedPrio.classList.add(_classes.mixins.hidden);
      noticeMedPrio.innerText = projectNumPrios.med;
    }
    if(projectNumPrios.low > 0){
      noticeLowPrio.classList.remove(_classes.mixins.hidden);
      noticeLowPrio.innerText = projectNumPrios.low;
    }
    else {
      noticeLowPrio.classList.add(_classes.mixins.hidden);
      noticeLowPrio.innerText = projectNumPrios.low;
    }
  }
  function getID(){
    return _id;
  }
  return {
    create,
    destroy,
    getID,
    update,
  }
}

export default ProjectListItem;