import UserInterfaceIconMap from "../Assets/UserInterfaceIconMap";

const ToDo_View = (()=>{
  function render(toDo, clickEvents){
    const li = document.createElement('li');
      li.classList.add(
        'overflow-hidden',
        'group',
        'flex', 
        'justify-between', 
        'odd:bg-yellow-200', 
        'even:bg-purple-200', 
        'border-l-4',
        'rounded-lg');
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
    const drawer = document.createElement('div');
      drawer.classList.add(
        'translate-x-full',
        'group-hover:translate-x-0',
        'bg-white',
        'p-1',
        'flex',
        'flex-col',
        'justify-between',
        'transition-transform'
      )
    const favoriteImg = document.createElement('img');
      favoriteImg.src = UserInterfaceIconMap.flag;
      favoriteImg.classList.add('w-6', 'h-6');
      favoriteImg.addEventListener('click', (e)=>{clickEvents.favorite(e, toDo.getID());})
    const deleteImg = document.createElement('img');
      deleteImg.src = UserInterfaceIconMap.garbage;
      deleteImg.classList.add('w-6', 'h-6');
      deleteImg.addEventListener('click', (e)=>{clickEvents.delete(e, toDo.getID());})
    drawer.append(favoriteImg, deleteImg);

    const main = document.createElement('div');
        main.classList.add(
          'p-2'
        )
    const h1 = document.createElement('h1');
      h1.classList.add('text-xl', 'font-bold');
      h1.innerText = toDo.getTitle();
    const pDesc = document.createElement('p');
      pDesc.classList.add('text-base');
      pDesc.innerText = toDo.getDescription();
    const pDue = document.createElement('p');
      pDue.classList.add('text-sm');
      pDue.innerText = toDo.getDueDate().toLocaleDateString();
    main.append(h1, pDesc, pDue)
    li.append(main, drawer);

    //NOTES CURRENTLY NONFUNCTIONAL
    // const notes = toDo.getNotes();
    // let notesDOM;
    // if(notes.length > 0){
    //   notesDOM = document.createElement('ul');
    //   notesDOM.classList.add('notes');
    //   for(let note in notes){
    //     const n = document.createElement('li');
    //     n.classList.add('note');
    //     n.innerText = note;
    //     notesDOM.appendChild(n);
    //   }
    // }
    // if(notesDOM){
    //   li.append(notesDOM);
    // }

    return li;
  }
  return {render}
})()

export default ToDo_View;