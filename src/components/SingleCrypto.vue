<template>
  <div class="crypto-label" :class="{'hoverable': hoverable}">
    <img :src="getLocalImgSrc(cryptoInfo.icon)" />
    <div class="crypto-label__info">
      <p>{{cryptoInfo.short_name}}
        <span>| {{cryptoInfo.full_name}}</span>
      </p>
      <div v-if="total" class="crypto-label">
        <p>Total:</p>
        <LongAmount :value="total"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import LongAmount from "@/components/LongAmount.vue"

interface ICryptoLabel {
  icon: string,
  full_name: string,
  short_name: string,
  id: number
}

defineProps({
  cryptoInfo: {
    type: Object as PropType<ICryptoLabel>,
    required: true,
  },
  total: {
    type: String,
  },
  hoverable: {
    type: Boolean,
    default: false
  },
});

function getLocalImgSrc(src: string) {
  return new URL(`./icons/${src}.svg`, import.meta.url).href
}


</script>

<style scoped>
.crypto-label {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.crypto-label__info {
  margin-left: 20px;
}
.crypto-label p{
  font-weight: bold;
  margin-right: 3px;
}
.hoverable {
  cursor: pointer;
  padding: 3px 2px;
}
.hoverable:hover {
  background-color: #d4e4ff;;
}
</style>