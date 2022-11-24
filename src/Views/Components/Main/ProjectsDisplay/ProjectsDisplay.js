import ProjectListItem from "./ProjectListItem";

const ProjectsDisplay = (root, controller) => { 
  const Subscriber = controller.subscriberWrapper({});
  const Subscription = controller.Subscription;
  Subscriber.subscribe(
    new Subscription('projectCreated', _on_projectCreate),
    new Subscription('projectListToggled', _on_projectsListToggle),
  )
  //*CSS Tailwind Declarations
  const _classes = {
    base: {
      self: 'top-0 left-0 bg-slate-700 text-slate-100 flex flex-col w-full lg:w-80 overflow-y-auto absolute lg:relative h-full lg:h-auto z-30 transition duration-700 lg:transition-none lg:translate-y-0',
      title: 'text-2xl text-neutral-100',
      topContainer: 'flex flex-col p-4',
      projectsList: 'pl-2 pr-4 flex flex-col',
      noCurrentProjectsNotice: 'px-2 text-center',
    },
    mixins: {
      expanded: 'translate-y-0',
      contracted: '-translate-y-full'
    }
  }
  //*Utility Closure Variables
  const _listItems = [];
  const _intervalTimer = 250;
  let toDisplayQueue = [];
  let areProjectsQueued = false;

  //*DOM Creation
  const _self = document.createElement('aside');
    _self.className = [_classes.base.self, _classes.mixins.contracted].join(' ');
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

  function _on_projectCreate(args){
    const {project/*, projects*/} = args;
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
  function _on_projectsListToggle(){
    _self.classList.toggle(_classes.mixins.contracted);
    _self.classList.toggle(_classes.mixins.expanded);
  }
}

export default ProjectsDisplay;