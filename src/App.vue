<template>
  <div class="app">
    <TodoHeader />
    <TodoContent
      :filter_mode="filter_mode"
      :todos="filtered_todos"
      :items_left="items_left"
      @change-filter-mode="handleChangeFilterMode"
      :has_completed="has_completed"
      @clear-completed-todos="clearCompletedTodo"
      :delete-todo="deleteTodo"
      @add-new-todo="addNewTodo"
      @toggle-todo-completed="toggleTodoCompleted"
      :all_completed="all_completed"
      @toggle-check-all="toggleCheckAll"
      @edit-todo="editTodo"
      :is_empty="is_empty"
    />
    <TodoFooter />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watch, onUnmounted } from 'vue';
import TodoHeader from './components/TodoHeader.vue';
import TodoContent from './components/TodoContent/index.vue';
import TodoFooter from './components/TodoFooter.vue';

export interface Todo {
  title: string;
  id: number;
  is_completed: boolean;
}

export type Filtermode = 'active' | 'completed' | 'all';

// define reactive state (có thể dùng hàm reactive hoặc ref, sự khác nhau => đọc thêm docs)
const todos = ref<Todo[]>([]);
const filter_mode = ref<Filtermode>('all');

// để dùng computed value, dùng hàm built-in của Vue: computed
const filtered_todos = computed(() => {
  switch (filter_mode.value) {
    case 'all':
      return todos.value as Todo[];
    case 'active':
      return todos.value.filter((t) => !t.is_completed);
    case 'completed':
      return todos.value.filter((t) => t.is_completed);

    default:
      return [];
  }
});

const has_completed = computed(() => todos.value.some((t) => t.is_completed));
const has_active = computed(() => todos.value.some((t) => !t.is_completed));
const all_completed = computed(() => todos.value.every((t) => t.is_completed));
const is_empty = computed(() => todos.value.length === 0);
const items_left = computed(
  () => todos.value.filter((t) => !t.is_completed).length
);

// Các function được định nghĩa ở top level chính là các methods trong options API
function handleChangeFilterMode(value: Filtermode) {
  filter_mode.value = value;
}

function clearCompletedTodo() {
  todos.value = todos.value.filter((t) => !t.is_completed);
}

function deleteTodo(id: number) {
  todos.value = todos.value.filter((t) => t.id !== id);
}

function addNewTodo(title: string) {
  const newTodo: Todo = {
    id: new Date().getTime(),
    title,
    is_completed: false,
  };

  todos.value.push(newTodo);
}

function toggleTodoCompleted(id: number) {
  todos.value = todos.value.map((t) =>
    t.id === id ? { ...t, is_completed: !t.is_completed } : t
  );
}

function toggleCheckAll() {
  if (has_active.value) {
    todos.value = todos.value.map((t) => ({ ...t, is_completed: true }));
  } else {
    todos.value = todos.value.map((t) => ({ ...t, is_completed: false }));
  }
}

function editTodo(id: number, title: string) {
  todos.value = todos.value.map((t) =>
    t.id === id ? { ...t, title: title } : t
  );
}

// life cycle hooks
onMounted(() => {
  // Lấy những todos được lưu trong localstorage ra
  const storedTodos = localStorage.getItem('todos-mvc');
  todos.value = storedTodos ? JSON.parse(storedTodos) : [];
});

// watchers
watch(
  todos,
  (new_todos) => {
    localStorage.setItem('todos-mvc', JSON.stringify(new_todos));
  },
  { deep: true }
);
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  min-height: 100vh;
  background-color: #f5f5f5;
  .app {
    margin: 60px 0;
  }
}

button {
  outline: none;
  cursor: pointer;
}

input {
  outline: none;
}
</style>
