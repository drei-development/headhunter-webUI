<template>
  <p v-if="name">{{name}}</p>
  <input type="text" v-model="value" @input="handleChange">
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";

export default defineComponent({
  name: "TextField",
  props: {
    name: {
      type: String,
      required: false
    },
    modelValue: {
      type: String,
      required: false
    }
  },
  emits: ['textHasChanged'],
  setup(props, { emit }) {
    const value = ref<String>();

    if (props.modelValue) {
      value.value = props.modelValue;
    }

    function handleChange () {
      emit('textHasChanged', value.value);
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
