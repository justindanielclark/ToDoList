'use strict';
import '../Styles/index.css';
import PossibleColors from '../../../Models/PossibleColors.js';

const newToDoModal = (props) => {
  const {projects, createToDo, updateAside, updateSection} = props;
  
  let chosenColor = projects[0].getColor();
  const priorities = [
    {text: 'High', val: 'high', color: 'red'},
    {text: 'Medium', val: 'med', color: 'yellow'},
    {text: 'Low', val: 'low', color: 'green'}
  ];
  let checkedPriority = 'low';

  const modal = document.createElement('div');
  modal.className = 'w-screen h-screen absolute flex flex-col items-center justify-center z-40'

  const modalScreen = document.createElement('div');
  modalScreen.className = 'w-full h-full opacity-90 bg-stone-800 animate-fadeIn'

  const modalForm = document.createElement('div');
    modalForm.id = 'newToDoModal';
    modalForm.className = 'flex flex-col rounded-md shadow-md shadow-slate-900 w-80 absolute opacity-100 z-50 animate-slideInRight';
  const modalTitle = document.createElement('h1');
    modalTitle.id = 'newToDoModal_Title';
    modalTitle.innerText = 'Create New ToDo';
    modalTitle.className = 'text-base font-bold px-1 py-2 bg-stone-700 text-neutral-50 rounded-t-lg border-b-2 border-b-stone-100';

  const projectInputGroup = document.createElement('div');
    projectInputGroup.id = 'newToDoModal_Project_InputGroup';
    projectInputGroup.className = 'flex flex-row items-center border-b-2 border-b-stone-100 transition-colors';
  const projectInputGroupLabel = document.createElement('label');
    projectInputGroupLabel.innerText = 'Project:';
    projectInputGroupLabel.className = 'text-neutral-100 text-base font-bold h-8 pr-2 basis-32 shrink-0 grow-0 text-right flex items-center justify-end transition-colors';
    projectInputGroupLabel.htmlFor = 'projectName';
    projectInputGroupLabel.id = 'newToDoModal_Project_Label';
  const projectInputGroupOptions = [];
  const projectInputGroupSelect = document.createElement('select');
  projectInputGroupSelect.className = 'flex-1 text-neutral-100 mr-2 transition-colors'
    projects.forEach(project => {
      const projectInputGroupOption = document.createElement('option');
      projectInputGroupOption.className = "transition-colors";
      projectInputGroupOption.innerText = project.getName();
      projectInputGroupOption.dataset.project = project.getID()
      projectInputGroupOption.dataset.color = project.getColor();
      projectInputGroupSelect.append(projectInputGroupOption);
      projectInputGroupOptions.push(projectInputGroupOption);
    })
  projectInputGroupSelect.addEventListener('change', handleChange_projectSelect);
  projectInputGroup.append(projectInputGroupLabel, projectInputGroupSelect);

  const nameInputGroup = document.createElement('div');
    nameInputGroup.id = 'newToDoModal_Name_InputGroup';
    nameInputGroup.className = 'flex flex-row items-center border-b-2 border-b-stone-100 transition-colors';
  const nameInputGroupLabel = document.createElement('label');
    nameInputGroupLabel.innerText = 'Name:';
    nameInputGroupLabel.id = 'newToDoModal_Name_Label';
    nameInputGroupLabel.htmlFor = 'toDoName';
    nameInputGroupLabel.className = 'text-neutral-100 text-base font-bold h-8 pr-2 basis-32 shrink-0 grow-0 text-right flex items-center justify-end transition-colors';
  const nameInputGroupTextInput = document.createElement('input');
    nameInputGroupTextInput.type = 'text';
    nameInputGroupTextInput.name = 'toDoName';
    nameInputGroupTextInput.maxLength = 20;
    nameInputGroupTextInput.className = 'text-base outline-0 text-neutral-50 w-full mr-2 px-1 transition-colors';
    nameInputGroupTextInput.value = "";
    nameInputGroupTextInput.placeholder = "Enter a Todo Name";
  nameInputGroup.append(nameInputGroupLabel, nameInputGroupTextInput);

  const dueDateInputGroup = document.createElement('div');
    dueDateInputGroup.id = 'newToDoModal_DueDate_InputGroup'
    dueDateInputGroup.className = 'flex flex-row border-b-2 border-b-stone-100 transition-colors';
  const dueDateInputGroupLabel = document.createElement('label');
    dueDateInputGroupLabel.innerText = 'Due Date:';
    dueDateInputGroupLabel.id = 'newToDoModal_DueDate_Label';
    dueDateInputGroupLabel.htmlFor = 'toDoDueDate';
    dueDateInputGroupLabel.className = 'text-neutral-100 text-base font-bold h-8 pr-2 basis-32 shrink-0 grow-0 text-right flex items-center justify-end transition-colors';
  const dueDateInputGroupInput = document.createElement('input');
    dueDateInputGroupInput.type = 'date';
    dueDateInputGroupInput.name = 'toDoDueDate';
    dueDateInputGroupInput.className = 'text-base outline-0 text-neutral-50 w-full mr-2 px-1 transition-colors';
    const today = new Date().toISOString().split("T")[0];
    dueDateInputGroupInput.value = today;
  dueDateInputGroup.append(dueDateInputGroupLabel, dueDateInputGroupInput);

  const priorityInputGroup = document.createElement('div');
    priorityInputGroup.id = 'newToDoModal_Priority_InputGroup';
    priorityInputGroup.className = 'flex flex-row items-center border-b-2 border-b-stone-100 transition-colors';
  const priorityInputGroupLabel = document.createElement('p');
    priorityInputGroupLabel.innerText = 'Priority:';
    priorityInputGroupLabel.id = "newToDoModal_Priority_Label";
    priorityInputGroupLabel.className = 'text-neutral-100 text-base font-bold h-8 pr-2 basis-32 shrink-0 grow-0 text-right flex items-center justify-end transition-colors';
  const priorityInputGroupRadioContainer = document.createElement('div');
    priorityInputGroupRadioContainer.id = 'newToDoModal_Priority_RadioContainer';
    priorityInputGroupRadioContainer.className = 'flex flex-col text-base text-neutral-50 w-full mr-2 px-1 transition-colors';
  priorities.forEach(priority => {
    const {text, val, color} = priority;
    const id = `priority_${val}`;
    const priorityLabel = document.createElement('label');
    priorityLabel.htmlFor = id;
    priorityLabel.className = 'flex flex-row justify-center items-center relative cursor-pointer'
    const prioritySpan = document.createElement('span');
    prioritySpan.innerText = text;
    prioritySpan.className = "flex-1"
    const priorityRadio = document.createElement('input');
    priorityRadio.type = 'radio';
    priorityRadio.name = 'priority';
    priorityRadio.value = val;
    priorityRadio.id = id;
    priorityRadio.className = "peer sr-only";
    priorityRadio.addEventListener('click', (e)=>{handleClick_PriorityRadio(e, val)});
    if(val === checkedPriority){
      priorityRadio.checked = true;
    }
    const priorityColorFlag = document.createElement('div');
    priorityColorFlag.className = `bg-${color}-500 border border-${color}-300 basis-4 h-4 peer-checked:basis-12 transition-all`
    priorityLabel.append(prioritySpan, priorityRadio, priorityColorFlag,);
    priorityInputGroupRadioContainer.append(priorityLabel);
  })
  priorityInputGroup.append(priorityInputGroupLabel, priorityInputGroupRadioContainer);

  const notesInputGroup = document.createElement('div');
    notesInputGroup.id = 'newToDoModal_Notes_InputGroup';
    notesInputGroup.className = 'flex flex-row items-center border-b-2 border-b-stone-100 transition-colors';
  const notesInputGroupLabel = document.createElement('label');
    notesInputGroupLabel.innerText = 'Notes:';
    notesInputGroupLabel.id = 'newToDoModal_Notes_Label';
    notesInputGroupLabel.htmlFor = 'toDoNotes';
    notesInputGroupLabel.className = 'text-neutral-100 text-base font-bold h-8 pr-2 basis-32 shrink-0 grow-0 text-right flex items-center justify-end transition-colors';
  const notesContainer = document.createElement('div');
    notesContainer.id = 'newToDoModal_Notes_Container';
    notesContainer.className = 'flex flex-col text-base text-neutral-50 w-full mr-2 px-1 transition-colors';
  const notesContainerControls = document.createElement('div');
    notesContainerControls.className = 'flex flex-row';
  const notesTextArea = document.createElement('textarea');
    notesTextArea.id = 'newToDoModal_Notes_TextArea';
    notesTextArea.className = `w-full my-2 text-${chosenColor}-900 p-1 resize-none transition-colors`;
    notesTextArea.rows = '3';
  const addNoteButton = document.createElement('button');
    addNoteButton.innerText = "+";
    addNoteButton.className = "text-lg font-bold rounded-md hover:bg-green-800 bg-green-700 text-green-50 my-1 flex-1 border border-green-700 transition-colors";
    addNoteButton.id = 'newToDoModal_Notes_AddNoteButton';
    addNoteButton.addEventListener('click', handleClick_addNoteButton);
  const removeNoteButton = document.createElement('button');
    removeNoteButton.innerText = "-";
    removeNoteButton.id = 'newToDoModal_Notes_RemoveNoteButton';
    removeNoteButton.className = "text-lg font-bold rounded-md hover:bg-red-800 bg-red-700 text-red-50 my-1 flex-1 border border-red-700 transition-colors";
    removeNoteButton.addEventListener('click', handleClick_removeNoteButton);
  notesContainerControls.append(removeNoteButton, addNoteButton);
  const notesList = document.createElement('ul');
    notesList.className = "list-disc list-inside"
    notesList.id = 'newToDoModal_Notes_List';
  notesContainer.append(notesList, notesTextArea, notesContainerControls);
  notesInputGroup.append(notesInputGroupLabel, notesContainer);

  const controlsInputGroup = document.createElement('div');
    controlsInputGroup.id = 'newProjectModal_ControlsGroup';
    controlsInputGroup.className = 'buttonGroup px-2 py-2 bg-stone-700 text-indigo-50 flex flex-row justify-end gap-2 rounded-b-md';
  const controlsInputGroupCancelButton = document.createElement('button');
    controlsInputGroupCancelButton.innerText = 'Cancel';
    controlsInputGroupCancelButton.id = 'newProjectModal_ControlsGroup_CancelButton';
    controlsInputGroupCancelButton.className = 'text-lg rounded-md hover:bg-red-800 bg-red-700 text-red-50 px-2 py-1';
    controlsInputGroupCancelButton.addEventListener('click', handleClick_CancelButton);
  const controlsInputGroupAcceptButton = document.createElement('button');
    controlsInputGroupAcceptButton.innerText = 'Accept';
    controlsInputGroupAcceptButton.id = 'newProjectModal_ControlsGroup_AcceptButton';
    controlsInputGroupAcceptButton.className = 'text-lg rounded-md hover:bg-green-800 bg-green-700 text-green-50 px-2 py-1';
    controlsInputGroupAcceptButton.addEventListener('click', handleClick_AcceptButton);
  controlsInputGroup.append(controlsInputGroupCancelButton, controlsInputGroupAcceptButton);

  modalForm.append(modalTitle, projectInputGroup, nameInputGroup, dueDateInputGroup, priorityInputGroup, notesInputGroup, controlsInputGroup);
  modal.append(modalScreen, modalForm)

  const DarkColoredElements = [
    projectInputGroup,
    projectInputGroupLabel,
    nameInputGroup,
    nameInputGroupLabel,
    priorityInputGroup,
    priorityInputGroupLabel,
    dueDateInputGroup,
    dueDateInputGroupLabel,
    notesInputGroup,
    notesInputGroupLabel
  ]
  const HighlightColoredElements = [
    nameInputGroupTextInput,
    projectInputGroupSelect,
    ...projectInputGroupOptions,
    priorityInputGroupRadioContainer,
    dueDateInputGroupInput,
    notesContainer,
    
  ];
  const LightColoredElements = [
    notesTextArea
  ];

  //CLEANUP ANIMATION CLASSES ONCE ENDED
  modalScreen.addEventListener('animationend', function(e){
    const {animationName} = e;
    if(animationName === 'fadeIn'){
      this.classList.remove('animate-fadeIn');
    }
  });
  modalForm.addEventListener('animationend', function(e){
    const {animationName} = e;
    if(animationName === 'slideInTop' || animationName === 'slideInRight' || animationName === 'slideInBottom' || animationName === 'slideInLeft'){
      this.classList.remove('animate-slideInTop', 'animate-slideInRight', 'animate-slideInBottom', 'animate-slideInLeft');
    }
  });

  setModalColors(chosenColor, chosenColor);
  function setModalColors(oldColor, newColor){
    const oldTextAreaTextClass = `text-${oldColor}-900`;
    const newTextAreaTextClass = `text-${newColor}-900`;
    notesTextArea.classList.remove(oldTextAreaTextClass);
    notesTextArea.classList.add(newTextAreaTextClass);

    DarkColoredElements.forEach(element => {
      setElementBackgroundColor(element, oldColor, newColor, 900);
    });
    HighlightColoredElements.forEach(element => {
      setElementBackgroundColor(element, oldColor, newColor, 800);
    });
    LightColoredElements.forEach(element => {
      setElementBackgroundColor(element, oldColor, newColor, 100);
    })
    function setElementBackgroundColor(element, oldColor, newColor, colorNum){
      const oldClass = `bg-${oldColor}-${colorNum}`;
      const newClass = `bg-${newColor}-${colorNum}`;
      element.classList.remove(oldClass);
      element.classList.add(newClass);
    }
  }
  function handleClick_AcceptButton(event){
    const projectID = projectInputGroupSelect.selectedOptions[0].dataset.project;
    const toDoName = nameInputGroupTextInput.value;
    const dueDate = dueDateInputGroupInput.value;
    const priority = checkedPriority;
    const notes = [];
    Array.from(notesList.children).forEach(note=>{
      notes.push(note.innerText)
    })
    console.log({
      projectID,
      toDoName,
      dueDate,
      priority,
      notes
    })

    if(!projectID || !toDoName || !dueDate || !priority){
      //TODO
      console.log('Not Today Zerg!');
    } else {
      createToDo(projectID, toDoName, dueDate, priority, notes);
      updateAside();
      updateSection();
      destroy();
    }
  }
  function handleClick_addNoteButton(event){
    const text = notesTextArea.value;
    if(text !== ""){
      const noteListItem = document.createElement('li');
      noteListItem.innerText = notesTextArea.value;
      notesTextArea.value = "";
      notesList.append(noteListItem);
    }
  }
  function handleClick_CancelButton(event){
    destroy();
  }
  function handleClick_removeNoteButton(event){
    if(notesList.lastChild){
      notesList.removeChild(notesList.lastChild);
    }
  }
  function handleClick_PriorityRadio(event, priority){
    checkedPriority = priority;
  }
  function handleChange_projectSelect(event){
    const children = event.target.children;
    let chosenOption;
    Array.from(children).forEach(child=>{
      if(child.value === event.target.value){
        chosenOption = child;
      }
    })
    setModalColors(chosenColor, chosenOption.dataset.color);
    chosenColor = chosenOption.dataset.color;
  }
  function destroy(){
    modalScreen.classList.add('animate-fadeOut');
    switch(Math.floor(Math.random()*4)){
      case 0: {
        modalForm.classList.add('animate-slideOutTop');
        break;
      }
      case 1: {
        modalForm.classList.add('animate-slideOutRight');
        break;
      }
      case 2: {
        modalForm.classList.add('animate-slideOutBottom');
        break;
      }
      case 3: {
        modalForm.classList.add('animate-slideOutLeft');
        break;
      }
    }
    modalForm.addEventListener('animationend', ()=>{
      modal.parentNode.removeChild(modal);
    })
  }
  return modal;
}

export default newToDoModal;