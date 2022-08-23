<template>
  <div class="amount-label">
    <p>{{sign}}</p>
    <template v-if="withZeros">
      <p>{{ digitsGetter(value)}}</p>
      <span>{{ zerosGetter(value) }}</span>
    </template>
    <p v-else>{{ clarifiedNumber(value) }}</p>
  </div>
</template>

<script setup lang="ts">
import { useAmount } from "@/composables/useAmount";

defineProps({
  value: { type: String, required: true },
  withZeros: { type: Boolean, default: true },
  sign: { type: String },
});

const { digitsGetter, zerosGetter, clarifiedNumber } = useAmount()

</script>

<style scoped>
.amount-label {
  display: flex;
  color: #000000;
}
.amount-label span{
  color: gray;
}
</style>