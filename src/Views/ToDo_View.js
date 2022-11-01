const ToDo_View = (()=>{
  function render(toDo){
    const li = document.createElement('li');
    li.classList.add('toDo', toDo.getPriority());
    li.dataset.id = toDo.getID();
    const h1 = document.createElement('h1');
    h1.classList.add('title');
    h1.innerText = toDo.getTitle();
    const pDesc = document.createElement('p');
    pDesc.classList.add('description');
    pDesc.innerText = toDo.getDescription();
    const pDue = document.createElement('p');
    pDue.classList.add('dueDate');
    pDue.innerText = toDo.getDueDate().toString();
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
    li.append(h1, pDesc, pDue, notesDOM || null);
    return li;
  }
  return {render}
})()
return ToDo_View;