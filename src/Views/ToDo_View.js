const ToDo_View = (()=>{
  function render(toDo){
    const li = document.createElement('li');
      li.classList.add('odd:bg-yellow-50', 'even:bg-purple-50', 'border-l-4', 'rounded-lg');
      li.dataset.id = toDo.getID();
      switch(toDo.getPriority()){
        case 'high': {
          li.classList.add('border-red-500');
          break;
        }
        case 'med': {
          li.classList.add('border-yellow-500');
          break;
        }
        case 'low': {
          li.classList.add('border-green-500');
          break;
        }
      }
    const h1 = document.createElement('h1');
      h1.classList.add('text-xl', 'font-bold');
      h1.innerText = toDo.getTitle();
    const pDesc = document.createElement('p');
      pDesc.classList.add('text-base');
      pDesc.innerText = toDo.getDescription();
    const pDue = document.createElement('p');
      pDue.classList.add('text-sm');
      pDue.innerText = toDo.getDueDate().toLocaleDateString();
    li.append(h1, pDesc, pDue);

    const notes = toDo.getNotes();
    let notesDOM;
    if(notes.length > 0){
      notesDOM = document.createElement('ul');
      notesDOM.classList.add('notes');
      for(let note in notes){
        const n = document.createElement('li');
        n.classList.add('note');
        n.innerText = note;
        notesDOM.appendChild(n);
      }
    }
    if(notesDOM){
      li.append(notesDOM);
    }

    return li;
  }
  return {render}
})()

export default ToDo_View;