import IconMap from '../../../Assets/IconMap.js';
import exclamation from '../../../Assets/SVGs/UI/exclamation.svg';
import PossibleColors from '../../../Models/PossibleColors';
import _classes from './_cssModal.js';

const newProjectModal = (root, controller) => {
  //*Closure Utility Variables
  let _chosenColor = PossibleColors[Math.floor(Math.random()*PossibleColors.length)];
  let _chosenIcon = undefined;

  //*DOM CREATION
  //*Modal Divs
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
  //*Title
  const _modalTitle = document.createElement('h1');
    _modalTitle.innerText = 'Create New Project';
    _modalTitle.className = _classes.base.modalTitle;
  //*Name Input Group
  const _nameInputGroup = document.createElement('div');
    _nameInputGroup.className = _classes.base.inputGroup;
  const _nameInputGroupLabel = document.createElement('label');
    _nameInputGroupLabel.innerText = 'Name:';
    _nameInputGroupLabel.htmlFor = 'projectName';
    _nameInputGroupLabel.className = _classes.base.label;
  const _nameInputGroupTextInput = document.createElement('input');
    _nameInputGroupTextInput.type = 'text';
    _nameInputGroupTextInput.name = 'projectName';
    _nameInputGroupTextInput.maxLength = 20;
    _nameInputGroupTextInput.className = _classes.base.input;
    _nameInputGroupTextInput.value = ""
    _nameInputGroupTextInput.placeholder = 'Enter a Project Name';
  _nameInputGroup.append(_nameInputGroupLabel, _nameInputGroupTextInput);
  //*Color Input Group
  const _colorInputGroup = document.createElement('div');
    _colorInputGroup.className = _classes.base.inputGroup;
  const _colorInputGroupLabel = document.createElement('label');
    _colorInputGroupLabel.innerText = 'Color:';
    _colorInputGroupLabel.htmlFor = 'projectColor';
    _colorInputGroupLabel.className = _classes.base.label;
  const _colorInputGroupColorContainer = document.createElement('div');
    _colorInputGroupColorContainer.className = _classes.base.colorGrid;
  PossibleColors.forEach(color=>{
    const _colorButton = document.createElement('button');
    _colorButton.dataset.color = color;
    _colorButton.className = [_classes.base.colorButton, _classes.mixins.colorButton[color].backgroundColor, _classes.mixins.colorButton[color].borderColor].join(' ');
    _colorButton.addEventListener('click', _handleClick_ColorButton)
    _colorInputGroupColorContainer.appendChild(_colorButton);
  })
  _colorInputGroup.append(_colorInputGroupLabel, _colorInputGroupColorContainer);
  //*Icon Input Group
  const _iconInputGroup = document.createElement('div');
    _iconInputGroup.className = _classes.base.inputGroup;
  const _iconInputGroupLabel = document.createElement('label');
    _iconInputGroupLabel.innerText = 'Icon:';
    _iconInputGroupLabel.htmlFor = 'projectIcon';
    _iconInputGroupLabel.className = _classes.base.label;
  const _iconContainer = document.createElement('div');
    _iconContainer.className = _classes.base.iconContainer;
  for(let icon in IconMap){
    const id = `newProjectModal_Icon_${icon}`;
    const IconLabel = document.createElement('label');
    IconLabel.className = _classes.base.iconLabel;
      IconLabel.htmlFor = id;
      IconLabel.dataset.icon = icon;
    const IconImg = document.createElement('img');
      IconImg.alt = icon;
      IconImg.src = IconMap[icon];
    const IconRadioInput = document.createElement('input');
      IconRadioInput.className = _classes.mixins.srOnly;
      IconRadioInput.type = 'radio';
      IconRadioInput.name = 'projectIcons';
      IconRadioInput.value = `${icon}`;
      IconRadioInput.id = id;
      IconRadioInput.addEventListener('click', (e)=>{_handleClick_IconLabel(e, IconLabel)});
    IconLabel.append(IconImg, IconRadioInput);
    _iconContainer.append(IconLabel);
  }
  _iconInputGroup.append(_iconInputGroupLabel, _iconContainer);
  //*Warning Messages Group
  //todo Properly Show Messages Depending On Whats Missing At Submission Time
  const _messageGroup = document.createElement('div');
    _messageGroup.className = [_classes.base.warningGroup, _classes.mixins.hidden].join(' ');
  const _messageImg1 = document.createElement('img');
    _messageImg1.src = exclamation;
    _messageImg1.className = _classes.base.warningImg;
  const _messageImg2 = document.createElement('img');
    _messageImg2.src = exclamation;
    _messageImg2.className = _classes.base.warningImg;
  const _messages = document.createElement('ul');
  const _message1 = document.createElement('li');
    _message1.innerText = 'Project Name Required';
  const _message2 = document.createElement('li');
    _message2.innerText = 'Project Icon Required';
  _messages.append(_message1, _message2);
  _messageGroup.append(_messageImg1, _messages, _messageImg2);
  //*Controls Input Group
  const _controlsInputGroup = document.createElement('div');
    _controlsInputGroup.className = _classes.base.controlsGroup;
  const _controlsInputGroupCancelButton = document.createElement('button');
    _controlsInputGroupCancelButton.innerText = 'Cancel';
    _controlsInputGroupCancelButton.className = [_classes.base.button, _classes.mixins.cancel].join(' ');
    _controlsInputGroupCancelButton.addEventListener('click', _handleClick_CancelButton);
  const _controlsInputGroupAcceptButton = document.createElement('button');
    _controlsInputGroupAcceptButton.innerText = 'Accept';
    _controlsInputGroupAcceptButton.className = [_classes.base.button, _classes.mixins.accept].join(' ');
    _controlsInputGroupAcceptButton.addEventListener('click', _handleClick_AcceptButton);
  _controlsInputGroup.append(_controlsInputGroupCancelButton, _controlsInputGroupAcceptButton);
  _modalForm.append(_modalTitle, _nameInputGroup, _colorInputGroup, _iconInputGroup, _messageGroup, _controlsInputGroup);
  _modal.append(_modalScreen, _modalForm);

  const _DarkColoredElements = [
    _nameInputGroup,
    _nameInputGroupLabel,
    _colorInputGroup,
    _colorInputGroupLabel,
    _colorInputGroupColorContainer,
    _iconInputGroup,
    _iconInputGroupLabel
  ]
  const _HighlightColoredElements = [
    _nameInputGroupTextInput
  ];
  const _LightColoredElements = [
    _iconContainer
  ];
  _setModalColors(_chosenColor, _chosenColor);

  root.prepend(_modal);

  //CLEANUP ANIMATION CLASSES ONCE ENDED
  _modalScreen.addEventListener('animationend', _handleAnimationEnd_ModalScreen_FadeIn, {once: true});
  _modalForm.addEventListener('animationend', _handleAnimationEnd_ModalForm_SlideIn, {once: true});

  function _setModalColors(oldColor, newColor){
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
      if(element.classList.contains(oldClass)){
        element.classList.remove(oldClass);
        element.classList.remove(`autofill:${oldClass}`);
      }
      element.classList.add(newClass);
      element.classList.add(`autofill:${newClass}`);
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
  function _handleClick_ColorButton(event){
    const color = event.target.dataset.color;
    if(_chosenIcon){
      _chosenIcon.classList.remove(`bg-${_chosenColor}-400`);
      _chosenIcon.classList.add(`bg-${color}-400`)
    }
    _setModalColors(_chosenColor, color);
    _chosenColor = color;
  }
  function _handleClick_IconLabel(event, IconLabel){
    if(_chosenIcon){
      _chosenIcon.classList.remove(`bg-${_chosenColor}-400`);
    }
    IconLabel.classList.add(`bg-${_chosenColor}-400`);
    _chosenIcon = IconLabel;
  }
  function _handleClick_CancelButton(){
    _destroy();
  }
  function _handleClick_AcceptButton(){
    const projectName = _nameInputGroupTextInput.value;
    if(!projectName || !_chosenIcon){
      //TODO
    } else {
      const color = _chosenColor;
      const iconName = _chosenIcon.dataset.icon
      controller.publish('createProject', {
        projectName,
        iconName,
        color
      })
      _destroy();
    }
  }
  function _destroy(){
    //Remove all remaining event listeners (animations ones are removed after once playthrough)
    Array.from(_colorInputGroupColorContainer.children).forEach(child=>{
      child.removeEventListener('click', _handleClick_ColorButton);
    })
    Array.from(_iconContainer.children).forEach(child=>{
      child.removeEventListener('click', _handleClick_IconLabel);
    })
    _controlsInputGroupAcceptButton.removeEventListener('click', _handleClick_AcceptButton);
    _controlsInputGroupCancelButton.removeEventListener('click', _handleClick_CancelButton);

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

export default newProjectModal;