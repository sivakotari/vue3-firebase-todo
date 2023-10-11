<script setup>
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc, query, orderBy } from 'firebase/firestore'
import { ref, onMounted } from 'vue'
import { db } from './firebase'

const firebaseTodoCollection = collection(db, "todos");
const firebaseTodoCollectionQuery = query(firebaseTodoCollection, orderBy('createdAt', 'desc'));

const todoVal = ref('')
const todos = ref([
    // {
    //     id: 1,
    //     text: 'item 1',
    //     completed: false,
    //     createdAt: new Date()
    // },
])

onMounted(async () => {
  onSnapshot(firebaseTodoCollectionQuery, (querySnapshot) => {
    const firebaseTodos = [];
    querySnapshot.forEach((doc) => {
      firebaseTodos.push({...doc.data(), id: doc.id});
    });
    todos.value = firebaseTodos;
  })
})

const addTodo = async() => {
  addDoc(firebaseTodoCollection, {
    text: todoVal.value,
    completed: false,
    createdAt: new Date()
  });
  todoVal.value = '';
}

const deleteTodo = (id) => {
  deleteDoc(doc(firebaseTodoCollection, id))
}

const toggleTodo = (id) => {
  const i = todos.value.findIndex(todo => todo.id === id);
  updateDoc(doc(firebaseTodoCollection, id), {
    completed: !todos.value[i].completed
  });
}
</script>

<template>
  <header>ToDo with Firebase</header>

  <form @submit.prevent="addTodo">
    <input
      v-model="todoVal"
      type="text"
      placeholder="Add ToDo"
    >
    <button :disabled="!todoVal">Add</button>
  </form>

  <ul>
    <li
      v-for="todo in todos"
      :key="todo.id"
      :class="{completed: todo.completed}"
    >
        {{todo.text}}
        <button @click="toggleTodo(todo.id)">&check;</button>
        <button @click="deleteTodo(todo.id)">&cross;</button>
    </li>
  </ul>
</template>

<style>
  .completed {
    text-decoration: line-through;
  }
</style>