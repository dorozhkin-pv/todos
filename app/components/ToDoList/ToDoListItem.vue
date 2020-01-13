<template>
  <div>
    <li v-for="(todo, index) in filteredTodos"
        class="todo"
        :key="todo.id"
        :class="{ completed: todo.completed, editing: todo == editedTodo }">
        <div class="view">
          <base-check-box 
                class="toggle"
                v-model="todo.completed" />
          <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
          <button class="destroy" @click="removeTodo(todo)"></button>
        </div>

        <base-input 
            class="edit"
            ref="baseInputs" :value="todo.title" 
            @blur="doneEdit({todo: todo, value: $event})" 
            @keyup:esc="cancelEdit(todo, index)"
            @keyup:enter="doneEdit({todo: todo, value: $event})"/>
    </li>
  </div>
</template>

<script>
  import {filters} from '@helpers/filters.js';
  
  export default {
    name: "ToDoListItem",

    props: {
      todos: Array,
      visibility: String,
      editedTodo: Object
    },

    methods: {
      editTodo(todo) {
			this.$emit('edit:todo', todo);
      },
      removeTodo(todo) {
        this.$emit('remove:todo', todo);
      },
      doneEdit(data) {
        this.$emit('done:edit', data);
      },
      cancelEdit(todo, index) {
        this.$emit('cancel:edit', {todo, index, ref: this.$refs});
      }
    },

    computed: {
      filteredTodos: function () {
        return filters[this.visibility](this.todos)
      }
    }
    
  }
</script>

<style scoped>

</style>