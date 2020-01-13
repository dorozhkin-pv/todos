<template>
	<header class="header">
		<base-input
				ref="headerBaseInput"
				class="new-todo"
				autofocus
				placeholder="Что должно быть сделано?"
				@keyup:enter="doneEdit($event)"/>
	</header>
</template>

<script>
	export default {
		name: "Header",
		
		methods: {
			doneEdit(data) {
				this.$emit('addtodo', data);
				this.$refs.headerBaseInput.resetInnerValue();
			}
		}	
	}
</script>