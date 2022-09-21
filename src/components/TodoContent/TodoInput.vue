<template>
  <div class="search-container">
    <input
      type="checkbox"
      :checked="all_completed"
      @change="$emit('toggleCheckAll')"
      :class="[{ hidden: is_empty }]"
    />
    <input
      v-model="title"
      type="text"
      placeholder="What needs to be done?"
      @keyup.enter="handleAddNewTodo"
      ref="input"
    />
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref, onMounted } from "vue";

interface Props {
  all_completed: boolean;
  is_empty: boolean;
}

// reactive state
const title = ref<string>("");

// props
const { all_completed, is_empty } = defineProps<Props>();

// refs
const input = ref<HTMLInputElement | null>(null);

// emits
const emit = defineEmits<{
  (e: "add-new-todo", title: string): void;
}>();

// methods
function handleAddNewTodo() {
  if (!title.value) return;

  emit("add-new-todo", title.value);
  title.value = "";
}

onMounted(() => {
  input.value?.focus();
});
</script>

<style lang="scss" scoped>
.search-container {
  display: flex;
  padding: 16px;
  border: none;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 -2px 1px rgb(0 0 0 / 3%);
  align-items: center;
  input[type="checkbox"] {
    margin-right: 1rem;
  }

  input[type="text"] {
    outline: none;
    height: 100%;
    line-height: 1.4em;
    font-size: 24px;
    flex-grow: 1;
    border: none;
  }

  .hidden {
    visibility: hidden;
    opacity: 0;
  }
}
</style>
