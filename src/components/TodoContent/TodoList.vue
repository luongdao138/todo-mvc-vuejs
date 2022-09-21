<template>
  <TodoItem
    v-for="todo in todos"
    :key="todo.id"
    :todo="todo"
    :delete-todo="deleteTodo"
    @toggle-todo-completed="(id) => $emit('toggleTodoCompleted', id)"
    @edit-todo="(id, title) => $emit('editTodo', id, title)"
  />
</template>

<script lang="ts">
import { Todo } from '../../App.vue';
import { defineComponent, PropType } from 'vue';
import TodoItem from './TodoItem.vue';
export default defineComponent({
  name: 'TodoList',
  emits: ['toggleTodoCompleted', 'editTodo'],
  components: { TodoItem },
  props: {
    todos: {
      type: Array as PropType<Todo[]>,
      required: true,
    },
    deleteTodo: {
      type: Function as PropType<(id: number) => void>,
      required: true,
    },
  },
});
</script>

<style></style>
