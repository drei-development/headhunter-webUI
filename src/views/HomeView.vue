<template>
  <main>
    <TextField :name="'Vorname'" @textHasChanged="firstNameChanged"/>
    <TextField :name="'Nachname'" @textHasChanged="lastNameChanged"/>
    <NumField :name="'Alter'" @numberHasChanged="ageChanged"/>
    <NumField :name="'Arbeitserfahrung (Jahre)'" @numberHasChanged="expChanged"/>

    <p>Programmiersprachen</p>
    <button v-for="language in programmingLanguages"
    @click="handleClick(language.name)"
    :id="'btn_'+language.name">
      {{language.name}}
    </button>
    <br>
    <button @click="addPersonToStore">Send</button>

  </main>
</template>


<script setup lang="ts">
import TextField  from '../components/TextField.vue'
import NumField  from '../components/NumField.vue'
import {ref} from "vue";
import {Person, usePeopleStore} from '@/stores/person'
import router from '../router/index'

const firstName = ref<String>('');
const lastName = ref<String>('');
const age = ref<number>();
const workingExperience = ref<number>();
const selectedLanguages = ref<String[]>([]);

const programmingLanguages = ref(
    [
      {id: 1, name: 'Python'},
      {id: 2, name: 'Java'},
      {id: 3, name: 'Cobol'},
    ]
);


function firstNameChanged(text: String): void {
  firstName.value = text;
}
function lastNameChanged(text: String): void {
  lastName.value = text;
}
function ageChanged(num: number): void {
  age.value = num;
}
function expChanged(num: number): void {
  workingExperience.value = num;
}

function handleClick(name: String) {
  if (selectedLanguages.value.find((l) => l === name)) {
    selectedLanguages.value = selectedLanguages.value.filter((l) => l !== name);
    document.querySelector('#btn_'+name)?.classList.remove('focus');
  }
  else {
    selectedLanguages.value.push(name);
    document.querySelector('#btn_'+name)?.classList.add('focus');
  }
}

function addPersonToStore() {
  const person: Person = {
    firstName: firstName.value,
    lastName: lastName.value,
    age: age.value,
    workingExperience: workingExperience.value,
    languages: selectedLanguages.value
  }

  const store = usePeopleStore();

  store.addPerson(person);

  store.postPersonToServer(person);

  router.push('/person')
}
</script>

<style>

.focus {
  background-color: green;
}
</style>
