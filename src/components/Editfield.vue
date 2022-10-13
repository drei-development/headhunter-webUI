<template>
  <div v-if="text">
    <div v-if="editable">
      <input type="text" v-model="value">
      <button @click="toggleCheck">check</button>
      <button @click="toggleUndo">undo</button>
    </div>
    <div v-else>
      <span>{{value}}</span>
      <button @click="toggleEditable">Edit</button>
    </div>
  </div>
  <div v-if="number">
    <div v-if="editable">
      <input type="number" v-model="value">
      <button @click="toggleCheck">check</button>
      <button @click="toggleUndo">undo</button>
    </div>
    <div v-else>
      <span>{{value}}</span>
      <button @click="toggleEditable">Edit</button>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import {usePeopleStore} from '@/stores/person'
import type {Person} from '@/stores/person'
import TextField from "@/components/TextField.vue";

export default defineComponent({
  name: "Editfield",
  components: {TextField},
  props: {
    text: {
      type: String
    },
    number: {
      type: Number
    }
  },
  emits: [],
  setup(props, { emit }) {

    const store = usePeopleStore();
    const people: Person[] = store.getPeople;
    const person = ref<Person>(people[0]);

    const editable = ref<Boolean>(false);
    const value = ref();
    let lastValue: String | number;

    if(props.text) {
      value.value = props.text;
      lastValue = props.text;
    }
    else if(props.number){
      value.value = props.number;
      lastValue = props.number;
    }

    function toggleEditable() {
      lastValue = value.value;
      editable.value = !editable.value;
    }

    function toggleUndo() {
      value.value = lastValue;
      editable.value = !editable.value;
    }

    function toggleCheck() {
      editable.value = !editable.value;
    }

    return {
      editable,
      value,
      toggleEditable,
      toggleUndo,
      toggleCheck
    }
  }
})
</script>

<style scoped>

</style>
