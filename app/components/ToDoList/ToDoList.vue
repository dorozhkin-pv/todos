<template>
  <ul>
    <to-do-list-item 
          :todos="todos"
          :visibility="visibility"
          :editedTodo="editedTodo"
          @remove:todo="removeTodo($event)"
          @edit:todo="editTodo($event)"
          @done:edit="doneEdit($event)"
          @cancel:edit="cancelEdit($event)"/>
  </ul>
</template>

<script>
  import defaultProps from './toDoListDefaultProps.js';

  import ToDoListItem from "./ToDoListItem.vue";

  const props = defaultProps;

  export default {
    name: "ToDoList",

    props: {
      todos: Array,
      visibility: String,
      editedTodo: Object
    },

    components: {
      ToDoListItem
    },

    methods: {
      editTodo(data) {
        this.$emit('edit:todo', data);
      },
      removeTodo(data) {
        this.$emit('remove:todo', data);
      },
      doneEdit(data) {
        this.$emit('done:edit', data);
      },
      cancelEdit(data) {
        this.$emit('cancel:edit', data);
      }
    }
  }
</script>

<style scoped>

</style>