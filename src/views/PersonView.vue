<template>
  <p>Hello</p>
  <div v-if="person">
    <p>{{person.firstName}}</p>
    <p>{{person.lastName}}</p>
    <p>{{person.age}}</p>
    <p>{{person.workingExperience}}</p>

    <Editfield :number="person.age"/>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import {usePeopleStore} from '@/stores/person'
import type {Person} from '@/stores/person'
import Editfield from "@/components/Editfield.vue";

export default defineComponent({
  name: "PersonView",
  components: {Editfield},

  props: {

  },
  emits: [],
  setup(props, { emit }) {

    const store = usePeopleStore();

    const people: Person[] = store.getPeople;

    const person = ref<Person>(people[0]);

    return {
      person
    }
  }
})
</script>

<style scoped>

</style>
