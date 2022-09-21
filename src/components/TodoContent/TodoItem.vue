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

<script lang="ts">
import { Todo } from '@/App.vue';
import { defineComponent, nextTick, PropType } from 'vue';

export default defineComponent({
  name: 'TodoItem',
  $refs: {
    input: HTMLInputElement,
  },
  emits: ['toggleTodoCompleted', 'editTodo'],
  props: {
    todo: {
      type: Object as PropType<Todo>,
      required: true,
    },
    deleteTodo: {
      type: Function as PropType<(id: number) => void>,
      required: true,
    },
  },
  data() {
    return {
      open_edit: false,
      title: this.todo.title,
    };
  },
  methods: {
    handleDoubleClick() {
      this.open_edit = true;
      nextTick(() => {
        (this.$refs.input as any)?.focus();
        const handleClickOutside = (e: any) => {
          if (!(this.$refs.input as any)?.contains(e.target)) {
            this.open_edit = false;
            this.handleCloseEdit();
            nextTick(() => {
              document.removeEventListener('click', handleClickOutside);
            });
          }
        };
        document.addEventListener('click', handleClickOutside);
      });
    },
    handleCloseEdit() {
      this.open_edit = false;
      if (!this.title) {
        this.deleteTodo(this.todo.id);
      } else {
        this.$emit('editTodo', this.todo.id, this.title);
      }
    },
  },
  mounted() {},
});
</script>

<style scoped lang="scss">
input[type='checkbox'] {
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
