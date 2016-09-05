var $ = require('jQuery');
/* to set and get item from the local storange
  pulling it out to a separate file, we can switch what data source we want to use it,
  so we won't have to make changes on the todo app
*/

module.exports= {
  

  filterTodos: function(todos, showCompleted, searchText){
    var filteredTodos = todos;

    // Filter by showCompleted
    // filter method require callback, get pass individual item, and return true, item will stay in the array, return false,
    // the item don't get return to the array
    filteredTodos = filteredTodos.filter((todo) => {
      return !todo.completed || showCompleted; // if showCompleted is checked we will return every item
    });

    //Filter by searchText
    filteredTodos = filteredTodos.filter((todo) => {
      if(searchText.length === 0){
        return todo;
      } else {
        return (todo.text.toLowerCase().indexOf(searchText) !== -1) ? todo.text : '';
    }
    });

    // sort todos with non-completed first, filteredTodos for sort and return it to the todos
    filteredTodos.sort((a, b) => { // a and b are going to be todo so we want to see whether a come first or not
      // return -1, telling the sort method said a should come before b, 1 a after b, 0 nothing happened, a and b are equal
      if( !a.completed && b.completed ){
        return -1;
      } else if( a.completed && !b.completed) {
        return 1;
      } else {
        return 0;
      }

    });

    return filteredTodos;
  }
};
