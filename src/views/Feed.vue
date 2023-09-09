<template>
  <div class="py-8">
    <h1 class="text-center text-4xl font-bold text-amber-500">News</h1>
    <div
      v-for="newsItem in berita"
      :key="newsItem.id"
      class="py-4 cursor-pointer"
    >
      <a @click="showNewsDetail(newsItem.id)">
        <h2 class="text-xl font-bold">{{ newsItem.title }}</h2>
      </a>
      <!-- Add an "Edit" button to edit the news item -->
      <button @click="editNews(newsItem.id)" class="text-sm text-blue-500">
        Edit
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../main";

const colRef = collection(db, "berita");
const berita = ref([]);
const router = useRouter();

const fetchNews = async () => {
  try {
    const snapshot = await getDocs(colRef);
    berita.value = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  } catch (error) {
    console.error("Error fetching news: ", error);
  }
};

const showNewsDetail = (newsItemId) => {
  router.push({ name: "news-detail", params: { id: newsItemId } });
};

// Function to route to the AddNews page for editing
const editNews = (newsItemId) => {
  router.push({ name: "AddNews", params: { id: newsItemId } });
};

fetchNews();
</script>
