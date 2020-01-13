<template>
    <section class="todoapp">
      <!-- Waiting for MERGE REQUEST -->
        <h1>todos</h1>
        <Header @addtodo="addTodo($event)"/>
        <Content 
            :todos="todos"
            :visibility="visibility"
            :editedTodo="editedTodo"
            @remove:todo="removeTodo($event)"
            @edit:todo="editTodo($event)"
            @done:edit="doneEdit($event)"
            @cancel:edit="cancelEdit($event)"/>
        <Footer
            :todos="todos"
            :visibility="visibility"
            @handler:filter:click="handlerFilterClick($event)"
            @remove:completed="removeCompleted($event)" />
    </section>
</template>

<script>
  import {filters, ToDo, todoStorage} from '@helpers/';
  import './styles.css';

  import Header from "./components/Header";
  import Content from "./components/Content";
  import Footer from "./components/Footer";

  export default {
    data: function () {
      return {
        todos: todoStorage.fetch(),
        newTodo: '',
        visibility: 'all',
        editedTodo: null
      };
    },

    components: {
      Header,
      Content,
      Footer
    },

    methods: {
      addTodo(data) {
        this.newTodo = data;
        let value = this.newTodo && this.newTodo.trim();
        if (!value) {
          return;
        }
        this.todos.push(new ToDo(value));
        this.newTodo = '';
      },
      editTodo(todo) {
        this.beforeEditCache = todo.title;
        this.editedTodo = todo;
      },
      removeTodo: function (todo) {
        this.todos.splice(this.todos.indexOf(todo), 1);
      },
      doneEdit: function ({todo, value}) {
        if (!this.editedTodo) {
          return;
        }
        this.editedTodo = null;
        todo.title = value.trim();
        if (!todo.title) {
          this.removeTodo(todo)
        }
      },
      cancelEdit({todo, index, ref}) {
        this.editedTodo = null;
        todo.title = this.beforeEditCache;
        ref.baseInputs[index].refreshInnerValue();
      },
      removeCompleted(activeTodos) {
        this.todos = activeTodos;
      },
      handlerFilterClick(filter) {
        if (filters[filter]) {
          this.visibility = filter;
        } else {
          this.visibility = 'all';
        }
      }
    },

    directives: {
      'todo-focus': function (el, binding) {
        if (binding.value) {
          el.focus()
        }
      }
    }
  }


</script>

<style scoped>
</style>