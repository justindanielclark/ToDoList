const ToDo = (()=>{
  function ToDo(title, description, dueDate, priority, notes){
    this._title = title;
    this._description = description;
    this._dueDate = dueDate;
    this._priority = priority;
    this._notes = notes;
  }
  ToDo.prototype = {
    getTitle: function(){},
    setTitle: function(){},

    getDescription: function(){
      return this._description;
    },
    setDescription: function(description){
      this._description = description;
      return this;
    },

    getDueDate: function(){
      return this._dueDate;
    },
    setDueDate: function(dueDate){
      this._dueDate = dueDate;
      return this;
    },

    getPriority: function(){
      return this._priority;
    },
    setPriority: function(priorityValue){
      this._priority = priorityValue;
      return this;
    },

    getNotes: function(){
      return this._notes;
    },
    addNote: function(note){
      this._notes.push(note);
      return this;
    },
    removeNote: function(index){
      this._notes.splice(index, 1);
      return this;
    }
  }
  return ToDo;
})()

export default ToDo;