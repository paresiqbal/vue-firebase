<template>
  <div>
    <h1>Create News</h1>
    <form @submit.prevent="addNews">
      <label for="title" aria-label="title">Title</label>
      <input v-model="newNews.title" type="text" name="title" required />
      <label for="body" aria-label="body">Body</label>
      <input v-model="newNews.body" type="text" name="body" required />
      <button type="submit">Post news</button>
    </form>

    <form @submit.prevent="deleteNews">
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
  data() {
    return {
      newNews: {
        title: "",
        body: "",
      },
      deleteId: "",
    };
  },
  methods: {
    async addNews() {
      const db = getFirestore();
      try {
        const docRef = await addDoc(collection(db, "news"), this.newNews);
        console.log("News added with ID: ", docRef.id);
        // Clear the form fields
        this.newNews.title = "";
        this.newNews.body = "";
      } catch (e) {
        console.error("Error adding news: ", e);
      }
    },
    async deleteNews() {
      const db = getFirestore();
      const newsRef = doc(db, "news", this.deleteId);
      try {
        await deleteDoc(newsRef);
        console.log("News with ID ", this.deleteId, " deleted");
        // Clear the delete input field
        this.deleteId = "";
      } catch (e) {
        console.error("Error deleting news: ", e);
      }
    },
  },
};
</script>
