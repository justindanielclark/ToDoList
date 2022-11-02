import Project from "./Project.js";
const ProjectsCollection = (() => {
  let _Map = new Map();
  function createProject(projectName, iconPath){
    const P = new Project(projectName, iconPath);
    _Map.set(projectName, P);
  }
  function deleteProject(projectName){
    const P = _Map.get(projectName);
    _Map.delete(projectName);
    return P;
  }
  function getProject(projectName){
    return _Map.get(projectName);
  }
  function getProjects(){
    return Array.from(_Map.values());
  }
  return {
    createProject,
    deleteProject,
    getProject,
    getProjects,
  }
})();
export default ProjectsCollection;