<template>
  <div class="flex flex-col justify-center items-center">
    <h1 class="text-center">FEED</h1>
    <a href="/addnews" class="px-4 py-2 bg-cyan-500 rounded-md text-white"
      >Make a post</a
    >

    <!-- Display the news -->
    <div v-for="itemBerita in berita" :key="itemBerita.id">
      <h2>{{ itemBerita.title }}</h2>
      <p>{{ itemBerita.body }}</p>
    </div>
  </div>
</template>

<script setup>
import { collection, getDocs } from "firebase/firestore";
import { db } from "../main";
import { ref, onMounted } from "vue";

const colRef = collection(db, "berita");
const berita = ref([]);

onMounted(async () => {
  try {
    const snapshot = await getDocs(colRef);
    berita.value = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  } catch (err) {
    console.error(err.message);
  }
});
</script>
