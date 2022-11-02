import ToDo_View from "./ToDo_View";

const Project_View = (Project, ToDoEvents)=>{
  //BASE HTML CLASSSES AND STRUCTURE
  const _projectContainer = document.createElement('article')
  const _h1 = document.createElement('h1');
    _h1.classList.add('bg-red-700', 'text-white', 'text-2xl', 'font-bold')
  const _ul = document.createElement('ul');
    _ul.classList.add('flex', 'flex-col', 'space-y-2');
  _projectContainer.append(h1, ul);
  update(Project);

  function render(){
    return _projectContainer;
  }
  function update(Project){
    //CONDITIONAL RENDERS
    _h1.innerText = Project.getName();
    Project.getAllToDos().forEach(toDo=>{
      _ul.append(ToDo_View.render(toDo, ToDoEvents))
    })
  }
  return {
    destroy,
    render,
    update,
  }

}

export default Project_View;