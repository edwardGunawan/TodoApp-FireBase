/* to set and get item from the local storange
  pulling it out to a separate file, we can switch what data source we want to use it,
  so we won't have to make changes on the todo app
*/

module.exports= {
  setTodos: function(todos) {
    /* if it is an array or not */
    if($.isArray(todos)){
      /* first para name of your variable */
      localStorage.setItem('todos', JSON.stringify(todos)); // JSON stringify takes array and convert it into the string
      return todos;
    }
  },

  getTodos: function(todos) {
    var stringTodos = localStorage.getItem('todos');
    var todos = [];

    /* convert the string todos to convert the string to the object */
    try{
      todos = JSON.parse(stringTodos); // if pass todos var will get updated with the new array
    } catch(e){

    }

    return ($.isArray(todos)) ? todos : [];
  }
};
