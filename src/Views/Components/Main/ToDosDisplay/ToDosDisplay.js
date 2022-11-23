import ToDoView from "./ToDoView";
const ToDosDisplay = (root, controller) => {
  //*Tailwind CSS
  const _classes = {
    base: {
      self: 'bg-slate-800 grow shrink-0 basis-1',
      toDoList: 'p-4 flex flex-row h-full flex-wrap content-start overflow-y-auto justify-around'
    }
  }
  //*Utility Variables
  const _intervalTimer = 25;
  const _toDisplayQueue = [];
  let _areToDosQueued = false;

  //*Controller Setup
  const Subscription = controller.Subscription;
  const Subscriber = controller.subscriberWrapper({});
  Subscriber.subscribe(
    new Subscription('toDoCreated', _onToDoCreated),
  )

  //*DOM Creation
  const _self = document.createElement('div');
    _self.className = _classes.base.self;
  const _toDoList = document.createElement('ul');
    _toDoList.className = _classes.base.toDoList;
  _self.append(_toDoList);
  root.append(_self);
  function _onToDoCreated(args){
    // const {project, toDo} = args;
    _toDisplayQueue.push({...args})
    if(!_areToDosQueued){
      _areToDosQueued = true;
      const interval = setInterval(function(){
        const {project, toDo, wasProgramatic} = _toDisplayQueue.splice(0,1)[0];
        ToDoView(_toDoList, controller, toDo, project);
        if(_toDisplayQueue.length === 0){
          _areToDosQueued = false;
          if(!wasProgramatic){controller.publish('reorderToDos', {})}
          clearInterval(interval);
        }
      }, _intervalTimer)
    }
  }
}

export default ToDosDisplay;