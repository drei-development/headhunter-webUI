import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const url = 'http://localhost';
const port = 8080;

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
        },
        postPersonToServer(person: Person) {
            // const myHeaders = new Headers();
            // myHeaders.set('Content-type', 'application/json');
            const myBody = JSON.stringify(person);
            console.log(myBody);
            const myInit: any = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: myBody,
                mode: 'no-cors',
                cache: 'default'
            };
            console.log(myInit)
            const fullURL = url + ':' + port + '/create';
            fetch(fullURL, myInit)
                .then((response) => {
                    if ( !response.ok) {
                        throw new Error('Network response was not OK')
                    }
                    return response.json();
                })

                .then((data: Message[]) => {
                    this.messages = data;
                })
                .catch((error) => {
                    throw new Error("Network response DATA was not OK");
                });
        }
    }
})
