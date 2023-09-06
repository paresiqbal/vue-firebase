<template>
  <div class="flex flex-col py-8 justify-center items-center">
    <h1 class="text-4xl text-amber-500 font-bold py-4">Add News</h1>
    <form
      class="flex flex-col gap-4 p-4 bg-slate-800 rounded-md text-white"
      @submit.prevent="addNews"
    >
      <label for="title">Title</label>
      <input
        class="text-sm text-gray-900 outline-none rounded-md py-1 pl-1"
        type="text"
        name="title"
        v-model="title"
        placeholder="Insert your title"
      />
      <label for="body">Body</label>
      <textarea
        class="text-sm text-gray-900 outline-none rounded-md py-1 pl-1"
        name="body"
        id="title"
        v-model="body"
        cols="30"
        rows="10"
      ></textarea>
      <button
        class="text-gray-900 px-4 py-2 bg-white rounded-md font-bold"
        type="submit"
      >
        Upload News
      </button>
    </form>
  </div>
</template>

<script setup>
// vue
import { ref } from "vue";

// firebaes
import { collection, addDoc } from "firebase/firestore";
import { db } from "../main";

// Create reactive data properties for the form fields
const title = ref("");
const body = ref("");

// Method to handle the form submission
const addNews = async () => {
  try {
    // Create a new document in the "berita" collection
    const docRef = await addDoc(collection(db, "berita"), {
      title: title.value,
      body: body.value,
    });

    // Clear the form fields after successfully adding the news
    title.value = "";
    body.value = "";

    console.log("News added with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding news: ", error);
  }
};
</script>
