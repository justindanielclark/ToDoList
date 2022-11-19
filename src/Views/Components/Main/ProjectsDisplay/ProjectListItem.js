import edit from '../../../../Assets/SVGs/UI/edit.svg';
import trash from '../../../../Assets/SVGs/UI/trash.svg';
import down from '../../../../Assets/SVGs/UI/down.svg';
import up from '../../../../Assets/SVGs/UI/up.svg';
import IconMap from '../../../../Assets/IconMap';
import EditProjectModal from '../../Modals/EditProjectModal';

const ProjectListItem = (root, controller, project) => {
  //*Utility Var Declarations
  let _id = project.getID();
  let _color = project.getColor();
  let _isExpanded_bottomContainer = false;
  let _isContracted_bottomContainer = true;
  //*Controller
  const Subscriber = controller.subscriberWrapper({});
  const Publisher = controller.publisherWrapper({});
  const Subscription = controller.Subscription;
  Subscriber.subscribe(
    new Subscription(`toDoCreated_${_id}`, _updatePrioNotices),
    new Subscription(`toDoDeleted_${_id}`, _updatePrioNotices),
    new Subscription(`projectEdited_${_id}`, _onProjectEdit),
    new Subscription(`projectEdited_updatePrioNotices_${_id}`, _updatePrioNotices)
  )
  //*CSS Tailwind Style Declarations
  const _classes = {
    base: {
      bottomContainer: 'flex flex-col w-full justify-start items-start mt-2 overflow-hidden gap-2',
      bottomContainerButtonsIMG: 'w-7 h-7 p-1 rounded-lg ml-6',
      bottomContainerButtonsSpan: 'pl-2',
      checkBox: 'w-5 h-5 ring-slate-900 ring-2 ml-5',
      topContainer: 'flex flex-row justify-start w-full items-center',
      infoContainer: 'relative p-2 rounded-full border-slate-600 border',
      projectButton: 'flex flex-row items-center justify-start w-full hover:bg-slate-600 active:bg-slate-500 transition-colors duration-300',
      expandContractButton: 'absolute text-xl font-bold w-6 h-6 flex flex-row justify-center items-center bg-slate-900 text-neutral-100 rounded-full bottom-0 right-0 translate-y-1/4 translate-x-1/3 hover:bg-slate-500',
      projectIMG: 'w-10 h-10',
      notice: 'w-5 h-5 flex flex-row justify-center items-center text-neutral-100 rounded-full z-30',
      noticeContainer: 'flex flex-row absolute top-0 left-0 -translate-x-1 -translate-y-3',
      self: 'flex flex-col items-center mb-4',
      title: 'pl-4 lg:grow text-left',
      orderContainer: 'flex flex-col justify-between',
      orderContainerFlexFill: 'grow-1 shrink-1 basis-1',
      orderButton: 'basis-6 max-h-6 w-6 hover:bg-slate-600 rounded-lg grow-0 shrink-0',
      orderButtonImg: 'h-full w-full',
    },
    mixins: {
      highPrioNotice: 'bg-red-600',
      medPrioNotice: 'bg-yellow-600',
      lowPrioNotice: 'bg-green-600',
      hidden: 'hidden',
      maxHeightAuto: 'h-auto',
      maxHeightZero: 'max-h-0',
      imgColors: {
        stone: 'bg-stone-300',
        red: 'bg-red-300',
        orange: 'bg-orange-300',
        amber: 'bg-amber-300',
        yellow: 'bg-yellow-300',
        lime: 'bg-lime-300',
        green: 'bg-green-300',
        emerald: 'bg-emerald-300',
        teal: 'bg-teal-300',
        rose: 'bg-rose-300',
        pink: 'bg-pink-300',
        fuchsia: 'bg-fuchsia-300',
        purple: 'bg-purple-300',
        violet: 'bg-violet-300',
        indigo: 'bg-indigo-300',
        blue: 'bg-blue-300',
        sky: 'bg-sky-300',
        cyan: 'bg-cyan-300',
      }
    },
    animations: {
      heightExpand: 'animate-heightExpand',
      heightContract: 'animate-heightContract',
      expandAndSlideIn: 'animate-expandAndSlideIn',
      slideOutAndContract: 'animate-slideOutAndContract',
      slideInRight: 'animate-slideInRight',
      slideOutLeft: 'animate-slideOutLeft',
    }
  }
  //*Element Declarations & Style Application
  //self
  const _self = document.createElement('li');
    _self.className = [_classes.base.self, _classes.animations.expandAndSlideIn].join(' ');
    _self.addEventListener('animationend', _handleAnimationEnd_self);
    //self -> topContainer
    const _topContainer = document.createElement('div');
      _topContainer.className = _classes.base.topContainer;
      //self -> topContainer -> orderContainer
      const _orderContainer = document.createElement('div');
        _orderContainer.className = _classes.base.orderContainer;
        const _moveOrderUpButton = document.createElement('button');
        _moveOrderUpButton.className = _classes.base.orderButton;
          const _moveOrderUpButtonImg = document.createElement('img');
          _moveOrderUpButtonImg.className = _classes.base.orderButtonImg;
          _moveOrderUpButtonImg.src = up;
          _moveOrderUpButtonImg.alt = 'up_arrow'
        _moveOrderUpButton.append(_moveOrderUpButtonImg);
        const _orderContainerFlexFiller = document.createElement('div');
        _orderContainerFlexFiller.className = _classes.base.orderContainerFlexFill;
        const _moveOrderDownButton = document.createElement('button');
        _moveOrderDownButton.className = _classes.base.orderButton;
          const _moveOrderDownButtonImg = document.createElement('img');
          _moveOrderDownButtonImg.className = _classes.base.orderButtonImg;
          _moveOrderDownButtonImg.src = down;
          _moveOrderDownButtonImg.alt = 'down_arrow'
        _moveOrderDownButton.append(_moveOrderDownButtonImg);
      _orderContainer.append(_moveOrderUpButton, _orderContainerFlexFiller, _moveOrderDownButton);

      //self -> topContainer -> infoContainer
      const _infoContainer = document.createElement('div');
        _infoContainer.className = [_classes.base.infoContainer, _classes.mixins.imgColors[_color]].join(' ');
        const _projectIMG = document.createElement('img');
          _projectIMG.className = _classes.base.projectIMG;
        const _expandContractButton = document.createElement('button');
          _expandContractButton.className = _classes.base.expandContractButton;
          _expandContractButton.innerText = '+';
          _expandContractButton.addEventListener('click', _handleClick_expandContractButton)
        const _noticeContainer = document.createElement('div');
          _noticeContainer.className = _classes.base.noticeContainer;
        const _noticeHighPrio = document.createElement('p');
          _noticeHighPrio.className = [_classes.base.notice, _classes.mixins.highPrioNotice, _classes.mixins.hidden].join(' ');
        const _noticeMedPrio = document.createElement('p');
          _noticeMedPrio.className = [_classes.base.notice, _classes.mixins.medPrioNotice, _classes.mixins.hidden].join(' ');
        const _noticeLowPrio = document.createElement('p');
          _noticeLowPrio.className = [_classes.base.notice, _classes.mixins.lowPrioNotice, _classes.mixins.hidden].join(' ');
        _noticeContainer.append(_noticeHighPrio, _noticeMedPrio, _noticeLowPrio);
      _infoContainer.append(_projectIMG, _expandContractButton, _noticeContainer);
      //self -> topContainer -> title (right)
      const _title = document.createElement('h2');
        _title.className = _classes.base.title;
      const _checkBox = document.createElement('input');
        _checkBox.type = 'checkbox'
        _checkBox.className = _classes.base.checkBox;
        _checkBox.checked = true;
        _checkBox.addEventListener('click', _handleClick_toDisplayCheckBox);
    _topContainer.append(_orderContainer, _infoContainer, _title, _checkBox);
    //self -> bottomContainer
    const _bottomContainer = document.createElement('div');
      _bottomContainer.className = [_classes.base.bottomContainer, _classes.mixins.maxHeightZero, _classes.mixins.hidden].join(' ');
      _bottomContainer.addEventListener('animationend', _handleAnimationEnd_bottomContainer);
      //self -> bottomContainer -> editProjectButton
      const _editProjectButton = document.createElement('button');
        _editProjectButton.className = _classes.base.projectButton;
        const _editProjectButtonIMG = document.createElement('img');
          _editProjectButtonIMG.className = _classes.base.bottomContainerButtonsIMG;
          _editProjectButtonIMG.src = edit;
          _editProjectButtonIMG.alt = 'edit_pencil_icon';
        const _editProjectButtonSpan = document.createElement('span');
          _editProjectButtonSpan.className = _classes.base.bottomContainerButtonsSpan;
          _editProjectButtonSpan.innerText = 'Edit Project';
      _editProjectButton.append(_editProjectButtonIMG, _editProjectButtonSpan);
      _editProjectButton.addEventListener('click', _handleClick_editProject);
      //self -> bottomContainer -> deleteProjectButton
      const _deleteProjectButton = document.createElement('button');
        _deleteProjectButton.className = _classes.base.projectButton;
        const _deleteProjectButtonIMG = document.createElement('img');
          _deleteProjectButtonIMG.className = _classes.base.bottomContainerButtonsIMG;
          _deleteProjectButtonIMG.src = trash;
          _deleteProjectButtonIMG.alt = 'delete_trash_icon';
        const _deleteProjectButtonSpan = document.createElement('span');
          _deleteProjectButtonSpan.className = _classes.base.bottomContainerButtonsSpan;
          _deleteProjectButtonSpan.innerText = 'Delete Project';
      _deleteProjectButton.append(_deleteProjectButtonIMG, _deleteProjectButtonSpan);
      _deleteProjectButton.addEventListener('click', _handleClick_deleteProject)
    _bottomContainer.append(_editProjectButton, _deleteProjectButton);
  _self.append(_topContainer, _bottomContainer);
  _update(project);
  root.appendChild(_self);
  //*Closure Functions
  function _destroy(){
    root.removeChild(_self);
    //REMOVE ALL PRIOR REGISTERED EVENT LISTENERS //todo
    //REMOVE ALL SUBSCRIPTIONS //todo
  }
  function _handleAnimationEnd_self(e){
    const {animationName} = e;
    if(animationName === 'slideOutAndContract'){
      this.classList.remove(_classes.animations.slideOutAndContract);
      _destroy()
    }
    if(animationName === 'expandAndSlideIn'){
      this.classList.remove(_classes.animations.expandAndSlideIn);
    }
  }
  function _handleAnimationEnd_bottomContainer(e){
    const {animationName} = e;
    if(animationName === 'heightExpand'){
      _isExpanded_bottomContainer = true;
      _bottomContainer.classList.remove(_classes.animations.heightExpand);
      _bottomContainer.classList.add(_classes.mixins.maxHeightAuto);
    }
    if(animationName === 'heightContract'){
      _isContracted_bottomContainer = true;
      _bottomContainer.classList.remove(_classes.animations.heightContract);
      _bottomContainer.classList.add(_classes.mixins.maxHeightZero, _classes.mixins.hidden);
    }
  }
  function _handleClick_editProject(e){
    EditProjectModal(document.body, controller, project);
  }
  function _handleClick_expandContractButton(e){
    if(_isContracted_bottomContainer){
      _isContracted_bottomContainer = false;
      _expandContractButton.innerText = '-';
      _bottomContainer.classList.remove(_classes.mixins.maxHeightZero, _classes.mixins.hidden);
      _bottomContainer.classList.add(_classes.animations.heightExpand);
    }
    if(_isExpanded_bottomContainer){
      _isExpanded_bottomContainer = false;
      _expandContractButton.innerText = '+';
      _bottomContainer.classList.remove(_classes.mixins.maxHeightAuto);
      _bottomContainer.classList.add(_classes.animations.heightContract);
    }
  }
  function _handleClick_deleteProject(e){
    if(_isExpanded_bottomContainer){
      _isExpanded_bottomContainer = false;
      _expandContractButton.innerText = '+';
      _bottomContainer.classList.remove(_classes.mixins.maxHeightAuto);
      _bottomContainer.classList.add(_classes.animations.heightContract);
      _bottomContainer.addEventListener('animationend', (e)=>{
        const {animationName} = e;
        if(animationName === 'heightContract'){
          _slideOutAndContract();
        }
      }, {once: true})
    } else {
      _slideOutAndContract();
    }
    Publisher.publish('deleteProject', {id: _id});
    function _slideOutAndContract(){
      _self.classList.add(_classes.animations.slideOutAndContract)
    }
  }
  function _handleClick_toDisplayCheckBox(e){
    const {checked} = e.target
    if(checked){
      controller.publish(`showProject`, {projectID: _id}); // Listeners: index(state)
    } else {
      controller.publish(`hideProject`, {projectID: _id}); // Listeners: index(state)
    }
  }
  function _onProjectEdit(args){
    project = args.project;
    _update(project);
  }
  function _update(project){
    const projectID = project.getID();
    const projectName = project.getName();
    const projectIconPath = IconMap[project.getIconName()];
    const projectColor = project.getColor();
    _id = projectID;

    if(_color !== projectColor){
      _infoContainer.classList.remove(_classes.mixins.imgColors[_color])
      _color = projectColor;
      _infoContainer.classList.add(_classes.mixins.imgColors[_color]);
    }
    
    _projectIMG.src = projectIconPath;
    _projectIMG.alt = `${projectName} icon`;
    _title.innerText = projectName;
    _updatePrioNotices({project});
  }
  function _updatePrioNotices(args){
    const {project} = args;
    const projectNumPrios = project.getNumPrios();
    if(projectNumPrios.high > 0){
      _noticeHighPrio.classList.remove(_classes.mixins.hidden);
      _noticeHighPrio.innerText = projectNumPrios.high;
    }
    else {
      _noticeHighPrio.classList.add(_classes.mixins.hidden);
      _noticeHighPrio.innerText = projectNumPrios.high;
    }
    if(projectNumPrios.med > 0){
      _noticeMedPrio.classList.remove(_classes.mixins.hidden);
      _noticeMedPrio.innerText = projectNumPrios.med;
    }
    else {
      _noticeMedPrio.classList.add(_classes.mixins.hidden);
      _noticeMedPrio.innerText = projectNumPrios.med;
    }
    if(projectNumPrios.low > 0){
      _noticeLowPrio.classList.remove(_classes.mixins.hidden);
      _noticeLowPrio.innerText = projectNumPrios.low;
    }
    else {
      _noticeLowPrio.classList.add(_classes.mixins.hidden);
      _noticeLowPrio.innerText = projectNumPrios.low;
    }

  }
}
export default ProjectListItem;