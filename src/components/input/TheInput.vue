<template>
  <div class="input-wrap" :class="{'highlighted': highlighted}">
    <label>{{ label }}</label>
    <div class="input-wrap__input">
      <textarea v-if="textarea"
                rows="3"
                :disabled="disabled"
                @change="emitValue"
                v-model="localValue"/>
      <input v-else :type="type" v-model="localValue" :disabled="disabled" @change="checkValue"/>
      <div v-if="fillValue" class="input-wrap__button" @click="fillButtonHandler">Max</div>
      <p class="input-wrap__input-info" v-if="props.description">{{ props.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useAmount } from "@/composables/useAmount";

const { digitsGetter } = useAmount()
const emit = defineEmits(["update:value"]);

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'text',
  },
  textarea: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  highlighted: {
    type: Boolean,
    default: false
  },
  fillValue: {
    type: String,
    default: ""
  },
  description: {
    type: String,
  }
});

const localValue = ref<string>("");

watch(
    () => props.value,
    (newVal: string) => {
      localValue.value = newVal;
    }
);

function fillButtonHandler() {
  localValue.value = digitsGetter(props.fillValue)
  emitValue()
}

function checkValue() {
  if (props.fillValue && localValue.value > props.fillValue) {
    localValue.value = digitsGetter(props.fillValue)
  }
  emitValue()
}
function emitValue() {
  emit("update:value", localValue.value);
}

</script>

<style scoped>
.input-wrap {
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
  padding: 0 32px;
}
.highlighted {
  background-color: #ECF5FF;
  padding: 24px 32px;
}

.input-wrap label{
  margin-top: 16px;
  max-width: 250px;
  width: 100%;
}
.input-wrap__input {
  position: relative;
  width: 100%;
}
.input-wrap input{
  padding: 14px 16px;
  display: inline-block;
  border-radius: 5px;
  border: 1px solid #D3D4D8;
  box-sizing: border-box;
  min-height: 50px;
  width: 100%;
}
.input-wrap__input-info {
  color: #6B7176;
  font-size: 14px;
  line-height: 16px;
  margin-top: 10px;
}
.input-wrap input::-webkit-outer-spin-button,input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.input-wrap textarea{
  resize: none;
  padding: 14px 16px;
  display: inline-block;
  border-radius: 5px;
  border: 1px solid #D3D4D8;
  box-sizing: border-box;
  width: 100%;
}
.input-wrap__button {
  position: absolute;
  top: 50%;
  margin-top: -27px;
  height: 28px;
  background-color: #0F66BD;
  padding: 6px 12px;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  border-radius: 3px;
  cursor: pointer;
  right: 10px;
}
</style>