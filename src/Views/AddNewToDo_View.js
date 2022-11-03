import Project from "../Models/Project";

const AddNewToDo_View = (Projects) => {
  const modal = document.createElement('div');
    modal.classList.add('absolute', 'w-screen', 'h-screen', 'z-50', 'flex', 'justify-center', 'items-center', 'bg-slate-800');
  const form = document.createElement('div');
    form.classList.add('flex', 'flex-col', 'bg-slate-100', 'rounded-lg', 'border-4', 'border-slate-100');
    const formTitle = document.createElement('h1');
    formTitle.classList.add('text-2xl', 'p-1', 'bg-slate-700', 'text-slate-200')
    formTitle.innerText = "Create New To Do:"
    const projectLabel = document.createElement('label');
      projectLabel.innerText = "Select a Project";
      projectLabel.classList.add('text-xl', 'px-2', 'bg-slate-300', 'underline', 'underline-offset-2');
    const projectSelect = document.createElement('select');
      projectSelect.classList.add('text-lg', 'px-1', 'bg-slate-100');
      Projects.forEach(project=>{
        const projectOption = document.createElement('option');
        projectOption.innerText = project.getName();
        projectOption.value = project.getID();
        projectSelect.append(projectOption);
      })
    const titleLabel = document.createElement('label');
      titleLabel.innerText = "Title:";
      titleLabel.classList.add('text-xl', 'px-2', 'bg-slate-300', 'underline', 'underline-offset-2');
    const titleInput = document.createElement('input');
      titleInput.type = 'text';
      titleInput.classList.add('text-lg', 'px-1', 'bg-slate-100');
      titleInput.required = true;
    const descLabel = document.createElement('label');
      descLabel.innerText = "Description:";
      descLabel.classList.add('text-xl', 'px-2', 'bg-slate-300', 'underline', 'underline-offset-2');
    const descInput = document.createElement('input');
      descInput.type = 'text';
      descInput.classList.add('text-lg', 'px-1', 'bg-slate-100');
    const dateLabel = document.createElement('label');
      dateLabel.innerText = "Due Date:";
      dateLabel.classList.add('text-xl', 'px-2', 'bg-slate-300', 'underline', 'underline-offset-2');
    const dateInput = document.createElement('input');
      dateInput.type = 'date';
      dateInput.classList.add('text-lg', 'px-1', 'bg-slate-100');
    const notesLabel = document.createElement('label');
      notesLabel.innerText = "Notes:";
      notesLabel.classList.add('text-xl', 'px-2', 'bg-slate-300', 'underline', 'underline-offset-2');
    const notes = document.createElement('div');
    const buttonGroup = document.createElement('div');
      buttonGroup.classList.add('flex', 'flex-row', 'justify-end', 'p-3', 'gap-2');
    const confirmButton = document.createElement('button');
      confirmButton.innerText = 'Confirm';
      confirmButton.classList.add('px-2', 'py-1', 'bg-green-700', 'text-white', 'rounded-md', 'shadow-sm', 'shadow-green-800')
    const cancelButton = document.createElement('button');
      cancelButton.innerText = 'Cancel';
      cancelButton.classList.add('px-2', 'py-1', 'bg-red-700', 'text-white', 'rounded-md', 'shadow-sm', 'shadow-red-800')
    buttonGroup.append(cancelButton, confirmButton)

    form.append(formTitle, projectLabel, projectSelect, titleLabel, titleInput, descLabel, descInput, dateLabel, dateInput, notesLabel, notes, buttonGroup);
    modal.append(form);

    //WIRING
    modal.addEventListener('click', handleClick_cancelModal);

    cancelButton.addEventListener('click', handleClick_cancelModal);

    function handleClick_cancelModal(event){
      if(event.target === modal || event.target === cancelButton){
        modal.parentNode.removeChild(modal);
      }
    }
  return modal;
}

export default AddNewToDo_View;