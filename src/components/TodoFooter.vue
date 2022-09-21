<template>
  <div class="footer">
    <p>Double-click to edit a todo</p>
    <p>Written by Dao Van Luong</p>
    <p>Part of TodoMVC</p>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TodoFooter',
};
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  align-items: center;
  flex-direction: column;

  p {
    color: #bfbfbf;
    font-size: 10px;
    line-height: 10px;
  }

  p + p {
    margin-top: 0.6rem;
  }
}
</style>
