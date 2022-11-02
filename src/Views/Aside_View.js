const Aside_View = (Projects, Events) => {
  const asideH1 = document.createElement('h1');
      asideH1.classList.add('text-3xl', 'p-4');
      asideH1.innerText = 'Projects';
  const asideUL = document.createElement('ul');
  const wiredChildren = [];
  update(Projects, Events);
  
  function render(){
    return [asideH1, asideUL];
  }
  function update(Projects, Events){
    while(asideUL.firstChild){
      asideUL.removeChild(asideUL.firstChild);
    }
    if(Projects.length > 0){
      Projects.forEach(project=>{
        console.log(project);
        //Builidng Dom Components
        const LI = document.createElement('li');
          LI.classList.add('hover:bg-slate-300');
        const button = document.createElement('button');
          button.classList.add('flex', 'flex-row', 'items-center', 'px-6', 'py-2');
        const buttonTitle = document.createElement('p');
          buttonTitle.innerText = project.getName();
        const buttonIMG = document.createElement('img');
          buttonIMG.classList.add('w-10', 'h-10', 'mx-2')
          buttonIMG.src = project.getIconPath();
        button.append(buttonIMG, buttonTitle);
        LI.append(button)
        asideUL.append(LI);
        //Wiring
        button.addEventListener('click', (e)=>{Events.viewProject(e, project.getID())})

      })
    } else {
      const noticeLI = document.createElement('li');
        noticeLI.classList.add('flex', 'flex-row', 'items-center', 'px-2')
        noticeLI.innerText = "< No Active Projects >";
        asideUL.append(noticeLI);
    }
  }
  return {
    render,
    update,
  }
}

export default Aside_View;