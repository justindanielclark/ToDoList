const ToDoDisplay = (root, controller) => {
  const _classes = {
    base: {
      self: 'bg-slate-800 grow overflow-y-scroll grid grid-flow-row'
    }
  }
  const _self = document.createElement('div');
    _self.className = _classes.base.self;

  function create(){
    root.append(_self);
    return _self;
  }
  return {
    create,
  }
}

export default ToDoDisplay;