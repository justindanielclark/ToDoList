'use strict';
import _classes from "./_cssModal";
const newToDoModal = (root, controller, toDo, project) => {
  const Subscriber = controller.subscriberWrapper({});
  const Subscription = controller.Subscription;
  const Publisher = controller.publisherWrapper({});
  let projects;
  Subscriber.subscribe(
    new Subscription('newToDoModal_getProjects', (returnedProjects)=>{
      projects = Array.from(returnedProjects.values());
    })
  )
  Publisher.publish('getProjects', {subscription: 'newToDoModal_getProjects'})
  //*Closure Utility Variables
  let _chosenColor = project.getColor();
  let _checkedPriority = toDo.getPriority();
  const _priorities = [
    {text: 'High', val: 'high', color: 'red'},
    {text: 'Medium', val: 'med', color: 'yellow'},
    {text: 'Low', val: 'low', color: 'green'}
  ];
  //*DOM Creation
  const _modal = document.createElement('div');
    _modal.className = _classes.base.modal;
  const _modalScreen = document.createElement('div');
    _modalScreen.className = [_classes.base.modalScreen, _classes.animations.fadeIn].join(' ');
  const _modalForm = document.createElement('div');
    _modalForm.className = _classes.base.modalForm;
    switch(Math.floor(Math.random()*4)){
      case 0: {
        _modalForm.classList.add(_classes.animations.slideInTop);
        break;
      }
      case 1: {
        _modalForm.classList.add(_classes.animations.slideInRight);
        break;
      }
      case 2: {
        _modalForm.classList.add(_classes.animations.slideInBottom);
        break;
      }
      case 3: {
        _modalForm.classList.add(_classes.animations.slideInLeft);
        break;
      }
    }
  //Title
  const _modalTitle = document.createElement('h1');
    _modalTitle.innerText = `Edit ToDo: ${toDo.getTitle()}`;
    _modalTitle.className = _classes.base.modalTitle;
  //Project Input Group
  const _projectInputGroup = document.createElement('div');
    _projectInputGroup.className = _classes.base.inputGroup;
  const _projectInputGroupLabel = document.createElement('label');
    _projectInputGroupLabel.innerText = 'Project:';
    _projectInputGroupLabel.className = _classes.base.label;
    _projectInputGroupLabel.htmlFor = 'projectName';
    _projectInputGroupLabel.id = 'newToDoModal_Project_Label';
  const _projectInputGroupOptions = [];
  const _projectInputGroupSelect = document.createElement('select');
  _projectInputGroupSelect.className = _classes.base.select;
    projects.forEach(project => {
      const _projectInputGroupOption = document.createElement('option');
      _projectInputGroupOption.className = "transition-colors";
      _projectInputGroupOption.innerText = project.getName();
      _projectInputGroupOption.value = project.getID();
      _projectInputGroupOption.dataset.project = project.getID()
      _projectInputGroupOption.dataset.color = project.getColor();
      _projectInputGroupSelect.append(_projectInputGroupOption);
      _projectInputGroupOptions.push(_projectInputGroupOption);
    })
  _projectInputGroupSelect.value = project.getID();
  _projectInputGroupSelect.addEventListener('change', _handleChange_projectSelect);
  _projectInputGroup.append(_projectInputGroupLabel, _projectInputGroupSelect);
  //To Do Name Group
  const _nameInputGroup = document.createElement('div');
    _nameInputGroup.className = _classes.base.inputGroup;
  const _nameInputGroupLabel = document.createElement('label');
    _nameInputGroupLabel.innerText = 'Name:';
    _nameInputGroupLabel.id = 'newToDoModal_Name_Label';
    _nameInputGroupLabel.htmlFor = 'toDoName';
    _nameInputGroupLabel.className = _classes.base.label;
  const _nameInputGroupTextInput = document.createElement('input');
    _nameInputGroupTextInput.type = 'text';
    _nameInputGroupTextInput.name = 'toDoName';
    _nameInputGroupTextInput.maxLength = 20;
    _nameInputGroupTextInput.className = _classes.base.input;
    _nameInputGroupTextInput.value = toDo.getTitle();
    _nameInputGroupTextInput.placeholder = "Enter a Todo Name";
  _nameInputGroup.append(_nameInputGroupLabel, _nameInputGroupTextInput);
  //Due Date Input Group
  const _dueDateInputGroup = document.createElement('div');
    _dueDateInputGroup.id = 'newToDoModal_DueDate_InputGroup'
    _dueDateInputGroup.className = _classes.base.inputGroup;
  const _dueDateInputGroupLabel = document.createElement('label');
    _dueDateInputGroupLabel.innerText = 'Due Date:';
    _dueDateInputGroupLabel.id = 'newToDoModal_DueDate_Label';
    _dueDateInputGroupLabel.htmlFor = 'toDoDueDate';
    _dueDateInputGroupLabel.className = _classes.base.label;
  const _dueDateInputGroupInput = document.createElement('input');
    _dueDateInputGroupInput.type = 'date';
    _dueDateInputGroupInput.name = 'toDoDueDate';
    _dueDateInputGroupInput.className = _classes.base.input;
    _dueDateInputGroupInput.value = toDo.getDueDate().toISOString().split("T")[0];
  _dueDateInputGroup.append(_dueDateInputGroupLabel, _dueDateInputGroupInput);
  //Priority Input Group
  const _priorityInputGroup = document.createElement('div');
    _priorityInputGroup.id = 'newToDoModal_Priority_InputGroup';
    _priorityInputGroup.className = _classes.base.inputGroup;
  const _priorityInputGroupLabel = document.createElement('p');
    _priorityInputGroupLabel.innerText = 'Priority:';
    _priorityInputGroupLabel.id = "newToDoModal_Priority_Label";
    _priorityInputGroupLabel.className = _classes.base.label;
  const _priorityInputGroupRadioContainer = document.createElement('div');
    _priorityInputGroupRadioContainer.id = 'newToDoModal_Priority_RadioContainer';
    _priorityInputGroupRadioContainer.className = _classes.base.prioContainer;
  const _radioButtons = [];
  _priorities.forEach(priority => {
    const {text, val/*, color*/} = priority;
    const id = `priority_${val}`;
    const priorityLabel = document.createElement('label');
    priorityLabel.htmlFor = id;
    priorityLabel.className = _classes.base.prioLabel;
    const prioritySpan = document.createElement('span');
    prioritySpan.innerText = text;
    prioritySpan.className = _classes.mixins.flex1;
    const priorityRadio = document.createElement('input');
    priorityRadio.type = 'radio';
    priorityRadio.name = 'priority';
    priorityRadio.value = val;
    priorityRadio.id = id;
    priorityRadio.className = [_classes.mixins.peer, _classes.mixins.srOnly].join(' ')
    priorityRadio.addEventListener('click', _handleClick_PriorityRadio);
    _radioButtons.push(priorityRadio);
    if(val === _checkedPriority){
      priorityRadio.checked = true;
    }
    const priorityColorFlag = document.createElement('div');
    priorityColorFlag.className = [
      _classes.base.prioButton, 
      _classes.mixins.prioButtons.backgroundColor[val], 
      _classes.mixins.prioButtons.borderColor[val]
    ].join(' ');
    priorityLabel.append(prioritySpan, priorityRadio, priorityColorFlag,);
    _priorityInputGroupRadioContainer.append(priorityLabel);
  })
  _priorityInputGroup.append(_priorityInputGroupLabel, _priorityInputGroupRadioContainer);
  //Note Input Group
  const _notesInputGroup = document.createElement('div');
    _notesInputGroup.id = 'newToDoModal_Notes_InputGroup';
    _notesInputGroup.className = _classes.base.inputGroup;
  const _notesInputGroupLabel = document.createElement('label');
    _notesInputGroupLabel.innerText = 'Notes:';
    _notesInputGroupLabel.id = 'newToDoModal_Notes_Label';
    _notesInputGroupLabel.htmlFor = 'toDoNotes';
    _notesInputGroupLabel.className = _classes.base.label;
  const _notesContainer = document.createElement('div');
    _notesContainer.id = 'newToDoModal_Notes_Container';
    _notesContainer.className = _classes.base.notesContainer;
  const _notesContainerControls = document.createElement('div');
    _notesContainerControls.className = 'flex flex-row';
  const _notesTextArea = document.createElement('textarea');
    _notesTextArea.id = 'newToDoModal_Notes_TextArea';
    _notesTextArea.className = [_classes.base.notesTextArea, _classes.mixins.notesTextAreaTextColor[_chosenColor]].join(' ');
    _notesTextArea.rows = '3';
  const _addNoteButton = document.createElement('button');
    _addNoteButton.innerText = "+";
    _addNoteButton.className = [_classes.base.noteButton, _classes.mixins.accept].join(' ');
    _addNoteButton.addEventListener('click', _handleClick_addNoteButton);
  const _removeNoteButton = document.createElement('button');
    _removeNoteButton.innerText = "-";
    _removeNoteButton.className = [_classes.base.noteButton, _classes.mixins.cancel].join(' ');
    _removeNoteButton.addEventListener('click', _handleClick_removeNoteButton);
  _notesContainerControls.append(_removeNoteButton, _addNoteButton);
  const _notesList = document.createElement('ul');
    _notesList.className = _classes.base.notesList;
    _notesList.id = 'newToDoModal_Notes_List';
  toDo.getNotes().forEach(note=>{
    const noteListItem = document.createElement('li');
    if(_notesList.children.length % 2 === 0){
      noteListItem.className =  [`bg-${_chosenColor}-300`, _classes.base.note].join(' ');
    } else {
      noteListItem.className = [`bg-${_chosenColor}-200`, _classes.base.note].join(' ');
    }
    noteListItem.innerText = note;
    _notesList.append(noteListItem);
  })
  _notesContainer.append(_notesList, _notesTextArea, _notesContainerControls);
  _notesInputGroup.append(_notesInputGroupLabel, _notesContainer);
  //Control Input Group
  const _controlsInputGroup = document.createElement('div');
    _controlsInputGroup.id = 'newProjectModal_ControlsGroup';
    _controlsInputGroup.className = _classes.base.buttonGroup;
  const _controlsInputGroupCancelButton = document.createElement('button');
    _controlsInputGroupCancelButton.innerText = 'Cancel';
    _controlsInputGroupCancelButton.id = 'newProjectModal_ControlsGroup_CancelButton';
    _controlsInputGroupCancelButton.className = [_classes.base.button, _classes.mixins.cancel].join(' ');
    _controlsInputGroupCancelButton.addEventListener('click', _handleClick_CancelButton);
  const _controlsInputGroupAcceptButton = document.createElement('button');
    _controlsInputGroupAcceptButton.innerText = 'Accept';
    _controlsInputGroupAcceptButton.id = 'newProjectModal_ControlsGroup_AcceptButton';
    _controlsInputGroupAcceptButton.className = [_classes.base.button, _classes.mixins.accept].join(' ');
    _controlsInputGroupAcceptButton.addEventListener('click', _handleClick_AcceptButton);
  _controlsInputGroup.append(_controlsInputGroupCancelButton, _controlsInputGroupAcceptButton);
  //DOM Creation
  _modalForm.append(_modalTitle, _projectInputGroup, _nameInputGroup, _dueDateInputGroup, _priorityInputGroup, _notesInputGroup, _controlsInputGroup);
  _modal.append(_modalScreen, _modalForm)
  //*Color Management
  const _DarkColoredElements = [
    _projectInputGroup,
    _projectInputGroupLabel,
    _nameInputGroup,
    _nameInputGroupLabel,
    _priorityInputGroup,
    _priorityInputGroupLabel,
    _dueDateInputGroup,
    _dueDateInputGroupLabel,
    _notesInputGroup,
    _notesInputGroupLabel
  ]
  const _HighlightColoredElements = [
    _nameInputGroupTextInput,
    _projectInputGroupSelect,
    ..._projectInputGroupOptions,
    _priorityInputGroupRadioContainer,
    _dueDateInputGroupInput,
    _notesContainer,
    
  ];
  const _LightColoredElements = [
    _notesTextArea
  ];
  _setModalColors(_chosenColor, _chosenColor);
  //*Cleanup Animation Classes After Animation Completion
  _modalScreen.addEventListener('animationend', _handleAnimationEnd_ModalScreen_FadeIn, {once: true});
  _modalForm.addEventListener('animationend', _handleAnimationEnd_ModalForm_SlideIn, {once: true});
  //*Prepend Modal
  root.prepend(_modal);

  function _setModalColors(oldColor, newColor){
    const oldTextAreaTextClass = `text-${oldColor}-900`;
    const newTextAreaTextClass = `text-${newColor}-900`;
    const oldNoteLightClass = `bg-${oldColor}-200`;
    const oldNoteDarkClass = `bg-${oldColor}-300`;
    const newNoteLightClass = `bg-${newColor}-200`;
    const newNoteDarkClass = `bg-${newColor}-300`;

    _notesTextArea.classList.remove(oldTextAreaTextClass);
    _notesTextArea.classList.add(newTextAreaTextClass);
    Array.from(_notesList.children).forEach(note=>{
      if(note.classList.contains(oldNoteLightClass)){
        note.classList.remove(oldNoteLightClass);
        note.classList.add(newNoteLightClass);
      }
      else {
        note.classList.remove(oldNoteDarkClass);
        note.classList.add(newNoteDarkClass);
      }
    })

    _DarkColoredElements.forEach(element => {
      setElementBackgroundColor(element, oldColor, newColor, 900);
    });
    _HighlightColoredElements.forEach(element => {
      setElementBackgroundColor(element, oldColor, newColor, 800);
    });
    _LightColoredElements.forEach(element => {
      setElementBackgroundColor(element, oldColor, newColor, 100);
    })
    function setElementBackgroundColor(element, oldColor, newColor, colorNum){
      const oldClass = `bg-${oldColor}-${colorNum}`;
      const newClass = `bg-${newColor}-${colorNum}`;
      element.classList.remove(oldClass);
      element.classList.add(newClass);
    }
  }
  function _handleAnimationEnd_ModalForm_SlideIn(event){
    const {animationName} = event;
    if(this === event.target && (animationName === 'slideInTop' || animationName === 'slideInRight' || animationName === 'slideInBottom' || animationName === 'slideInLeft')){
      _modalForm.classList.remove(_classes.animations.slideInBottom, _classes.animations.slideInLeft, _classes.animations.slideInRight, _classes.animations.slideInTop);
    }
  }
  function _handleAnimationEnd_ModalScreen_FadeIn(event){
    const {animationName} = event;
    if(animationName === 'fadeIn' && this === event.target){
      _modalScreen.classList.remove(_classes.animations.fadeIn);
    }
  }
  function _handleClick_AcceptButton(){
    const projectID = _projectInputGroupSelect.selectedOptions[0].dataset.project;
    const toDoName = _nameInputGroupTextInput.value;
    const dueDate = _dueDateInputGroupInput.value;
    const priority = _checkedPriority;
    const notes = [];
    Array.from(_notesList.children).forEach(note=>{
      notes.push(note.innerText)
    })
    if(!projectID || !toDoName || !dueDate || !priority){
      //TODO
      console.log('Not Today Zerg!');
    } else {
      Publisher.publish(`editToDo`, {toDo, projectID, toDoName, dueDate, priority, notes});
      _destroy();
    }
  }
  function _handleClick_addNoteButton(){
    const text = _notesTextArea.value;
    if(text !== ""){
      const noteListItem = document.createElement('li');
      if(_notesList.children.length % 2 === 0){
        noteListItem.className =  [`bg-${_chosenColor}-300`, _classes.base.note].join(' ');
      } else {
        noteListItem.className = [`bg-${_chosenColor}-200`, _classes.base.note].join(' ');
      }
      noteListItem.innerText = _notesTextArea.value;
      _notesTextArea.value = "";
      _notesList.append(noteListItem);
    }
  }
  function _handleClick_CancelButton(){
    _destroy();
  }
  function _handleClick_removeNoteButton(){
    if(_notesList.lastChild){
      _notesList.removeChild(_notesList.lastChild);
    }
  }
  function _handleClick_PriorityRadio(){
    _checkedPriority = this.value;
  }
  function _handleChange_projectSelect(event){
    const newColor = event.target.children[event.target.selectedIndex].dataset.color;
    _setModalColors(_chosenColor, newColor);
    _chosenColor = newColor;
  }
  function _destroy(){
    //Remove all remaining event listeners (animations ones are removed after once playthrough)
    _projectInputGroupSelect.removeEventListener('change', _handleChange_projectSelect);
    _addNoteButton.removeEventListener('click', _handleClick_addNoteButton);
    _removeNoteButton.removeEventListener('click', _handleClick_removeNoteButton);
    _controlsInputGroupAcceptButton.removeEventListener('click', _handleClick_AcceptButton);
    _controlsInputGroupCancelButton.removeEventListener('click', _handleClick_CancelButton);
    _radioButtons.forEach(radio=>{
      radio.removeEventListener('click', _handleClick_PriorityRadio);
    })
    //Remove all subscriptions
    Subscriber.unsubscribeAll();
    //Trigger Leaving Animation, Modal removes itself from the DOM upon completion of Animation
    _modalScreen.classList.add(_classes.animations.fadeOut);
    switch(Math.floor(Math.random()*4)){
      case 0: {
        _modalForm.classList.add(_classes.animations.slideOutTop);
        break;
      }
      case 1: {
        _modalForm.classList.add(_classes.animations.slideOutRight);
        break;
      }
      case 2: {
        _modalForm.classList.add(_classes.animations.slideOutBottom);
        break;
      }
      case 3: {
        _modalForm.classList.add(_classes.animations.slideOutLeft);
        break;
      }
    }
    _modalForm.addEventListener('animationend', (e)=>{
      const {animationName} = e;
      if (animationName === 'slideOutTop' || animationName === 'slideOutRight' || animationName === 'slideOutBottom' || animationName === 'slideOutLeft'){
        root.removeChild(_modal);
      }
    }, {once: true})
  }
}

export default newToDoModal;