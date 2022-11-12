const ProjectsDisplay = (root, controller) => {  
  // passed on every update() call
  /**@type {Map} */
  let _projects; 
  
  //Styling Declarations (allows tailwind to discover classes)
  const classes = {
    base: {
      self: 'bg-slate-700 text-slate-100 flex flex-col w-64',
      title: 'text-2xl p-4 text-neutral-100',
      projectsList: 'p-4',
      noCurrentProjectsNotice: 'px-2 text-center'
    },
    mixins: {}
  }
  //Create Nodes At Top Level For Access to Rest of Closure
  const _self = document.createElement('aside');
    _self.className = classes.base.self;
  const _title = document.createElement('h1');
    _title.innerText = 'Projects:';
    _title.className = classes.base.title;
  const _projectList = document.createElement('ul');
    _projectList.className = classes.base.projectsList;
  const _noCurrentProjectsNotice = document.createElement('p')
    _noCurrentProjectsNotice.className = classes.base.noCurrentProjectsNotice;
  let isDisplayed_noCurrentProjectsNotice = false;

  _self.append(_title, _projectList);
  
  /**
   * Generates Aside Element and Appends to Root. Requires supply of Root Element, The App SubPub Controller, and All App Level Handlers for Passing Data
   * @param {HTMLElement} root 
   * @param {SubscriberPublisherController} controller 
   * @param {Object} handlers 
   * @returns {HTMLElement}
   */
  function create(){
    root.appendChild(_self);
    return _self;
  }
  /**
   * Updates Aside Element And All Associated Children To Match Existing Projects/ToDos
   * @param {Map} projects
   */
  function update(projects){
    _projects = projects;
    //If no projects, remove all remaining LIs from the _projectList and append _noCurrentProjectsNotice to the aside
    if (_projects.size === 0){
      while(_projectList.lastChild){
        _projectList.removeChild(_projectList.lastChild);
      }
      if(!isDisplayed_noCurrentProjectsNotice){
        isDisplayed_noCurrentProjectsNotice = true;
        _self.appendChild(_noCurrentProjectsNotice);
      }
    }
    //If there are projects:
    // 1.) Remove _noCurrentProjectsNotice if displayed
    // 2.) If there are more projects than project LIs, create LIs until they are =
    // 3.) If there are less projects than project LIs, first remove all the projects who don't have an ID discoverable in _projects
    else {
      // 1.)
      if(isDisplayed_noCurrentProjectsNotice){
        isDisplayed_noCurrentProjectsNotice = false;
        _self.removeChild(_noCurrentProjectsNotice);
      }
      if(_projects.size > _projectListLIs.size){
        const diff = _projects.size - _projectListLIs.size;
        for(let i = 0; i < diff; i++){
          //todo create LI's until diff = 0
        }
      }
      if(_projects.size < _projectListLIs.size){
        //todo remove LI's that don't have a matching id
      }
    }
  }
  return {
    create,
    update,
  }
}

export default ProjectsDisplay;