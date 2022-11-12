import Project from "./Project.js";
const ProjectsCollection = (() => {
  let _Projects = new Map();
  function createProject(projectName, iconPath, color){
    const P = new Project(projectName, iconPath, color);
    const id = P.getID();
    _Projects.set(id, P);
    return id;
  }
  function deleteProject(id){
    const P = _Projects.get(id);
    _Projects.delete(id);
    return P;
  }
  function getProject(id){
    return _Projects.get(id);
  }
  function getProjects(){
    return _Projects;
  }
  return {
    createProject,
    deleteProject,
    getProject,
    getProjects,
  }
})();
export default ProjectsCollection;