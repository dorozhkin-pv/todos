<template>
	<section class="main" v-show="todos.length" v-cloak>
		<base-check-box 
					id="toggle-all"
					class="toggle-all"
					v-model="allDone" />
		<label for="toggle-all"></label>
		
		<to-do-list 
					class="todo-list"
					:todos="todos"
					:visibility="visibility"
					:editedTodo="editedTodo"
					@remove:todo="removeTodo($event)"
          @edit:todo="editTodo($event)"
          @done:edit="doneEdit($event)"
          @cancel:edit="cancelEdit($event)" />
	</section>
</template>

<script>
import ToDoList from '@components/ToDoList';

export default {
	name: 'Content',

	components: {
		ToDoList
	},

	props: {
		todos: Array,
		visibility: String,
		editedTodo: Object
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
	},

	computed: {
		allDone: {
			get: function () {
				return this.remaining === 0
			},
			set: function (value) {
				this.todos.forEach((todo) => {
					todo.completed = value
				})
			}
		}
	}
}
</script>