import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const url = 'http://localhost';
const port = 3002;

export interface Person {
    firstName: String,
    lastName: String,
    age: number | undefined,
    workingExperience: number | undefined,
    languages: String[]
}

export interface Message {
    message: String,
}

export const usePeopleStore = defineStore('person', {
    state: () => (
        {
            people: [] as Person[],
            messages: [] as Message[]
        }
    ),
    getters: {
        getPeople: state => state.people,
        getPerson: state => {
            return (name: String) => state.people.find((person) => person.firstName === name);
        },
        getMessages: state => state.messages
    },
    actions: {
        addPerson(person: Person) {
            this.people.push(person);
            // this.$state.people.push(person);

        }
    }
})
