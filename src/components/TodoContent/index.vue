<template>
  <div class="container">
    <TodoInput
      :is_empty="is_empty"
      :all_completed="all_completed"
      @add-new-todo="(value) => $emit('add-new-todo', value)"
      @toggle-check-all="$emit('toggleCheckAll')"
    />
    <TodoList
      v-if="!is_empty"
      :todos="todos"
      :delete-todo="deleteTodo"
      @toggle-todo-completed="(id) => $emit('toggleTodoCompleted', id)"
      @edit-todo="(id, title) => $emit('editTodo', id, title)"
    />
    <TodoFilter
      v-if="!is_empty"
      @change-filter-mode="(value) => $emit('changeFilterMode', value)"
      :items_left="items_left"
      :filter_mode="filter_mode"
      :has_completed="has_completed"
      @clear-completed-todos="$emit('clearCompletedTodos')"
    />
  </div>
</template>

<script lang="ts">
import TodoInput from './TodoInput.vue';
import TodoList from './TodoList.vue';
import TodoFilter from './TodoFilter.vue';
import { defineComponent, PropType } from 'vue';
import { Todo, Filtermode } from '@/App.vue';
export default defineComponent({
  name: 'TodoContent',
  components: { TodoInput, TodoList, TodoFilter },
  props: {
    todos: {
      type: Array as PropType<Todo[]>,
      required: true,
    },
    items_left: {
      type: Number,
      required: true,
    },
    filter_mode: {
      type: String as PropType<Filtermode>,
      required: true,
    },
    has_completed: {
      type: Boolean,
      required: true,
    },
    all_completed: {
      type: Boolean,
      required: true,
    },
    deleteTodo: {
      required: true,
      type: Function as PropType<(id: number) => void>,
    },
    is_empty: {
      required: true,
      type: Boolean,
    },
  },
});
</script>

<style lang="scss" scoped>
.container {
  widows: 100%;
  max-width: 582px;
  border-radius: 4px;
  margin: 40px auto;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%), 0 25px 50px 0 rgb(0 0 0 / 10%);
}
</style>
