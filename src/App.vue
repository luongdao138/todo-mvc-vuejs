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

<script lang="ts">
import { defineComponent } from 'vue';
import TodoHeader from './components/TodoHeader.vue';
import TodoContent from './components/TodoContent/index.vue';
import TodoFooter from './components/TodoFooter.vue';

export interface Todo {
  title: string;
  id: number;
  is_completed: boolean;
}

export type Filtermode = 'active' | 'completed' | 'all';

interface AppState {
  todos: Todo[];
  filter_mode: Filtermode;
}

export default defineComponent({
  name: 'App',
  components: { TodoHeader, TodoContent, TodoFooter },
  computed: {
    items_left(): number {
      return this.todos.filter((t) => !t.is_completed).length;
    },
    filtered_todos(): Todo[] {
      switch (this.filter_mode) {
        case 'all':
          return this.todos;
        case 'active':
          return this.todos.filter((t) => !t.is_completed);
        case 'completed':
          return this.todos.filter((t) => t.is_completed);

        default:
          return [];
      }
    },
    has_completed(): boolean {
      return this.todos.some((t) => t.is_completed);
    },
    has_active(): boolean {
      return this.todos.some((t) => !t.is_completed);
    },
    all_completed(): boolean {
      return this.todos.every((t) => t.is_completed);
    },
    is_empty(): boolean {
      return this.todos.length === 0;
    },
  },
  data(): AppState {
    return {
      todos: [],
      filter_mode: 'all',
    };
  },
  methods: {
    handleChangeFilterMode(value: Filtermode) {
      this.filter_mode = value;
    },
    clearCompletedTodo() {
      this.todos = this.todos.filter((t) => !t.is_completed);
    },
    deleteTodo(id: number) {
      this.todos = this.todos.filter((t) => t.id !== id);
    },
    addNewTodo(title: string) {
      const newTodo: Todo = {
        id: new Date().getTime(),
        title,
        is_completed: false,
      };

      this.todos.push(newTodo);
    },
    toggleTodoCompleted(id: number) {
      this.todos = this.todos.map((t) =>
        t.id === id ? { ...t, is_completed: !t.is_completed } : t
      );
    },
    toggleCheckAll() {
      if (this.has_active) {
        this.todos = this.todos.map((t) => ({ ...t, is_completed: true }));
      } else {
        this.todos = this.todos.map((t) => ({ ...t, is_completed: false }));
      }
    },
    editTodo(id: number, title: string) {
      this.todos = this.todos.map((t) =>
        t.id === id ? { ...t, title: title } : t
      );
    },
  },
  mounted() {
    // Lấy những todos được lưu trong localstorage ra
    const storedTodos = localStorage.getItem('todos-mvc');
    this.todos = storedTodos ? JSON.parse(storedTodos) : [];
  },
  watch: {
    todos: {
      handler(newValue: Todo[]) {
        localStorage.setItem('todos-mvc', JSON.stringify(newValue));
      },
      deep: true,
    },
  },
});
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
