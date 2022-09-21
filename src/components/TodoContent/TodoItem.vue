<template>
  <div :class="['todo-item', { completed: todo.is_completed }]">
    <input
      :checked="todo.is_completed"
      @change="$emit('toggleTodoCompleted', todo.id)"
      type="checkbox"
      :class="{ hidden: open_edit }"
    />
    <input
      ref="input"
      v-model="title"
      v-if="open_edit"
      type="text"
      class="edit-input"
      @keyup.enter="handleCloseEdit"
    />
    <p
      @dblclick="handleDoubleClick"
      :class="{ hidden: open_edit }"
      class="title"
    >
      {{ todo.title }}
    </p>
    <fa
      icon="close"
      @click="() => deleteTodo(todo.id)"
      :class="[
        'icon',
        {
          hidden: open_edit,
        },
      ]"
    />
  </div>
</template>

<script lang="ts" setup>
import { Todo } from "@/App.vue";
import { defineProps, defineEmits, nextTick, PropType, ref } from "vue";

interface Props {
  todo: Todo;
  deleteTodo: (id: number) => void;
}

// received props
const { deleteTodo, todo } = defineProps<Props>();

// reactive state
const open_edit = ref<boolean>(false);
const title = ref<string>(todo.title);

// emits
const emit = defineEmits<{
  (e: "editTodo", id: number, title: string): void;
  (e: "toggleTodoCompleted", id: number): void;
}>();

// template ref
const input = ref<HTMLInputElement | null>(null);

// methods
function handleDoubleClick() {
  open_edit.value = true;
  nextTick(() => {
    input.value?.focus();
    const handleClickOutside = (e: any) => {
      if (!input.value?.contains(e.target)) {
        open_edit.value = false;
        handleCloseEdit();
        nextTick(() => {
          document.removeEventListener("click", handleClickOutside);
        });
      }
    };
    document.addEventListener("click", handleClickOutside);
  });
}

function handleCloseEdit() {
  open_edit.value = false;
  if (!title.value) {
    deleteTodo(todo.id);
  } else {
    emit("editTodo", todo.id, title.value);
  }
}
</script>

<style scoped lang="scss">
input[type="checkbox"] {
  margin-right: 1rem;
}

.todo-item {
  display: flex;
  align-items: center;
  padding: 0 16px;
  border-bottom: 1px solid #ededed;
  position: relative;

  p {
    font-size: 24px;
    line-height: 29px;
    color: #4d4d4d;
    flex-grow: 1;
    user-select: none;
    padding: 16px 0;
  }

  .edit-input {
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 40px;
    padding: 12px 16px;
    box-shadow: inset 0 -1px 5px 0 rgb(0 0 0 / 20%);
    outline: none;
    border: 1px solid #999;
    font-size: 24px;
  }

  .icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 1.5rem;
    color: #4d4d4d;
    cursor: pointer;
    font-size: 1.2rem;
    opacity: 0;
    visibility: hidden;
  }

  &:hover .icon {
    opacity: 1;
    visibility: visible;
  }

  .hidden {
    visibility: hidden !important;
    opacity: 0 !important;
  }

  &.completed {
    p {
      text-decoration: line-through;
      color: #d9d9d9;
    }
  }
}
</style>
