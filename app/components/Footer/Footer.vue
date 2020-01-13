<template>
	<footer class="footer" v-show="todos.length" v-cloak>
		<span class="todo-count">
			<strong>{{ remaining }}</strong> {{ remaining | pluralize('задача осталась', 'задачи остались', 'задач осталось') }}
		</span>
		<ul class="filters">
			<li v-for="filter in filtersArray" :key="filter">
				<a href="#" 
					 :class="{ selected: visibility === filter }"
					 @click.prevent="handlerFilterClick(filter)">{{ filter }}</a>
			</li>
		</ul>
		<button class="clear-completed" @click="removeCompleted" v-show="todos.length > remaining">
			Clear completed
		</button>
	</footer>
</template>

<script>
import {filters} from '@helpers/filters.js';

export default {
	name: 'Footer',

	props: {
		todos: Array,
		visibility: String
	},

	created() {
		this.filtersArray = Object.keys(filters);
	},

	methods: {
		handlerFilterClick(filter) {
			this.$emit('handler:filter:click', filter);
		},
		removeCompleted() {
			this.$emit('remove:completed', filters.active(this.todos));
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
		},
		remaining: function () {
			return filters.active(this.todos).length
		}
	},

	filters: {
		pluralize: function (number, one, two, five) {
			let n = Math.abs(number);
			n %= 100;
			if (n >= 5 && n <= 20) {
				return five;
			}
			n %= 10;
			if (n === 1) {
				return one;
			}
			if (n >= 2 && n <= 4) {
				return two;
			}
			return five;
		}
	}
	
}
</script>

<style scoped>

</style>