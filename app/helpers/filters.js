// visibility filters
export const filters = {
  all: function (todos) {
    return todos;
  },
  active: function (todos) {
    return todos.filter((todo) => !todo.completed);
  },
  completed: function (todos) {
    return todos.filter((todo) => todo.completed);
  }
};