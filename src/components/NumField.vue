<template>
  <p>{{name}}</p>
  <input type="number" v-model="value" @input="handleChange">
</template>

<script>
import {defineComponent, ref} from "vue";

export default defineComponent({
  name: "NumField",
  props: {
    name: {
      type: String
    },
  },
  emits: ['numberHasChanged'],
  setup(props, {emit}) {
    const value = ref();
    function handleChange() {
      emit('numberHasChanged', value.value);
    }
    return {
      value,
      handleChange
    }
  }
})
</script>

<style scoped>

</style>
