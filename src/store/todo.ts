import { defineStore } from "pinia";

export interface Todo {
  title: string;
  id: number;
  is_completed: boolean;
}

export type Filtermode = "active" | "completed" | "all";

export interface TodoState {
  todos: Todo[];
  filter_mode: Filtermode;
}

export const useTodoStore = defineStore("todo", {
  state: (): TodoState => {
    return {
      todos: [],
      filter_mode: "all",
    };
  },
  getters: {
    filtered_todos(state): Todo[] {
      switch (state.filter_mode) {
        case "all":
          return state.todos;
        case "active":
          return state.todos.filter((t) => !t.is_completed);
        case "completed":
          return state.todos.filter((t) => t.is_completed);

        default:
          return [];
      }
    },
    has_completed(state): boolean {
      return state.todos.some((t) => t.is_completed);
    },
    has_active(state): boolean {
      return state.todos.some((t) => !t.is_completed);
    },
    all_completed(state): boolean {
      return state.todos.every((t) => t.is_completed);
    },
    is_empty(state): boolean {
      return state.todos.length === 0;
    },
    items_left(state): number {
      return state.todos.filter((t) => !t.is_completed).length;
    },
  },
  actions: {},
});
