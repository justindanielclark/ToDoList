import '../Styles/index.css';
import IconMap from '../../../Assets/IconMap.js';
import exclamation from '../Assets/SVGs/UI/exclamation.svg';
import PossibleColors from '../../../Models/PossibleColors';

const editProjectModal = (props) => {
  let chosenColor = PossibleColors[Math.floor(Math.random()*PossibleColors.length)];
  let chosenIcon = undefined;

  const modal = document.createElement('div');
    modal.className = 'w-screen h-full absolute flex flex-col items-center justify-center z-40'

  const modalScreen = document.createElement('div');
    modalScreen.className = 'w-full h-full opacity-90 bg-stone-800 animate-fadeIn'

  const modalForm = document.createElement('div');
    modalForm.id = 'editProjectModal';
    modalForm.className = 'flex flex-col rounded-md shadow-md shadow-slate-900 w-80 absolute opacity-100 z-50';
    switch(Math.floor(Math.random()*4)){
      case 0: {
        modalForm.classList.add('animate-slideInTop');
        break;
      }
      case 1: {
        modalForm.classList.add('animate-slideInRight');
        break;
      }
      case 2: {
        modalForm.classList.add('animate-slideInBottom');
        break;
      }
      case 3: {
        modalForm.classList.add('animate-slideInLeft');
        break;
      }
    }

  const modalTitle = document.createElement('h1');
    modalTitle.id = 'editProjectModal_Title';
    modalTitle.innerText = 'Edit Project';
    modalTitle.className = 'text-base font-bold px-1 py-2 bg-stone-700 text-neutral-100 rounded-t-md border-b-2 border-b-stone-100';

  const nameInputGroup = document.createElement('div');
    nameInputGroup.id = 'editProjectModal_Name_InputGroup';
    nameInputGroup.className = 'flex flex-row items-center border-b-2 border-b-stone-100 transition-colors duration-300';
  const nameInputGroupLabel = document.createElement('label');
    nameInputGroupLabel.innerText = 'Project Name:';
    nameInputGroupLabel.id = 'editProjectModal_Name_Label';
    nameInputGroupLabel.htmlFor = 'projectName';
    nameInputGroupLabel.className = 'autofill:text-neutral-100 text-neutral-100 text-base font-bold h-8 pr-2 basis-32 shrink-0 grow-0 text-right flex items-center justify-end transition-colors duration-300';
  const nameInputGroupTextInput = document.createElement('input');
    nameInputGroupTextInput.type = 'text';
    nameInputGroupTextInput.name = 'projectName';
    nameInputGroupTextInput.maxLength = 20;
    nameInputGroupTextInput.className = 'text-base outline-0 text-neutral-50 w-full px-1 mr-2 transition-colors duration-300';
    nameInputGroupTextInput.value = ""
    nameInputGroupTextInput.placeholder = 'Enter a Project Name';
  nameInputGroup.append(nameInputGroupLabel, nameInputGroupTextInput);

  const colorInputGroup = document.createElement('div');
    colorInputGroup.id = 'editProjectModal_Color_InputGroup';
    colorInputGroup.className = 'flex flex-row border-b-2 border-b-stone-100 items-center transition-colors duration-300';
  const colorInputGroupLabel = document.createElement('label');
    colorInputGroupLabel.innerText = 'Color:';
    colorInputGroupLabel.id = 'editProjectModal_Color_Label';
    colorInputGroupLabel.htmlFor = 'projectColor';
    colorInputGroupLabel.className = 'text-neutral-100 text-base font-bold w-32 h-8 pr-2 flex items-center justify-end transition-colors duration-300';
  const colorInputGroupColorContainer = document.createElement('div');
    colorInputGroupColorContainer.id = '';
    colorInputGroupColorContainer.className = 'grid grid-cols-9 flex-1 mr-2 transition-colors duration-300';
  PossibleColors.forEach(color=>{
    const colorButton = document.createElement('button');
    colorButton.dataset.color = color;
    colorButton.className = `colorButton h-4 bg-${color}-500 border-${color}-700 border-b-2 border-r-2`;
    colorButton.addEventListener('click', handleClick_ColorButton)
    colorInputGroupColorContainer.appendChild(colorButton);
  })
  colorInputGroup.append(colorInputGroupLabel, colorInputGroupColorContainer);

  const iconInputGroup = document.createElement('div');
    iconInputGroup.id = 'editProjectModal_Icon_InputGroup';
    iconInputGroup.className = 'flex flex-row border-b-2 border-b-stone-100 items-center transition-colors duration-300';
  const iconInputGroupLabel = document.createElement('label');
    iconInputGroupLabel.innerText = 'Icon:';
    iconInputGroupLabel.id = 'editProjectModal_Icon_Label';
    iconInputGroupLabel.htmlFor = 'projectIcon';
    iconInputGroupLabel.className = 'text-neutral-100 text-base font-bold basis-32 h-8 pr-2 flex items-center justify-end transition-colors duration-300';
  const IconsContainer = document.createElement('div');
    IconsContainer.className = 'grid grid-cols-3 gap-2 p-2 overflow-y-scroll h-48 transition-colors duration-300';
  for(let icon in IconMap){
    const id = `editProjectModal_Icon_${icon}`;
    const IconLabel = document.createElement('label');
    IconLabel.className ='flex flex-col justify-center items-center p-2 rounded-full transition-colors duration-300';
      IconLabel.htmlFor = id;
      IconLabel.dataset.icon = icon;
    const IconImg = document.createElement('img');
      IconImg.alt = icon;
      IconImg.src = IconMap[icon];
    const IconRadioInput = document.createElement('input');
      IconRadioInput.className = 'basis-0 h-0 w-0 shrink-1 grow-0 sr-only';
      IconRadioInput.type = 'radio';
      IconRadioInput.name = 'projectIcons';
      IconRadioInput.value = `${icon}`;
      IconRadioInput.id = id;
      IconRadioInput.addEventListener('click', (e)=>{handleClick_IconLabel(e, IconLabel)});
    IconLabel.append(IconImg, IconRadioInput);
    IconsContainer.append(IconLabel);
  }
  iconInputGroup.append(iconInputGroupLabel, IconsContainer);

  const messageGroup = document.createElement('div');
    messageGroup.className = 'bg-red-900 text-yellow-300 transition text-center flex flex-row justify-between items-center border-b-2 border-b-stone-100 hidden'
  const messageImg1 = document.createElement('img');
    messageImg1.src = exclamation;
    messageImg1.className = 'w-6 h-6 ml-4'
  const messageImg2 = document.createElement('img');
    messageImg2.src = exclamation;
    messageImg2.className = 'w-6 h-6 mr-4'
  const messages = document.createElement('ul');
  const message1 = document.createElement('li');
    message1.innerText = 'Project Name Required';
  const message2 = document.createElement('li');
    message2.innerText = 'Project Icon Required';
  messages.append(message1, message2);
  messageGroup.append(messageImg1, messages, messageImg2);

  const controlsInputGroup = document.createElement('div');
    controlsInputGroup.id = 'editProjectModal_ControlsGroup';
    controlsInputGroup.className = 'px-2 py-2 bg-stone-700 text-indigo-50 flex flex-row justify-end gap-2 rounded-b-md';
  const controlsInputGroupCancelButton = document.createElement('button');
    controlsInputGroupCancelButton.innerText = 'Cancel';
    controlsInputGroupCancelButton.id = 'editProjectModal_ControlsGroup_CancelButton';
    controlsInputGroupCancelButton.className = 'text-lg rounded-md hover:bg-red-800 bg-red-700 text-red-50 px-2 py-1';
    controlsInputGroupCancelButton.addEventListener('click', handleClick_CancelButton);
  const controlsInputGroupAcceptButton = document.createElement('button');
    controlsInputGroupAcceptButton.innerText = 'Accept';
    controlsInputGroupAcceptButton.id = 'editProjectModal_ControlsGroup_AcceptButton';
    controlsInputGroupAcceptButton.className = 'text-lg rounded-md hover:bg-green-800 bg-green-700 text-green-50 px-2 py-1';
    controlsInputGroupAcceptButton.addEventListener('click', handleClick_AcceptButton);
  controlsInputGroup.append(controlsInputGroupCancelButton, controlsInputGroupAcceptButton);

  modalForm.append(modalTitle, nameInputGroup, colorInputGroup, iconInputGroup, messageGroup, controlsInputGroup);
  modal.append(modalScreen, modalForm);

  const DarkColoredElements = [
    nameInputGroup,
    nameInputGroupLabel,
    colorInputGroup,
    colorInputGroupLabel,
    colorInputGroupColorContainer,
    iconInputGroup,
    iconInputGroupLabel
  ]
  const HighlightColoredElements = [
    nameInputGroupTextInput
  ];
  const LightColoredElements = [
    IconsContainer
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
      if(element.classList.contains(oldClass)){
        element.classList.remove(`bg-${oldColor}-${colorNum}`);
        element.classList.remove(`autofill:bg-${oldColor}-${colorNum}`);
      }
      element.classList.add(`bg-${newColor}-${colorNum}`);
      element.classList.add(`autofill:bg-${newColor}-${colorNum}`);
    }
  }
  function handleClick_ColorButton(event){
    const color = event.target.dataset.color;
    if(chosenIcon){
      chosenIcon.classList.remove(`bg-${chosenColor}-400`);
      chosenIcon.classList.add(`bg-${color}-400`)
    }
    setModalColors(chosenColor, color);
    chosenColor = color;
  }
  function handleClick_IconLabel(event, IconLabel){
    if(chosenIcon){
      chosenIcon.classList.remove(`bg-${chosenColor}-400`);
    }
    IconLabel.classList.add(`bg-${chosenColor}-400`);
    chosenIcon = IconLabel;
  }
  function handleClick_CancelButton(event){
    destroy();
  }
  function handleClick_AcceptButton(event){
    const projectName = nameInputGroupTextInput.value;
    if(!projectName || !chosenIcon){
      //TODO
      console.log('Not Today Zerg!');
    } else {
      props.createProject(projectName, IconMap[chosenIcon.dataset.icon], chosenColor);
      props.updateAside();
      props.updateHeader();
      destroy();
    }
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
    modalForm.addEventListener('animationend', (e)=>{
      const {animationName} = e;
      if (animationName === 'slideOutTop' || animationName === 'slideOutRight' || animationName === 'slideOutBottom' || animationName === 'slideOutLeft'){
        modal.parentNode.removeChild(modal);
      }
    })
  }
  return modal;
}

export default editProjectModal;