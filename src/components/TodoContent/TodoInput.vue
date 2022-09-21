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

<script lang="ts" scoped>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TodoSearch',
  props: {
    all_completed: {
      type: Boolean,
      required: true,
    },
    is_empty: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      title: '',
    };
  },
  methods: {
    handleAddNewTodo() {
      if (!this.title) return;

      console.log({ title: this.title });

      this.$emit('add-new-todo', this.title);
      this.title = '';
    },
  },
  mounted() {
    (this.$refs.input as any).focus();
  },
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
  input[type='checkbox'] {
    margin-right: 1rem;
  }

  input[type='text'] {
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
