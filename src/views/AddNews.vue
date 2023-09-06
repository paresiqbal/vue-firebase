<template>
  <div class="flex flex-col justify-center items-center">
    <h1>Create News</h1>
    <form
      @submit.prevent="addNews"
      class="flex flex-col justify-center items-center"
    >
      <label for="title" aria-label="title">Title</label>
      <input v-model="newNews.title" type="text" name="title" required />
      <label for="body" aria-label="body">Body</label>
      <input v-model="newNews.body" type="text" name="body" required />
      <button type="submit">Post news</button>
    </form>

    <form
      @submit.prevent="deleteNews"
      class="flex flex-col justify-center items-center"
    >
      <label for="id">Document id:</label>
      <input v-model="deleteId" type="text" name="id" required />
      <button type="submit">Delete news</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

export default {
  setup() {
    const newNews = ref({ title: "", body: "" });
    const deleteId = ref("");

    const addNews = async () => {
      const db = getFirestore();
      try {
        const docRef = await addDoc(collection(db, "berita"), newNews.value);
        console.log("News added with ID: ", docRef.id);
        // Clear the form fields
        newNews.value.title = "";
        newNews.value.body = "";
      } catch (e) {
        console.error("Error adding news: ", e);
      }
    };

    const deleteNews = async () => {
      const db = getFirestore();
      const newsRef = doc(db, "berita", deleteId.value);
      try {
        await deleteDoc(newsRef);
        console.log("News with ID ", deleteId.value, " deleted");
        // Clear the delete input field
        deleteId.value = "";
      } catch (e) {
        console.error("Error deleting news: ", e);
      }
    };

    return {
      newNews,
      deleteId,
      addNews,
      deleteNews,
    };
  },
};
</script>
