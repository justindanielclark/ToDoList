import ToDoView from "./ToDoView";
const ToDosDisplay = (root, controller) => {
  //*Tailwind CSS
  const _classes = {
    base: {
      self: 'bg-slate-800 grow shrink-0 basis-1 flex flex-col gap-4',
      viewControls: 'flex flex-row p-2',
      viewControl: 'hover:bg-slate-600 bg-slate-50 text-slate-700 hover:text-slate-50 w-8 h-8 rounded-full p-1 flex items-center justify-center text-2xl font-bold transition-colors duration-300 cursor-pointer',
      toDoList: 'flex flex-col flex-wrap px-6 mt-6 grow shrink-0 basis-1 h-0 content-start overflow-x-auto'
    }
  }
  //*Utility Variables
  const _intervalTimer = 100;
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
        if(_toDisplayQueue.length === 0){
          clearInterval(interval);
          _areToDosQueued = false;
        } else {
          const {project, toDo} = _toDisplayQueue.splice(0,1)[0];
          ToDoView(_toDoList, controller, toDo, project);
        }}, _intervalTimer)
    }
  }
}

export default ToDosDisplay;