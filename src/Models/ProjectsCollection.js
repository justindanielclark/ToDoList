import Project from "./Project.js";
const ProjectsCollection = (() => {
  let _Map = new Map();
  function createProject(projectName, iconPath){
    const P = new Project(projectName, iconPath);
    const id = P.getID();
    _Map.set(id, P);
    return id;
  }
  function deleteProject(id){
    const P = _Map.get(id);
    _Map.delete(id);
    return P;
  }
  function getProject(id){
    return _Map.get(id);
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