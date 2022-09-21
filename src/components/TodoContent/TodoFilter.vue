<template>
  <div class="todo-filter">
    <p class="item-left">
      {{ items_left }} {{ items_left > 1 ? "items" : "item" }} left
    </p>
    <div class="actions">
      <button
        v-for="(option, index) in filter_options"
        :class="{ active: filter_mode === option.value }"
        :key="index"
        @:click="$emit('changeFilterMode', option.value)"
      >
        {{ option.label }}
      </button>
    </div>

    <button
      @click="$emit('clearCompletedTodos')"
      :class="['clear-btn', { active: has_completed }]"
    >
      Clear completed
    </button>
  </div>
</template>

<script lang="ts" setup>
import { Filtermode } from "@/App.vue";
import { defineProps, reactive } from "vue";

// reactive state
const filter_options = reactive([
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Completed", value: "completed" },
]);

interface Props {
  items_left: number;
  filter_mode: Filtermode;
  has_completed: boolean;
}

// props
const { filter_mode, has_completed, items_left } = defineProps<Props>();
</script>

<style scoped lang="scss">
.todo-filter {
  display: flex;
  padding: 1rem;
  align-items: center;
  justify-content: space-between;
  color: #777777;
  font-size: 14px;
  line-height: 20px;

  .item-left {
  }

  .actions {
    button {
      background-color: transparent;
      border: 1px solid;
      border-color: transparent;
      color: inherit;
      margin: 3px;
      padding: 3px 7px;
      text-decoration: none;
      border-radius: 3px;
      color: #777777;
      &.active {
        border-color: rgba(175, 47, 47, 0.2);
      }
    }
    button + button {
      margin-left: 0.6rem;
    }
  }

  .clear-btn {
    color: #777777;
    background-color: transparent;
    border: none;
    visibility: hidden;
    opacity: 0;

    &.active {
      opacity: 1;
      visibility: visible;
    }
  }
}
</style>
