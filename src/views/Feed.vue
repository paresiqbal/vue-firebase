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
    </div>
  </div>
</template>

<script setup>
// Vue
import { ref } from "vue";
import { useRouter } from "vue-router";

// Firebase
import { collection, getDocs } from "firebase/firestore";
import { db } from "../main";

const colRef = collection(db, "berita");
const berita = ref([]); // Create a reactive data property to store the news
const router = useRouter();

getDocs(colRef)
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      berita.value.push({ ...doc.data(), id: doc.id });
    });
  })
  .catch((err) => {
    console.log(err.message);
  });

const showNewsDetail = (newsItemId) => {
  router.push({ name: "news-detail", params: { id: newsItemId } });
};
</script>
