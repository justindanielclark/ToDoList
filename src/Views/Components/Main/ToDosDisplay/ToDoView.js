import editToDoModal from "../../Modals/EditToDoModal";
import IconMap from "../../../../Assets/IconMap";
import edit from "../../../../Assets/SVGs/UI/edit.svg";
import trash from "../../../../Assets/SVGs/UI/trash.svg";
const ToDoView = (root, controller, toDo, project) => {
  //*Tailwind CSS Setup
  const _classes = {
    base: {
      self: 'flex flex-col w-64 overflow-hidden mr-4',
      topContainer: 'flex flex-row items-baseline relative h-5 flex-initial',
      bottomContainer: 'ml-6 relative rounded-md flex-auto',
      prioNotice: 'w-3 h-3 rounded-full -translate-y-full z-30',
      projectImgContainer: 'w-8 h-8 rounded-full z-20',
      projectIconImg: 'p-1',
      viewDueDate: 'text-xs pl-2 -translate-y-full',
      viewTitle: 'text-lg font-bold py-1 pl-2 flex-initial rounded-lg',
      viewNote: 'px-2 text-xs break-words',
      viewNotes: 'list-inside overflow-y-auto max-h-40 flex-auto basis-auto mx-1',
      toDoViewControl: 'h-6 w-6 p-1 bg-slate-800 hover:bg-slate-700 active:bg-slate-500 rounded-lg transition-colors duration-100',
      toDoViewControls: 'flex flex-row grow justify-end -translate-y-2/3'
    },
    mixins: {
      prioBackgroundColor: {
        high: 'bg-red-500',
        med: 'bg-yellow-500',
        low: 'bg-green-500'
      },
      colors: {
        stone: {
          titleBackgroundColor: 'bg-stone-900',
          backgroundColorLight: 'bg-stone-200',
          backgroundColorLightAlt: 'bg-stone-300',
          textColorLight: 'text-stone-100',
          textColorDark: 'text-stone-900',
          backgroundIconImg: 'bg-stone-300',
        },
        red: {
          titleBackgroundColor: 'bg-red-900',
          backgroundColorLight: 'bg-red-200',
          backgroundColorLightAlt: 'bg-red-300',
          textColorLight: 'text-red-100',
          textColorDark: 'text-red-900',
          backgroundIconImg: 'bg-red-300',
        },
        orange: {
          titleBackgroundColor: 'bg-orange-900',
          backgroundColorLight: 'bg-orange-200',
          backgroundColorLightAlt: 'bg-orange-300',
          textColorLight: 'text-orange-100',
          textColorDark: 'text-orange-900',
          backgroundIconImg: 'bg-orange-300',
        },
        amber: {
          titleBackgroundColor: 'bg-amber-900',
          backgroundColorLight: 'bg-amber-200',
          backgroundColorLightAlt: 'bg-amber-300',
          textColorLight: 'text-amber-100',
          textColorDark: 'text-amber-900',
          backgroundIconImg: 'bg-amber-300',
        },
        yellow: {
          titleBackgroundColor: 'bg-yellow-900',
          backgroundColorLight: 'bg-yellow-200',
          backgroundColorLightAlt: 'bg-yellow-300',
          textColorLight: 'text-yellow-100',
          textColorDark: 'text-yellow-900',
          backgroundIconImg: 'bg-yellow-300',
        },
        lime: {
          titleBackgroundColor: 'bg-lime-900',
          backgroundColorLight: 'bg-lime-200',
          backgroundColorLightAlt: 'bg-lime-300',
          textColorLight: 'text-lime-100',
          textColorDark: 'text-lime-900',
          backgroundIconImg: 'bg-lime-300',
        },
        green: {
          titleBackgroundColor: 'bg-green-900',
          backgroundColorLight: 'bg-green-200',
          backgroundColorLightAlt: 'bg-green-300',
          textColorLight: 'text-green-100',
          textColorDark: 'text-green-900',
          backgroundIconImg: 'bg-green-300',
        },
        emerald: {
          titleBackgroundColor: 'bg-emerald-900',
          backgroundColorLight: 'bg-emerald-200',
          backgroundColorLightAlt: 'bg-emerald-300',
          textColorLight: 'text-emerald-100',
          textColorDark: 'text-emerald-900',
          backgroundIconImg: 'bg-emerald-300',
        },
        teal: {
          titleBackgroundColor: 'bg-teal-900',
          backgroundColorLight: 'bg-teal-200',
          backgroundColorLightAlt: 'bg-teal-300',
          textColorLight: 'text-teal-100',
          textColorDark: 'text-teal-900',
          backgroundIconImg: 'bg-teal-300',
        },
        rose: {
          titleBackgroundColor: 'bg-rose-900',
          backgroundColorLight: 'bg-rose-200',
          backgroundColorLightAlt: 'bg-rose-300',
          textColorLight: 'text-rose-100',
          textColorDark: 'text-rose-900',
          backgroundIconImg: 'bg-rose-300',
        },
        pink: {
          titleBackgroundColor: 'bg-pink-900',
          backgroundColorLight: 'bg-pink-200',
          backgroundColorLightAlt: 'bg-pink-300',
          textColorLight: 'text-pink-100',
          textColorDark: 'text-pink-900',
          backgroundIconImg: 'bg-pink-300',
        },
        fuchsia: {
          titleBackgroundColor: 'bg-fuchsia-900',
          backgroundColorLight: 'bg-fuchsia-200',
          backgroundColorLightAlt: 'bg-fuchsia-300',
          textColorLight: 'text-fuchsia-100',
          textColorDark: 'text-fuchsia-900',
          backgroundIconImg: 'bg-fuchsia-300',
        },
        purple: {
          titleBackgroundColor: 'bg-purple-900',
          backgroundColorLight: 'bg-purple-200',
          backgroundColorLightAlt: 'bg-purple-300',
          textColorLight: 'text-purple-100',
          textColorDark: 'text-purple-900',
          backgroundIconImg: 'bg-purple-300',
        },
        violet: {
          titleBackgroundColor: 'bg-violet-900',
          backgroundColorLight: 'bg-violet-200',
          backgroundColorLightAlt: 'bg-violet-300',
          textColorLight: 'text-violet-100',
          textColorDark: 'text-violet-900',
          backgroundIconImg: 'bg-violet-300',
        },
        indigo: {
          titleBackgroundColor: 'bg-indigo-900',
          backgroundColorLight: 'bg-indigo-200',
          backgroundColorLightAlt: 'bg-indigo-300',
          textColorLight: 'text-indigo-100',
          textColorDark: 'text-indigo-900',
          backgroundIconImg: 'bg-indigo-300',
        },
        blue: {
          titleBackgroundColor: 'bg-blue-900',
          backgroundColorLight: 'bg-blue-200',
          backgroundColorLightAlt: 'bg-blue-300',
          textColorLight: 'text-blue-100',
          textColorDark: 'text-blue-900',
          backgroundIconImg: 'bg-blue-300',
        },
        sky: {
          titleBackgroundColor: 'bg-sky-900',
          backgroundColorLight: 'bg-sky-200',
          backgroundColorLightAlt: 'bg-sky-300',
          textColorLight: 'text-sky-100',
          textColorDark: 'text-sky-900',
          backgroundIconImg: 'bg-sky-300',
        },
        cyan: {
          titleBackgroundColor: 'bg-cyan-900',
          backgroundColorLight: 'bg-cyan-200',
          backgroundColorLightAlt: 'bg-cyan-300',
          textColorLight: 'text-cyan-100',
          textColorDark: 'text-cyan-900',
          backgroundIconImg: 'bg-cyan-300',
        },
      },
      showing: 'max-h-64 mb-4 pt-4',
      hiding: 'max-h-0 mb-0 pt-0',
    },
    animations: {
      expandAndFadeIn: 'animate-expandAndFadeIn',
      contractAndFadeOut: 'animate-contractAndFadeOut',
    }
  }
  //*Data Variables
  let _projectID = project.getID();
  let _color = project.getColor()
  let _projectIcon = project.getIconName()
  let _toDoID = toDo.getID();
  let _title = toDo.getTitle();
  let _dueDate = toDo.getDueDate();
  let _priority = toDo.getPriority();
  let _notes = toDo.getNotes();

  //*Controller Setup
  const Subscription = controller.Subscription;
  const Subscriber = controller.subscriberWrapper({});
  const Publisher = controller.publisherWrapper({});
  const ProjectSubscriptions = [
    new Subscription(`projectDeleted_${_projectID}`, _on_projectDeleted),
    new Subscription(`projectEdited_${_projectID}`, _on_projectEdited),
    new Subscription(`projectHidden_${_projectID}`, _on_projectHidden),
    new Subscription(`projectShown_${_projectID}`, _on_projectShown)
  ];
  Subscriber.subscribe(
    new Subscription(`toDoEdited_${_toDoID}`, _on_toDoEdit),
    ...ProjectSubscriptions,
  )
  //*DOM Creation
  const _self = document.createElement('li');
    _self.className = [_classes.base.self, _classes.animations.expandAndFadeIn].join(' ');
    _self.addEventListener('animationend', _handleAnimationEnd);
  const _topContainer = document.createElement('div');
    _topContainer.className = _classes.base.topContainer;
    const _projectImgContainer = document.createElement('div');
    _projectImgContainer.className = _classes.base.projectImgContainer;
      const _projectIconImg = document.createElement('img');
        _projectIconImg.className = _classes.base.projectIconImg;
    _projectImgContainer.append(_projectIconImg)
    const _viewDueDate = document.createElement('p');
      _viewDueDate.className = _classes.base.viewDueDate;
    const _prioNotice = document.createElement('div');
      _prioNotice.className = _classes.base.prioNotice;
    const _toDoViewControls = document.createElement('div');
    _toDoViewControls.className = _classes.base.toDoViewControls;
      const _toDoViewControl_edit = document.createElement('button');
      _toDoViewControl_edit.className = _classes.base.toDoViewControl;
      _toDoViewControl_edit.addEventListener('click', _handleClick_EditButton);
        const _toDoViewControl_edit_img = document.createElement('img');
        _toDoViewControl_edit_img.src = edit;
        _toDoViewControl_edit_img.alt = 'edit_icon';
      _toDoViewControl_edit.append(_toDoViewControl_edit_img);
      const _toDoViewControl_delete = document.createElement('button');
      _toDoViewControl_delete.className = _classes.base.toDoViewControl;
      _toDoViewControl_delete.addEventListener('click', _handleClick_DeleteButton);
        const _toDoViewControl_delete_img = document.createElement('img');
        _toDoViewControl_delete_img.src = trash;
        _toDoViewControl_delete_img.alt = 'trash_icon';
      _toDoViewControl_delete.append(_toDoViewControl_delete_img);
    _toDoViewControls.append(_toDoViewControl_edit, _toDoViewControl_delete);
  _topContainer.append(_projectImgContainer, _prioNotice, _viewDueDate, _toDoViewControls);
  const _bottomContainer = document.createElement('div');
    _bottomContainer.className = _classes.base.bottomContainer;
    const _viewTitle = document.createElement('h3');
      _viewTitle.className = _classes.base.viewTitle;
    const _viewNotes = document.createElement('ul');
      _viewNotes.className = _classes.base.viewNotes;
  _bottomContainer.append(_viewTitle, _viewNotes);
  //*DOM Value Initialization
  _projectIconImg.src = IconMap[_projectIcon];
  _projectIconImg.alt = `icon_${_projectIcon}`;
  _viewNotes.classList.add(_classes.mixins.colors[_color].backgroundColorLight);
  _viewTitle.classList.add(_classes.mixins.colors[_color].titleBackgroundColor);
  _viewTitle.classList.add(_classes.mixins.colors[_color].textColorLight);
  _viewDueDate.classList.add(_classes.mixins.colors[_color].textColorLight);
  _projectImgContainer.classList.add(_classes.mixins.colors[_color].backgroundIconImg);
  _prioNotice.classList.add(_classes.mixins.prioBackgroundColor[_priority]);

  _update(toDo, project);
  _self.append(_topContainer, _bottomContainer);
  root.append(_self);
  //*Closure Functions
  function _handleAnimationEnd(event){
    const {animationName} = event;
    if(animationName === 'expandAndFadeIn'){
      _self.classList.add(..._classes.mixins.showing.split(' '));
      _self.classList.remove(..._classes.mixins.hiding.split(' '));
      _self.classList.remove(_classes.animations.expandAndFadeIn);
    }
    if(animationName === 'contractAndFadeOut'){
      _self.classList.add(..._classes.mixins.hiding.split(' '));
      _self.classList.remove(..._classes.mixins.showing.split(' '));
      _self.classList.remove(_classes.animations.contractAndFadeOut);
    }
  }
  function _handleClick_EditButton(event){
    editToDoModal(document.body, controller, toDo, project);
  }
  function _handleClick_DeleteButton(event){
    _destroy(true);
  }
  function _on_toDoEdit(args){
    const {toDo, project} = args;
    while(ProjectSubscriptions.length > 0){
      Subscriber.unsubscribe(ProjectSubscriptions.pop());
    }
    ProjectSubscriptions.push(
      new Subscription(`projectDeleted_${project.getID()}`, _on_projectDeleted),
      new Subscription(`projectEdited_${project.getID()}`, _on_projectEdited),
      new Subscription(`projectHidden_${project.getID()}`, _on_projectHidden),
      new Subscription(`projectShown_${project.getID()}`, _on_projectShown)
    )
    Subscriber.subscribe(...ProjectSubscriptions);
    _update(toDo, project);
  }
  function _on_projectDeleted(args){
    _destroy(false);
  }
  function _on_projectEdited(args){
    const {project} = args;
    _update(toDo, project);
  }
  function _on_projectHidden(args){
    _hide();
  }
  function _on_projectShown(args){
    _show();
  }
  function _hide(){
    _self.classList.add(_classes.animations.contractAndFadeOut);
  }
  function _show(){
    _self.classList.add(_classes.animations.expandAndFadeIn);
  }
  function _destroy(isFromToDoDeleteClick){
    Subscriber.unsubscribeAll();
    _self.removeEventListener('animationend', _handleAnimationEnd);
    _toDoViewControl_edit.removeEventListener('click', _handleClick_EditButton);
    _toDoViewControl_delete.removeEventListener('click', _handleClick_DeleteButton);
    if(_self.classList.contains(_classes.mixins.showing.split(' ')[0])){
      _self.classList.add(_classes.animations.contractAndFadeOut);
      _self.addEventListener('animationend', function(event){
        const {animationName} = event;
        if(animationName === 'contractAndFadeOut'){
          if(isFromToDoDeleteClick){
            Publisher.publish('deleteToDo', {toDoID: _toDoID, projectID: _projectID});
          }
          root.removeChild(_self);
        }
      }, {once: true})
    } else {
      if(isFromToDoDeleteClick){
        Publisher.publish('deleteToDo', {toDoID: _toDoID, projectID: _projectID});
      }
      root.removeChild(_self);
    }
    
  }
  function _update(updateToDo, updateProject){
    [toDo, project] = [updateToDo, updateProject];
    _projectID = toDo.getProjectID();
    _toDoID = toDo.getID();
    _title = toDo.getTitle();
    _dueDate = toDo.getDueDate();
    //Set IconImg
    if(_projectIcon !== project.getIconName()){
      _projectIcon = project.getIconName();
      _projectIconImg.src = IconMap[_projectIcon];
      _projectIconImg.alt = `icon_${_projectIcon}`;
    }
    //Set Color
    if(_color !== project.getColor()){
      _viewNotes.classList.remove(_classes.mixins.colors[_color].backgroundColorLight);
      _viewTitle.classList.remove(_classes.mixins.colors[_color].titleBackgroundColor);
      _viewTitle.classList.remove(_classes.mixins.colors[_color].textColorLight);
      _viewDueDate.classList.remove(_classes.mixins.colors[_color].textColorLight);
      _projectImgContainer.classList.remove(_classes.mixins.colors[_color].backgroundIconImg);
      _color = project.getColor();
      _viewNotes.classList.add(_classes.mixins.colors[_color].backgroundColorLight);
      _viewTitle.classList.add(_classes.mixins.colors[_color].titleBackgroundColor);
      _viewTitle.classList.add(_classes.mixins.colors[_color].textColorLight);
      _viewDueDate.classList.add(_classes.mixins.colors[_color].textColorLight);
      _projectImgContainer.classList.add(_classes.mixins.colors[_color].backgroundIconImg);
    }
    //Set Priority
    if(_priority !== toDo.getPriority()){
      _prioNotice.classList.remove(_classes.mixins.prioBackgroundColor[_priority]);
      _priority = toDo.getPriority();
      _prioNotice.classList.add(_classes.mixins.prioBackgroundColor[_priority]);
    }
    //Set Title/Due Date Text
    _viewTitle.innerText = _title;
    _viewDueDate.innerText = `${_dueDate.getMonth()+1}/${_dueDate.getDate()+1}/${_dueDate.getFullYear()}`;
    //Set Notes
    _notes = toDo.getNotes();
    while(_viewNotes.lastChild){
      _viewNotes.removeChild(_viewNotes.lastChild);
    }
    _notes.forEach((note, i) => {
      const _viewNote = document.createElement('li');
      _viewNote.className = _classes.base.viewNote;
      if(i%2==0){
        _viewNote.classList.add(_classes.mixins.colors[_color].backgroundColorLight)
      }else{
        _viewNote.classList.add(_classes.mixins.colors[_color].backgroundColorLightAlt)
      }
      _viewNote.innerText = note;
      _viewNotes.append(_viewNote);
    })
  }
}
export default ToDoView;