<template>
  <p>Übersicht</p>
  <div v-if="person">
    <Editfield :title="'Vorname'" :text="person.firstName"/>
    <Editfield :title="'Nachname'" :text="person.lastName"/>
    <Editfield :title="'Alter'" :number="person.age"/>
    <Editfield :title="'Berufserfahrung (Jahre)'" :number="person.workingExperience"/>

    <p v-if="message">This is the message: {{message.message}}</p>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import {usePeopleStore} from '@/stores/person'
import type {Person, Message} from '@/stores/person'
import Editfield from "@/components/Editfield.vue";

export default defineComponent({
  name: "PersonView",
  components: {Editfield},

  props: {

  },
  emits: [],
  setup(props, { emit }) {

    const store = usePeopleStore();

    const messages: Message[] = store.getMessages;

    const message = ref<Message>(messages[0]);

    const people: Person[] = store.getPeople;

    const person = ref<Person>(people[0]);

    return {
      person,
      message
    }
  }
})
</script>

<style scoped>

</style>
