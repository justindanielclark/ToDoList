import ProjectListItem from "./ProjectListItem";

const ProjectsDisplay = (root, controller) => { 
  const Subscriber = controller.subscriberWrapper({});
  const Subscription = controller.Subscription;
  Subscriber.subscribe(
    new Subscription('projectCreated', _onProjectCreate)
  )
  //*CSS Tailwind Declarations
  const _classes = {
    base: {
      self: 'bg-slate-700 text-slate-100 flex flex-col lg:w-72 overflow-y-auto',
      title: 'text-2xl p-4 text-neutral-100',
      topContainer: 'flex flex-row',
      projectsList: 'pl-2 pr-4 flex flex-col',
      noCurrentProjectsNotice: 'px-2 text-center'
    },
  }
  //*Utility Closure Variables
  const _listItems = [];
  const _intervalTimer = 250;
  let toDisplayQueue = [];
  let areProjectsQueued = false;

  //*DOM Creation
  const _self = document.createElement('aside');
    _self.className = _classes.base.self;
  const _topContainer = document.createElement('div');
    _topContainer.className = _classes.base.topContainer;
    const _title = document.createElement('h1');
      _title.innerText = 'Projects:';
      _title.className = _classes.base.title;
  _topContainer.append(_title);
  const _projectList = document.createElement('ul');
    _projectList.className = _classes.base.projectsList;
  const _noCurrentProjectsNotice = document.createElement('p')
    _noCurrentProjectsNotice.className = _classes.base.noCurrentProjectsNotice;
    _noCurrentProjectsNotice.innerText = '<No Projects To Display>';
  _projectList.append(_noCurrentProjectsNotice);
  _self.append(_topContainer, _projectList);
  root.append(_self);
  function _onProjectCreate(args){
    const {project, projects} = args;
    if(_projectList.contains(_noCurrentProjectsNotice)){
      _projectList.removeChild(_noCurrentProjectsNotice);
    }
    toDisplayQueue.push(project);
    if(!areProjectsQueued){
      areProjectsQueued = true;
      const interval = setInterval(function(){
        if(toDisplayQueue.length === 0){
          clearInterval(interval);
          areProjectsQueued = false;
        } else {
          const p = toDisplayQueue.splice(0,1);
          _listItems.push(ProjectListItem(_projectList, controller, p[0]));
        }
      }, _intervalTimer);
    }
  }
}

export default ProjectsDisplay;