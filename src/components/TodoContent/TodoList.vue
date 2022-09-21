<template>
  <TodoItem
    v-for="todo in todos"
    :key="todo.id"
    :todo="todo"
    :delete-todo="deleteTodo"
    @toggle-todo-completed="(id: number) => $emit('toggleTodoCompleted', id)"
    @edit-todo="(id: number, title: string) => $emit('editTodo', id, title)"
  />
</template>

<script lang="ts" setup>
import { Todo } from "../../App.vue";
import { PropType, defineProps } from "vue";
import TodoItem from "./TodoItem.vue";

defineProps({
  todos: {
    type: Array as PropType<Todo[]>,
    required: true,
  },
  deleteTodo: {
    type: Function as PropType<(id: number) => void>,
    required: true,
  },
});

// emits
defineEmits(["toggleTodoCompleted", "editTodo"]);
</script>

<style></style>
