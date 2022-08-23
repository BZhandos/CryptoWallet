<template>
  <button class="button-wrap" :class="{'ghost': type === 'ghost'}">
    {{text}}
  </button>
</template>

<script setup lang="ts">
defineProps({
  text: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'primary'
  },
})
</script>

<style scoped>
.button-wrap {
  border: none;
  background-color: #0F66BD;
  color: #FFFFFF;
  padding: 20px 60px;
  cursor: pointer;
  border-radius: 78px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.ghost {
  color: #0F66BD;
  background-color: initial;
  border: 2px solid #0F66BD;
}
</style>